# "如意"AI低代码平台

一个作为毕业设计的集成AI功能的低代码平台。这个平台不实现可视化编辑器。

## 📋 目录

- [项目简介](#项目简介)
- [平台范式](#平台范式)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [文档导航](#文档导航)

## 项目简介

"如意"AI低代码平台是一个基于**元数据驱动（Metadata-Driven）**范式的低代码开发平台，集成AI功能，旨在通过配置和AI辅助简化应用开发流程，提高开发效率。

### 平台范式

平台采用**元数据驱动**的低代码开发范式：

- **模型驱动**：一个模型对应一个数据库表，自动生成基础CRUD功能
- **元数据配置**：通过元数据配置页面展示、字段编辑规则、验证规则、权限控制等
- **代码扩展**：对于复杂业务需求，支持通过SQL代码进行自定义扩展

这种范式在保证开发效率的同时，为复杂场景提供了灵活的扩展能力。

### 核心特性

- 🤖 **AI驱动开发**：集成OpenAI API，根据自然语言描述生成元数据配置和SQL代码
- 📋 **元数据配置**：通过配置而非编码的方式定义数据模型、页面展示、字段规则等
- 🔧 **SQL代码扩展**：支持自定义SQL代码实现复杂查询、数据处理和业务逻辑
- 📊 **RESTful API自动生成**：根据模型和元数据自动生成RESTful API端点和Controllers
- 🎨 **动态页面渲染**：前端根据元数据配置动态渲染表单、列表等组件
- 🔐 **细粒度权限控制**：支持基于角色的权限控制（RBAC）和字段级权限控制

## 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd RuYi
```

### 2. 后端设置

```bash
cd backend
# 安装依赖（如果需要）
dotnet restore

# 配置数据库连接字符串（appsettings.json）
# 配置OpenAI API密钥（appsettings.json）

# 运行数据库迁移
dotnet ef database update

# 启动后端服务
dotnet run
```

### 3. 前端设置

```bash
cd frontend
# 安装依赖
npm install

# 配置API端点（.env文件）
VITE_API_URL=http://localhost:5000/api

# 启动开发服务器
npm run dev
```

### 4. 访问应用

- 前端：http://localhost:5173
- 后端API：http://localhost:5000/api

> 📖 更多详细信息请参考 [开发环境配置](docs/development/environment.md)

## 项目结构

```
RuYi/
├── frontend/              # 前端项目
│   ├── src/
│   │   ├── components/    # Vue组件
│   │   ├── views/         # 页面视图
│   │   ├── router/        # 路由配置
│   │   ├── store/         # 状态管理
│   │   ├── api/           # API调用
│   │   └── utils/         # 工具函数
│   ├── public/            # 静态资源
│   └── package.json       # 依赖配置
│
├── backend/               # 后端项目
│   ├── Controllers/       # 控制器
│   ├── Services/          # 业务逻辑
│   ├── Models/            # 数据模型
│   ├── Services/          # 业务逻辑服务
│   ├── Data/              # 数据访问层
│   └── appsettings.json   # 配置文件
│
├── docs/                  # 项目文档
│   ├── api/               # API文档
│   ├── architecture/      # 架构文档
│   └── development/      # 开发文档
│
└── README.md              # 项目说明
```

### 目录说明

- `frontend/`：Vue 3 + TypeScript 前端应用
- `backend/`：ASP.NET 后端服务
- `docs/`：项目相关文档
- `README.md`：项目主文档

## 文档导航

### 📚 核心文档

- [平台范式](docs/platform-paradigm.md) - 元数据驱动范式的详细说明
- [技术栈](docs/tech-stack.md) - 项目使用的技术栈详细说明
- [系统架构](docs/architecture/system-architecture.md) - 系统架构设计和说明
- [功能模块](docs/modules.md) - 功能模块详细说明

### 🔧 开发文档

- [开发环境](docs/development/environment.md) - 环境要求和配置
- [开发规范](docs/development/coding-standards.md) - 代码规范和 Git 提交规范
- [分阶段开发计划](docs/development/phased-development.md) - 前端项目分阶段开发参考文档
- [RESTful API](docs/api/restful-api.md) - API 文档

### 🚀 部署文档

- [部署说明](docs/deployment.md) - 生产环境部署指南

---

**项目状态**：开发中 🚧

**最后更新**：2025年

**版权声明**：© 2025 保留所有权利
