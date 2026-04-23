<template>
  <div class="profile">
    <div class="profile-header">
      <div class="avatar">👤</div>
      <div class="info">
        <h1>{{ userName }}</h1>
        <p>{{ userBio }}</p>
        <div class="stats">
          <div>📝 Постов: {{ posts.length }}</div>
          <div>❤️ Лайков: {{ totalLikes }}</div>
        </div>
      </div>
    </div>
    
    <h2>Мои посты</h2>
    <div v-for="post in posts" :key="post.id" class="profile-post">
      <p>{{ post.text }}</p>
      <small>👍 {{ post.likes }} | 💬 {{ post.comments?.length || 0 }}</small>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const userName = ref('Иван Иванов')
const userBio = ref('Люблю программировать и делиться мыслями')
const posts = ref([])

const totalLikes = computed(() => {
  return posts.value.reduce((sum, post) => sum + (post.likes || 0), 0)
})

onMounted(() => {
  const saved = localStorage.getItem('posts')
  if (saved) {
    posts.value = JSON.parse(saved)
  }
})
</script>

<style scoped>
.profile {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.profile-header {
  display: flex;
  gap: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  border-radius: 10px;
  color: white;
  margin-bottom: 30px;
}
.avatar {
  font-size: 60px;
}
.info {
  flex: 1;
}
.stats {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}
.profile-post {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  background: #f9f9f9;
}
</style>