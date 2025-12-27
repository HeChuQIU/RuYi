<script setup lang="ts">
import { computed } from 'vue'

/**
 * ConfirmDialog 组件 Props
 */
interface Props {
  /**
   * 对话框标题
   */
  title?: string
  /**
   * 对话框描述
   */
  description?: string
  /**
   * 确认按钮文本
   */
  confirmText?: string
  /**
   * 取消按钮文本
   */
  cancelText?: string
  /**
   * 确认按钮颜色
   */
  confirmColor?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  /**
   * 是否显示对话框
   */
  open?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '确认操作',
  description: '确定要执行此操作吗？',
  confirmText: '确认',
  cancelText: '取消',
  confirmColor: 'primary',
  open: false,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  'confirm': []
  'cancel': []
}>()

const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value),
})

function handleConfirm() {
  emit('confirm')
  isOpen.value = false
}

function handleCancel() {
  emit('cancel')
  isOpen.value = false
}
</script>

<template>
  <UModal v-model:open="isOpen" :title="title" :description="description">
    <template #footer="{ close }">
      <div class="flex items-center justify-end gap-2">
        <UButton
          :label="cancelText"
          color="neutral"
          variant="outline"
          @click="handleCancel"
        />
        <UButton
          :label="confirmText"
          :color="confirmColor"
          @click="handleConfirm"
        />
      </div>
    </template>
  </UModal>
</template>
