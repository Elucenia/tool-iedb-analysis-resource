# IEDB SMM: peptide–MHC I binding

SMM 1.0, MHC I, 9-amino-acid peptides; HLA-A*01:01 and HLA-A*02:01 alleles. Input sequence: 9–200 standard amino acids. Predicted IC50 in nM and percentile rank are not experimental measurements or proof of immunogenicity.

## Scope and source identity

`ELUCENIA-research-api-2026-10-05-v3`
{
  "url": "https://tools-cluster-interface.iedb.org/tools_api/mhci/",
  "method": "smm-1.0",
  "alleles": [
    "HLA-A*01:01",
    "HLA-A*02:01"
  ],
  "length": 9,
  "maxSequence": 200
}

Interface and contracts implemented on ELUCENIA. Analysis depends on the responsible service being available. Independent clinical review and professional language review are incomplete.

This standalone package publishes only newly authored API adapters, CLI, schemas and tests. The ELUCENIA portal/dashboard UI, authentication, databases and licensed provider models are excluded. It supports only the pinned workflow above.

## Run with Node.js22.18 or later

No dependencies and no installation step.

```sh
node test.cjs
node cli.cjs --schema
node cli.cjs --offline
node cli.cjs --live example.json
node server.cjs 8080
```

The default test is offline and writes no report or package file. Temporary lock files are created in an OS temporary directory (or an absolute ELUCENIA_RESEARCH_TEST_DIRECTORY) and removed. Optional explicit `node test.cjs --record /absolute/new-receipt.json` uses exclusive creation and refuses overwriting. Live CLI and localhost server contact the provider; input requires publicResearchData:true. Do not upload patient/confidential information. Server binds127.0.0.1 only. POST JSON to `/execute` with an Origin matching localhost/port; production authentication must be supplied separately.

The shared lock directory defaults to the account home `.elucenia/research-provider-locks`. Optional absolute ELUCENIA_RESEARCH_LOCK_DIRECTORY must be common to website/dashboard and these clients on one host. Do not split directories or claim cross-host coordination.

## Waiting limits

Each provider request is clipped by the remaining120s workflow budget. Request deadlines are20s for cBioPortal/g:Profiler,60s forEnsembl and90s forIEDB. Client/route allowance is125s; no automatic retry or inferred replacement result. Ten-language documentation below specifies the selectedprovider limit.

## Documentation in ten languages

- [pt-BR](documentation/pt-BR.md)
- [en](documentation/en.md)
- [es](documentation/es.md)
- [fr](documentation/fr.md)
- [de](documentation/de.md)
- [it](documentation/it.md)
- [ar](documentation/ar.md)
- [zh](documentation/zh.md)
- [ja](documentation/ja.md)
- [hi](documentation/hi.md)

Scientific term names, version identifiers and machine JSON contracts may be preserved in their source language as explicitly described in the localized documentation. A translated interface does not provide national model calibration or professional clinical/language approval.

## Rights and evidence

[Rights and deployment scope](RIGHTS-SCOPE.md) · [Provider notices](NOTICE.md) · [Adapter MIT license](LICENSE)

Bundled fixture bodies are captured official API responses for public/synthetic examples. Tests replay them without provider calls; they do not independently reproduce provider predictions/adjusted p-values. Fixture attribution and source/license metadata are retained. Per-query source results and identity are checked; current provider availability is a separate HTTP gate.

## Primary sources

- [https://tools.iedb.org/main/tools-api/](https://tools.iedb.org/main/tools-api/)
- [https://tools.iedb.org/main/usage-guidelines/](https://tools.iedb.org/main/usage-guidelines/)
- [https://tools.iedb.org/analyze/pdf/peters_2005_bmc_bioinformatics.pdf](https://tools.iedb.org/analyze/pdf/peters_2005_bmc_bioinformatics.pdf)
