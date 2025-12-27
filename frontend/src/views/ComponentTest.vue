<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Schema } from 'effect'
import type { Schema as SchemaType } from 'effect/Schema'
import type { FormSubmitEvent } from '@nuxt/ui'
import Loading from '@/components/common/Loading.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import DynamicForm, { type FieldConfig } from '@/components/form/DynamicForm.vue'
import FormLayout from '@/components/form/FormLayout.vue'
import DataDetail, { type FieldConfig as DataDetailFieldConfig } from '@/components/business/DataDetail.vue'
import SearchBar, { type SearchSuggestion } from '@/components/business/SearchBar.vue'
import FilterPanel, { type FilterField } from '@/components/business/FilterPanel.vue'

// Loading 组件测试
const loadingFullscreen = ref(false)
const loadingInline = ref(true)
const loadingProgress = ref(false)
const progressValue = ref(0)

// 模拟进度更新
function updateProgress() {
  if (progressValue.value < 100) {
    progressValue.value += 10
  } else {
    loadingProgress.value = false
  }
}

// ConfirmDialog 组件测试
const confirmDialogOpen = ref(false)
const confirmResult = ref<string>('')

// DynamicForm 组件测试
// #region agent log
fetch('http://127.0.0.1:7242/ingest/5281275f-1eb3-4ca4-9596-5d4e3e18341f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ComponentTest.vue:33',message:'Checking Schema object',data:{hasStruct:typeof Schema.struct,hasStructCapital:typeof (Schema as any).Struct,SchemaKeys:Object.keys(Schema).slice(0,20)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion
const formSchema = Schema.Struct({
  name: Schema.String.pipe(Schema.minLength(2, { message: () => '姓名至少需要2个字符' })),
  email: Schema.String.pipe(
    Schema.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: () => '邮箱格式不正确' })
  ),
  age: Schema.Number.pipe(Schema.between(18, 100, { message: () => '年龄必须在18-100之间' })),
  gender: Schema.String,
  bio: Schema.String.pipe(Schema.maxLength(200, { message: () => '简介不能超过200个字符' })),
  agree: Schema.Boolean,
})

const formFields: FieldConfig[] = [
  { name: 'name', label: '姓名', type: 'text', placeholder: '请输入姓名', required: true },
  { name: 'email', label: '邮箱', type: 'email', placeholder: '请输入邮箱', required: true },
  { name: 'age', label: '年龄', type: 'number', placeholder: '请输入年龄', required: true },
  {
    name: 'gender',
    label: '性别',
    type: 'select',
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
    ],
    required: true,
  },
  { name: 'bio', label: '简介', type: 'textarea', placeholder: '请输入简介' },
  { name: 'agree', label: '同意条款', type: 'checkbox', required: true },
]

const formInitialData = {
  name: '',
  email: '',
  age: undefined,
  gender: '',
  bio: '',
  agree: false,
}

function handleFormSubmit(data: typeof formInitialData) {
  console.log('表单提交:', data)
  alert(`表单提交成功！\n${JSON.stringify(data, null, 2)}`)
}

// DataDetail 组件测试
const detailData = {
  id: '12345',
  name: '张三',
  email: 'zhangsan@example.com',
  age: 28,
  status: 'active',
  createdAt: '2024-01-01T00:00:00Z',
  tags: ['developer', 'vue', 'typescript'],
}

const detailFields: DataDetailFieldConfig[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: '姓名' },
  { key: 'email', label: '邮箱' },
  {
    key: 'age',
    label: '年龄',
    formatter: (value) => `${value} 岁`,
  },
  {
    key: 'status',
    label: '状态',
    formatter: (value) => (value === 'active' ? '活跃' : '非活跃'),
  },
  {
    key: 'createdAt',
    label: '创建时间',
    formatter: (value) => new Date(value as string).toLocaleString('zh-CN'),
  },
  {
    key: 'tags',
    label: '标签',
    formatter: (value) => (value as string[]).join(', '),
  },
]

// SearchBar 组件测试
const searchSuggestions: SearchSuggestion[] = [
  { label: 'Vue 3', value: 'vue3', icon: 'i-lucide-code', description: 'Vue 3 框架' },
  { label: 'TypeScript', value: 'typescript', icon: 'i-lucide-file-code', description: 'TypeScript 语言' },
  { label: 'Nuxt UI', value: 'nuxt-ui', icon: 'i-lucide-package', description: 'Nuxt UI 组件库' },
  { label: 'Effect', value: 'effect', icon: 'i-lucide-zap', description: 'Effect 库' },
]

const searchValue = ref('')
function handleSearch(value: string) {
  console.log('搜索:', value)
}

// FilterPanel 组件测试
const filterFields: FilterField[] = [
  { key: 'name', label: '名称', type: 'text', placeholder: '请输入名称' },
  { key: 'age', label: '年龄', type: 'number', min: 0, max: 100, placeholder: '请输入年龄' },
  {
    key: 'status',
    label: '状态',
    type: 'select',
    options: [
      { label: '全部', value: null },
      { label: '活跃', value: 'active' },
      { label: '非活跃', value: 'inactive' },
    ],
  },
  {
    key: 'tags',
    label: '标签',
    type: 'multiselect',
    options: [
      { label: '开发者', value: 'developer' },
      { label: '设计师', value: 'designer' },
      { label: '产品经理', value: 'pm' },
    ],
  },
  { key: 'dateRange', label: '日期范围', type: 'date', placeholder: '选择日期' },
]

