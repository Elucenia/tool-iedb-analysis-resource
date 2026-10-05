'use strict';
// ELUCENIA-authored narrow contract evaluator. No server imports in this client-safe module.
const {responseSchemas}=require('./research-contracts.json');
function errors(schema,value,at='$',out=[]){
 if(Object.hasOwn(schema,'const')&&JSON.stringify(value)!==JSON.stringify(schema.const))out.push(at+' const');
 if(schema.enum&&!schema.enum.some(x=>JSON.stringify(x)===JSON.stringify(value)))out.push(at+' enum');
 const types=Array.isArray(schema.type)?schema.type:[schema.type].filter(Boolean);
 const matches=t=>t==='null'?value===null:t==='array'?Array.isArray(value):t==='object'?value!==null&&typeof value==='object'&&!Array.isArray(value):t==='integer'?Number.isSafeInteger(value):t==='number'?typeof value==='number'&&Number.isFinite(value):typeof value===t;
 if(types.length&&!types.some(matches)){out.push(at+' type');return out;}
 if(typeof value==='number'){
  if(schema.minimum!==undefined&&value<schema.minimum)out.push(at+' minimum');
  if(schema.maximum!==undefined&&value>schema.maximum)out.push(at+' maximum');
  if(schema.exclusiveMinimum!==undefined&&value<=schema.exclusiveMinimum)out.push(at+' exclusiveMinimum');
 }
 if(typeof value==='string'){
  if(schema.pattern&&!new RegExp(schema.pattern).test(value))out.push(at+' pattern');
  if(schema.minLength!==undefined&&value.length<schema.minLength)out.push(at+' minLength');
  if(schema.maxLength!==undefined&&value.length>schema.maxLength)out.push(at+' maxLength');
  if(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value))out.push(at+' controls');
  if(schema.format==='uri')try{const url=new URL(value);if(url.protocol!=='https:'||url.username||url.password)out.push(at+' unsafe uri');}catch{out.push(at+' uri');}
  if(schema.format==='date-time'&&!/^\d{4}-\d\d-\d\dT/.test(value)||schema.format==='date-time'&&!Number.isFinite(Date.parse(value)))out.push(at+' date-time');
 }
 if(Array.isArray(value)){
  if(schema.minItems!==undefined&&value.length<schema.minItems)out.push(at+' minItems');
  if(schema.maxItems!==undefined&&value.length>schema.maxItems)out.push(at+' maxItems');
  if(value.length>10000)out.push(at+' envelope array bound');
  if(schema.uniqueItems&&new Set(value.map(x=>JSON.stringify(x))).size!==value.length)out.push(at+' uniqueItems');
  if(schema.items)value.forEach((item,index)=>errors(schema.items,item,at+'['+index+']',out));
 }
 if(value!==null&&typeof value==='object'&&!Array.isArray(value)){
  if(Object.keys(value).length>10000)out.push(at+' envelope object bound');
  for(const key of schema.required||[])if(!Object.hasOwn(value,key))out.push(at+'.'+key+' required');
  for(const [key,item]of Object.entries(value)){
   if(['__proto__','prototype','constructor'].includes(key))out.push(at+'.'+key+' unsafe');
   if(schema.propertyNames)errors(schema.propertyNames,key,at+'.key('+key+')',out);
   if(schema.properties?.[key])errors(schema.properties[key],item,at+'.'+key,out);
   else if(schema.additionalProperties===false)out.push(at+'.'+key+' unexpected');
   else if(schema.additionalProperties&&typeof schema.additionalProperties==='object')errors(schema.additionalProperties,item,at+'.'+key,out);
  }
 }
 return out;
}
function validateEnvelope(id,value){try{return Object.hasOwn(responseSchemas,id)&&errors(responseSchemas[id],value).length===0;}catch{return false;}}
module.exports={validateEnvelope,errors};
