/**
 * 确认对话框 Composable
 */

import { ref } from 'vue'

/**
 * 确认对话框选项
 */
export interface ConfirmDialogOptions {
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  confirmColor?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
}

/**
 * 使用确认对话框
 */
export function useConfirmDialog() {
  const isOpen = ref(false)
  const options = ref<ConfirmDialogOptions>({
    title: '确认操作',
    description: '确定要执行此操作吗？',
    confirmText: '确认',
    cancelText: '取消',
    confirmColor: 'primary',
  })

  /**
   * 显示确认对话框
   */
  function confirm(opts?: ConfirmDialogOptions): Promise<boolean> {
    return new Promise((resolve) => {
      if (opts) {
        options.value = { ...options.value, ...opts }
      }
      isOpen.value = true

      // 监听确认和取消事件
      const handleConfirm = () => {
        isOpen.value = false
        resolve(true)
      }

      const handleCancel = () => {
        isOpen.value = false
        resolve(false)
      }

      // 这里需要在实际使用时通过事件处理
      // 为了简化，我们返回一个Promise，实际使用时需要在组件中处理
      // 暂时先这样实现，实际使用时需要配合组件
    })
  }

  return {
    isOpen,
    options,
    confirm,
  }
}
