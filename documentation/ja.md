# IEDB SMM：ペプチドと MHC I の結合

SMM 1.0、MHC I、9アミノ酸ペプチド。HLA-A*01:01とHLA-A*02:01。入力は9～200の標準アミノ酸。予測IC50（nM）とパーセンタイル順位は実験測定値でも免疫原性の証明でもありません。

## 適用範囲

研究用の計算解析です。診断、病原性、有効性、治療を確定するものではありません。解釈前に対象集団、出典、バージョン、範囲を確認してください。

ELUCENIA内に画面とリクエスト・レスポンスの契約を実装しています。解析には提供元サービスの稼働が必要です。独立した臨床レビューと専門家による言語レビューは完了していません。

## クエリ

- アミノ酸配列
- HLA アレル
- 患者データや機密情報を含まない、公開または合成の研究データのみを送信することを確認します。

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

公式の用語名と科学的識別子は情報源の言語を保持します。インターフェースのラベルは翻訳済みです。

## 結果

- HLA アレル
- ペプチド
- 開始
- 終了
- 予測 IC50（nM）
- パーセンタイル順位

エクスポートには出典、帰属、バージョン、制限を保持します。原データのライセンスは引き継がれます。

## バージョン

`SMM 1.0 · MHC I · API 2.15`

SMM 1.0を明示的に指定します。文書にはAPI 2.15と記載されていますが、レスポンスには実行中のバイナリモデルのハッシュが含まれていません。

## 情報源

IEDB APIへのアクセスは利用ガイドラインに従います。SMM 1.0と文書化された2つのアレルのみを対象とし、DTUのバイナリは再配布しません。結合予測は免疫原性や有効性を証明するものではありません。

- [https://tools.iedb.org/main/tools-api/](https://tools.iedb.org/main/tools-api/)
- [https://tools.iedb.org/main/usage-guidelines/](https://tools.iedb.org/main/usage-guidelines/)
- [https://tools.iedb.org/analyze/pdf/peters_2005_bmc_bioinformatics.pdf](https://tools.iedb.org/analyze/pdf/peters_2005_bmc_bioinformatics.pdf)

## 待機時間の上限

この提供元への各リクエストの上限は90秒です。処理全体の上限は120秒で、画面は最大125秒待機します。各リクエストは処理全体の残り時間を共有します。自動再試行は行いません。提供元が時間内に応答しない場合、分析は明示的なエラーで終了し、結果の推定や代替は行いません。
