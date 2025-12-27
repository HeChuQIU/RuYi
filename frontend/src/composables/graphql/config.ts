/**
 * GraphQL 配置
 */

/**
 * 获取 GraphQL 端点
 */
export function getGraphQLEndpoint(): string {
  return import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:5000/graphql'
}

/**
 * 是否使用 Mock 接口
 */
export function useMock(): boolean {
  return import.meta.env.VITE_USE_MOCK === 'true'
}

/**
 * 获取 Mock 响应延迟（毫秒）
 */
export function getMockDelay(): number {
  const delay = import.meta.env.VITE_MOCK_DELAY
  return delay ? Number.parseInt(delay, 10) : 300
}

/**
 * 获取认证 Token
 */
export function getAuthToken(): string | null {
  // TODO: 从 localStorage 或 store 获取 token
  return localStorage.getItem('auth_token')
}

/**
 * 设置认证 Token
 */
export function setAuthToken(token: string): void {
  localStorage.setItem('auth_token', token)
}

/**
 * 清除认证 Token
 */
export function clearAuthToken(): void {
  localStorage.removeItem('auth_token')
}

