/**
 * 接口适配器（切换真实/假接口）
 */

import { createApolloClient } from './apollo'
import { createMockApolloClient } from './mock'
import { useMock } from './config'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

/**
 * 创建或获取 Apollo Client 实例
 */
export function getApolloClient(): ApolloClient<NormalizedCacheObject> {
  if (apolloClient) {
    return apolloClient
  }

  const useMockMode = useMock()

  if (useMockMode) {
    apolloClient = createMockApolloClient()
    console.log('[Apollo] Using Mock mode')
  } else {
    apolloClient = createApolloClient()
    console.log('[Apollo] Using Real API mode')
  }

  return apolloClient
}

/**
 * 重置 Apollo Client（用于切换模式）
 */
export function resetApolloClient(): void {
  apolloClient = null
}

