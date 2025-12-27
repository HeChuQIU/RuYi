/**
 * 路由守卫
 */

import type { Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import type { RouteMeta } from './types'

/**
 * 认证守卫
 */
export function createAuthGuard(router: Router) {
  router.beforeEach(
    (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      const meta = to.meta as RouteMeta | undefined
      const requiresAuth = meta?.requiresAuth ?? false

      if (requiresAuth) {
        // TODO: 检查用户是否已登录
        // const isAuthenticated = checkAuth()
        // if (!isAuthenticated) {
        //   next({ name: 'login', query: { redirect: to.fullPath } })
        //   return
        // }
      }

      next()
    }
  )
}

/**
 * 权限守卫
 */
export function createPermissionGuard(router: Router) {
  router.beforeEach(
    (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      const meta = to.meta as RouteMeta | undefined
      const roles = meta?.roles
      const permissions = meta?.permissions

      if (roles || permissions) {
        // TODO: 检查用户角色和权限
        // const userRoles = getCurrentUserRoles()
        // const userPermissions = getCurrentUserPermissions()
        //
        // if (roles && !roles.some(role => userRoles.includes(role))) {
        //   next({ name: 'forbidden' })
        //   return
        // }
        //
        // if (permissions && !permissions.some(perm => userPermissions.includes(perm))) {
        //   next({ name: 'forbidden' })
        //   return
        // }
      }

      next()
    }
  )
}

/**
 * 页面标题守卫
 */
export function createTitleGuard(router: Router) {
  router.afterEach((to: RouteLocationNormalized) => {
    const meta = to.meta as RouteMeta | undefined
    const title = meta?.title || '如意 AI 低代码平台'
    document.title = title
  })
}

