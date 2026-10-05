# IEDB SMM: legame peptide–MHC I

SMM 1.0, MHC I, peptidi di 9 amminoacidi; alleli HLA-A*01:01 e HLA-A*02:01. Sequenza di 9–200 amminoacidi standard. IC50 prevista in nM e rango percentile non sono misure sperimentali né prove di immunogenicità.

## Ambito

Analisi computazionale per ricerca. Non determina diagnosi, patogenicità, efficacia o trattamento. Verifica popolazione, fonte, versione e ambito prima di interpretare.

Interfaccia e contratti implementati in ELUCENIA. L’analisi dipende dalla disponibilità del servizio responsabile. La revisione clinica indipendente e la revisione linguistica professionale non sono complete.

## Ricerca

- Sequenza amminoacidica
- Allele HLA
- Confermo che invierò solo dati di ricerca pubblici o sintetici, senza dati di pazienti o informazioni riservate.

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

I nomi ufficiali dei termini e gli identificatori scientifici conservano la lingua della fonte; le etichette dell’interfaccia sono tradotte.

## Risultati

- Allele HLA
- Peptide
- Inizio
- Fine
- IC50 prevista (nM)
- Rango percentile

L’esportazione conserva fonti, attribuzione, versioni e limiti. I dati originali mantengono la propria licenza.

## Versione

`SMM 1.0 · MHC I · API 2.15`

SMM 1.0 viene richiesto esplicitamente. La documentazione indica API 2.15; la risposta non espone l’hash del modello binario in esecuzione.

## Fonti

L’accesso all’API IEDB segue le sue linee guida d’uso; sono supportati solo SMM 1.0 e due alleli documentati. Non vengono redistribuiti binari DTU. La previsione di legame non dimostra immunogenicità o efficacia.

- [https://tools.iedb.org/main/tools-api/](https://tools.iedb.org/main/tools-api/)
- [https://tools.iedb.org/main/usage-guidelines/](https://tools.iedb.org/main/usage-guidelines/)
- [https://tools.iedb.org/analyze/pdf/peters_2005_bmc_bioinformatics.pdf](https://tools.iedb.org/analyze/pdf/peters_2005_bmc_bioinformatics.pdf)

## Limiti di attesa

Ogni richiesta a questo fornitore ha un limite di 90 secondi. Il flusso completo ha un limite di 120 secondi; l’interfaccia attende al massimo 125 secondi. Le richieste condividono il tempo rimanente del flusso. Non sono previsti tentativi automatici. Se il fornitore non risponde in tempo, l’analisi termina con un errore esplicito; nessun risultato viene stimato o sostituito.
