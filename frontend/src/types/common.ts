/**
 * 通用类型定义
 */

/**
 * 分页参数
 */
export interface PaginationParams {
  page: number
  pageSize: number
}

/**
 * 分页响应
 */
export interface PaginationResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}

/**
 * API 响应基础结构
 */
export interface ApiResponse<T = unknown> {
  data?: T
  errors?: ApiError[]
  message?: string
}

/**
 * API 错误
 */
export interface ApiError {
  message: string
  code?: string
  field?: string
  extensions?: Record<string, unknown>
}

/**
 * 排序方向
 */
export type SortOrder = 'asc' | 'desc'

/**
 * 排序参数
 */
export interface SortParams {
  field: string
  order: SortOrder
}

/**
 * 筛选参数
 */
export interface FilterParams {
  [key: string]: unknown
}

/**
 * 查询参数（包含分页、排序、筛选）
 */
export interface QueryParams extends PaginationParams {
  sort?: SortParams
  filter?: FilterParams
  search?: string
}

