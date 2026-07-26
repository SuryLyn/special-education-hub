# 内容库结构说明

## 概述

本项目的内容库分为四个主要部分：

1. **障碍类型库** - 各类特殊教育障碍的详细信息
2. **干预方法库** - 循证干预策略及其实施指南
3. **地区资源库** - 来自不同国家和地区的政策、组织和研究资源
4. **案例库** - 真实案例分享和专业人士经验

## 1. 障碍类型库结构

### 主要障碍类别

```
特殊教育障碍
├── 神经发育障碍
│   ├── 自闭症谱系障碍 (ASD)
│   ├── 注意缺陷多动障碍 (ADHD)
│   └── 学习障碍 (LD)
├── 智力与发育
│   ├── 智力发育迟滞 (ID)
│   └── 其他发育延迟
├── 沟通障碍
│   └── 语言与言语障碍 (SLI)
├── 感觉障碍
│   ├── 听觉障碍 (HI)
│   └── 视觉障碍 (VI)
├── 运动障碍
│   └── 肢体残疾 (OI)
├── 多重障碍 (MI)
└── 情绪行为障碍 (EBD)
```

### 每个障碍类型包含

- **基本信息**
  - 定义与分类
  - 流行病学数据
  - 诊断标准

- **临床表现**
  - 核心症状
  - 伴随特征
  - 发展轨迹

- **评估工具**
  - 国际标准评估
  - 心理测量学属性
  - 使用指南

- **相关研究**
  - 病因学研究
  - 神经生物学基础
  - 遗传因素

## 2. 干预方法库结构

### 干预方法分类

#### A. 行为干预 (Behavioral Interventions)
- **应用行为分析 (ABA)**
  - 功能行为评估
  - 强化方案
  - 行为塑造
  - 消退程序

- **正面行为支持系统 (PBIS)**
  - 学校全面实施
  - 分层干预
  - 数据监测

#### B. 教育干预 (Educational Interventions)
- **直接教学法 (DTT)**
  - 离散试验法
  - 结构化教学
  - 反复练习

- **自然环境教学 (NET)**
  - 情境化学习
  - 功能性活动
  - 社区融入

- **响应式教学 (Responsive Teaching)**
  - 儿童主导
  - 游戏为基础
  - 成人引导

#### C. 语言与沟通干预
- **言语语言病理学治疗**
  - 发音训练
  - 语言发展
  - 替代性沟通
  - AAC (增强与替代沟通)

#### D. 社交技能干预
- **社交故事法**
- **视觉支持系统**
- **同伴训练**
- **社交脚本**

#### E. 感觉运动干预
- **感觉统合治疗**
  - 前庭刺激
  - 触觉活动
  - 本体感觉输入

- **物理治疗 (PT)**
  - 运动技能发展
  - 肌肉力量
  - 协调性

- **职业治疗 (OT)**
  - 生活技能
  - 精细动作
  - 感觉处理

#### F. 医学与药物干预
- **药物治疗**
  - 有效性
  - 副作用
  - 监测指标

- **营养干预**

- **其他医学治疗**
  - 脑脊液穿刺
  - 基因疗法
  - 干细胞治疗 (研究进展)

#### G. 家庭与亲职干预
- **家庭教练**
- **亲职培训**
- **家庭赋权模式**

#### H. 技术辅助干预
- **AAC设备和应用**
- **学习软件**
- **虚拟现实治疗**
- **AI辅助诊断**

### 每个干预方法包含

```json
{
  "id": "UUID",
  "name": "干预方法名称",
  "category": "behavioral|educational|communication|social|sensory-motor|medical|family|technology",
  "disabilityTypes": ["ASD", "ADHD", ...],
  "ageGroups": ["0-3", "3-6", "6-12", "12-18"],
  "description": "详细描述",
  "mechanism": "工作原理",
  "evidenceLevel": "I|II|III|IV|V",  // NIH标准
  "efficacyRate": 0.85,  // 有效率百分比
  "implementationGuide": "实施步骤",
  "duration": "6个月-1年",
  "frequency": "每周3次，每次1小时",
  "cost": "$100-200/小时",
  "contraindications": "禁忌症",
  "references": [
    {
      "title": "论文标题",
      "authors": ["作者1", "作者2"],
      "year": 2023,
      "journal": "期刊名",
      "doi": "10.xxxx/xxxxx",
      "url": "https://..."
    }
  ],
  "regions": ["US", "UK", "JP", ...],  // 实践地区
  "successFactors": "成功要素",
  "commonChallenges": "常见挑战",
  "adaptations": "文化适应性修改",
  "createdAt": "2024-01-01",
  "updatedAt": "2024-07-26"
}
```

