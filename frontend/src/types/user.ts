/**
 * 用户和权限相关类型定义
 */

/**
 * 用户角色
 */
export type UserRole = 'admin' | 'user' | 'guest'

/**
 * 权限
 */
export interface Permission {
  id: string
  name: string
  code: string
  description?: string
}

/**
 * 角色
 */
export interface Role {
  id: string
  name: string
  code: string
  description?: string
  permissions: Permission[]
}

/**
 * 用户信息
 */
export interface User {
  id: string
  username: string
  email: string
  role: UserRole
  roles?: Role[]
  permissions?: Permission[]
  createdAt: string
  updatedAt?: string
}

/**
 * 登录凭证
 */
export interface LoginCredentials {
  username: string
  password: string
}

/**
 * 登录响应
 */
export interface LoginResponse {
  user: User
  token: string
  refreshToken?: string
}

/**
 * 认证状态
 */
export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

