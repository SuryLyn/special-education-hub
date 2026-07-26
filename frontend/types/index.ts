// 障碍类型
export type DisabilityCategory = 
  | 'ASD'    // 自闭症谱系障碍
  | 'ID'     // 智力发育迟滞
  | 'SLI'    // 语言与言语障碍
  | 'HI'     // 听觉障碍
  | 'VI'     // 视觉障碍
  | 'OI'     // 运动障碍
  | 'MI'     // 多重障碍
  | 'LD'     // 学习障碍
  | 'EBD'    // 情绪行为障碍
  | 'ADHD'   // 注意缺陷多动障碍

// 年龄组
export type AgeGroup = '0-3' | '3-6' | '6-12' | '12-18'

// 证据等级 (美国NIH标准)
export type EvidenceLevel = 'I' | 'II' | 'III' | 'IV' | 'V'

// 地区
export type Region = 'US' | 'UK' | 'JP' | 'SG' | 'AU' | 'HK' | 'TW' | 'RU'

// 障碍类型详细信息
export interface Disability {
  id: string
  slug: string
  name: string
  category: DisabilityCategory
  description: string
  causes: string[]
  symptoms: Symptom[]
  epidemiology: string
  diagnosticCriteria: string
  assessmentTools: AssessmentTool[]
  relatedDisabilities: string[]
  createdAt: string
  updatedAt: string
}

export interface Symptom {
  id: string
  name: string
  description: string
  ageOfOnset: number
  severity: 'mild' | 'moderate' | 'severe'
}

export interface AssessmentTool {
  id: string
  name: string
  description: string
  ageRange: string
  psychometricProperties: string
}

// 实证干预方法
export interface Intervention {
  id: string
  name: string
  disabilityIds: string[]
  ageGroups: AgeGroup[]
  description: string
  mechanism: string
  evidenceLevel: EvidenceLevel
  efficacyRate: number
  implementationGuide: string
  duration: string
  frequency: string
  cost: string
  contraindications: string
  references: Reference[]
  regions: Region[]
  createdAt: string
  updatedAt: string
}

// 参考文献
export interface Reference {
  id: string
  title: string
  authors: string[]
  year: number
  journal?: string
  url?: string
  doi?: string
  source: 'pubmed' | 'cochrane' | 'research' | 'policy'
}

// 地区资源
export interface RegionalResource {
  id: string
  region: Region
  disabilityId?: string
  interventionId?: string
  resourceType: 'policy' | 'case' | 'organization' | 'guideline' | 'research'
  title: string
  description: string
  originalUrl: string
  translatedContent?: string
  language: 'en' | 'zh' | 'ja' | 'ko' | 'ru'
  license: string
  attribution: string
  translationQuality: 'auto' | 'reviewed' | 'professional'
  createdAt: string
  updatedAt: string
}

// 案例分享
export interface CaseStudy {
  id: string
  title: string
  description: string
  disabilityId: string
  interventionIds: string[]
  ageAtIntervention: number
  durationMonths: number
  outcome: string
  author: {
    id: string
    name: string
    role: 'parent' | 'educator' | 'professional'
  }
  isVerified: boolean
  likes: number
  views: number
  createdAt: string
  updatedAt: string
}

// 用户
export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'educator' | 'professional' | 'admin'
  bio?: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

// API响应
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}
