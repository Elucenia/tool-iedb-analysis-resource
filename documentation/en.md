# IEDB SMM: peptide–MHC I binding

SMM 1.0, MHC I, 9-amino-acid peptides; HLA-A*01:01 and HLA-A*02:01 alleles. Input sequence: 9–200 standard amino acids. Predicted IC50 in nM and percentile rank are not experimental measurements or proof of immunogenicity.

## Scope

Computational research analysis. It does not establish diagnosis, pathogenicity, efficacy or treatment. Check population, provenance, version and scope before interpreting.

Interface and contracts implemented on ELUCENIA. Analysis depends on the responsible service being available. Independent clinical review and professional language review are incomplete.

## Query

- Amino acid sequence
- HLA allele
- I confirm that I will submit only public or synthetic research data, without patient or confidential data.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "sequence": {
      "type": "string",
      "minLength": 9,
      "maxLength": 200,
      "pattern": "^[ACDEFGHIKLMNPQRSTVWY]+$"
    },
    "allele": {
      "enum": [
        "HLA-A*01:01",
        "HLA-A*02:01"
      ]
    },
    "publicResearchData": {
      "const": true,
      "description": "Only public or synthetic research inputs; no patient/confidential data."
    }
  },
  "required": [
    "sequence",
    "allele",
    "publicResearchData"
  ],
  "additionalProperties": false
}
```

Official term names and scientific identifiers retain the source language; interface labels are translated.

## Results

- HLA allele
- Peptide
- Start
- End
- Predicted IC50 (nM)
- Percentile rank

Export preserves sources, attribution, versions and limitations. Source data retain their license.

## Version

`SMM 1.0 · MHC I · API 2.15`

SMM 1.0 is requested explicitly. The documentation identifies API 2.15; the response does not expose the running binary model hash.

## Sources

IEDB API access follows its usage guidelines; only SMM 1.0 and two documented alleles are supported. No DTU binaries are redistributed. Binding prediction does not establish immunogenicity or efficacy.

- [https://tools.iedb.org/main/tools-api/](https://tools.iedb.org/main/tools-api/)
- [https://tools.iedb.org/main/usage-guidelines/](https://tools.iedb.org/main/usage-guidelines/)
- [https://tools.iedb.org/analyze/pdf/peters_2005_bmc_bioinformatics.pdf](https://tools.iedb.org/analyze/pdf/peters_2005_bmc_bioinformatics.pdf)

## Waiting limits

Each request to this provider has a 90-second limit. The complete workflow has a 120-second limit; the interface waits at most 125 seconds. Requests share the workflow’s remaining time. There is no automatic retry. If the provider does not respond in time, analysis ends with an explicit error; no result is estimated or substituted.
