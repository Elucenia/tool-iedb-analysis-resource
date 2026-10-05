# IEDB SMM: unión de péptidos al MHC I

SMM 1.0, MHC I, péptidos de 9 aminoácidos; alelos HLA-A*01:01 y HLA-A*02:01. Secuencia de 9 a 200 aminoácidos estándar. La IC50 prevista en nM y el rango percentil no son mediciones experimentales ni prueban inmunogenicidad.

## Alcance

Análisis computacional para investigación. No establece diagnóstico, patogenicidad, eficacia ni tratamiento. Revise población, fuente, versión y alcance antes de interpretar.

Interfaz y contratos implementados en ELUCENIA. El análisis depende de la disponibilidad del servicio responsable. No se han completado la revisión clínica independiente ni la revisión lingüística profesional.

## Consulta

- Secuencia de aminoácidos
- Alelo HLA
- Confirmo que enviaré solo datos públicos o sintéticos de investigación, sin datos de pacientes ni información confidencial.

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

Los nombres oficiales de términos e identificadores científicos conservan el idioma de la fuente; las etiquetas de interfaz están traducidas.

## Resultados

- Alelo HLA
- Péptido
- Inicio
- Fin
- IC50 prevista (nM)
- Rango percentil

La exportación conserva fuentes, atribución, versiones y límites. Los datos de origen mantienen su licencia.

## Versión

`SMM 1.0 · MHC I · API 2.15`

Se solicita explícitamente SMM 1.0. La documentación identifica la API 2.15; la respuesta no expone el hash del modelo binario en ejecución.

## Fuentes

El acceso a la API IEDB sigue sus directrices de uso; solo se admiten SMM 1.0 y dos alelos documentados. No se redistribuyen binarios DTU. La predicción de unión no demuestra inmunogenicidad ni eficacia.

- [https://tools.iedb.org/main/tools-api/](https://tools.iedb.org/main/tools-api/)
- [https://tools.iedb.org/main/usage-guidelines/](https://tools.iedb.org/main/usage-guidelines/)
- [https://tools.iedb.org/analyze/pdf/peters_2005_bmc_bioinformatics.pdf](https://tools.iedb.org/analyze/pdf/peters_2005_bmc_bioinformatics.pdf)

## Límites de espera

Cada solicitud a este proveedor tiene un límite de 90 segundos. El flujo completo tiene un límite de 120 segundos; la interfaz espera como máximo 125 segundos. Las solicitudes comparten el tiempo restante del flujo. No hay reintentos automáticos. Si el proveedor no responde a tiempo, el análisis termina con un error explícito; no se estima ni se sustituye ningún resultado.
