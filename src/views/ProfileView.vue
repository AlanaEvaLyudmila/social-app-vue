<template>
  <div class="profile">
    <h1>Профиль пользователя</h1>

    <div class="user-info">
      <h2>{{ user.name }}</h2>
      <p>{{ user.bio }}</p>
      <p>Постов: {{ userPosts.length }}</p>
    </div>


    <hr />



    <h3>Посты пользователя</h3>



    <div v-if="userPosts.length === 0">
      Нет постов
    </div>

    <div v-for="post in userPosts" :key="post.id" class="post">
      <p>{{ post.text }}</p>
      <p>❤ {{ post.likes }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'


const posts = ref([])
const user = ref({
  id: 1,
  name: 'Тумба Юмба',
  bio: 'Жую кокосы и ем бананы'
})

const userId = 1

const userPosts = computed(() => {
  return posts.value.filter(post => post.userId === userId)
})
onMounted(() => {
  const saved = localStorage.getItem('posts')

  if (saved) {
    posts.value = JSON.parse(saved)
  }
})
</script>