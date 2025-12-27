<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDebounceFn } from '@vueuse/core'

/**
 * 搜索建议项
 */
export interface SearchSuggestion {
  label: string
  value: string
  icon?: string
  description?: string
}

/**
 * SearchBar 组件 Props
 */
interface Props {
  /**
   * 占位符
   */
  placeholder?: string
  /**
   * 搜索建议
   */
  suggestions?: SearchSuggestion[]
  /**
   * 是否显示搜索历史
   */
  showHistory?: boolean
  /**
   * 防抖延迟（毫秒）
   */
  debounce?: number
  /**
   * 是否使用命令面板模式
   */
  useCommandPalette?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '搜索...',
  suggestions: () => [],
  showHistory: false,
  debounce: 300,
  useCommandPalette: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'search': [value: string]
  'select': [suggestion: SearchSuggestion]
}>()

const searchTerm = ref('')
const searchHistory = ref<string[]>([])
const isOpen = ref(false)

// 防抖搜索
const debouncedSearch = useDebounceFn((value: string) => {
  emit('search', value)
}, props.debounce)

// 过滤建议
const filteredSuggestions = computed(() => {
  if (!searchTerm.value) {
    return props.suggestions
  }

  return props.suggestions.filter((suggestion) =>
    suggestion.label.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    suggestion.value.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

// 处理输入
function handleInput(value: string) {
  searchTerm.value = value
  emit('update:modelValue', value)
  debouncedSearch(value)
}

// 处理选择
function handleSelect(suggestion: SearchSuggestion) {
  searchTerm.value = suggestion.value
  emit('select', suggestion)
  emit('search', suggestion.value)

  // 添加到搜索历史
  if (props.showHistory) {
    const index = searchHistory.value.indexOf(suggestion.value)
    if (index > -1) {
      searchHistory.value.splice(index, 1)
    }
    searchHistory.value.unshift(suggestion.value)
    if (searchHistory.value.length > 10) {
      searchHistory.value.pop()
    }
  }

  isOpen.value = false
}

// 处理搜索
function handleSearch() {
  emit('search', searchTerm.value)

  // 添加到搜索历史
  if (props.showHistory && searchTerm.value) {
    const index = searchHistory.value.indexOf(searchTerm.value)
    if (index > -1) {
      searchHistory.value.splice(index, 1)
    }
    searchHistory.value.unshift(searchTerm.value)
    if (searchHistory.value.length > 10) {
      searchHistory.value.pop()
    }
  }
}

// 清除搜索历史
function clearHistory() {
  searchHistory.value = []
}
</script>

<template>
  <div class="relative">
    <!-- 命令面板模式 -->
    <UCommandPalette
      v-if="useCommandPalette"
      v-model:search-term="searchTerm"
      v-model:open="isOpen"
      :groups="[
        {
          id: 'suggestions',
          label: '搜索建议',
          items: filteredSuggestions.map((s) => ({
            label: s.label,
            value: s.value,
            icon: s.icon,
            description: s.description,
            onSelect: () => handleSelect(s),
          })),
        },
        ...(showHistory && searchHistory.length > 0
          ? [
              {
                id: 'history',
                label: '搜索历史',
                items: searchHistory.map((h) => ({
                  label: h,
                  value: h,
                  onSelect: () => {
                    searchTerm = h
                    handleSearch()
                  },
                })),
              },
            ]
          : []),
      ]"
      :placeholder="placeholder"
      @update:search-term="handleInput"
    />

    <!-- 普通输入模式 -->
    <div v-else class="relative">
      <UInput
        v-model="searchTerm"
        :placeholder="placeholder"
        icon="i-lucide-search"
        trailing-icon="i-lucide-x"
        class="w-full"
        @update:model-value="handleInput"
        @keyup.enter="handleSearch"
        @click:trailing-icon="searchTerm = ''"
      />

      <!-- 搜索建议下拉 -->
      <div
        v-if="isOpen && (filteredSuggestions.length > 0 || (showHistory && searchHistory.length > 0))"
        class="absolute z-50 w-full mt-1 bg-default border border-default rounded-lg shadow-lg max-h-64 overflow-y-auto"
      >
        <!-- 搜索建议 -->
        <div v-if="filteredSuggestions.length > 0" class="p-2">
          <div
            v-for="suggestion in filteredSuggestions"
            :key="suggestion.value"
            class="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-elevated cursor-pointer"
            @click="handleSelect(suggestion)"
          >
            <UIcon v-if="suggestion.icon" :name="suggestion.icon" class="size-4 text-muted" />
            <div class="flex-1">
              <div class="text-sm font-medium text-highlighted">{{ suggestion.label }}</div>
              <div v-if="suggestion.description" class="text-xs text-muted">
                {{ suggestion.description }}
              </div>
            </div>
          </div>
        </div>

        <!-- 搜索历史 -->
        <div
          v-if="showHistory && searchHistory.length > 0 && !searchTerm"
          class="p-2 border-t border-default"
        >
          <div class="flex items-center justify-between px-3 py-2">
            <span class="text-xs font-semibold text-muted">搜索历史</span>
            <UButton
              size="xs"
              color="neutral"
              variant="ghost"
              label="清除"
              @click="clearHistory"
            />
          </div>
          <div
            v-for="(history, index) in searchHistory"
            :key="index"
            class="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-elevated cursor-pointer"
            @click="searchTerm = history; handleSearch()"
          >
            <UIcon name="i-lucide-clock" class="size-4 text-muted" />
            <span class="text-sm text-highlighted">{{ history }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
