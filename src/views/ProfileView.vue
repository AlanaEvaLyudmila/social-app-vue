<template>
  <div class="profile">
    <h1>{{ userStore.username }}</h1>
    
    <div v-if="isEditingBio">
      <textarea v-model="newBio"></textarea>
      <button @click="saveBio">Сохранить</button>
      <button @click="isEditingBio = false">Отмена</button>
    </div>
    <div v-else>
      <p>{{ userStore.bio || 'Нет информации' }}</p>
      <button @click="isEditingBio = true">Редактировать</button>
    </div>
    
    <p>Постов: {{ posts.length }}</p>
    
    <div v-if="posts.length === 0">Нет постов</div>
    <PostItem
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @like="toggleLike"
      @delete="deletePost"
      @add-comment="addComment"
      @edit="editPost"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '../stores/user'
import PostItem from '../components/PostItem.vue'

const userStore = useUserStore()
const isEditingBio = ref(false)
const newBio = ref(userStore.bio)
const allPosts = ref([])

onMounted(() => {
  const savedPosts = localStorage.getItem('posts')
  if (savedPosts) {
    allPosts.value = JSON.parse(savedPosts)
    allPosts.value.forEach(post => {
      if (!post.author) post.author = 'Пользователь'
    })
  }
})

const posts = computed(() => 
  allPosts.value.filter(post => post.author === userStore.username)
)

function saveBio() {
  userStore.updateBio(newBio.value)
  isEditingBio.value = false
}

function toggleLike(postId) {
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    post.liked = !post.liked
    post.likes = post.liked ? 1 : 0
  }
  localStorage.setItem('posts', JSON.stringify(posts.value))
}

function deletePost(postId) {
  posts.value = posts.value.filter(p => p.id !== postId)
  localStorage.setItem('posts', JSON.stringify(posts.value))
}

function addComment(postId, comment) {
  const post = posts.value.find(p => p.id === postId)
  if (post) post.comments.push(comment)
  localStorage.setItem('posts', JSON.stringify(posts.value))
}

function editPost(postId, newText) {
  const post = posts.value.find(p => p.id === postId)
  if (post) post.text = newText
  localStorage.setItem('posts', JSON.stringify(posts.value))
}
</script>