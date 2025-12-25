# GraphQL API 文档

## GraphQL端点

- **开发环境**：`http://localhost:5000/graphql`
- **生产环境**：`<your-domain>/graphql`

## 主要查询和变更

### 查询示例

```graphql
query GetProjects {
  projects {
    id
    name
    description
    createdAt
  }
}
```

### 变更示例

```graphql
mutation CreateProject($input: ProjectInput!) {
  createProject(input: $input) {
    id
    name
  }
}
```

## Schema定义

> 📖 详细的 Schema 定义将在后续开发中补充

## 类型定义

> 📖 详细的类型定义将在后续开发中补充

## 查询操作

> 📖 详细的查询操作将在后续开发中补充

## 变更操作

> 📖 详细的变更操作将在后续开发中补充

## 订阅操作

> 📖 详细的订阅操作将在后续开发中补充

