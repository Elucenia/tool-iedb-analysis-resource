#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),tool=require('./tool.cjs');
(async()=>{const [mode,file]=process.argv.slice(2);if(mode==='--schema'&&file===undefined){console.log(JSON.stringify(tool.specification.inputSchema,null,2));return;}if(!['--offline','--live'].includes(mode)||mode==='--live'&&!file||process.argv.length>4)throw Error('Usage: node cli.cjs --schema | --offline [input.json] | --live input.json');const input=file?JSON.parse(fs.readFileSync(file,'utf8')):require('./example.json');const result=await tool.create({offline:mode==='--offline'}).execute(input);console.log(JSON.stringify(result,null,2));})().catch(error=>{console.error(JSON.stringify({error:error.code||'CLI_INPUT_OR_CONFIGURATION'}));process.exitCode=1;});
