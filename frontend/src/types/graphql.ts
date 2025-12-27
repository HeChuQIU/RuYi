/**
 * GraphQL 相关类型定义
 */

import type { ApiResponse, ApiError } from './common'

/**
 * GraphQL 变量
 */
export type GraphQLVariables = Record<string, unknown>

/**
 * GraphQL 查询响应
 */
export interface GraphQLResponse<T = unknown> {
  data?: T
  errors?: GraphQLError[]
  extensions?: Record<string, unknown>
}

/**
 * GraphQL 错误
 */
export interface GraphQLError extends ApiError {
  path?: (string | number)[]
  locations?: Array<{
    line: number
    column: number
  }>
}

/**
 * GraphQL 查询选项
 */
export interface QueryOptions {
  variables?: GraphQLVariables
  fetchPolicy?: 'cache-first' | 'cache-and-network' | 'network-only' | 'cache-only' | 'no-cache'
  errorPolicy?: 'none' | 'ignore' | 'all'
  notifyOnNetworkStatusChange?: boolean
}

/**
 * GraphQL 变更选项
 */
export interface MutationOptions {
  variables?: GraphQLVariables
  optimisticResponse?: unknown
  errorPolicy?: 'none' | 'ignore' | 'all'
  refetchQueries?: string[]
  awaitRefetchQueries?: boolean
}

/**
 * GraphQL 订阅选项
 */
export interface SubscriptionOptions {
  variables?: GraphQLVariables
  fetchPolicy?: 'cache-first' | 'cache-and-network' | 'network-only' | 'cache-only' | 'no-cache'
}

/**
 * Apollo Client 错误
 */
export interface ApolloError extends Error {
  graphQLErrors?: GraphQLError[]
  networkError?: Error
  extraInfo?: unknown
}

/**
 * 查询结果状态
 */
export interface QueryResult<T = unknown> {
  data: T | undefined
  loading: boolean
  error: ApolloError | null
  networkStatus?: number
  refetch: (variables?: GraphQLVariables) => Promise<unknown>
  fetchMore: (options: { variables?: GraphQLVariables }) => Promise<unknown>
}

/**
 * 变更结果状态
 */
export interface MutationResult<T = unknown> {
  data: T | undefined
  loading: boolean
  error: ApolloError | null
  called: boolean
  reset: () => void
}

