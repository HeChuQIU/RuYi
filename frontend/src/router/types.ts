/**
 * 路由类型定义
 */

import type { RouteRecordRaw } from 'vue-router'
import type { UserRole } from '@/types/user'

/**
 * 路由元信息
 */
export interface RouteMeta {
  title?: string
  requiresAuth?: boolean
  roles?: UserRole[]
  permissions?: string[]
  keepAlive?: boolean
  icon?: string
  hidden?: boolean
  breadcrumb?: boolean
}

/**
 * 扩展的路由记录
 */
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
  meta?: RouteMeta
  children?: AppRouteRecordRaw[]
}

