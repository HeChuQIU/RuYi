/**
 * Apollo Client 配置
 */

import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { getGraphQLEndpoint, getAuthToken } from './config'
import type { ApolloClientOptions, NormalizedCacheObject } from '@apollo/client/core'

/**
 * 创建 HTTP 链接
 */
function createHttpLinkInstance() {
  return createHttpLink({
    uri: getGraphQLEndpoint(),
  })
}

/**
 * 创建认证链接
 */
function createAuthLink() {
  return setContext((_, { headers }) => {
    const token = getAuthToken()
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })
}

/**
 * 创建错误处理链接
 */
function createErrorLink() {
  return onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      })
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`)
      // 处理网络错误，如 401 未授权
      if ('statusCode' in networkError && networkError.statusCode === 401) {
        // TODO: 清除 token 并跳转到登录页
        // clearAuthToken()
        // router.push('/login')
      }
    }
  })
}

/**
 * 创建 Apollo Client 实例
 */
export function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  const httpLink = createHttpLinkInstance()
  const authLink = createAuthLink()
  const errorLink = createErrorLink()

  const link = from([errorLink, authLink, httpLink])

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // 可以在这里配置字段策略
        },
      },
    },
  })

  return new ApolloClient<NormalizedCacheObject>({
    link,
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  })
}

