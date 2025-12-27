<script setup lang="ts" generic="T extends Record<string, unknown>">
import { reactive, computed, useTemplateRef } from 'vue'
import { Schema } from 'effect'
import type { Schema as SchemaType } from 'effect/Schema'
import type { FormSubmitEvent } from '@nuxt/ui'
import { getFormSchema } from '@/composables/validation/schema-adapter'

/**
 * 字段配置
 */
export interface FieldConfig {
  /**
   * 字段名
   */
  name: keyof T
  /**
   * 字段标签
   */
  label: string
  /**
   * 字段类型
   */
  type: 'text' | 'number' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'switch' | 'date' | 'time'
  /**
   * 占位符
   */
  placeholder?: string
  /**
   * 帮助文本
   */
  help?: string
  /**
   * 是否必填
   */
  required?: boolean
  /**
   * 选择项（用于select类型）
   */
  options?: Array<{ label: string; value: unknown }>
  /**
   * 是否禁用
   */
  disabled?: boolean
}

/**
 * DynamicForm 组件 Props
 */
interface Props {
  /**
   * Effect Schema
   */
  schema: SchemaType<T> | any
  /**
   * 初始数据
   */
  initialData?: Partial<T>
  /**
   * 字段配置
   */
  fields: FieldConfig[]
  /**
   * 提交按钮文本
   */
  submitText?: string
  /**
   * 是否显示重置按钮
   */
  showReset?: boolean
  /**
   * 重置按钮文本
   */
  resetText?: string
}

const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({} as Partial<T>),
  submitText: '提交',
  showReset: false,
  resetText: '重置',
})

const emit = defineEmits<{
  submit: [data: T]
  reset: []
}>()

// 表单状态
const state = reactive<Partial<T>>({ ...props.initialData })

// 转换为 Standard Schema
const formSchema = computed(() => getFormSchema(props.schema))

// 表单引用
const form = useTemplateRef<{ clear: () => void }>('form')

/**
 * 处理表单提交
 */
async function onSubmit(event: FormSubmitEvent<T>) {
  emit('submit', event.data)
}

/**
 * 处理重置
 */
function onReset() {
  Object.keys(state).forEach((key) => {
    delete state[key as keyof T]
  })
  Object.assign(state, props.initialData)
  form.value?.clear()
  emit('reset')
}
</script>

<template>
  <UForm
    ref="form"
    :schema="formSchema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField
      v-for="field in fields"
      :key="String(field.name)"
      :label="field.type === 'checkbox' || field.type === 'switch' ? undefined : field.label"
      :name="String(field.name)"
      :required="field.required"
      :help="field.help"
    >
      <!-- 文本输入 -->
      <UInput
        v-if="field.type === 'text' || field.type === 'email' || field.type === 'password'"
        v-model="state[field.name]"
        :type="field.type"
        :placeholder="field.placeholder"
        :disabled="field.disabled"
      />

      <!-- 数字输入 -->
      <UInputNumber
        v-else-if="field.type === 'number'"
        v-model="state[field.name]"
        :placeholder="field.placeholder"
        :disabled="field.disabled"
      />

      <!-- 文本域 -->
      <UTextarea
        v-else-if="field.type === 'textarea'"
        v-model="state[field.name]"
        :placeholder="field.placeholder"
        :disabled="field.disabled"
      />

      <!-- 选择框 -->
      <USelect
        v-else-if="field.type === 'select'"
        v-model="state[field.name]"
        :items="field.options || []"
        :placeholder="field.placeholder"
        :disabled="field.disabled"
        :ui="{ content: 'min-w-fit' }"
      />

      <!-- 复选框 -->
      <UCheckbox
        v-else-if="field.type === 'checkbox'"
        v-model="state[field.name]"
        :label="field.label"
        :disabled="field.disabled"
      />

      <!-- 开关 -->
      <USwitch
        v-else-if="field.type === 'switch'"
        v-model="state[field.name]"
        :label="field.label"
        :disabled="field.disabled"
      />

      <!-- 日期输入 -->
      <UInputDate
        v-else-if="field.type === 'date'"
        v-model="state[field.name]"
        :placeholder="field.placeholder"
        :disabled="field.disabled"
      />

      <!-- 时间输入 -->
      <UInputTime
        v-else-if="field.type === 'time'"
        v-model="state[field.name]"
        :placeholder="field.placeholder"
        :disabled="field.disabled"
      />

      <!-- 默认文本输入 -->
      <UInput
        v-else
        v-model="state[field.name]"
        :placeholder="field.placeholder"
        :disabled="field.disabled"
      />
    </UFormField>

    <div class="flex items-center gap-2 pt-4">
      <UButton type="submit" :label="submitText" />
      <UButton
        v-if="showReset"
        type="button"
        :label="resetText"
        color="neutral"
        variant="outline"
        @click="onReset"
      />
    </div>
  </UForm>
</template>
