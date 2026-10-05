'use strict';
// Authored filesystem coordination for the two ELUCENIA apps. Lease files contain
// only process/job metadata, never query values, sequences, cookies or results.
const fs=require('node:fs/promises'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto');
const PROVIDERS=new Set(['cbio','vep','gost','iedb']);
class ProviderLockError extends Error {constructor(code){super(code);this.name='ProviderLockError';this.code=code;}}
function createProviderLock(directory,options={}){
 if(typeof directory!=='string'||!path.isAbsolute(directory))throw new ProviderLockError('LOCK_DIRECTORY_REQUIRED');
 const dir=path.resolve(directory),host=os.hostname(),pid=process.pid,now=options.now||Date.now;
 const period=options.minimumPeriodMs??1000,windowMs=options.windowMs??60000,maxJobs=options.maxJobsPerWindow??20;
 const leaseMs=options.leaseMs??180000,uncertainCooldownMs=options.uncertainCooldownMs??300000;
 function file(provider,suffix){if(!PROVIDERS.has(provider))throw new ProviderLockError('UNKNOWN_PROVIDER');const result=path.join(dir,provider+suffix);if(!result.startsWith(dir+path.sep))throw new ProviderLockError('LOCK_PATH');return result;}
 async function ready(){await fs.mkdir(dir,{recursive:true,mode:0o700});const stat=await fs.lstat(dir);if(!stat.isDirectory()||stat.isSymbolicLink()||(typeof process.getuid==='function'&&stat.uid!==process.getuid()))throw new ProviderLockError('LOCK_DIRECTORY_UNSAFE');}
 async function read(filename){try{const stat=await fs.lstat(filename);if(!stat.isFile()||stat.isSymbolicLink()||stat.size>4096)throw new ProviderLockError('LOCK_METADATA_INVALID');return JSON.parse(await fs.readFile(filename,'utf8'));}catch(e){if(e.code==='ENOENT')return null;if(e instanceof ProviderLockError)throw e;throw new ProviderLockError('LOCK_METADATA_INVALID');}}
 function validOwner(x){return x&&x.host===host&&Number.isInteger(x.pid)&&x.pid>0&&x.pid<=2147483647&&typeof x.nonce==='string'&&/^[a-f0-9]{32}$/.test(x.nonce)&&Number.isFinite(x.started)&&Number.isFinite(x.expires);}
 function alive(owner){if(options.isAlive)return options.isAlive(owner.pid);try{process.kill(owner.pid,0);return true;}catch(e){return e.code!=='ESRCH';}}
 async function atomicallyOwn(filename,owner){
  // A hardlink publishes a fully written immutable owner record atomically; a
  // crash cannot leave an empty owner file that would require unsafe age eviction.
  const prepared=path.join(dir,`${owner.provider}.${pid}.${owner.nonce}.prepared`);
  await fs.writeFile(prepared,JSON.stringify(owner),{flag:'wx',mode:0o600});
  try{await fs.link(prepared,filename);return true;}catch(e){if(e.code==='EEXIST')return false;throw new ProviderLockError('LOCK_FILESYSTEM_UNSUPPORTED');}finally{await fs.unlink(prepared).catch(()=>{});}
 }
 async function unlinkOwned(filename,owner){const current=await read(filename);if(!current)return;if(!validOwner(current)||current.nonce!==owner.nonce||current.pid!==owner.pid)throw new ProviderLockError('LOCK_OWNER_CHANGED');await fs.unlink(filename);}
 async function budget(provider){const raw=await read(file(provider,'.budget.json'));if(!raw)return{windowStarted:now(),count:0,lastStart:0,cooldownUntil:0};if(!Number.isFinite(raw.windowStarted)||!Number.isInteger(raw.count)||raw.count<0||!Number.isFinite(raw.lastStart)||!Number.isFinite(raw.cooldownUntil))throw new ProviderLockError('LOCK_BUDGET_INVALID');return raw;}
 async function writeBudget(provider,value,nonce){const temporary=file(provider,`.${nonce}.budget-prepared`);await fs.writeFile(temporary,JSON.stringify(value),{flag:'wx',mode:0o600});try{await fs.rename(temporary,file(provider,'.budget.json'));}finally{await fs.unlink(temporary).catch(()=>{});}}
 async function staleRecovery(provider){
  const guard={provider,host,pid,nonce:crypto.randomBytes(16).toString('hex'),started:now(),expires:now()+leaseMs};
  if(!await atomicallyOwn(file(provider,'.recovery.lock'),guard))return false;
  try{const owner=await read(file(provider,'.job.lock'));if(!owner)return true;
   // Expiry alone never evicts a live process. Dead owners are only reclaimed
   // after the execution lease, so an interrupted remote task receives cooldown.
   if(!validOwner(owner)||alive(owner)||now()<owner.expires)return false;
   const state=await budget(provider);state.cooldownUntil=Math.max(state.cooldownUntil,provider==='iedb'?now()+uncertainCooldownMs:owner.expires);await writeBudget(provider,state,guard.nonce);
   await unlinkOwned(file(provider,'.job.lock'),owner);return true;
  }finally{await unlinkOwned(file(provider,'.recovery.lock'),guard);}
 }
 async function acquire(provider){await ready();const owner={provider,host,pid,nonce:crypto.randomBytes(16).toString('hex'),started:now(),expires:now()+leaseMs};
  if(!await atomicallyOwn(file(provider,'.job.lock'),owner)){if(!await staleRecovery(provider)||!await atomicallyOwn(file(provider,'.job.lock'),owner))return null;}
  try{const state=await budget(provider),time=now();if(time<state.lastStart||time<state.cooldownUntil||time-state.lastStart<period){await unlinkOwned(file(provider,'.job.lock'),owner);return null;}
   if(time-state.windowStarted>=windowMs){state.windowStarted=time;state.count=0;}
   if(state.count>=maxJobs){await unlinkOwned(file(provider,'.job.lock'),owner);return null;}
   state.count++;state.lastStart=time;await writeBudget(provider,state,owner.nonce);return owner;
  }catch(e){await unlinkOwned(file(provider,'.job.lock'),owner).catch(()=>{});throw e;}
 }
 async function release(owner,failure){if(!owner||!PROVIDERS.has(owner.provider)||owner.pid!==pid||owner.host!==host)throw new ProviderLockError('LOCK_TOKEN_INVALID');
  const current=await read(file(owner.provider,'.job.lock'));if(!current)return;if(!validOwner(current)||current.nonce!==owner.nonce)throw new ProviderLockError('LOCK_OWNER_CHANGED');
  if(owner.provider==='iedb'&&failure&&['UPSTREAM_TIMEOUT','UPSTREAM_UNAVAILABLE'].includes(failure.code)){const state=await budget(owner.provider);state.cooldownUntil=Math.max(state.cooldownUntil,now()+uncertainCooldownMs);await writeBudget(owner.provider,state,owner.nonce);}
  await unlinkOwned(file(owner.provider,'.job.lock'),owner);
 }
 async function inspect(provider){await ready();const owner=await read(file(provider,'.job.lock')),recovery=await read(file(provider,'.recovery.lock'));return{directory:dir,owner,recovery,budget:await budget(provider),ownerAlive:validOwner(owner)?alive(owner):null,recoveryRequiresRepair:validOwner(recovery)&&!alive(recovery)};}
 return {acquire,release,inspect,directory:dir};
}
module.exports={createProviderLock,ProviderLockError};
