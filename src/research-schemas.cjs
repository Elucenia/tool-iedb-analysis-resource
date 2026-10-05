'use strict';
const {ID,POLICY}=require('./research-services.cjs');
const gene={type:'string',pattern:'^[A-Za-z0-9][A-Za-z0-9.-]{0,31}$'};
const genes=max=>({type:'array',items:gene,minItems:1,maxItems:max,uniqueItems:true});
const confirmed={const:true,description:'Only public or synthetic research inputs; no patient/confidential data.'};
const input=(props,optional=[])=>({$schema:'https://json-schema.org/draft/2020-12/schema',type:'object',properties:props,required:Object.keys(props).filter(k=>!optional.includes(k)),additionalProperties:false});
const inputSchemas={
 [ID.cbio]:input({genes:genes(5),page:{type:'integer',minimum:1,maximum:100},publicResearchData:confirmed}),
 [ID.vep]:input({assembly:{const:'GRCh38'},variants:{type:'array',minItems:1,maxItems:10,uniqueItems:true,items:input({chromosome:{type:'string',pattern:'^(?:[1-9]|1[0-9]|2[0-2]|X|Y|MT)$'},position:{type:'integer',minimum:1,maximum:250000000},reference:{type:'string',pattern:'^[ACGT]$'},alternate:{type:'string',pattern:'^[ACGT]$'}})},publicResearchData:confirmed}),
 [ID.gost]:input({genes:genes(100),sources:{type:'array',minItems:1,maxItems:3,uniqueItems:true,items:{enum:POLICY.gost.sources}},threshold:{type:'number',exclusiveMinimum:0,maximum:1},correction:{enum:['g_SCS','bonferroni','fdr']},excludeElectronic:{type:'boolean'},background:genes(1000),publicResearchData:confirmed},['background']),
 [ID.iedb]:input({sequence:{type:'string',minLength:9,maxLength:200,pattern:'^[ACDEFGHIKLMNPQRSTVWY]+$'},allele:{enum:POLICY.iedb.alleles},publicResearchData:confirmed})
};
const scalar={type:['string','number','boolean','null']};
const outputSchemas={
 [ID.cbio]:{rows:input({gene:gene,sampleId:{type:'string'},proteinChange:{type:'string'},mutationType:{type:'string'},chromosome:{type:'string'},position:{type:'integer'},reference:{type:'string'},alternate:{type:'string'}}),pagination:{pageSize:25,hasNextPage:'rows.length===25; next page can be empty; not a total/prevalence claim'}},
 [ID.vep]:{rows:input({chromosome:{type:'string'},position:{type:'integer'},reference:{type:'string'},alternate:{type:'string'},consequence:{type:'string'},transcripts:{type:'array',items:input({geneId:{type:'string'},geneSymbol:{type:['string','null']},transcriptId:{type:'string'},consequences:{type:'array',items:{type:'string'}},impact:{type:['string','null']},canonical:{type:'boolean'},aminoAcids:{type:['string','null']},proteinStart:{type:['integer','null']},proteinEnd:{type:['integer','null']}})}})},
 [ID.gost]:{rows:input({termId:{type:'string',pattern:'^GO:\\d{7}$'},termName:{type:'string'},source:{enum:POLICY.gost.sources},adjustedP:{type:'number',minimum:0,maximum:1},overlap:{type:'integer',minimum:0},querySize:{type:'integer',minimum:0},termSize:{type:'integer',minimum:0},universe:{type:'integer',minimum:0},precision:{type:'number',minimum:0,maximum:1},recall:{type:'number',minimum:0,maximum:1},evidence:{type:'array'},significant:{type:'boolean'}})},
 [ID.iedb]:{rows:input({allele:{enum:POLICY.iedb.alleles},start:{type:'integer',minimum:1},end:{type:'integer',minimum:9},length:{const:9},peptide:{type:'string',minLength:9,maxLength:9},ic50Nanomolar:{type:'number',exclusiveMinimum:0},percentileRank:{type:'number',minimum:0,maximum:100}})}
};
// Output rows are strict; result envelope also includes explicit source/version/rights/retrievedAt/review metadata.
module.exports={inputSchemas,outputSchemas,additionalConstraints:{[ID.vep]:'reference!==alternate; actual reference base is checked against GRCh38 sequence',[ID.gost]:'overlap<=querySize and termSize; provider precision/recall must agree with independent ratios within1e-12',[ID.iedb]:'end=start+8; peptide=sequence.slice(start-1,end); each of sequence.length-8 windows occurs exactly once'},errorCodes:['INVALID_INPUT','PUBLIC_DATA_REQUIRED','UNKNOWN_TOOL','REFERENCE_MISMATCH','GENE_UNRESOLVED','VERSION_CHANGED','NOT_FOUND','UPSTREAM_SCHEMA','UPSTREAM_TOO_LARGE','UPSTREAM_UNAVAILABLE','UPSTREAM_TIMEOUT','UPSTREAM_RATE_LIMIT','PROVIDER_BUSY','ORIGIN_REJECTED','AUTH_REQUIRED','METHOD_NOT_ALLOWED','CONTENT_TYPE_REQUIRED','BODY_TOO_LARGE','INTERNAL_ERROR']};
