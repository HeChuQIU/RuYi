<script setup lang="ts">
import { computed } from 'vue'

/**
 * FormLayout 组件 Props
 */
interface Props {
  /**
   * 布局列数：1、2、3
   */
  columns?: 1 | 2 | 3
  /**
   * 列间距
   */
  gap?: 'sm' | 'md' | 'lg'
  /**
   * 是否响应式（在小屏幕上自动变为单列）
   */
  responsive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  columns: 1,
  gap: 'md',
  responsive: true,
})

const gridClass = computed(() => {
  const gapMap = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  }

  const columnMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  }

  const baseClass = 'grid'
  const gapClass = gapMap[props.gap]
  const columnClass = props.responsive ? columnMap[props.columns] : `grid-cols-${props.columns}`

  return `${baseClass} ${gapClass} ${columnClass}`
})
</script>

<template>
  <div :class="gridClass">
    <slot />
  </div>
</template>
