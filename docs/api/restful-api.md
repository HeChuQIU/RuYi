# RESTful API 文档

## API 基础信息

### 基础URL

- **开发环境**：`http://localhost:5000/api`
- **生产环境**：`<your-domain>/api`

### 认证方式

API 使用 JWT (JSON Web Token) 进行身份认证。

**请求头格式**：
```
Authorization: Bearer <token>
```

## API 端点规范

### 端点命名规范

- 使用小写字母和连字符（kebab-case）
- 使用复数形式表示资源集合
- 使用嵌套路径表示资源关系

**示例**：
- `/api/users` - 用户列表
- `/api/users/{id}` - 特定用户
- `/api/users/{id}/roles` - 用户的角色列表

### HTTP 方法使用

| 方法 | 用途 | 说明 |
|------|------|------|
| GET | 查询 | 获取资源或资源列表 |
| POST | 创建 | 创建新资源 |
| PUT | 更新 | 完整更新资源（替换所有字段） |
| PATCH | 部分更新 | 部分更新资源（仅更新提供的字段） |
| DELETE | 删除 | 删除资源 |

## 请求格式

### 请求头

```
Content-Type: application/json
Authorization: Bearer <token>
```

### 请求体示例

```json
{
  "name": "项目名称",
  "description": "项目描述"
}
```

### 查询参数

**分页参数**：
- `page`: 页码（从1开始）
- `pageSize`: 每页数量
- `sort`: 排序字段
- `order`: 排序方向（asc/desc）

**过滤参数**：
- `filter`: 过滤条件（JSON格式）

**示例**：
```
GET /api/projects?page=1&pageSize=10&sort=createdAt&order=desc
```

## 响应格式

### 成功响应

**单个资源**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "123",
    "name": "项目名称",
    "description": "项目描述",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

**资源列表**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "items": [
      {
        "id": "123",
        "name": "项目名称"
      }
    ],
    "total": 100,
    "page": 1,
    "pageSize": 10
  }
}
```

### 错误响应

```json
{
  "code": 400,
  "message": "错误描述",
  "errors": [
    {
      "field": "name",
      "message": "名称不能为空"
    }
  ]
}
```

### HTTP 状态码

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 201 | 创建成功 |
| 400 | 请求参数错误 |
| 401 | 未授权（需要登录） |
| 403 | 无权限 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

## API 端点示例

### 用户管理

**获取用户列表**：
```
GET /api/users?page=1&pageSize=10
```

**获取单个用户**：
```
GET /api/users/{id}
```

**创建用户**：
```
POST /api/users
Content-Type: application/json

{
  "name": "用户名",
  "email": "user@example.com"
}
```

**更新用户**：
```
PUT /api/users/{id}
Content-Type: application/json

{
  "name": "新用户名",
  "email": "newemail@example.com"
}
```

**删除用户**：
```
DELETE /api/users/{id}
```

### 模型管理

**获取模型列表**：
```
GET /api/models
```

**创建模型**：
```
POST /api/models
Content-Type: application/json

{
  "name": "模型名称",
  "fields": [
    {
      "name": "field1",
      "type": "string",
      "required": true
    }
  ]
}
```

## Axios 封装规范

基于 vue-admin-better 的 Axios 封装，提供统一的请求拦截、响应处理和错误处理。

### 请求拦截

- 自动添加 JWT Token
- 统一设置请求头
- 请求参数序列化

### 响应拦截

- 统一处理响应数据
- 自动处理错误响应
- Token 过期自动跳转登录

### 错误处理

- 网络错误处理
- 业务错误处理
- 统一错误提示

> 📖 详细的 API 端点定义将在后续开发中补充

