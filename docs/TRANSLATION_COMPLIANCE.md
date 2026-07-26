# 翻译与合规工作流

## 概述

本文档规定了国际内容采集、翻译、审核和发布的完整流程，确保中国大陆合规性和内容质量。

## 1. 内容采集流程

### 阶段 1: 授权检查

```
候选资源URL
    ↓
检查robots.txt和使用条款
    ↓
┌─────────────────────────────────────────────────────┐
│ 是否开放许可 (CC-BY, Public Domain)?    │
├─────────────────────────────────────────────────────┤
│ YES → 可直接采集                         │
│ NO  → 需获得授权                         │
│       ├─ 是否为政府公开资源? (YES→采集)  │
│       ├─ 是否为学术开放资源? (YES→采集)  │
│       └─ 其他 (需联系权利人)             │
└─────────────────────────────────────────────────────┘
```

### 阶段 2: 内容采集

```python
# 伪代码
class ContentScraper:
    def scrape_authorized_content(self, url: str) -> dict:
        """
        采集授权内容
        """
        # 1. 验证授权状态
        if not self.check_authorization(url):
            raise UnauthorizedError(f"No permission to scrape: {url}")
        
        # 2. 提取内容
        content = self.extract_html_content(url)
        
        # 3. 提取元数据
        metadata = {
            'original_url': url,
            'title': content['title'],
            'authors': content.get('authors', []),
            'published_date': content.get('date'),
            'language': self.detect_language(content['text']),
            'license': self.extract_license(url),
            'source_type': 'policy|research|case|guideline|organization',
        }
        
        # 4. 数据清洁
        cleaned_content = self.clean_html(content['text'])
        
        return {
            'url': url,
            'original_title': metadata['title'],
            'content': cleaned_content,
            'metadata': metadata
        }
```

## 2. 翻译流程

### 阶段 1: 自动翻译

```
已采集内容
    ↓
┌─────────────────────────────────────────────────────┐
│ 调用翻译API                             │
│ - 腾讯翻译君 (推荐医学内容)             │
│ - 百度翻译 (通用内容)                   │
│ - Google Translate (备用)              │
└─────────────────────────────────────────────────────┘
    ↓
分段翻译处理
    ↓
术语库匹配 (特殊教育/医学术语)
    ↓
翻译结果缓存
```

### 阶段 2: 专业审校

```
自动翻译完成
    ↓
┌─────────────────────────────────────────────────────┐
│ 人工审校 (医学编辑/特教专家)             │
│                                         │
│ 检查项目:                              │
│ ✓ 医学术语准确性                       │
│ ✓ 逻辑连贯性                           │
│ ✓ 文化适应性修改                       │
│ ✓ 敏感词过滤                           │
│ ✓ 引用格式标准化                       │
│                                         │
│ 质量等级:                              │
│ - professional: 完全由专业人士翻译与审校  │
│ - reviewed: 自动翻译+人工审校修正       │
│ - auto: 仅自动翻译 (需标注)             │
└─────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────┐
│ 质量检查合格?                           │
├─────────────────────────────────────────────────────┤
│ YES → 进入合规检查                       │
│ NO  → 返回修改 (最多2轮)                 │
│       若仍不合格 → 标注为"需重译"        │
└─────────────────────────────────────────────────────┘
```

### 术语库管理

```json
{
  "special_education_glossary": {
    "ASD": {
      "en": "Autism Spectrum Disorder",
      "zh": "自闭症谱系障碍",
      "ja": "自閉症スペクトラム障害",
      "ru": "Расстройство аутистического спектра",
      "context": "医学诊断术语"
    },
    "IEP": {
      "en": "Individualized Education Program",
      "zh": "个性化教育计划",
      "context": "美国教育术语",
      "note": "不要翻译为缩写"
    }
  }
}
```

## 3. 合规检查流程

### 阶段 1: 著作权合规

```
翻译完成内容
    ↓
┌─────────────────────────────────────────────────────┐
│ 著作权检查                              │
│                                         │
│ 1. 验证授权状态                        │
│    ✓ 许可证类型记录                     │
│    ✓ 授权期限检查                       │
│    ✓ 归属要求确认                      │
│                                         │
│ 2. 建立许可证合规数据库                │
│    - CC-BY: 可使用,需署名              │
│    - CC-BY-SA: 可使用,需署名+相同协议  │
│    - CC-BY-NC: 不可商用                 │
│    - Public Domain: 可自由使用          │
│    - Custom: 需单独协议                │
│                                         │
│ 3. 生成合规标注                        │
└─────────────────────────────────────────────────────┘
    ↓
非著作权问题停止处理
```

### 阶段 2: 内容合规检查

```
著作权检查通过
    ↓
┌─────────────────────────────────────────────────────┐
│ NLP敏感内容检测                         │
│                                         │
│ 检测类别:                              │
│ 1. 政治敏感词 (自动过滤/标注)          │
│ 2. 宗教歧视内容 (自动过滤)             │
│ 3. 暴力/虐待内容 (人工审查)            │
│ 4. 医学争议性治疗 (标注警告)           │
│ 5. 医疗欺诈信息 (自动过滤)             │
│                                         │
│ 处理策略:                              │
│ - 完全过滤: 涉政敏感、医疗欺诈         │
│ - 标注警告: 争议性但合法的治疗方法      │
│ - 上下文保留: 学术讨论中的敏感词       │
└─────────────────────────────────────────────────────┘
    ↓
内容检查通过
```

### 阶段 3: 链接有效性检查

