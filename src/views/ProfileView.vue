<template>
  <div class="profile">
    <h1>Профиль:</h1>
    <div class="user-info">
      <h2>{{ user.name }}</h2>
      <p>{{ user.opisanie }}</p>
      <p>Всего постов: {{ userPosts.length }}</p>
    </div>
    <h3>Мои посты:</h3>
    <div v-if="userPosts.length === 0">
        У вас пока нет постов
    </div>
    
    <PostItem
      v-for="post in userPosts"
      :key="post.id"
      :post="post"
      :currentUserId="currentUserId"
      @like="toggleLike"
      @delete="deletePost"
      @startEdit="startEdit"
      @saveEdit="saveEdit"
      @addComment="addComment"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PostItem from '../components/PostItem.vue'

const currentUserId = ref(1)

const user = ref({
  id: 1,
  name: 'Иван Иванов',
  opisanie: 'Я люблю СОГУ!'
})

const posts = ref([])

const savedPosts = localStorage.getItem('posts')
if (savedPosts) {
  posts.value = JSON.parse(savedPosts)
}

const userPosts = computed(() => {
  return posts.value.filter(post => post.authorId === currentUserId.value)
})

const toggleLike = (postId) => {
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    if (post.liked) {
      post.likes--
    } else {
      post.likes++
    }
    post.liked = !post.liked
    saveInLocalStorage()
  }
}

const deletePost = (postId) => {
  posts.value = posts.value.filter(post => post.id !== postId)
  saveInLocalStorage()
}

const startEdit = (postId) => {
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    post.isEdit = true
  }
}

const saveEdit = (postId, newText) => {
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    post.text = newText
    post.isEdit = false
    saveInLocalStorage()
  }
}

const addComment = (postId, commentText) => {
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    post.comments.push({ text: commentText })
    
    saveInLocalStorage()
  }
}

const saveInLocalStorage = () => {
  localStorage.setItem('posts', JSON.stringify(posts.value))
}
</script>

<style scoped>
.profile {
  padding: 20px;
}
.user-info {
  border: 1px solid #ddd;
}
.user-info h2 {
  margin-top: 0;
}
</style>