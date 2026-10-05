'use strict';
function normalizeDigits(value){return String(value).replace(/[٠-٩]/g,c=>String(c.charCodeAt(0)-0x660)).replace(/[۰-۹]/g,c=>String(c.charCodeAt(0)-0x6f0)).replace(/[०-९]/g,c=>String(c.charCodeAt(0)-0x966)).replace(/[０-９]/g,c=>String(c.charCodeAt(0)-0xff10));}
function localizedNumber(value,locale,{integer=false}={}){let s=normalizeDigits(value).trim().replace(/\u066b/g,'.');if(['pt-BR','es','fr','de','it'].includes(locale))s=s.replace(',','.');if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(s))throw Error('INVALID_INPUT');const n=Number(s);if(!Number.isFinite(n)||(integer&&!Number.isSafeInteger(n)))throw Error('INVALID_INPUT');return n;}
function list(value){return value.trim()?value.trim().split(/[\s,;]+/):[];}
function parseInput(id,fields,locale){const publicResearchData=fields.confirm===true;
 if(id==='cbioportal')return {genes:list(fields.genes),page:fields.page||1,publicResearchData};
 if(id==='ensembl-vep'){const variants=fields.variants.trim().split(/\r?\n/).filter(Boolean).map(line=>{const cells=line.trim().split(/\s+/);if(cells.length!==4)throw Error('INVALID_INPUT');return {chromosome:normalizeDigits(cells[0]),position:localizedNumber(cells[1],locale,{integer:true}),reference:cells[2],alternate:cells[3]};});return {assembly:'GRCh38',variants,publicResearchData};}
 if(id==='gprofiler-gost')return {genes:list(fields.genes),sources:fields.sources,threshold:localizedNumber(fields.threshold,locale),correction:fields.correction,excludeElectronic:fields.excludeElectronic===true,...(fields.background?.trim()?{background:list(fields.background)}:{}),publicResearchData};
 if(id==='iedb-analysis-resource')return {sequence:fields.sequence,allele:fields.allele,publicResearchData};throw Error('INVALID_INPUT');}
module.exports={normalizeDigits,localizedNumber,list,parseInput};
