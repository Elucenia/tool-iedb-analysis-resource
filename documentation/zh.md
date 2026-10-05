# IEDB SMM：肽与 MHC I 结合预测

SMM 1.0，MHC I，9 个氨基酸长度的肽；HLA-A*01:01 和 HLA-A*02:01 等位基因。输入序列包含 9–200 个标准氨基酸。预测 IC50（nM）和百分位排名不是实验测量，也不能证明免疫原性。

## 适用范围

用于研究的计算分析。不能据此确定诊断、致病性、疗效或治疗。解释前请核对人群、来源、版本与适用范围。

ELUCENIA已实现界面及请求和响应契约。分析依赖相应服务的可用性。独立临床审核和专业语言审核尚未完成。

## 查询

- 氨基酸序列
- HLA 等位基因
- 我确认仅提交公开或合成研究数据，不含患者数据或保密信息。

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

官方术语名称和科学标识符保留来源语言；界面标签已翻译。

## 结果

- HLA 等位基因
- 肽
- 起始
- 终止
- 预测 IC50（nM）
- 百分位排名

导出保留来源、署名、版本和限制。原始数据保留其许可证。

## 版本

`SMM 1.0 · MHC I · API 2.15`

请求明确指定SMM 1.0。文档标明API 2.15；响应不提供正在运行的二进制模型哈希。

## 来源

IEDB API访问遵循其使用指南；仅支持SMM 1.0及两个已记录的等位基因。不重新分发DTU二进制程序。结合预测不能证明免疫原性或疗效。

- [https://tools.iedb.org/main/tools-api/](https://tools.iedb.org/main/tools-api/)
- [https://tools.iedb.org/main/usage-guidelines/](https://tools.iedb.org/main/usage-guidelines/)
- [https://tools.iedb.org/analyze/pdf/peters_2005_bmc_bioinformatics.pdf](https://tools.iedb.org/analyze/pdf/peters_2005_bmc_bioinformatics.pdf)

## 等待时限

向此服务提供方发送的每个请求限时 90 秒。整个工作流程限时 120 秒，界面最多等待 125 秒。各请求共享工作流程的剩余时间。不会自动重试。如果服务提供方未及时响应，分析将以明确的错误结束；不会估算或替换任何结果。
