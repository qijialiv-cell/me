# AGENTS.md

## 项目概述

**项目名称**：Qijia 学术网站 (Qijia_academic_website)

**项目描述**：个人学术网站项目，用于展示学术成果、简历和相关材料。采用 Editorial Luxury Theme 设计风格，灵感来自 Monocle Magazine 与 Brutalist Grid 的结合，实现现代化的水平滚动页面导航体验。

**Git 仓库**：https://github.com/qijialiv-cell/me.git

**当前状态**：项目已完成主要开发并部署到 GitHub Pages，采用深色学术调色板与编辑级排版设计。

## 项目结构

```
Qijia_academic_website/
├── .gitignore                   # Git忽略文件配置
├── .nojekyll                    # 禁用Jekyll处理（GitHub Pages静态站点）
├── index.html                   # 主页HTML文件
├── README.md                    # 项目说明和使用指南
├── assets/                      # 静态资源文件夹
│   └── README.md                # 资源文件说明
├── css/                         # 样式文件夹
│   └── style.css                # 主样式文件
└── js/                          # JavaScript文件夹
    └── script.js                # 主JavaScript文件
```

**本地开发文件**（已配置 .gitignore 忽略）：
- `Screenshot 2026-03-02 at 17.26.00.png` - 个人照片
- `Qijia_PhD_CV (2).pdf` - 个人简历PDF
- `HKSY.pdf` - 其他学术材料

## 功能特性

### 前端技术栈
- **HTML5**: 语义化结构与现代Web标准
- **CSS3**: CSS变量、Grid布局、Flexbox、水平滚动架构、编辑级排版
- **JavaScript**: 原生ES6+，无框架依赖，Intersection Observer API
- **Font Awesome 6.5.1**: 图标库
- **Google Fonts**: DM Serif Display + Outfit + DM Mono 字体组合

### 页面板块（水平滚动架构）
1. **About (Page 1/6)**: 个人简介、照片、关键成就亮点
2. **Research (Page 2/6)**: 研究方向（Brand Activism、AI & Digital Platforms）、发表论文
3. **Teaching (Page 3/6)**: 教学经历、教学理念、课程列表、教学兴趣
4. **CV (Page 4/6)**: 教育背景、学术经历、发表论文、演讲、教学经验
5. **Skills (Page 5/6)**: 编程技能、统计方法、工具平台
6. **Contact (Page 6/6)**: 联系方式、学术求职市场信息

### 核心功能
- **水平滚动导航**: 桌面端全屏水平滚动页面切换
- **响应式设计**: 桌面水平滚动，移动端自动切换垂直滚动
- **页面导航控制**: 左右箭头按钮、底部页面指示器
- **键盘导航**: 方向键（↑↓←→）切换页面
- **平滑滚动导航**: 带有活动链接高亮的固定导航栏
- **动态效果**: 悬停效果、滚动动画、卡片倾斜效果
- **研究展示**: 研究方向描述、发表论文列表
- **教学信息**: 课程详情、教学理念、教学统计数据
- **技能可视化**: 分类技能标签展示
- **无障碍访问**: 语义化HTML和键盘导航支持

