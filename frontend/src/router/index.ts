/**
 * 路由主配置
 */

import { createRouter, createWebHistory } from 'vue-router'
import type { Router } from 'vue-router'
import { constantRoutes } from './routes'
import { createAuthGuard, createPermissionGuard, createTitleGuard } from './guards'

/**
 * 创建路由实例
 */
export function createAppRouter(): Router {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: constantRoutes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { top: 0 }
      }
    },
  })

  // 注册路由守卫
  createAuthGuard(router)
  createPermissionGuard(router)
  createTitleGuard(router)

  return router
}

export default createAppRouter()