## 3. 地区资源库结构

### 支持的地区与资源

#### 🇺🇸 美国
- **政策框架**
  - IDEA 2004 (《个人残疾人教育法》)
  - Section 504
  - ADA (美国残疾人法案)
  - IEP (个性化教育计划)

- **权威机构**
  - 美国教育部特殊教育办公室 (OSEP)
  - 美国儿科学会 (AAP)
  - 自闭症之声 (Autism Speaks)
  - Arc (弧基金会)

- **研究资源**
  - NIH (国家卫生研究院)
  - NSF (国家科学基金会)
  - NICHD (儿童健康与人类发展研究所)

#### 🇬🇧 英国
- **政策框架**
  - 《2014年儿童与家庭工作法》
  - SEN 代码 (2015年)
  - EHC 计划 (教育、健康与护理)
  - 平等法 2010

- **权威机构**
  - DfE (教育部)
  - NHS (国家卫生服务)
  - NICE (国家卫生与护理优化研究所)
  - 英国心理学会

#### 🇯🇵 日本
- **政策框架**
  - 《特別支援教育に関する基本的な方針》
  - 《発達障害者支援法》
  - 特別支援学校設置基準

- **权威机构**
  - 文部科学省 (教育部)
  - 厚生労働省 (卫生部)
  - 日本自闭症协会
  - 特別支援教育研究所

- **特色方法**
  - 绘本疗法
  - 森林疗法
  - 苏联反射学传统 (Pavlov学派影响)

#### 🇷🇺 俄罗斯
- **历史背景与特色**
  - **苏联传统** (仍有影响)
    - Vygotsky (维果茨基) 的社文化理论
    - Pavlov (巴甫洛夫) 反射学
    - Boskis (博斯基斯) 聋哑教育理论
    - Zaporozhets (扎波罗热茨) 活动理论

  - **当代方法**
    - 缺陷学 (Defectology) - 由Vygotsky创立
    - 补偿教育理论
    - 活动-交流方法

- **政策框架**
  - 《俄罗斯联邦教育法》
  - 《关于身心障碍儿童教育的基本法律框架》
  - 社会保障制度

- **权威机构**
  - 俄罗斯教育科学部
  - 俄罗斯特殊教育研究所
  - Vygotsky发展心理学国家研究所
  - 莫斯科心理学研究所

- **特色干预**
  - 补偿性学习
  - 心理-教育诊断
  - 社会适应训练
  - 群体治疗法

#### 🇸🇬 新加坡
- **政策框架**
  - 融合教育框架
  - 特殊教育学校体系
  - 个性化学习计划

- **权威机构**
  - MOE (教育部)
  - SPED schools
  - 新加坡心理学会

- **特色**
  - 亚洲模式典范
  - 多文化融合
  - 高度结构化

#### 🇦🇺 澳大利亚
- **政策框架**
  - NDIS (全国残疾保险制度)
  - 《残疾歧视法》1992
  - 国家课程

- **权威机构**
  - NDIA (国家残疾保险局)
  - 各州教育部
  - 澳大利亚心理学会

#### 🇭🇰 香港
- **政策框架**
  - 《特殊教育需要学生的融合教育指引》
  - 学生评估与教学计划
  - 相关服务制度

- **权威机构**
  - 教育局 (EDB)
  - 香港心理学会
  - 特殊学校

#### 🇹🇼 台湾
- **政策框架**
  - 《特殊教育法》
  - 《身心障碍者权益保障法》
  - 鉴定与安置系统

- **权威机构**
  - 教育部特殊教育工作小组
  - 台湾心理学会
  - 各县市特教中心

### 资源类型

```json
{
  "id": "UUID",
  "region": "US|UK|JP|SG|AU|HK|TW|RU",
  "resourceType": "policy|case|organization|guideline|research|tool",
  "title": "资源标题",
  "description": "详细描述",
  "originalUrl": "https://...",
  "language": "en|zh|ja|ko|ru",
  "translatedContent": "中文翻译内容",
  "translationQuality": "auto|reviewed|professional",
  "license": "CC-BY|CC-BY-SA|Public Domain|Custom",
  "attribution": "原始来源",
  "disabilityTypes": ["ASD", ...],
  "interventionTypes": ["behavioral", ...],
  "ageGroups": ["0-3", ...],
  "complianceStatus": "approved|pending|rejected",
  "complianceNotes": "合规备注",
  "createdAt": "2024-01-01",
  "updatedAt": "2024-07-26"
}
```

