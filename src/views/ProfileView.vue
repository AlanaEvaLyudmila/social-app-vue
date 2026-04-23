<template>
  <div class="profile">
    <h1>Профиль пользователя</h1>

    <div class="user-info">
      <p><strong>Имя:</strong> {{ user.name }}</p>
      <p><strong>О себе:</strong> {{ user.about }}</p>
      <p><strong>Количество постов:</strong> {{ userPosts.length }}</p>
    </div>

    <h2>Мои посты</h2>

    <div v-if="userPosts.length === 0">
      У пользователя пока нет постов
    </div>

    <div v-for="post in userPosts" :key="post.id" class="post">
      <p>{{ post.text }}</p>
      <p>❤ {{ post.likes }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const posts = ref([])

const user = ref({
  name: 'Кайтукова Яна',
  about: 'Учусь на матфаке'
})

onMounted(() => {
  const savedPosts = localStorage.getItem('posts')
  posts.value = savedPosts ? JSON.parse(savedPosts) : []
})

const userPosts = computed(() => posts.value)
</script>

<style scoped>
.profile {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.user-info {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  margin: 20px 0;
}

.post {
  border: 1px solid #e0e0e0;
  padding: 15px;
  margin-top: 15px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.post:hover {
  background-color: #fafafa;
  border-color: #ccc;
}

.post-stats {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #999;
  background-color: #f9f9f9;
  border-radius: 8px;
}
</style>