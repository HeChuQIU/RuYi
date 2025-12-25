# 部署说明

## 生产环境部署

### 后端部署

#### 1. 构建项目

```bash
cd backend
dotnet publish -c Release -o ./publish
```

#### 2. 配置环境变量

在 `appsettings.Production.json` 或环境变量中配置：

- 数据库连接字符串
- OpenAI API密钥
- 其他配置项

#### 3. 运行服务

```bash
cd publish
dotnet RuYi.Backend.dll
```

#### 4. 使用进程管理器（推荐）

使用 PM2 或 systemd 管理进程：

```bash
# 使用 PM2
pm2 start dotnet --name "ruyi-backend" -- RuYi.Backend.dll

# 或使用 systemd（Linux）
sudo systemctl start ruyi-backend
```

### 前端部署

#### 1. 构建项目

```bash
cd frontend
npm install
npm run build
```

#### 2. 部署静态文件

将 `dist/` 目录部署到静态文件服务器：

- **Nginx**：配置反向代理和静态文件服务
- **IIS**：配置网站指向 `dist/` 目录
- **CDN**：上传到 CDN 服务

#### 3. Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /path/to/frontend/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /graphql {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Docker部署

### 1. 构建镜像

```bash
# 构建后端镜像
docker build -t ruyi-backend ./backend

# 构建前端镜像
docker build -t ruyi-frontend ./frontend
```

### 2. 使用 Docker Compose

创建 `docker-compose.yml`：

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: ruyi
      POSTGRES_USER: ruyi
      POSTGRES_PASSWORD: your_password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - ConnectionStrings__DefaultConnection=Host=postgres;Database=ruyi;Username=ruyi;Password=your_password
      - OpenAI__ApiKey=your_openai_key
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

### 3. 启动服务

```bash
# 构建镜像
docker-compose build

# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f
```

## 环境变量配置

### 后端环境变量

```bash
ASPNETCORE_ENVIRONMENT=Production
ConnectionStrings__DefaultConnection=Host=localhost;Database=ruyi;Username=ruyi;Password=your_password
OpenAI__ApiKey=your_openai_api_key
```

### 前端环境变量

```bash
VITE_API_URL=https://api.your-domain.com/graphql
```

## 健康检查

部署后，可以通过以下端点检查服务状态：

- 后端健康检查：`http://your-domain:5000/health`
- GraphQL Playground：`http://your-domain:5000/graphql`

