<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p>页面未找到</p>
    <button @click="goHome">返回首页</button>
  </div>
</template>

<style scoped>
.not-found {
  padding: 2rem;
  text-align: center;
}
</style>

