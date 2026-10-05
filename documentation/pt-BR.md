# IEDB SMM: ligação de peptídeos ao MHC I

SMM 1.0, MHC I, peptídeos de 9 aminoácidos; alelos HLA-A*01:01 e HLA-A*02:01. Sequência de 9 a 200 aminoácidos padrão. IC50 prevista em nM e posição percentual não são medidas experimentais nem prova de imunogenicidade.

## Escopo

Análise computacional para pesquisa. Não determina diagnóstico, patogenicidade, eficácia ou tratamento. Confira população, fonte, versão e escopo antes de interpretar.

Interface e contratos implementados na ELUCENIA. A análise depende da disponibilidade do serviço responsável. Revisão clínica independente e revisão linguística profissional não concluídas.

## Consulta

- Sequência de aminoácidos
- Alelo HLA
- Confirmo que enviarei somente dados públicos ou sintéticos de pesquisa, sem dados de pacientes ou dados confidenciais.

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

Nomes oficiais de termos e identificadores científicos são preservados no idioma da fonte; os rótulos da interface estão traduzidos.

## Resultados

- Alelo HLA
- Peptídeo
- Início
- Fim
- IC50 previsto (nM)
- Posição percentual

A exportação conserva fontes, atribuição, versões e limites. Dados de origem mantêm sua licença.

## Versão

`SMM 1.0 · MHC I · API 2.15`

O método SMM 1.0 é solicitado explicitamente. A documentação informa a API 2.15; a resposta não expõe o hash do modelo binário em execução.

## Fontes

Acesso à API IEDB conforme suas orientações de uso; somente SMM 1.0 e dois alelos documentados. Nenhum binário DTU é redistribuído. A previsão de ligação não demonstra imunogenicidade nem eficácia.

- [https://tools.iedb.org/main/tools-api/](https://tools.iedb.org/main/tools-api/)
- [https://tools.iedb.org/main/usage-guidelines/](https://tools.iedb.org/main/usage-guidelines/)
- [https://tools.iedb.org/analyze/pdf/peters_2005_bmc_bioinformatics.pdf](https://tools.iedb.org/analyze/pdf/peters_2005_bmc_bioinformatics.pdf)

## Limites de espera

Cada requisição a este provedor tem limite de 90 segundos. O fluxo completo tem limite de 120 segundos; a interface espera no máximo 125 segundos. Os pedidos compartilham o tempo restante do fluxo. Não há repetição automática. Se o provedor não responder a tempo, a análise termina com um erro explícito; nenhum resultado é estimado ou substituído.
