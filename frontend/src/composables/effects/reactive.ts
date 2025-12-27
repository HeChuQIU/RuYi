/**
 * Effect 与 Vue 响应式系统集成
 */

import { ref, type Ref } from 'vue'
import { Effect, Effect as EffectType } from 'effect'

/**
 * 将 Effect 转换为响应式引用
 */
export function useEffectRef<T, E, R>(
  effect: EffectType<T, E, R>
): {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<E | null>
  run: () => Promise<void>
} {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<E | null>(null)

  const run = async () => {
    loading.value = true
    error.value = null
    try {
      const result = await Effect.runPromise(effect)
      data.value = result
    } catch (e) {
      error.value = e as E
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    error,
    run,
  }
}

/**
 * 将 Effect 转换为响应式状态（包含初始执行）
 */
export function useEffectState<T, E, R>(
  effect: EffectType<T, E, R>,
  immediate = true
): {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<E | null>
  refetch: () => Promise<void>
} {
  const { data, loading, error, run } = useEffectRef(effect)

  const refetch = async () => {
    await run()
  }

  if (immediate) {
    refetch()
  }

  return {
    data,
    loading,
    error,
    refetch,
  }
}