## 4. 案例库结构

### 案例分类

```json
{
  "id": "UUID",
  "title": "案例标题",
  "category": "family|educator|professional|research",
  "disabilityType": "ASD",
  "interventionTypes": ["behavioral", "educational"],
  "location": "中国|美国|...",
  
  "childProfile": {
    "age": 5,
    "gender": "M|F",
    "disabilityDetails": "具体诊断信息",
    "severity": "mild|moderate|severe",
    "comorbidities": ["ADHD", ...]
  },
  
  "interventionDetails": {
    "startAge": 3,
    "duration": "24 months",
    "frequency": "5 times per week",
    "providers": ["speech therapist", "educator", ...],
    "familyInvolvement": "high"
  },
  
  "outcomes": {
    "preIntervention": "干预前的状况",
    "postIntervention": "干预后的成果",
    "improvements": [
      "communication skills improved 80%",
      "social interaction improved 60%",
      ...
    ],
    "challenges": "遇到的挑战",
    "lessonsLearned": "经验教训"
  },
  
  "author": {
    "name": "作者名称",
    "role": "parent|educator|professional",
    "organization": "机构名称",
    "credentials": "资历"
  },
  
  "verification": {
    "isVerified": true,
    "verifiedBy": "professional_name",
    "verificationDate": "2024-01-01"
  },
  
  "engagement": {
    "views": 1250,
    "likes": 89,
    "comments": 23,
    "shares": 12
  },
  
  "createdAt": "2024-01-01",
  "updatedAt": "2024-07-26"
}
```

## 5. 数据格式标准

### 参考文献格式

```json
{
  "id": "UUID",
  "title": "论文/书籍标题",
  "authors": ["作者1", "作者2"],
  "year": 2023,
  "journal": "期刊名",
  "volume": 45,
  "issue": 3,
  "pages": "123-145",
  "doi": "10.1234/xxxxx",
  "url": "https://...",
  "source": "pubmed|cochrane|research_gate|arxiv|policy|book",
  "abstract": "摘要"
}
```

### 翻译元数据

```json
{
  "id": "UUID",
  "sourceUrl": "https://...",
  "sourceLanguage": "en",
  "targetLanguage": "zh",
  "originalTitle": "English Title",
  "translatedTitle": "中文标题",
  "originalContent": "English content...",
  "translatedContent": "中文内容...",
  "translationEngine": "tencent|baidu|google",
  "translationQuality": "auto|reviewed|professional",
  "translator": {
    "name": "译者名称",
    "role": "professional|educator",
    "credentials": "资历"
  },
  "complianceStatus": "approved|pending|rejected",
  "originalLicense": "CC-BY",
  "attribution": "Original source: https://...",
  "translationDate": "2024-01-01",
  "expiryDate": "2025-01-01"  // 建议定期更新
}
```

## 6. 内容更新策略

### 更新频率
- **政策文件** - 每季度审查
- **研究论文** - 每月新增
- **案例分享** - 持续征集
- **干预指南** - 每年评审
- **翻译内容** - 定期验证链接有效性

### 质量控制
- 所有新增内容需专业人士审核
- 建立反馈机制（用户可报告错误或过时信息）
- 定期进行链接有效性检查
- 版本控制与变更日志

## 7. 国际资源聚合策略

### 优先级国家/地区排序

1. **第一梯队** (最全面的资源)
   - 美国 (IDEA, IEP, 最多研究)
   - 英国 (SEN体系完善)
   - 日本 (特別支援教育体系)

2. **第二梯队** (特色方法)
   - 俄罗斯 (缺陷学理论)
   - 新加坡 (融合教育模范)
   - 澳大利亚 (NDIS)

3. **第三梯队** (地区代表)
   - 香港 (亚洲融合教育)
   - 台湾 (华人特教经验)

### 资源类型优先级

1. **官方政策文件** (政府网站)
2. **同行评审研究** (PubMed, Cochrane)
3. **专业指南** (学会、协会)
4. **非营利组织资源** (慈善机构)
5. **实践案例** (社区分享)

