/**
 * Effect composables 基础结构
 */

import { Effect } from 'effect'
import type { Effect as EffectType } from 'effect/Effect'

/**
 * 创建 Effect composable 的基础函数
 */
export function createEffectComposable<T, E, R>(
  effect: EffectType<T, E, R>
): {
  effect: EffectType<T, E, R>
  run: () => Promise<T>
  runSync: () => T
} {
  return {
    effect,
    async run() {
      return await Effect.runPromise(effect)
    },
    runSync() {
      return Effect.runSync(effect)
    },
  }
}

