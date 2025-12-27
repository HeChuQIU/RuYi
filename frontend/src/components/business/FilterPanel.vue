<script setup lang="ts">
import { ref } from 'vue'

/**
 * 筛选条件类型
 */
export type FilterType = 'text' | 'number' | 'date' | 'select' | 'multiselect' | 'range'

/**
 * 筛选字段配置
 */
export interface FilterField {
  /**
   * 字段名
   */
  key: string
  /**
   * 字段标签
   */
  label: string
  /**
   * 筛选类型
   */
  type: FilterType
  /**
   * 占位符
   */
  placeholder?: string
  /**
   * 选择项（用于select和multiselect类型）
   */
  options?: Array<{ label: string; value: unknown }>
  /**
   * 最小值（用于number和range类型）
   */
  min?: number
  /**
   * 最大值（用于number和range类型）
   */
  max?: number
  /**
   * 默认值
   */
  defaultValue?: unknown
}

/**
 * FilterPanel 组件 Props
 */
interface Props {
  /**
   * 筛选字段配置
   */
  fields: FilterField[]
  /**
   * 初始筛选值
   */
  initialValues?: Record<string, unknown>
  /**
   * 是否使用侧边栏模式
   */
  useSlideover?: boolean
  /**
   * 标题
   */
  title?: string
  /**
   * 是否显示重置按钮
   */
  showReset?: boolean
  /**
   * 是否显示应用按钮
   */
  showApply?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  initialValues: () => ({}),
  useSlideover: false,
  title: '筛选',
  showReset: true,
  showApply: false,
})

const emit = defineEmits<{
  'update:modelValue': [values: Record<string, unknown>]
  'apply': [values: Record<string, unknown>]
  'reset': []
}>()

// 筛选值
const filterValues = ref<Record<string, unknown>>({ ...props.initialValues })
const isOpen = ref(false)

// 暴露方法供外部调用
defineExpose({
  open: () => {
    isOpen.value = true
  },
  close: () => {
    isOpen.value = false
  },
})

// 应用筛选
function applyFilters() {
  emit('update:modelValue', { ...filterValues.value })
  emit('apply', { ...filterValues.value })
  if (props.useSlideover) {
    isOpen.value = false
  }
}

// 重置筛选
function resetFilters() {
  filterValues.value = { ...props.initialValues }
  emit('update:modelValue', { ...filterValues.value })
  emit('reset')
}

// 更新字段值
function updateFieldValue(key: string, value: unknown) {
  filterValues.value[key] = value
  if (!props.showApply) {
    emit('update:modelValue', { ...filterValues.value })
  }
}

// 更新范围值
function updateRangeValue(key: string, type: 'min' | 'max', value: number | undefined) {
  const currentValue = (filterValues.value[key] as { min?: number; max?: number }) || {}
  filterValues.value[key] = {
    ...currentValue,
    [type]: value,
  }
  if (!props.showApply) {
    emit('update:modelValue', { ...filterValues.value })
  }
}
</script>

