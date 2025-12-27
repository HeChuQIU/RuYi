<script setup lang="ts">
import { computed } from 'vue'

/**
 * Loading 组件 Props
 */
interface Props {
  /**
   * 是否显示加载状态
   */
  loading?: boolean
  /**
   * 加载模式：fullscreen（全屏）或 inline（内联）
   */
  mode?: 'fullscreen' | 'inline'
  /**
   * 加载文本
   */
  text?: string
  /**
   * 加载图标
   */
  icon?: string
  /**
   * 是否显示进度条（用于有进度的加载）
   */
  showProgress?: boolean
  /**
   * 进度值（0-100）
   */
  progress?: number
}

const props = withDefaults(defineProps<Props>(), {
  loading: true,
  mode: 'inline',
  text: '加载中...',
  icon: 'i-lucide-loader-2',
  showProgress: false,
  progress: undefined,
})

const progressValue = computed(() => {
  if (props.progress !== undefined) {
    return Math.max(0, Math.min(100, props.progress))
  }
  return null
})
</script>

<template>
  <div v-if="loading" :class="mode === 'fullscreen' ? 'fixed inset-0 z-50 flex items-center justify-center bg-elevated/75 backdrop-blur-sm' : 'flex items-center justify-center p-4'">
    <div class="flex flex-col items-center gap-4">
      <!-- 加载图标或进度条 -->
      <div v-if="!showProgress" class="relative">
        <UIcon :name="icon" class="size-8 animate-spin text-primary" />
      </div>
      <UProgress
        v-else
        :model-value="progressValue"
        :max="100"
        status
        class="w-64"
      />
      
      <!-- 加载文本 -->
      <p v-if="text" class="text-sm text-muted">
        {{ text }}
      </p>
    </div>
  </div>
</template>
