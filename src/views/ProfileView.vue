<template>
    <div class="profile"> 
    <h1>Профиль</h1> 
    <div class="profile-info"> 
      <h2>{{user.name}}</h2>
      <p>{{user.bio}}</p> 
      <p><strong>Всего постов:</strong> {{ posts.length }}</p>
    </div> 
    <div class="user-posts">
      <h3>Мои посты</h3> 
      <div v-if="posts.length === 0">
        <p>У вас пока нет постов</p>
      </div>
      
      <div v-else> 
        <div v-for="post in posts" :key="post.id" class="post-card">
          <p>{{ post.text }}</p>
          <p>❤ {{ post.likes }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>  
import { ref, onMounted } from 'vue'  
const user = ref({
  name: 'amina2007',     
  bio: 'dhhfdhthfhth'  
})  
const posts = ref([])
 
onMounted(() => { 
  const savedPosts = localStorage.getItem('posts')
   
  if (savedPosts) { 
    posts.value = JSON.parse(savedPosts) 
  } 
}) 
</script>

 