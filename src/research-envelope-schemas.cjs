'use strict';
const {ID,POLICY}=require('./research-services.cjs');
const {inputSchemas,outputSchemas,errorCodes}=require('./research-schemas.cjs');
const str={type:'string'},bool={type:'boolean'},integer={type:'integer',minimum:0},uri={type:'string',format:'uri'};
const array=items=>({type:'array',items});
const object=(properties,optional=[])=>({type:'object',properties,required:Object.keys(properties).filter(k=>!optional.includes(k)),additionalProperties:false});
const constant=value=>({const:value});
const patterned=pattern=>({type:'string',pattern});
const jsonObject={type:'object',description:'Provider gene-mapping metadata, retained as JSON source data; nested keys are provider-defined.'};
function envelope(id,extra){return {$schema:'https://json-schema.org/draft/2020-12/schema',...object({toolId:constant(id),implementationVersion:constant('ELUCENIA-research-api-2026-10-05-v3'),input:inputSchemas[id],retrievedAt:{type:'string',format:'date-time'},sources:{...array(uri),minItems:3,maxItems:4},rows:array(outputSchemas[id].rows),review:object({engineeringScope:str,clinical:constant('not-approved'),professionalLanguage:constant('not-approved')}),...extra})};}
const responseSchemas={
 [ID.cbio]:envelope(ID.cbio,{
  version:object({portal:patterned(POLICY.cbio.versionPattern),database:str,commit:str,studyImportDate:constant(POLICY.cbio.studyImportDate),referenceGenome:constant('hg19')}),
  study:object({id:constant(POLICY.cbio.studyId),name:str,citation:str,pmids:array(str),sampleCount:integer,sequencedSampleCount:integer}),
  pagination:object({page:{type:'integer',minimum:1,maximum:100},pageSize:constant(25),hasNextPage:bool,nextPageMayBeEmpty:constant(true),totalRecords:constant(null)}),
  summary:object({rowsOnThisPage:{type:'integer',minimum:0,maximum:25},distinctSamplesOnThisPage:{type:'integer',minimum:0,maximum:25},mutationTypesOnThisPage:{type:'object',additionalProperties:integer}}),
  rights:object({dataLicense:str,attribution:str,originalStudyUrl:uri,licenseUrl:uri,redistributionReview:str})
 }),
 [ID.vep]:envelope(ID.vep,{
  version:object({ensembl:constant(POLICY.vep.release),rest:patterned(POLICY.vep.restVersionPattern),assembly:constant(POLICY.vep.assembly)}),
  rights:object({dataLicense:str,sourceUrl:uri}),
  scope:object({species:constant('homo_sapiens'),variants:constant('forward-strand single nucleotide substitutions only'),externalPlugins:constant(false),clinicalInterpretation:constant(false)})
 }),
 [ID.gost]:envelope(ID.gost,{
  version:object({gProfiler:patterned(POLICY.gost.versionPattern),ensembl:str,assembly:str,sourceVersions:{type:'object',propertyNames:{enum:POLICY.gost.sources},additionalProperties:str},goRelease:constant('2026-01-23'),goDoi:constant('10.5281/zenodo.18422732')}),
  mapping:object({failed:array(str),ambiguous:jsonObject,duplicates:array(str),query:jsonObject}),
  background:{enum:['annotated','custom']},correction:{enum:['g_SCS','bonferroni','fdr']},
  rights:object({service:str,dataLicense:str,licenseUrl:uri,sourceUrl:uri,releaseUrl:uri,doiUrl:uri,attribution:str,otherSources:constant(false)}),
  scientificText:object({termNames:str,professionalTranslationReview:constant(false)})
 }),
 [ID.iedb]:envelope(ID.iedb,{
  version:object({method:constant('smm-1.0'),methodVersion:constant('1.0'),apiReleaseDocumented:constant('2.15'),runtimeModelHash:constant(null),runtimeVersionDisclosure:str}),
  rights:object({apiDocumentation:uri,usageGuidelines:uri,methodPublication:uri,selectedMethod:str,publicationNonAcademicRestriction:str}),
  scope:object({class:constant('MHC I'),length:constant(9),alleles:{...array({enum:POLICY.iedb.alleles}),minItems:2,maxItems:2},clinicalValidation:constant(false)})
 }),
 [ID.map]:envelope(ID.map,{
  version:object({ensemblReleases:{...array({type:'integer',minimum:1}),minItems:1},rest:patterned(POLICY.map.restVersionPattern),sourceAssembly:constant(POLICY.map.sourceAssembly),sourceAlias:constant(POLICY.map.sourceAlias),targetAssembly:constant(POLICY.map.targetAssembly)}),
  summary:object({variants:{type:'integer',minimum:1,maximum:POLICY.map.maxVariants},referenceMismatches:{type:'integer',minimum:0,maximum:POLICY.map.maxVariants}}),
  rights:object({dataLicense:str,sourceUrl:uri}),
  scope:object({species:constant(POLICY.map.species),assemblyEquivalence:str,chromosomes:str,variants:constant('forward-strand single nucleotide substitutions only'),referenceBaseCorrection:constant(false),clinicalInterpretation:constant(false)})
 })
};
const errorResponseSchema={$schema:'https://json-schema.org/draft/2020-12/schema',...object({error:{enum:[...errorCodes,'UPSTREAM_POLICY']},details:object({chromosome:str,position:{type:'integer',minimum:1},expectedReference:{type:'string',pattern:'^[ACGT]$'},mappings:{type:'integer',minimum:0},mappedChromosome:str},['expectedReference','mappings','mappedChromosome'])},['details'])};
module.exports={responseSchemas,errorResponseSchema};
