<template>
  <div class="profile">
    <h1>Профиль пользователя</h1>

    <h2>{{ user.name }}</h2>
    <p>{{ user.about }}</p>

    <p><b>Количество постов:</b> {{ posts.length }}</p>

    <h3>Мои посты:</h3>

    <div
      v-for="post in posts"
      :key="post.id"
      class="post"
    >
      {{ post.text }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const user = ref({
  name: 'Иванова Анастасия',
  about: 'Йоу эщкере, уаааааа'
})

const posts = ref([])

onMounted(() => {
  const savedPosts = localStorage.getItem('posts')

  if (savedPosts) {
    posts.value = JSON.parse(savedPosts)
  }
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