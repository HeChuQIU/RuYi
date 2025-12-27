<script setup lang="ts">
import { computed } from 'vue'

/**
 * 字段配置
 */
export interface FieldConfig {
  /**
   * 字段名（数据对象的key）
   */
  key: string
  /**
   * 字段标签
   */
  label: string
  /**
   * 字段值格式化函数
   */
  formatter?: (value: unknown) => string
  /**
   * 是否显示
   */
  visible?: boolean
  /**
   * 自定义渲染函数
   */
  render?: (value: unknown) => any
}

/**
 * DataDetail 组件 Props
 */
interface Props {
  /**
   * 数据对象
   */
  data: Record<string, unknown>
  /**
   * 字段配置
   */
  fields?: FieldConfig[]
  /**
   * 标题
   */
  title?: string
  /**
   * 是否使用卡片容器
   */
  useCard?: boolean
  /**
   * 布局：horizontal（水平）或 vertical（垂直）
   */
  layout?: 'horizontal' | 'vertical'
  /**
   * 列数（仅当layout为vertical时有效）
   */
  columns?: 1 | 2 | 3
}

const props = withDefaults(defineProps<Props>(), {
  fields: undefined,
  title: undefined,
  useCard: true,
  layout: 'vertical',
  columns: 2,
})

// 如果没有提供字段配置，自动从数据对象生成
const computedFields = computed<FieldConfig[]>(() => {
  if (props.fields) {
    return props.fields.filter((field) => field.visible !== false)
  }

  return Object.keys(props.data).map((key) => ({
    key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    visible: true,
  }))
})

// 获取字段值
function getFieldValue(field: FieldConfig): unknown {
  return props.data[field.key]
}

// 格式化字段值
function formatFieldValue(field: FieldConfig, value: unknown): string {
  if (field.formatter) {
    return field.formatter(value)
  }

  if (value === null || value === undefined) {
    return '-'
  }

  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2)
  }

  return String(value)
}

// 布局类
const layoutClass = computed(() => {
  if (props.layout === 'horizontal') {
    return 'flex flex-col gap-4'
  }

  const columnMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  }

  return `grid ${columnMap[props.columns]} gap-4`
})
</script>

<template>
  <UCard v-if="useCard" :title="title">
    <div :class="layoutClass">
      <div
        v-for="field in computedFields"
        :key="field.key"
        :class="layout === 'horizontal' ? 'flex items-start gap-4' : ''"
      >
        <div
          :class="layout === 'horizontal' ? 'min-w-32 font-semibold text-highlighted' : 'text-sm font-semibold text-highlighted mb-1'"
        >
          {{ field.label }}:
        </div>
        <div
          :class="layout === 'horizontal' ? 'flex-1 text-muted' : 'text-muted'"
        >
          <component
            v-if="field.render"
            :is="field.render(getFieldValue(field))"
          />
          <span v-else>{{ formatFieldValue(field, getFieldValue(field)) }}</span>
        </div>
      </div>
    </div>
  </UCard>

  <div v-else :class="layoutClass">
    <div
      v-for="field in computedFields"
      :key="field.key"
      :class="layout === 'horizontal' ? 'flex items-start gap-4' : ''"
    >
      <div
        :class="layout === 'horizontal' ? 'min-w-32 font-semibold text-highlighted' : 'text-sm font-semibold text-highlighted mb-1'"
      >
        {{ field.label }}:
      </div>
      <div
        :class="layout === 'horizontal' ? 'flex-1 text-muted' : 'text-muted'"
      >
        <component
          v-if="field.render"
          :is="field.render(getFieldValue(field))"
        />
        <span v-else>{{ formatFieldValue(field, getFieldValue(field)) }}</span>
      </div>
    </div>
  </div>
</template>
