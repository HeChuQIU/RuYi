/**
 * 路由定义
 */

import type { AppRouteRecordRaw } from './types'

/**
 * 基础路由
 */
export const constantRoutes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页',
      requiresAuth: false,
    },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: '页面未找到',
      hidden: true,
    },
  },
]

/**
 * 异步路由（需要权限控制的路由）
 */
export const asyncRoutes: AppRouteRecordRaw[] = [
  // 后续添加业务路由
]

/**
 * 测试路由
 */
export const testRoutes: AppRouteRecordRaw[] = [
  {
    path: '/component-test',
    name: 'ComponentTest',
    component: () => import('@/views/ComponentTest.vue'),
    meta: {
      title: '组件测试',
      requiresAuth: false,
    },
  },
]
