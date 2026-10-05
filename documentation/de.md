# IEDB SMM: Peptid–MHC-I-Bindung

SMM 1.0, MHC I, Peptide mit 9 Aminosäuren; Allele HLA-A*01:01 und HLA-A*02:01. Sequenz mit 9–200 Standardaminosäuren. Vorhergesagte IC50 in nM und Perzentilrang sind keine experimentellen Messungen oder Nachweise der Immunogenität.

## Umfang

Computergestützte Forschungsanalyse. Sie begründet keine Diagnose, Pathogenität, Wirksamkeit oder Behandlung. Prüfen Sie Population, Herkunft, Version und Umfang vor der Interpretation.

Oberfläche und Schnittstellenverträge sind in ELUCENIA implementiert. Die Analyse hängt von der Verfügbarkeit des zuständigen Dienstes ab. Die unabhängige klinische Prüfung und die professionelle sprachliche Prüfung sind nicht abgeschlossen.

## Abfrage

- Aminosäuresequenz
- HLA-Allel
- Ich bestätige, dass ich ausschließlich öffentliche oder synthetische Forschungsdaten ohne Patienten- oder vertrauliche Daten übermittle.

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

Offizielle Begriffsnamen und wissenschaftliche Kennungen bleiben in der Quellsprache; die Oberflächenbeschriftungen sind übersetzt.

## Ergebnisse

- HLA-Allel
- Peptid
- Beginn
- Ende
- Vorhergesagte IC50 (nM)
- Perzentilrang

Der Export erhält Quellen, Attribution, Versionen und Grenzen. Quelldaten behalten ihre Lizenz.

## Version

`SMM 1.0 · MHC I · API 2.15`

SMM 1.0 wird ausdrücklich angefordert. Die Dokumentation nennt API 2.15; die Antwort legt den Hash des ausgeführten binären Modells nicht offen.

## Quellen

Der Zugriff auf die IEDB-API folgt deren Nutzungshinweisen; unterstützt werden nur SMM 1.0 und zwei dokumentierte Allele. Es werden keine DTU-Binärdateien weitergegeben. Bindungsvorhersagen belegen weder Immunogenität noch Wirksamkeit.

- [https://tools.iedb.org/main/tools-api/](https://tools.iedb.org/main/tools-api/)
- [https://tools.iedb.org/main/usage-guidelines/](https://tools.iedb.org/main/usage-guidelines/)
- [https://tools.iedb.org/analyze/pdf/peters_2005_bmc_bioinformatics.pdf](https://tools.iedb.org/analyze/pdf/peters_2005_bmc_bioinformatics.pdf)

## Wartezeitbegrenzungen

Jede Anfrage an diesen Anbieter ist auf 90 Sekunden begrenzt. Der gesamte Ablauf ist auf 120 Sekunden begrenzt; die Oberfläche wartet höchstens 125 Sekunden. Die Anfragen teilen sich die verbleibende Zeit des Ablaufs. Es gibt keine automatische Wiederholung. Antwortet der Anbieter nicht rechtzeitig, endet die Analyse mit einer ausdrücklichen Fehlermeldung; es wird kein Ergebnis geschätzt oder ersetzt.
