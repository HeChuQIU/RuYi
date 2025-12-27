<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { NavigationMenuItem, BreadcrumbItem } from '@nuxt/ui'

/**
 * MainLayout 组件 Props
 */
interface Props {
  /**
   * 侧边栏菜单项
   */
  menuItems?: NavigationMenuItem[][]
  /**
   * 面包屑项（如果不提供，将根据路由自动生成）
   */
  breadcrumbItems?: BreadcrumbItem[]
  /**
   * 用户信息
   */
  user?: {
    name: string
    avatar?: string
    email?: string
  }
  /**
   * 是否显示侧边栏
   */
  showSidebar?: boolean
  /**
   * 是否显示顶部导航栏
   */
  showNavbar?: boolean
  /**
   * 是否显示面包屑
   */
  showBreadcrumb?: boolean
  /**
   * 是否显示页脚
   */
  showFooter?: boolean
  /**
   * 页面标题
   */
  title?: string
  /**
   * 页面图标
   */
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  menuItems: () => [
    [
      {
        label: '首页',
        icon: 'i-lucide-home',
        to: '/',
      },
      {
        label: '组件测试',
        icon: 'i-lucide-test-tube',
        to: '/component-test',
      },
    ],
  ],
  breadcrumbItems: undefined,
  user: undefined,
  showSidebar: true,
  showNavbar: true,
  showBreadcrumb: true,
  showFooter: true,
  title: undefined,
  icon: undefined,
})

const route = useRoute()

// 根据路由自动生成面包屑
const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  if (props.breadcrumbItems) {
    return props.breadcrumbItems
  }

  const items: BreadcrumbItem[] = [
    {
      label: '首页',
      icon: 'i-lucide-home',
      to: '/',
    },
  ]

  const pathSegments = route.path.split('/').filter(Boolean)
  let currentPath = ''

  for (const segment of pathSegments) {
    currentPath += `/${segment}`
    items.push({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      to: currentPath,
    })
  }

  return items
})

// 页面标题
const pageTitle = computed(() => {
  return props.title || (route.meta.title as string) || '如意 AI 低代码平台'
})

// 页面图标
const pageIcon = computed(() => {
  return props.icon || (route.meta.icon as string) || 'i-lucide-layout-dashboard'
})
</script>

<template>
  <UDashboardGroup>
    <!-- 侧边栏 -->
    <UDashboardSidebar
      v-if="showSidebar"
      collapsible
      resizable
      :ui="{ footer: 'border-t border-default' }"
    >
      <template #header="{ collapsed }">
        <div v-if="!collapsed" class="flex items-center gap-2">
          <UIcon name="i-lucide-sparkles" class="size-6 text-primary" />
          <span class="font-semibold text-highlighted">如意 AI</span>
        </div>
        <UIcon v-else name="i-lucide-sparkles" class="size-6 text-primary mx-auto" />
      </template>

      <template #default="{ collapsed }">
        <UNavigationMenu
          :collapsed="collapsed"
          :items="menuItems[0]"
          orientation="vertical"
        />

        <UNavigationMenu
          v-if="menuItems.length > 1"
          :collapsed="collapsed"
          :items="menuItems[1]"
          orientation="vertical"
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UButton
          v-if="user"
          :avatar="user.avatar ? { src: user.avatar } : undefined"
          :label="collapsed ? undefined : user.name"
          color="neutral"
          variant="ghost"
          class="w-full"
          :block="collapsed"
        />
      </template>
    </UDashboardSidebar>

    <!-- 主内容区 -->
    <UDashboardPanel class="flex flex-col">
      <!-- 顶部导航栏 -->
      <template #header>
        <UDashboardNavbar v-if="showNavbar" :title="pageTitle" :icon="pageIcon">
          <template #right>
            <slot name="navbar-right" />
          </template>
        </UDashboardNavbar>
      </template>

      <!-- 面包屑 -->
      <div v-if="showBreadcrumb" class="border-b border-default px-4 sm:px-6 py-2">
        <UBreadcrumb :items="breadcrumbItems" />
      </div>

      <!-- 页面内容 -->
      <div class="flex-1 overflow-y-auto">
        <slot />
      </div>

      <!-- 页脚 -->
      <UFooter v-if="showFooter" class="border-t border-default">
        <template #default>
          <div class="flex items-center justify-between w-full">
            <p class="text-sm text-muted">
              © 2024 如意 AI 低代码平台. All rights reserved.
            </p>
            <div class="flex items-center gap-4">
              <slot name="footer-right" />
            </div>
          </div>
        </template>
      </UFooter>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
