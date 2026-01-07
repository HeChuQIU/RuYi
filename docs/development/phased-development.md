# 前端项目分阶段开发参考文档

## 文档说明

本文档描述了"如意"AI低代码平台前端项目的分阶段开发计划，供开发团队参考。每个阶段包含详细的任务清单、Mock数据设计、集成测试要求和文档更新要求。

## 开发原则

- **基于vue3-admin-better框架**：在 [vue3-admin-better](https://github.com/zxwk1998/vue3-admin-better) 基础上开发，复用其现有功能（登录、权限、布局等），不重复实现
- **先Mock后实现**：每个阶段先实现Mock数据，后端接口后续开发
- **阶段化测试**：每个阶段完成后进行手动集成测试，测试业务功能是否正常（不测试组件库本身）
- **文档同步更新**：开发过程中同步更新相关文档

## 技术栈

- **前端框架**：Vue 3 + TypeScript + Element Plus
- **构建工具**：Rspack（vue3-admin-better已配置）
- **API类型**：RESTful API
- **Mock方案**：使用vue3-admin-better的mock机制

## 阶段划分总览

```mermaid
graph LR
    Phase1[阶段1: 项目初始化<br/>用户管理] --> Phase2[阶段2: 模型管理]
    Phase2 --> Phase3[阶段3: 元数据配置]
    Phase3 --> Phase4[阶段4: 动态页面渲染]
    Phase4 --> Phase5[阶段5: 导入导出<br/>SQL编辑器]
    Phase5 --> Phase6[阶段6: AI功能集成]
```

---

## 阶段1：项目初始化和用户管理模块

### 阶段目标

搭建项目基础结构，实现用户登录、认证和基础RBAC功能。

### 任务清单

1. **项目初始化**
   - 从vue3-admin-better克隆/初始化项目到`frontend/`目录
   - 配置项目基础设置（API基础URL、环境变量等）
   - 配置TypeScript类型定义

2. **用户认证功能**
   - 实现用户登录页面和功能（复用框架登录，适配项目需求）
   - 实现JWT Token管理和自动刷新机制
   - 实现登出功能

3. **用户管理功能**
   - 实现用户信息管理页面（查看、编辑个人信息）
   - 实现用户列表页面（支持分页、搜索）

4. **角色管理功能**
   - 实现角色列表页面（CRUD操作）
   - 实现角色权限配置

5. **用户角色分配**
   - 实现用户角色分配功能
   - 实现角色权限查看

6. **路由权限控制**
   - 配置路由权限控制（基于RBAC）
   - 实现无权限访问拦截

### Mock数据设计

**认证相关**：
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出
- `POST /api/auth/refresh` - 刷新Token
- `GET /api/auth/me` - 获取当前用户信息

**用户管理**：
- `GET /api/users?page=1&pageSize=10` - 获取用户列表
- `GET /api/users/{id}` - 获取用户详情
- `PUT /api/users/{id}` - 更新用户信息
- `DELETE /api/users/{id}` - 删除用户

**角色管理**：
- `GET /api/roles` - 获取角色列表
- `POST /api/roles` - 创建角色
- `PUT /api/roles/{id}` - 更新角色
- `DELETE /api/roles/{id}` - 删除角色

**用户角色分配**：
- `GET /api/users/{id}/roles` - 获取用户角色
- `POST /api/users/{id}/roles` - 分配用户角色
- `DELETE /api/users/{id}/roles/{roleId}` - 移除用户角色

### 集成测试要求

- [ ] 测试用户登录流程（输入用户名密码，获取Token）
- [ ] 测试Token存储和自动刷新机制
- [ ] 测试用户信息查看和编辑功能
- [ ] 测试角色创建、编辑、删除功能
- [ ] 测试用户角色分配功能
- [ ] 测试路由权限控制（无权限用户访问受限页面应被拦截）

### 文档更新要求

- 更新 [README.md](../../README.md) 前端快速开始部分
- 更新 [docs/api/restful-api.md](../../api/restful-api.md) 用户管理API部分
- 更新 [docs/development/environment.md](environment.md) 前端环境配置

---

## 阶段2：模型管理模块

### 阶段目标

实现数据模型的创建、编辑、删除和字段管理功能。

### 任务清单

1. **模型列表管理**
   - 创建模型列表页面（支持分页、搜索、排序）
   - 实现模型状态显示（已创建表/未创建表）

2. **模型创建功能**
   - 实现模型创建表单（模型名称、描述、字段定义）
   - 实现模型名称唯一性验证
   - 实现模型创建预览

3. **模型编辑功能**
   - 实现模型基本信息编辑
   - 实现模型删除功能（带确认和关联检查）

4. **字段管理功能**
   - 实现字段列表展示
   - 实现字段添加功能（字段名称、类型、约束）
   - 实现字段编辑功能
   - 实现字段删除功能（带确认）

5. **字段类型支持**
   - 实现字段类型选择（文本、数字、日期、布尔等基础类型）
   - 实现字段类型参数配置（如文本长度、数字精度等）

6. **字段约束配置**
   - 实现字段约束配置（必填、长度、默认值等）
   - 实现字段唯一性配置

7. **模型关系配置**
   - 实现模型关系配置界面（一对一、一对多、多对多）
   - 实现外键字段选择

### Mock数据设计

**模型管理**：
- `GET /api/models?page=1&pageSize=10` - 获取模型列表
- `GET /api/models/{id}` - 获取模型详情
- `POST /api/models` - 创建模型
- `PUT /api/models/{id}` - 更新模型
- `DELETE /api/models/{id}` - 删除模型

**字段管理**：
- `GET /api/models/{id}/fields` - 获取模型字段列表
- `POST /api/models/{id}/fields` - 添加字段
- `PUT /api/models/{id}/fields/{fieldId}` - 更新字段
- `DELETE /api/models/{id}/fields/{fieldId}` - 删除字段

**模型关系**：
- `GET /api/models/{id}/relations` - 获取模型关系
- `POST /api/models/{id}/relations` - 创建模型关系
- `DELETE /api/models/{id}/relations/{relationId}` - 删除模型关系

### 集成测试要求

- [ ] 测试模型创建流程（输入模型信息，创建成功）
- [ ] 测试模型编辑功能（修改模型信息，保存成功）
- [ ] 测试模型删除功能（删除模型，确认提示）
- [ ] 测试字段添加功能（添加字段，配置类型和约束）
- [ ] 测试字段编辑和删除功能
- [ ] 测试字段类型和约束配置是否生效
- [ ] 测试模型关系配置功能

### 文档更新要求

- 更新 [docs/api/restful-api.md](../../api/restful-api.md) 模型管理API部分
- 更新 [docs/modules.md](../../modules.md) 模型管理模块说明
- 创建模型数据结构文档

---

## 阶段3：元数据配置模块

### 阶段目标

实现元数据配置功能，包括字段类型配置、验证规则、页面展示配置等。

### 任务清单

1. **元数据配置页面**
   - 创建元数据配置主页面（按模型分组）
   - 实现模型选择功能

2. **字段类型配置**
   - 实现字段类型配置界面（扩展类型、自定义类型）
   - 实现字段类型参数配置

3. **验证规则配置**
   - 实现验证规则配置界面
   - 支持必填、长度、格式、自定义规则配置
   - 实现验证规则预览

4. **列表页配置**
   - 实现列表页配置界面（显示字段、排序、分页设置）
   - 实现字段显示顺序调整
   - 实现列宽配置

5. **详情页配置**
   - 实现详情页配置界面（字段布局、分组、显示规则）
   - 实现字段分组功能
   - 实现字段布局方式选择（单列、两列、三列等）

6. **表单配置**
   - 实现表单配置界面（字段顺序、布局方式、条件显示）
   - 实现字段条件显示规则配置

7. **字段编辑规则配置**
   - 实现字段编辑规则配置（可编辑性、默认值、联动规则）
   - 实现字段联动规则配置界面

8. **字段级权限配置**
   - 实现字段级权限配置界面（角色-字段权限矩阵）
   - 实现权限继承机制

9. **元数据预览功能**
   - 实现元数据预览功能（实时预览配置效果）
   - 实现配置对比功能

### Mock数据设计

**元数据配置**：
- `GET /api/models/{id}/metadata` - 获取模型元数据配置
- `PUT /api/models/{id}/metadata` - 更新模型元数据配置
- `GET /api/metadata/field-types` - 获取字段类型列表
- `GET /api/metadata/validation-rules` - 获取验证规则列表

**字段配置**：
- `GET /api/models/{id}/fields/{fieldId}/metadata` - 获取字段元数据
- `PUT /api/models/{id}/fields/{fieldId}/metadata` - 更新字段元数据

**权限配置**：
- `GET /api/models/{id}/field-permissions` - 获取字段权限配置
- `PUT /api/models/{id}/field-permissions` - 更新字段权限配置

### 集成测试要求

- [ ] 测试元数据配置保存和加载功能
- [ ] 测试验证规则配置是否生效
- [ ] 测试列表页配置（字段显示、排序）是否正确应用
- [ ] 测试详情页配置（字段布局、分组）是否正确应用
- [ ] 测试表单配置（字段顺序、布局）是否正确应用
- [ ] 测试字段编辑规则（可编辑性、默认值、联动）是否生效
- [ ] 测试字段级权限配置功能

### 文档更新要求

- 更新 [docs/api/restful-api.md](../../api/restful-api.md) 元数据配置API部分
- 更新 [docs/modules.md](../../modules.md) 元数据配置模块说明
- 创建元数据配置数据结构文档

---

## 阶段4：动态页面渲染引擎

### 阶段目标

根据元数据配置动态渲染列表页、详情页和表单页。

### 任务清单

1. **动态组件渲染引擎**
   - 创建动态组件渲染引擎核心逻辑
   - 实现元数据解析和组件映射

2. **动态列表页组件**
   - 实现动态列表页组件（根据元数据配置渲染表格）
   - 实现字段显示控制（根据配置显示/隐藏字段）
   - 实现排序功能（根据配置的排序字段）
   - 实现分页功能

3. **动态详情页组件**
   - 实现动态详情页组件（根据元数据配置渲染详情）
   - 实现字段分组显示
   - 实现字段布局（单列、多列布局）

4. **动态表单组件**
   - 实现动态表单组件（根据元数据配置渲染表单）
   - 实现字段类型到Element Plus组件的映射
   - 实现表单验证（基于元数据验证规则）

5. **字段组件映射**
   - 实现字段类型到组件的映射表
   - 支持文本、数字、日期、布尔、选择等类型
   - 支持自定义组件映射

6. **数据验证**
   - 实现前端数据验证（基于元数据验证规则）
   - 实现验证错误提示

7. **字段联动逻辑**
   - 实现字段联动逻辑（字段之间的依赖关系）
   - 实现条件显示/隐藏
   - 实现字段值联动更新

8. **权限控制**
   - 实现字段级权限在页面上的应用
   - 实现只读字段显示
   - 实现隐藏字段处理

9. **数据CRUD操作**
   - 实现数据列表查询（与Mock API集成）
   - 实现数据详情查询
   - 实现数据创建功能
   - 实现数据更新功能
   - 实现数据删除功能

### Mock数据设计

**动态数据操作**：
- `GET /api/data/{modelName}?page=1&pageSize=10` - 获取数据列表
- `GET /api/data/{modelName}/{id}` - 获取数据详情
- `POST /api/data/{modelName}` - 创建数据
- `PUT /api/data/{modelName}/{id}` - 更新数据
- `DELETE /api/data/{modelName}/{id}` - 删除数据

**数据查询**：
- `GET /api/data/{modelName}/search?q=keyword` - 搜索数据
- `GET /api/data/{modelName}/filter?field=value` - 过滤数据

### 集成测试要求

- [ ] 测试动态列表页渲染（字段显示、排序、分页是否按配置工作）
- [ ] 测试动态详情页渲染（字段布局、分组是否按配置工作）
- [ ] 测试动态表单渲染（字段类型、验证、联动是否按配置工作）
- [ ] 测试数据创建流程（填写表单，提交成功）
- [ ] 测试数据更新流程（编辑数据，保存成功）
- [ ] 测试数据删除流程（删除数据，确认提示）
- [ ] 测试字段级权限在页面上的表现（无权限字段应隐藏或只读）

### 文档更新要求

- 更新 [docs/architecture/system-architecture.md](../../architecture/system-architecture.md) 动态渲染机制说明
- 创建动态组件使用文档
- 更新 [docs/api/restful-api.md](../../api/restful-api.md) 数据操作API部分

---

## 阶段5：数据导入导出和SQL编辑器模块

### 阶段目标

实现数据导入导出功能和SQL代码编辑器。

### 任务清单

1. **数据导出功能**
   - 实现数据导出功能（Excel、CSV、JSON格式）
   - 实现导出字段选择
   - 实现导出数据筛选和排序
   - 实现导出进度提示

2. **数据导入功能**
   - 实现数据导入功能（Excel、CSV、JSON格式）
   - 实现导入数据验证和错误提示
   - 实现批量导入功能
   - 实现导入结果展示

3. **导入模板功能**
   - 实现导入模板下载功能
   - 实现模板字段说明

4. **SQL代码编辑器**
   - 创建SQL代码编辑器页面
   - 实现代码编辑功能（语法高亮、代码补全）
   - 实现代码格式化功能
   - 实现代码历史记录

5. **SQL代码执行**
   - 实现SQL代码执行功能（与Mock API集成）
   - 实现执行结果展示（表格、JSON等格式）
   - 实现执行错误提示
   - 实现执行时间统计

6. **SQL代码管理**
   - 实现SQL代码保存功能
   - 实现SQL代码列表管理
   - 实现SQL代码分类功能
   - 实现SQL代码版本管理

7. **SQL执行历史**
   - 实现SQL执行历史记录
   - 实现历史记录查看和重执行

### Mock数据设计

**数据导入导出**：
- `GET /api/data/{modelName}/export?format=excel&fields=field1,field2` - 导出数据
- `POST /api/data/{modelName}/import` - 导入数据
- `GET /api/data/{modelName}/import-template` - 下载导入模板

**SQL编辑器**：
- `POST /api/sql/execute` - 执行SQL代码
- `GET /api/sql/codes?page=1&pageSize=10` - 获取SQL代码列表
- `GET /api/sql/codes/{id}` - 获取SQL代码详情
- `POST /api/sql/codes` - 保存SQL代码
- `PUT /api/sql/codes/{id}` - 更新SQL代码
- `DELETE /api/sql/codes/{id}` - 删除SQL代码
- `GET /api/sql/history?page=1&pageSize=10` - 获取执行历史

### 集成测试要求

- [ ] 测试数据导出功能（不同格式：Excel、CSV、JSON）
- [ ] 测试数据导入功能（上传文件，验证数据，导入成功）
- [ ] 测试导入数据验证和错误提示
- [ ] 测试SQL编辑器基本功能（代码编辑、语法高亮）
- [ ] 测试SQL代码执行功能（执行SQL，查看结果）
- [ ] 测试SQL代码保存和管理功能
- [ ] 测试SQL执行历史记录功能

### 文档更新要求

- 更新 [docs/api/restful-api.md](../../api/restful-api.md) 导入导出和SQL API部分
- 更新 [docs/modules.md](../../modules.md) 相关模块说明
- 创建数据导入导出使用指南

---

## 阶段6：AI功能模块集成

### 阶段目标

集成AI功能，实现智能模型生成、元数据配置生成和SQL代码生成。

### 任务清单

1. **AI助手组件**
   - 创建AI助手组件（对话界面）
   - 实现对话历史记录
   - 实现消息发送和接收

2. **智能模型生成功能**
   - 实现智能模型生成功能（自然语言描述生成模型定义）
   - 实现模型生成结果展示
   - 实现模型生成结果的确认和编辑流程

3. **元数据配置生成功能**
   - 实现元数据配置生成功能（AI辅助生成配置建议）
   - 实现配置建议展示
   - 实现配置建议的应用和编辑

4. **SQL代码生成功能**
   - 实现SQL代码生成功能（自然语言描述生成SQL）
   - 实现SQL生成结果展示
   - 实现SQL生成结果的确认和编辑流程

5. **SQL代码审查功能**
   - 实现SQL代码审查功能（AI代码质量检查）
   - 实现审查结果展示（问题、建议）
   - 实现代码优化建议

6. **OpenAI API集成**
   - 实现前端调用后端AI服务接口
   - 实现请求参数封装
   - 实现响应结果解析

7. **AI生成结果处理**
   - 实现AI生成结果的确认流程
   - 实现AI生成结果的编辑功能
   - 实现生成结果的保存功能

8. **AI使用历史**
   - 实现AI使用历史记录
   - 实现历史记录查看和重试

### Mock数据设计

**AI功能**：
- `POST /api/ai/generate-model` - AI生成模型定义
- `POST /api/ai/generate-metadata` - AI生成元数据配置
- `POST /api/ai/generate-sql` - AI生成SQL代码
- `POST /api/ai/review-sql` - AI审查SQL代码
- `GET /api/ai/history?page=1&pageSize=10` - 获取AI使用历史

### 集成测试要求

- [ ] 测试AI模型生成功能（输入自然语言描述，生成模型定义）
- [ ] 测试AI元数据配置生成（生成配置建议）
- [ ] 测试AI SQL代码生成（生成SQL代码）
- [ ] 测试AI SQL代码审查（代码质量检查）
- [ ] 测试AI生成结果的编辑和确认流程
- [ ] 测试AI使用历史记录功能

### 文档更新要求

- 更新 [docs/api/restful-api.md](../../api/restful-api.md) AI功能API部分
- 更新 [docs/modules.md](../../modules.md) AI功能模块说明
- 创建AI功能使用指南

---

## Mock数据管理规范

### Mock数据存储位置

使用vue3-admin-better的mock机制，在`frontend/src/mock/`目录下组织Mock数据。

**目录结构**：
```
frontend/src/mock/
├── index.ts           # Mock入口文件
├── auth.ts           # 认证相关Mock
├── users.ts          # 用户管理Mock
├── models.ts         # 模型管理Mock
├── metadata.ts       # 元数据配置Mock
├── data.ts           # 数据操作Mock
├── sql.ts            # SQL编辑器Mock
└── ai.ts             # AI功能Mock
```

### Mock数据规范

1. **响应格式**：遵循RESTful API响应格式（参考 [docs/api/restful-api.md](../../api/restful-api.md)）
   ```typescript
   {
     code: 200,
     message: "success",
     data: { ... }
   }
   ```

2. **数据完整性**：包含完整的响应结构（code, message, data）

3. **业务场景**：模拟真实业务场景的数据，包含正常和异常情况

4. **错误场景**：包含错误场景的Mock数据（401、403、404、500等）

5. **分页数据**：列表接口支持分页参数，返回分页数据结构

### Mock切换机制

- **开发环境**：使用Mock数据
- **环境变量控制**：通过环境变量控制Mock开关
- **逐步替换**：后端接口就绪后，逐步替换Mock为真实API调用

---

## 集成测试规范

### 测试原则

- **业务功能测试**：测试业务功能是否正常工作（如：模型创建是否成功）
- **不测试组件库**：不测试组件库本身的功能（如：Element Plus按钮是否正常）
- **数据流测试**：测试数据流是否完整（前端→Mock API→响应处理→UI更新）

### 测试检查清单（每个阶段）

每个阶段完成后，应检查以下项目：

- [ ] **功能完整性**：功能是否按预期工作
- [ ] **错误处理**：错误处理是否正常（网络错误、业务错误等）
- [ ] **数据验证**：数据验证是否生效（必填、格式验证等）
- [ ] **权限控制**：权限控制是否生效（路由权限、字段权限等）
- [ ] **UI交互**：UI交互是否流畅（加载状态、错误提示等）
- [ ] **数据持久化**：数据是否正确保存和加载

### 测试方法

1. **手动测试**：在浏览器中手动操作，验证功能
2. **数据验证**：检查Mock数据是否正确返回
3. **错误场景**：测试各种错误场景（网络错误、权限错误等）
4. **边界测试**：测试边界情况（空数据、大量数据等）

---

## 文档维护规范

### 开发过程中文档更新要求

1. **API文档**：每实现一个API调用，立即更新 [docs/api/restful-api.md](../../api/restful-api.md)
2. **模块文档**：每完成一个模块，更新 [docs/modules.md](../../modules.md) 对应部分
3. **架构文档**：如有架构调整，更新 [docs/architecture/system-architecture.md](../../architecture/system-architecture.md)
4. **README**：如有项目结构变化，更新 [README.md](../../README.md)

### 文档格式要求

- **Mermaid图表**：所有Markdown文档中的图表必须使用Mermaid语法（参考项目全局规则）
- **代码示例**：使用正确的代码块格式
- **API文档**：包含请求示例和响应示例
- **结构清晰**：使用适当的标题层级，保持文档结构清晰

---

## 项目结构（预期）

```
frontend/
├── src/
│   ├── api/              # API调用封装
│   │   ├── auth.ts       # 认证相关API
│   │   ├── users.ts      # 用户管理API
│   │   ├── models.ts     # 模型管理API
│   │   ├── metadata.ts   # 元数据API
│   │   ├── data.ts       # 数据操作API
│   │   ├── sql.ts        # SQL编辑器API
│   │   └── ai.ts         # AI功能API
│   ├── views/            # 页面视图
│   │   ├── user/         # 用户管理页面
│   │   ├── model/        # 模型管理页面
│   │   ├── metadata/     # 元数据配置页面
│   │   ├── data/         # 数据管理页面（动态）
│   │   ├── sql/          # SQL编辑器页面
│   │   └── ai/           # AI功能页面
│   ├── components/       # 组件
│   │   ├── dynamic/      # 动态渲染组件
│   │   │   ├── DynamicList.vue      # 动态列表组件
│   │   │   ├── DynamicDetail.vue    # 动态详情组件
│   │   │   └── DynamicForm.vue      # 动态表单组件
│   │   ├── metadata/     # 元数据配置组件
│   │   └── ai/           # AI相关组件
│   ├── mock/             # Mock数据
│   │   ├── index.ts
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── models.ts
│   │   ├── metadata.ts
│   │   ├── data.ts
│   │   ├── sql.ts
│   │   └── ai.ts
│   ├── types/            # TypeScript类型定义
│   │   ├── model.ts      # 模型类型
│   │   ├── metadata.ts  # 元数据类型
│   │   ├── api.ts        # API响应类型
│   │   └── user.ts       # 用户类型
│   └── utils/            # 工具函数
│       ├── metadata.ts   # 元数据处理工具
│       └── validation.ts # 验证工具
```

---

## 开发注意事项

### 代码规范

- 遵循 [docs/development/coding-standards.md](coding-standards.md) 中的规范
- 使用TypeScript类型系统，定义清晰的接口类型
- 提取可复用组件，避免重复代码

### Git提交规范

使用约定式提交规范：
- `feat:` 新功能
- `fix:` 修复bug
- `docs:` 文档更新
- `refactor:` 代码重构

### 复用框架功能

充分利用vue3-admin-better的现有功能：
- 布局系统
- 权限控制
- 路由管理
- 请求封装
- 工具函数

不重复实现框架已有的功能。

---

## 后续工作

后端开发时，参考前端Mock数据和API调用，实现对应的后端接口。前端Mock数据将作为后端开发的参考规范。

---

**文档版本**：v1.0  
**最后更新**：2025年  
**维护者**：开发团队

