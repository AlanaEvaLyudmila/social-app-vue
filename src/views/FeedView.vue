<template>
  <div class="feed">
    <h1>Лента</h1>
    <div class="add-post">
      <input v-model="newPost" @keyup.enter="addPost" placeholder="Что нового?" />
      <button @click="addPost">Добавить</button>
    </div>
    <Post v-for="post in posts" :key="post.id" :post="post" 
      @like="toggleLike" @delete="deletePost" @edit="editPost" @add-comment="addComment" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Post from '../components/Post.vue'

const posts = ref([])
const newPost = ref('')

onMounted(() => {
  const saved = localStorage.getItem('posts')
  if (saved) posts.value = JSON.parse(saved)
})

const save = () => localStorage.setItem('posts', JSON.stringify(posts.value))

const addPost = () => {
  if (newPost.value.trim()) {
    posts.value.unshift({ id: Date.now(), text: newPost.value, likes: 0, liked: false, comments: [] })
    newPost.value = ''
    save()
  }
}

const toggleLike = (id, liked) => {
  const post = posts.value.find(p => p.id === id)
  if (post) {
    if (liked) { post.likes++; post.liked = true }
    else { post.likes--; post.liked = false }
    save()
  }
}

const deletePost = (id) => {
  posts.value = posts.value.filter(p => p.id !== id)
  save()
}

const editPost = (id, newText) => {
  const post = posts.value.find(p => p.id === id)
  if (post) { post.text = newText; save() }
}

const addComment = (id, comment) => {
  const post = posts.value.find(p => p.id === id)
  if (post) { post.comments.push(comment); save() }
}
</script>

<style scoped>
.feed { max-width: 600px; margin: 0 auto; padding: 20px; }
.add-post { display: flex; gap: 10px; margin-bottom: 20px; }
.add-post input { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
.add-post button { padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; }
</style>