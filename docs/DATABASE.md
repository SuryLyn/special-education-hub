# 数据库初始化与迁移

## 概述

本项目使用 TypeORM 管理数据库迁移。所有迁移文件存放在 `src/db/migrations` 目录。

## 运行迁移

```bash
# 运行所有待处理迁移
npm run migrate

# 生成新迁移
npx typeorm-cli migration:generate src/db/migrations/NameOfMigration
```

## 种子数据

```bash
# 运行种子脚本
npm run seed
```

## 数据库架构

### 表结构

#### disabilities (障碍类型)
- id (UUID)
- slug (唯一标识符)
- name (障碍名称)
- category (分类)
- description (描述)
- causes (病因数组)
- symptoms (症状JSON)
- epidemiology (流行病学)
- diagnosticCriteria (诊断标准)
- assessmentTools (评估工具JSON)
- relatedDisabilities (相关障碍)
- createdAt
- updatedAt

#### interventions (干预方法)
- id (UUID)
- name (干预名称)
- description (描述)
- mechanism (机制)
- ageGroups (年龄组数组)
- evidenceLevel (证据等级)
- efficacyRate (有效率)
- implementationGuide (实施指南)
- duration (推荐时长)
- frequency (频率)
- cost (成本)
- contraindications (禁忌症)
- references (参考文献JSON)
- regions (地区数组)
- createdAt
- updatedAt

#### regional_resources (地区资源)
- id (UUID)
- region (地区)
- disabilityId (关联障碍ID)
- interventionId (关联干预ID)
- resourceType (资源类型)
- title (标题)
- description (描述)
- originalUrl (原始URL)
- translatedContent (翻译内容)
- language (语言)
- license (许可证)
- attribution (署名)
- translationQuality (翻译质量)
- complianceNotes (合规备注)
- createdAt
- updatedAt

#### case_studies (案例分享)
- id (UUID)
- title (标题)
- description (描述)
- disabilityId (障碍类型ID)
- interventionIds (干预方法IDs)
- ageAtIntervention (干预时年龄)
- durationMonths (持续月数)
- outcome (结果)
- authorId (作者ID)
- isVerified (是否验证)
- likes (点赞数)
- views (浏览数)
- createdAt
- updatedAt

#### users (用户)
- id (UUID)
- email (邮箱)
- name (姓名)
- password (密码哈希)
- role (角色)
- bio (自我介绍)
- avatar (头像)
- createdAt
- updatedAt

## 关系

```
disabilities <--M:M--> interventions
users <--1:M--> case_studies
```