```
内容检查通过
    ↓
┌─────────────────────────────────────────────────────┐
│ 原文链接验证                            │
│                                         │
│ 1. 检查URL是否仍然有效                  │
│ 2. 检查内容是否已更新                  │
│ 3. 检查是否已被删除或改版              │
│ 4. 获取最新版本链接 (如适用)           │
│                                         │
│ 设置定期检查计划:                      │
│ - 政策文件: 每季度检查一次             │
│ - 研究论文: 每半年检查一次             │
│ - 案例分享: 每年检查一次               │
│ - 组织资源: 每月检查一次               │
│                                         │
│ 若链接失效:                            │
│ ✓ 标注为"已过期"                       │
│ ✓ 尝试使用 Wayback Machine 获取存档     │
│ ✓ 寻找替代更新资源                     │
│ ✓ 通知用户或替换                       │
└─────────────────────────────────────────────────────┘
    ↓
链接有效
```

## 4. 合规标注规范

### 标准标注模板

```html
<!-- 每个翻译内容页面顶部显示 -->
<div class="translation-notice" style="background: #f0f4f8; border-left: 4px solid #3b82f6; padding: 16px; margin-bottom: 20px;">
  <div style="display: flex; gap: 12px;">
    <div style="font-size: 24px;">📋</div>
    <div>
      <h3 style="margin: 0 0 8px 0; color: #1f2937;">翻译说明</h3>
      <div style="font-size: 14px; color: #4b5563; line-height: 1.6;">
        <p><strong>原文来源:</strong> 
          <a href="${originalUrl}" target="_blank" rel="noopener noreferrer">
            ${sourceName}
          </a>
        </p>
        <p><strong>原文标题:</strong> ${originalTitle}</p>
        <p><strong>发布日期:</strong> ${originalDate}</p>
        <p><strong>翻译日期:</strong> ${translationDate}</p>
        <p><strong>翻译质量:</strong> 
          <span class="badge badge-${qualityLevel}">${qualityLabel}</span>
        </p>
        <p><strong>著作权声明:</strong> 
          本翻译内容著作权归原作者/机构所有。
          许可证: <a href="${licenseUrl}">${licenseName}</a>
        </p>
      </div>
    </div>
  </div>
  
  <div style="background: #fff; padding: 12px; border-radius: 4px; margin-top: 12px; font-size: 13px; color: #7c3aed;">
    ⚠️ <strong>免责声明:</strong> 本翻译可能存在偏差,请以原文为准。重要医学决策请咨询专业人士。
  </div>
  
  <div style="margin-top: 12px;">
    <a href="${originalUrl}" class="btn btn-sm" target="_blank">
      🔗 查看原文完整页面
    </a>
    <button class="btn btn-sm" onclick="reportError(${contentId})">
      🐛 反馈翻译错误
    </button>
  </div>
</div>
```

### 翻译质量标签

```
✅ professional   - 专业翻译与审校
🔄 reviewed       - 自动翻译+专业审校
⚠️  auto          - 仅自动翻译(可能存在偏差)
❌ needs-review   - 需要重新审校
```

## 5. 数据库合规记录

### 翻译记录表

```sql
CREATE TABLE translation_log (
  id UUID PRIMARY KEY,
  source_url TEXT NOT NULL,
  source_title VARCHAR(500),
  source_language VARCHAR(10),
  target_language VARCHAR(10) DEFAULT 'zh',
  translated_title VARCHAR(500),
  original_content TEXT,
  translated_content TEXT,
  translation_engine VARCHAR(50),  -- tencent, baidu, google
  translation_quality VARCHAR(20), -- auto, reviewed, professional
  translator_id UUID,
  translator_name VARCHAR(200),
  translator_role VARCHAR(50),     -- professional, educator
  compliance_status VARCHAR(20),   -- approved, pending, rejected, expired
  compliance_check_date TIMESTAMP,
  license_type VARCHAR(50),        -- CC-BY, CC-BY-SA, Public Domain, Custom
  license_url TEXT,
  attribution TEXT,
  original_publish_date TIMESTAMP,
  translation_date TIMESTAMP,
  last_link_check_date TIMESTAMP,
  link_status VARCHAR(20),         -- active, expired, moved
  new_url TEXT,                    -- if link moved
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 索引优化
CREATE INDEX idx_compliance_status ON translation_log(compliance_status);
CREATE INDEX idx_link_status ON translation_log(link_status);
CREATE INDEX idx_translation_date ON translation_log(translation_date DESC);
CREATE INDEX idx_last_check_date ON translation_log(last_link_check_date);
```

## 6. 用户反馈与投诉处理

### 反馈流程

```
用户发现翻译错误/过期内容
    ↓
提交反馈表单
    ↓
┌─────────────────────────────────────────────────────┐
│ 自动分类                                │
│ - 翻译错误                              │
│ - 链接失效                              │
│ - 著作权问题                            │
│ - 医学准确性问题                        │
│ - 其他                                  │
└─────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────┐
│ 优先级评分                              │
│ - 高: 医学错误、著作权侵犯              │
│ - 中: 翻译错误、链接失效                │
│ - 低: 格式问题、用户体验建议            │
└─────────────────────────────────────────────────────┘
    ↓
分配给相应团队处理
    ↓
7天内回复用户
    ↓
修复/更新内容
    ↓
结案
```

## 7. 合规性清单

- [ ] 所有翻译内容都标注了原始URL
- [ ] 原始URL设置为可点击链接
- [ ] 每个资源都有许可证信息
- [ ] 建立了"版权合规数据库"
- [ ] 集成了NLP敏感内容检测
- [ ] 在网站首页显示翻译政策
- [ ] 在服务条款中详细说明翻译政策
- [ ] 建立了用户反馈机制
- [ ] 定期审计翻译内容
- [ ] 删除了无授权内容
- [ ] 建立了法律团队定期审查机制
- [ ] 设置了链接有效性定期检查计划
- [ ] 建立了术语库管理系统
- [ ] 所有审核过程都有日志记录
