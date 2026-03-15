# Yelp Research Project - Academic Research Materials

## Project Overview

This directory contains academic research materials focused on the Yelp online review platform and its impact on consumer behavior, business decisions, and market dynamics. The materials include literature records retrieved from the Web of Science database.

## Research Focus

- **Research Areas**: Digital Marketing, Online Review Platforms, Consumer Behavior, Platform Economy
- **Key Focus**: Utilizing Yelp dataset to study the impact of online reviews on consumer decision-making, business performance, and market mechanisms
- **Target Journals**: Top-tier management and marketing journals, including Information Systems Research, MIS Quarterly, Journal of Marketing, Marketing Science, Management Science, etc.

## 关键文件说明

### 1. `wos_export_data.txt`

**文件类型**：Web of Science 导出的文献记录文件

**文件格式**：标准 Web of Science 格式（.txt）

**内容概述**：
- 包含大量关于 Yelp 平台的学术论文记录
- 文件共约 2160 行，涵盖多篇顶级期刊论文
- 每条记录包含完整的元数据，包括：
  - 作者信息（AU, AF）
  - 论文标题（TI）
  - 发表期刊（SO）
  - 摘要（AB）
  - 关键词（DE, ID）
  - 引用次数（TC, Z9）
  - DOI（DI）
  - 研究领域（WC, SC）

**主要研究主题**：
- 在线评论对消费者决策的影响
- 餐厅生存预测与评论质量
- 医生评价与患者选择
- 平台设计与评论机制
- 社会运动（如 BLM）对商业的影响
- 评价偏见与性别差异
- 照片在评论中的作用
- 零工经济对产品质量的影响

**Usage**:
1. Can be used for literature review writing
2. Extract key information using text analysis tools
3. Build research background and theoretical foundation
4. Identify research gaps and future research directions

### 2. `wos_search_query.txt`

**文件类型**：Web of Science 搜索查询代码

**内容**：
```
TS=(yelp OR "yelp dataset" OR "Yelp data") AND SO=("Information Systems Research" OR "Journal on Computing" OR "MIS 
       Quarterly" OR "Journal of Consumer Research" OR "Journal of Marketing" OR "Journal of Marketing Research" OR 
       "Marketing Science" OR "Management Science" OR "Operations Research" OR "Journal of Operations Management" OR 
       "Manufacturing and Service Operations Management" OR "Academy of Management Journal" OR "Academy of Management Review" OR 
       "Administrative Science Quarterly" OR "Organization Science" OR "Strategic Management Journal" OR 
       "Journal of International Business Studies")
```

**搜索条件说明**：
- **主题词（TS）**：yelp、yelp dataset、Yelp data
- **期刊列表（SO）**：15 个顶级期刊，涵盖信息系统、管理科学、营销、运营管理等领域

**Usage**:
1. Can be used in Web of Science advanced search
2. Adjust search conditions as needed
3. Can be used to periodically update literature database

## 研究领域和方法论

### 主要研究领域

1. **数字营销与消费者行为**
   - 在线评论的影响机制
   - 消费者决策过程
   - 品牌声誉管理

2. **平台经济与设计**
   - 平台评价机制
   - 信息不对称问题
   - 平台竞争策略

3. **社会影响与伦理**
   - 评价偏见与歧视
   - 社会运动对商业的影响
   - 虚假评论与诚信问题

4. **方法论**
   - 差分法（Difference-in-Differences）
   - 自然实验
   - 机器学习与文本挖掘
   - 图像分析

## 数据来源

### 主要数据平台

1. **Yelp 数据集**
   - 评论数据
   - 用户生成照片
   - 商业信息
   - 用户行为数据

2. **辅助数据源**
   - SafeGraph（人流量数据）
   - Medicare（医疗保险数据）
   - 政府公开数据

## 使用建议

### For Research Applications

1. **Literature Review**:
   - Use `wos_export_data.txt` to write comprehensive literature reviews
   - Identify research gaps and innovation points
   - Establish theoretical foundation

2. **Research Design**:
   - Reference methodologies from existing research
   - Learn data analysis and modeling techniques
   - Design competitive research proposals

3. **Paper Writing**:
   - Understand publication preferences of target journals
   - Learn writing styles of top-tier papers
   - Build academic networks

### For Ongoing Research

1. **Data Management**:
   - Establish literature database
   - Use reference management software (e.g., EndNote, Zotero)
   - Regularly update literature

2. **Research Directions**:
   - Deep dive into specific topics
   - Explore interdisciplinary research opportunities
   - Follow latest research trends

3. **Collaboration Opportunities**:
   - Identify potential collaborators
   - Follow research teams in related fields
   - Attend academic conferences

## 技术工具建议

### 文献分析工具

1. **VOSviewer**：文献可视化分析
2. **CiteSpace**：科学知识图谱
3. **Bibliometrix**：文献计量分析
4. **Python/R**：文本挖掘和数据分析

### 数据分析工具

1. **Python**：机器学习、自然语言处理
2. **R**：统计分析、可视化
3. **SQL**：数据库查询
4. **Tableau/Power BI**：数据可视化

## Important Notes

1. **Copyright Issues**:
   - Comply with copyright regulations when using literature
   - Properly cite and attribute sources

2. **Data Usage**:
   - Follow platform data usage policies
   - Pay attention to data privacy protection

3. **Academic Integrity**:
   - Strictly follow academic standards
   - Avoid plagiarism and data fabrication

## 更新日志

- 2026-03-15：初始版本创建，包含文献记录和搜索代码

---

**Note**: The `project_context.md` file in this directory is designed to provide project context for AI assistants to better assist users in completing academic research tasks.