<template>
  <!-- 侧边栏模式：只渲染 USlideover，不渲染任何可见内容 -->
  <!-- 侧边栏通过外部按钮的 open() 方法控制，不显示触发器 -->
  <USlideover v-if="useSlideover" v-model:open="isOpen" :title="title">
    <!-- USlideover 需要一个默认 slot 作为触发器，但我们使用外部控制 -->
    <!-- 提供一个隐藏的触发器以满足组件要求 -->
    <UButton
      style="display: none;"
      label=""
      @click="() => {}"
    />

    <template #body>
      <div class="space-y-4">
        <div
          v-for="field in fields"
          :key="field.key"
          class="space-y-2"
        >
          <label class="text-sm font-semibold text-highlighted">
            {{ field.label }}
          </label>
          <!-- 文本输入 -->
          <UInput
            v-if="field.type === 'text'"
            :model-value="filterValues[field.key] as string | undefined"
            @update:model-value="updateFieldValue(field.key, $event)"
            :placeholder="field.placeholder"
          />
          <!-- 数字输入 -->
          <UInputNumber
            v-else-if="field.type === 'number'"
            :model-value="filterValues[field.key] as number | undefined"
            @update:model-value="updateFieldValue(field.key, $event)"
            :placeholder="field.placeholder"
            :min="field.min"
            :max="field.max"
          />
          <!-- 日期输入 -->
          <UInputDate
            v-else-if="field.type === 'date'"
            :model-value="(filterValues[field.key] as any) || null"
            @update:model-value="updateFieldValue(field.key, $event)"
          />
          <!-- 选择框 -->
          <USelect
            v-else-if="field.type === 'select'"
            :model-value="filterValues[field.key]"
            @update:model-value="updateFieldValue(field.key, $event)"
            :items="field.options || []"
            :placeholder="field.placeholder"
            :ui="{ content: 'min-w-fit' }"
          />
          <!-- 多选框 -->
          <USelect
            v-else-if="field.type === 'multiselect'"
            :model-value="filterValues[field.key] as unknown[] | undefined"
            @update:model-value="updateFieldValue(field.key, $event)"
            :items="field.options || []"
            multiple
            :placeholder="field.placeholder"
            :ui="{ content: 'min-w-fit' }"
          />
          <!-- 范围输入 -->
          <div v-else-if="field.type === 'range'" class="flex items-center gap-2">
            <UInputNumber
              :model-value="(filterValues[field.key] as { min?: number; max?: number })?.min"
              @update:model-value="updateRangeValue(field.key, 'min', $event)"
              placeholder="最小值"
              :min="field.min"
              :max="field.max"
            />
            <span class="text-muted">-</span>
            <UInputNumber
              :model-value="(filterValues[field.key] as { min?: number; max?: number })?.max"
              @update:model-value="updateRangeValue(field.key, 'max', $event)"
              placeholder="最大值"
              :min="field.min"
              :max="field.max"
            />
          </div>
          <!-- 默认文本输入 -->
          <UInput
            v-else
            :model-value="filterValues[field.key] as string | undefined"
            @update:model-value="updateFieldValue(field.key, $event)"
            :placeholder="field.placeholder"
          />
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex items-center justify-end gap-2">
        <UButton
          v-if="showReset"
          label="重置"
          color="neutral"
          variant="outline"
          @click="resetFilters"
        />
        <UButton
          v-if="showApply"
          label="应用"
          @click="applyFilters"
        />
      </div>
    </template>
  </USlideover>

  <!-- 卡片模式 -->
  <UCard v-else :title="title">
    <div class="space-y-4">
      <div
        v-for="field in fields"
        :key="field.key"
        class="space-y-2"
      >
        <label class="text-sm font-semibold text-highlighted">
          {{ field.label }}
        </label>
        <!-- 文本输入 -->
        <UInput
          v-if="field.type === 'text'"
          :model-value="filterValues[field.key] as string | undefined"
          @update:model-value="updateFieldValue(field.key, $event)"
          :placeholder="field.placeholder"
        />
        <!-- 数字输入 -->
        <UInputNumber
          v-else-if="field.type === 'number'"
          :model-value="filterValues[field.key] as number | undefined"
          @update:model-value="updateFieldValue(field.key, $event)"
          :placeholder="field.placeholder"
          :min="field.min"
          :max="field.max"
        />
        <!-- 日期输入 -->
        <UInputDate
          v-else-if="field.type === 'date'"
          :model-value="(filterValues[field.key] as any) || null"
          @update:model-value="updateFieldValue(field.key, $event)"
        />
        <!-- 选择框 -->
        <USelect
          v-else-if="field.type === 'select'"
          :model-value="filterValues[field.key]"
          @update:model-value="updateFieldValue(field.key, $event)"
          :items="field.options || []"
          :placeholder="field.placeholder"
          :ui="{ content: 'min-w-fit' }"
        />
        <!-- 多选框 -->
        <USelect
          v-else-if="field.type === 'multiselect'"
          :model-value="filterValues[field.key] as unknown[] | undefined"
          @update:model-value="updateFieldValue(field.key, $event)"
          :items="field.options || []"
          multiple
          :placeholder="field.placeholder"
          :ui="{ content: 'min-w-fit' }"
        />
        <!-- 范围输入 -->
        <div v-else-if="field.type === 'range'" class="flex items-center gap-2">
          <UInputNumber
            :model-value="(filterValues[field.key] as { min?: number; max?: number })?.min"
            @update:model-value="updateRangeValue(field.key, 'min', $event)"
            placeholder="最小值"
            :min="field.min"
            :max="field.max"
          />
          <span class="text-muted">-</span>
          <UInputNumber
            :model-value="(filterValues[field.key] as { min?: number; max?: number })?.max"
            @update:model-value="updateRangeValue(field.key, 'max', $event)"
            placeholder="最大值"
            :min="field.min"
            :max="field.max"
          />
        </div>
        <!-- 默认文本输入 -->
        <UInput
          v-else
          :model-value="filterValues[field.key] as string | undefined"
          @update:model-value="updateFieldValue(field.key, $event)"
          :placeholder="field.placeholder"
        />
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-end gap-2">
        <UButton
          v-if="showReset"
          label="重置"
          color="neutral"
          variant="outline"
          @click="resetFilters"
        />
        <UButton
          v-if="showApply"
          label="应用"
          @click="applyFilters"
        />
      </div>
    </template>
  </UCard>
</template>
