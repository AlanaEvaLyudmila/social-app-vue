<template>
  <div class="profile">
    <h1>Профиль пользователя</h1>
    <p><strong>Имя:</strong> Иван Петров</p>
    <p><strong>О себе:</strong> Люблю программировать</p>
    <p><strong>Всего постов:</strong> {{ posts.length }}</p>
    <h3>Мои посты:</h3>
    <div v-for="post in posts" :key="post.id" class="post-item">
      <p>{{ post.text }}</p>
      <small>👍 {{ post.likes }} | 💬 {{ post.comments?.length || 0 }}</small>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])

onMounted(() => {
  const saved = localStorage.getItem('posts')
  if (saved) posts.value = JSON.parse(saved)
})
</script>

<style scoped>
.profile { max-width: 600px; margin: 0 auto; padding: 20px; }
.post-item { border: 1px solid #ddd; padding: 10px; margin: 10px 0; border-radius: 5px; background: #f9f9f9; }
</style>