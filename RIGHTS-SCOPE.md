# Rights and deployment scope

The MIT grant covers only the ELUCENIA-authored adapters, parsers, schemas, labels, test harness, CLI, server and documentation in this package. It does not license any provider algorithm, model binary, logo, third-party annotation, or private ELUCENIA portal/dashboard. No such UI, authentication, database, patient data or credentials are included.

This is a bounded official-API client, not a reimplementation or validation of the complete named provider. The provider computes the prediction/enrichment; our tests check request/response contracts, source identities, numerical formatting and selected consistency assertions. Clinical approval and professional language review have not been performed.

Public/synthetic research inputs only. Requests go to the named provider, and result exports contain the query and attribution. Do not submit identifying, patient or confidential data. The CLI requires an explicit --live option for network use; tests and default offline mode never call providers.

A deterministic provider lock directory is shared by all packages and the website/dashboard under the same OS account on one host: os.homedir()/.elucenia/research-provider-locks. ELUCENIA_RESEARCH_LOCK_DIRECTORY is an optional absolute override; use the same directory for all apps. This is not cross-host distributed coordination. Active PIDs are never evicted only because a lease expired; interrupted uncertain IEDB requests retain a conservative five-minute cooldown.

The standalone server binds only to 127.0.0.1 and has no account/session system. A production proxy must provide separately reviewed authentication, authorization, transport and privacy controls. No private dashboard authentication source is distributed here.

## IEDB / SMM

The selected workflow requests the documented public IEDB MHC-I SMM1.0 API for two declared HLA alleles and overlapping 9-mers. The original SMM2005 availability statement and current usage guidelines are the reviewed primary sources. No DTU binaries, provider model code, other IEDB algorithms or IEDB UI are redistributed. The bundled fixture consists of returned numerical prediction facts for a fixed synthetic peptide query; it is not a grant over the provider model. Cite IEDB, the method publication and API documentation.

The response names smm-1.0 explicitly. API release2.15 is documented, while the server exposes no model binary checksum in TSV: runtimeModelHash is null by design and is disclosed in all ten languages. Binding predictions are not immunogenicity, efficacy or diagnostic decisions. Preserve the API fair-use limits, one active job and uncertain-request cooldown.

Usage: https://tools.iedb.org/main/usage-guidelines/
API: https://tools.iedb.org/main/tools-api/
Method: https://tools.iedb.org/analyze/pdf/peters_2005_bmc_bioinformatics.pdf
