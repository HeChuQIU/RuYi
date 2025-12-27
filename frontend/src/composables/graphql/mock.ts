/**
 * Mock 适配器
 */

import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { getMockDelay } from './config'
import type { ApolloClientOptions, NormalizedCacheObject } from '@apollo/client/core'
import type { MockedResponse } from '@apollo/client/testing'

/**
 * Mock 链接（简化版，实际使用需要根据项目需求实现）
 */
class MockLink {
  private delay: number
  private mocks: Map<string, MockedResponse>

  constructor(delay: number) {
    this.delay = delay
    this.mocks = new Map()
  }

  addMock(operationName: string, mock: MockedResponse) {
    this.mocks.set(operationName, mock)
  }

  async request(operation: { operationName: string; variables?: Record<string, unknown> }) {
    const mock = this.mocks.get(operation.operationName)
    if (mock) {
      await new Promise((resolve) => setTimeout(resolve, this.delay))
      return mock.result
    }
    throw new Error(`No mock found for operation: ${operation.operationName}`)
  }
}

/**
 * 创建 Mock Apollo Client
 */
export function createMockApolloClient(): ApolloClient<NormalizedCacheObject> {
  const delay = getMockDelay()
  const mockLink = new MockLink(delay)

  // TODO: 注册 Mock handlers
  // registerMockHandlers(mockLink)

  const cache = new InMemoryCache()

  return new ApolloClient<NormalizedCacheObject>({
    link: mockLink as unknown as ApolloClientOptions<NormalizedCacheObject>['link'],
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  })
}

