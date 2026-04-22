<template>
  <div class="profile">
    <h1>Профиль</h1>

    <h2>{{ user.name }}</h2>
    <p>{{ user.about }}</p>

    <p>Количество постов: {{ posts.length }}</p>

    <h3>Мои посты:</h3>

    <div v-if="posts.length === 0">
      У вас пока нет постов
    </div>

    <div v-for="post in posts" :key="post.id" class="post">
      <p>{{ post.text }}</p>
      <p>Лайков: {{ post.likes }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const user = ref({
  name: 'Алина',
  about: 'Учусь на матфаке :)'
})

const posts = ref([])

onMounted(() => {
  const savedPosts = localStorage.getItem('posts')
  posts.value = savedPosts ? JSON.parse(savedPosts) : []
})
</script>

<style scoped>
.post {
  border: 1px solid black;
  padding: 10px;
  margin-top: 10px;
  border-radius: 8px;
}
</style>