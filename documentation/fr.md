# IEDB SMM : liaison peptide–CMH I

SMM 1.0, CMH I, peptides de 9 acides aminés ; allèles HLA-A*01:01 et HLA-A*02:01. Séquence de 9 à 200 acides aminés standard. L’IC50 prédite en nM et le rang centile ne sont ni mesures expérimentales ni preuves d’immunogénicité.

## Périmètre

Analyse informatique pour la recherche. Elle ne détermine ni diagnostic, ni pathogénicité, ni efficacité, ni traitement. Vérifiez population, source, version et périmètre avant interprétation.

Interface et contrats implémentés dans ELUCENIA. L’analyse dépend de la disponibilité du service responsable. La révision clinique indépendante et la révision linguistique professionnelle ne sont pas achevées.

## Requête

- Séquence d’acides aminés
- Allèle HLA
- Je confirme que je transmettrai uniquement des données de recherche publiques ou synthétiques, sans données de patients ni données confidentielles.

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

Les noms officiels des termes et identifiants scientifiques conservent la langue de la source ; les libellés de l’interface sont traduits.

## Résultats

- Allèle HLA
- Peptide
- Début
- Fin
- IC50 prédite (nM)
- Rang centile

L’export conserve les sources, l’attribution, les versions et les limites. Les données sources conservent leur licence.

## Version

`SMM 1.0 · MHC I · API 2.15`

SMM 1.0 est demandé explicitement. La documentation indique l’API 2.15 ; la réponse ne fournit pas l’empreinte du modèle binaire exécuté.

## Sources

L’accès à l’API IEDB suit ses consignes d’utilisation ; seuls SMM 1.0 et deux allèles documentés sont pris en charge. Aucun binaire DTU n’est redistribué. La prédiction de liaison ne démontre ni immunogénicité ni efficacité.

- [https://tools.iedb.org/main/tools-api/](https://tools.iedb.org/main/tools-api/)
- [https://tools.iedb.org/main/usage-guidelines/](https://tools.iedb.org/main/usage-guidelines/)
- [https://tools.iedb.org/analyze/pdf/peters_2005_bmc_bioinformatics.pdf](https://tools.iedb.org/analyze/pdf/peters_2005_bmc_bioinformatics.pdf)

## Limites d’attente

Chaque requête à ce fournisseur est limitée à 90 secondes. Le traitement complet est limité à 120 secondes ; l’interface attend au maximum 125 secondes. Les requêtes partagent le temps restant du traitement. Aucune nouvelle tentative n’est automatique. Si le fournisseur ne répond pas à temps, l’analyse se termine par une erreur explicite ; aucun résultat n’est estimé ni substitué.