const filterValues = ref<Record<string, unknown>>({})
const filterPanelRef = ref<{ open: () => void } | null>(null)

function openFilterPanel() {
  filterPanelRef.value?.open()
}

// 标签页
const activeTab = ref('loading')
</script>

<template>
  <div class="p-6 space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-highlighted mb-2">组件测试页面</h1>
      <p class="text-muted">用于测试和展示所有通用组件</p>
    </div>

    <UTabs v-model="activeTab" :items="[
      { label: '基础UI', value: 'loading', slot: 'loading' },
      { label: '表单组件', value: 'form', slot: 'form' },
      { label: '业务组件', value: 'business', slot: 'business' },
    ]">
      <!-- 基础UI组件 -->
      <template #loading>
        <div class="space-y-6">
          <UCard title="Loading 组件">
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-semibold text-highlighted mb-2">全屏加载</h3>
                <UButton label="显示全屏加载" @click="loadingFullscreen = true" />
                <Loading
                  :loading="loadingFullscreen"
                  mode="fullscreen"
                  text="正在加载..."
                  @click="loadingFullscreen = false"
                />
              </div>

              <div>
                <h3 class="text-sm font-semibold text-highlighted mb-2">内联加载</h3>
                <div class="border border-default rounded-lg p-4">
                  <Loading :loading="loadingInline" mode="inline" text="加载中..." />
                </div>
                <UButton
                  :label="loadingInline ? '隐藏加载' : '显示加载'"
                  @click="loadingInline = !loadingInline"
                />
              </div>

              <div>
                <h3 class="text-sm font-semibold text-highlighted mb-2">进度条加载</h3>
                <div class="border border-default rounded-lg p-4">
                  <Loading
                    :loading="loadingProgress"
                    mode="inline"
                    show-progress
                    :progress="progressValue"
                    text="上传中..."
                  />
                </div>
                <div class="flex items-center gap-2 mt-2">
                  <UButton label="开始进度" @click="loadingProgress = true; progressValue = 0" />
                  <UButton
                    label="模拟进度"
                    @click="updateProgress"
                  />
                </div>
              </div>
            </div>
          </UCard>

          <UCard title="ConfirmDialog 组件">
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-semibold text-highlighted mb-2">确认对话框</h3>
                <UButton label="打开确认对话框" @click="confirmDialogOpen = true" />
                <p v-if="confirmResult" class="mt-2 text-sm text-muted">
                  结果: {{ confirmResult }}
                </p>
              </div>

              <ConfirmDialog
                v-model:open="confirmDialogOpen"
                title="确认删除"
                description="确定要删除此项吗？此操作不可撤销。"
                confirm-text="删除"
                cancel-text="取消"
                confirm-color="error"
                @confirm="confirmResult = '已确认'"
                @cancel="confirmResult = '已取消'"
              />
            </div>
          </UCard>
        </div>
      </template>

      <!-- 表单组件 -->
      <template #form>
        <div class="space-y-6">
          <UCard title="DynamicForm 组件">
            <DynamicForm
              :schema="formSchema"
              :fields="formFields"
              :initial-data="formInitialData"
              submit-text="提交"
              show-reset
              reset-text="重置"
              @submit="handleFormSubmit"
            />
          </UCard>

          <UCard title="FormLayout 组件">
            <FormLayout :columns="2" gap="md">
              <UInput label="字段1" placeholder="输入1" />
              <UInput label="字段2" placeholder="输入2" />
              <UInput label="字段3" placeholder="输入3" />
              <UInput label="字段4" placeholder="输入4" />
            </FormLayout>
          </UCard>
        </div>
      </template>

      <!-- 业务组件 -->
      <template #business>
        <div class="space-y-6">
          <UCard title="DataDetail 组件">
            <DataDetail
              :data="detailData"
              :fields="detailFields"
              title="用户详情"
              :columns="2"
            />
          </UCard>

          <UCard title="SearchBar 组件">
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-semibold text-highlighted mb-2">普通搜索</h3>
                <SearchBar
                  v-model:model-value="searchValue"
                  :suggestions="searchSuggestions"
                  :show-history="true"
                  placeholder="搜索组件、功能..."
                  @search="handleSearch"
                />
              </div>

              <div>
                <h3 class="text-sm font-semibold text-highlighted mb-2">命令面板模式</h3>
                <SearchBar
                  :suggestions="searchSuggestions"
                  :show-history="true"
                  use-command-palette
                  placeholder="搜索组件、功能..."
                  @search="handleSearch"
                />
              </div>
            </div>
          </UCard>

          <UCard title="FilterPanel 组件">
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-semibold text-highlighted mb-2">卡片模式</h3>
                <FilterPanel
                  :fields="filterFields"
                  :initial-values="filterValues"
                  title="筛选条件"
                  show-reset
                  show-apply
                  @update:model-value="filterValues = $event"
                  @apply="console.log('应用筛选:', $event)"
                  @reset="filterValues = {}"
                />
              </div>

              <div>
                <h3 class="text-sm font-semibold text-highlighted mb-2">侧边栏模式</h3>
                <FilterPanel
                  ref="filterPanelRef"
                  :fields="filterFields"
                  :initial-values="filterValues"
                  title="筛选条件"
                  use-slideover
                  show-reset
                  show-apply
                  @update:model-value="filterValues = $event"
                  @apply="console.log('应用筛选:', $event)"
                  @reset="filterValues = {}"
                />
                <UButton label="打开筛选面板" @click="openFilterPanel" />
              </div>
            </div>
          </UCard>
        </div>
      </template>
    </UTabs>
  </div>
</template>
