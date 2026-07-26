# 开发指南

## 快速启动

### 前置要求
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 14+ (如果本地运行)
- Redis 7+ (如果本地运行)

### 使用 Docker Compose (推荐)

```bash
# 克隆项目
git clone https://github.com/SuryLyn/special-education-hub.git
cd special-education-hub

# 复制环境变量文件
cp .env.example .env

# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

服务将在以下地址运行:
- 前端: http://localhost:3000
- 后端: http://localhost:3001
- PostgreSQL: localhost:5432
- Redis: localhost:6379

### 本地开发 (不使用 Docker)

#### 启动数据库

```bash
# PostgreSQL
# macOS (使用 Homebrew)
brew services start postgresql

# Linux
sudo systemctl start postgresql

# Windows
net start PostgreSQL

# Redis
brew services start redis  # macOS
sudo systemctl start redis-server  # Linux
```

#### 启动前端

```bash
cd frontend
npm install
npm run dev
```

访问 http://localhost:3000

#### 启动后端

```bash
cd backend
npm install
npm run migrate  # 运行数据库迁移
npm run seed    # 导入示例数据 (可选)
npm run dev
```

API 服务在 http://localhost:3001

## 项目结构

```
special-education-hub/
├── frontend/               # Next.js 前端应用
│   ├── app/              # App Router 页面
│   ├── components/       # React 组件库
│   ├── lib/              # 工具函数
│   ├── types/            # TypeScript 类型定义
│   ├── styles/           # 全局样式
│   └── public/           # 静态资源
│
├── backend/               # Node.js API 服务
│   ├── src/
│   │   ├── controllers/  # 控制器 (业务逻辑)
│   │   ├── services/     # 服务层
│   │   ├── models/       # TypeORM 实体
│   │   ├── routes/       # API 路由
│   │   ├── middleware/   # 中间件
│   │   ├── utils/        # 工具函数
│   │   ├── db/           # 数据库配置与迁移
│   │   └── index.ts      # 应用入口
│   ├── dist/             # 编译输出
│   └── tests/            # 测试文件
│
├── content/               # 内容库
│   ├── disabilities/      # 障碍类型数据
│   ├── interventions/     # 干预方法数据
│   ├── regions/          # 地区资源数据
│   └── cases/            # 案例库
│
├── docs/                  # 文档
│   ├── ARCHITECTURE.md    # 架构设计
│   ├── DATABASE.md        # 数据库结构
│   ├── API.md             # API 文档
│   └── TRANSLATION_COMPLIANCE.md  # 翻译合规
│
└── docker-compose.yml     # Docker 编排文件
```

## 常见开发任务

### 创建新的 API 端点

```typescript
// backend/src/routes/new-feature.ts
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // 业务逻辑
    res.json({ success: true, data: [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
```

### 添加新的前端页面

```typescript
// frontend/app/new-page/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '页面标题',
  description: '页面描述',
};

export default function NewPage() {
  return (
    <div className="container-max py-12">
      <h1 className="text-3xl font-bold mb-8">页面标题</h1>
      {/* 页面内容 */}
    </div>
  );
}
```

### 运行数据库迁移

```bash
# 生成新的迁移
npx typeorm-cli migration:generate src/db/migrations/AddNewTable

# 运行所有待处理的迁移
npm run migrate

# 回滚最后一个迁移
npx typeorm-cli migration:revert
```

### 导入示例数据

```bash
npm run seed
```

## 代码规范

### TypeScript
- 使用严格模式
- 为所有函数参数添加类型注解
- 使用 `interface` 定义复杂对象类型
- 避免 `any` 类型

### 文件命名
- 组件: `PascalCase` (e.g., `DisabilityCard.tsx`)
- 函数/变量: `camelCase` (e.g., `fetchDisabilities.ts`)
- 路由: `kebab-case` (e.g., `/disabilities-list`)

### Git 提交信息

遵循 Conventional Commits 规范:

```
feat: 添加新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式
refactor: 代码重构
test: 测试用例
chore: 其他更改
```

示例:
```
feat: Add disability filtering by age group
fix: Fix translation API rate limiting
docs: Update API documentation
```

## 测试

### 前端测试

```bash
cd frontend

# 运行所有测试
npm run test

# 监视模式
npm run test:watch

# 生成覆盖率报告
npm run test -- --coverage
```

### 后端测试

```bash
cd backend

# 运行所有测试
npm run test

# 监视模式
npm run test:watch

# 生成覆盖率报告
npm run test -- --coverage
```

## 环境变量

创建 `.env` 文件 (参考 `.env.example`):

```env
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME="Special Education Hub"

# Backend
NODE_ENV=development
PORT=3001

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/special_education_hub

# Redis
REDIS_URL=redis://localhost:6379

# Translation APIs (填入你的 API 密钥)
TENCENT_TRANSLATE_SECRET_ID=
TENCENT_TRANSLATE_SECRET_KEY=
BAIDU_TRANSLATE_API_KEY=
BAIDU_TRANSLATE_SECRET_KEY=
```

## 调试

### 前端调试

使用 Next.js 内置调试:

```bash
# 启用详细日志
DEBUG=* npm run dev
```

使用浏览器开发者工具:
- Chrome DevTools
- React Developer Tools 浏览器扩展
- Next.js 调试器

### 后端调试

使用 VS Code 调试配置:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Backend",
      "program": "${workspaceFolder}/backend/src/index.ts",
      "preLaunchTask": "npm: build",
      "outFiles": ["${workspaceFolder}/backend/dist/**/*.js"]
    }
  ]
}
```

## 部署

### 生产环境检查清单

- [ ] 所有环境变量已设置
- [ ] 数据库迁移已运行
- [ ] 构建成功无错误
- [ ] 所有测试通过
- [ ] 代码审查通过
- [ ] 安全扫描通过
- [ ] 性能测试通过

### 部署到 Vercel (前端)

```bash
# 连接 GitHub 仓库到 Vercel
# 自动部署推送到 main 分支的更改
```

### 部署到 Railway (后端)

```bash
# 连接 GitHub 仓库到 Railway
# 配置环境变量
# 自动部署
```

## 常见问题

### Q: 如何重置数据库?
A: 
```bash
docker-compose down -v  # 删除所有卷
docker-compose up       # 重新创建数据库
npm run seed            # 导入示例数据
```

### Q: 如何查看 API 日志?
A:
```bash
docker-compose logs backend -f
```

### Q: 翻译 API 测试失败?
A: 确保已配置翻译 API 密钥在 `.env` 文件中

### Q: 数据库迁移失败?
A:
```bash
# 检查数据库连接
psql $DATABASE_URL -c "SELECT 1"

# 重新运行迁移
npm run migrate
```

## 获取帮助

- 📖 查看 [完整文档](./docs)
- 🐛 报告 [Issue](https://github.com/SuryLyn/special-education-hub/issues)
- 💬 加入讨论 [Discussions](https://github.com/SuryLyn/special-education-hub/discussions)
