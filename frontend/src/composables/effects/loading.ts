/**
 * Effect 加载状态管理
 */

import { ref, type Ref } from 'vue'
import { Effect } from 'effect'
import type { Effect as EffectType } from 'effect/Effect'

/**
 * 创建加载状态管理器
 */
export function useLoadingState() {
  const loading = ref(false)
  const loadingCount = ref(0)

  const startLoading = () => {
    loadingCount.value++
    loading.value = true
  }

  const stopLoading = () => {
    loadingCount.value = Math.max(0, loadingCount.value - 1)
    if (loadingCount.value === 0) {
      loading.value = false
    }
  }

  const resetLoading = () => {
    loadingCount.value = 0
    loading.value = false
  }

  return {
    loading: loading as Readonly<Ref<boolean>>,
    startLoading,
    stopLoading,
    resetLoading,
  }
}

/**
 * 包装 Effect 以自动管理加载状态
 */
export function withLoading<T, E, R>(
  effect: EffectType<T, E, R>,
  loadingState: ReturnType<typeof useLoadingState>
): EffectType<T, E, R> {
  return Effect.gen(function* () {
    loadingState.startLoading()
    try {
      const result = yield* effect
      return result
    } finally {
      loadingState.stopLoading()
    }
  })
}

/**
 * 组合多个 Effect 并管理加载状态
 */
export function useMultipleLoading() {
  const loadings = ref<Record<string, boolean>>({})

  const setLoading = (key: string, value: boolean) => {
    loadings.value = {
      ...loadings.value,
      [key]: value,
    }
  }

  const isLoading = (key: string): boolean => {
    return loadings.value[key] ?? false
  }

  const hasAnyLoading = (): boolean => {
    return Object.values(loadings.value).some((loading) => loading)
  }

  return {
    loadings: loadings as Readonly<Ref<Record<string, boolean>>>,
    setLoading,
    isLoading,
    hasAnyLoading,
  }
}