### 设计特色 — Editorial Luxury Theme
- **设计灵感**: Monocle Magazine × Brutalist Grid
- **配色方案**: 深色学术调色板
  - Ink (#0e0e0e), Paper (#f5f2ec), Cream (#faf8f4)
  - Primary Navy (#1a3a5c), Gold Accent (#b8963e)
- **排版风格**: 编辑级字体层级
  - Display: DM Serif Display (衬线标题)
  - Body: Outfit (现代无衬线正文)
  - Mono: DM Mono (标签与元数据)
- **视觉效果**: 纸张纹理背景、金色顶部边线、装饰性角标
- **卡片设计**: 无圆角方形设计、金色悬停边框、阴影层次

## 技术细节

### CSS架构
- **CSS变量**: 集中管理颜色、字体、间距、阴影、圆角、过渡效果
- **颜色系统**: 
  - 核心: ink, paper, cream, fog
  - 主色: primary (#1a3a5c), primary-light, primary-dark
  - 强调: gold (#b8963e), accent-red, accent-teal
- **响应式断点**: 1024px、768px、480px
- **动画效果**: fadeUp、fadeIn、slideInLeft 关键帧动画
- **打印样式**: 优化的打印样式表

### JavaScript功能模块
- **页面导航系统**: 水平滚动页面切换、goToPage/nextPage/prevPage
- **导航系统**: 移动端菜单、活动链接更新、平滑滚动
- **动画系统**: Intersection Observer API、卡片倾斜效果、计数器动画
- **键盘导航**: 方向键支持、Tab键焦点管理
- **响应式切换**: debounce/throttle 优化的窗口尺寸监听
- **性能优化**: debounce、throttle 函数

## 开发环境

- **操作系统**：macOS (Darwin 25.1.0)
- **Git 版本**：2.51.2
- **Python 版本**：3.12.12
- **Shell**：zsh (with Oh My Zsh)
- **浏览器**：支持Chrome、Firefox、Safari、Edge最新版本

## 部署信息

### GitHub Pages 部署
项目已配置自动部署到 GitHub Pages：
- **部署方式**: GitHub Actions (jekyll-gh-pages.yml)
- **分支**: main
- **部署路径**: Documents/Qijia_academic_website
- **`.nojekyll`**: 已添加以禁用Jekyll处理
- **网站地址**: https://qijialiv-cell.github.io/me/

### 本地开发
```bash
# 直接在浏览器中打开index.html
# 或使用本地服务器
python -m http.server 8000
# 访问 http://localhost:8000
```

## 内容详情

### 个人信息
- **姓名**: Qijia Liao
- **学位**: PhD in Marketing
- **院校**: University of Liverpool Management School
- **状态**: PhD Viva Passed (February 2026)
- **邮箱**: qijia.liv@gmail.com

### 研究方向
1. **Brand Activism**: 研究非西方制度背景下的品牌行动主义及其对消费者和投资者行为的影响，引入 System-Threat Activism (STA) 概念
2. **AI, Digital Platforms & Marketing Analytics**: 研究数字营销环境中的人工智能和算法系统，探索影响者营销效果与算法估值异常

### 发表论文
- Liao, Q., Yang, L., & Lim, E. J. (2023). "A bibliometric and content analysis of marketing-finance interface research from 1986–2021," *Journal of Business & Finance Librarianship*, 28(4), 278-301.
- Liao, Q., Byrom, J., Guenther, M., & Song, F. "When Brand Activism Threatens Consumers' Identity: An Investigation of System-Threat Activism." *AMA Winter Conference 2025*, Phoenix, AZ.

### 技能
- **编程**: R (Tidyverse, tidymodels), Python (Scikit-learn, XGBoost), Deep Learning (fastai, PyTorch), NLP (Hugging Face, BERT)
- **统计方法**: Structural Equation Modeling, Mediation Analysis, Event Studies, Propensity Score Weighting, Causal Inference, Experimental Design
- **工具**: RStudio, SPSS, Stata, Qualtrics, Prolific, GitHub, Shiny, WRDS, DataStream, Eikon
- **语言**: Chinese (Native), English (Proficient)

## Git 提交历史

最近提交：
- `5685c76` - Remove Indonesian language and update GitHub Actions workflow
- `8ddfe75` - Update HTML structure and content: fonts, navigation, and section formatting
- `39cd76c` - Update CSS spacing and layout optimizations
- `92ad355` - Fix page height constraint: change from height to min-height to allow content to display fully
- `8c4c51d` - Comprehensive spacing optimization: reduce all margins and padding for tighter layout

## 更新日志

### 2026-03
- 实现 Editorial Luxury Theme 设计风格
- 采用 DM Serif Display + Outfit + DM Mono 字体组合
- 实现水平滚动页面导航系统
- 添加页面导航按钮和底部指示器
- 添加键盘导航支持（方向键）
- 实现响应式切换（桌面水平/移动垂直）
- 配置 GitHub Pages 自动部署
- 添加 `.nojekyll` 文件禁用 Jekyll 处理
- 更新 `.gitignore` 配置
- 添加无障碍访问功能
- 优化移动端体验

---

*最后更新：2026-03-16*