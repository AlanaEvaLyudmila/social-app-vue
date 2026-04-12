<template>
  <div class="feed">
    <h1>Социальная сеть</h1>
    <PostForm v-model="newPost" @add="addPost"/>
    <div v-if="posts.length===0">
      Пока нет постов
    </div>

    <PostItem
      v-for="post in posts"
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
  import {ref, watch, onMounted} from 'vue'
  import PostForm from '../components/PostForm.vue'
  import PostItem from '../components/PostItem.vue'

  const newPost = ref('')
  const posts = ref([])
  
  // Текущий пользователь (для примера - пользователь с id=1)
  const currentUserId = ref(1)

  onMounted(() => {
    const savedPosts = localStorage.getItem('posts');
    if(savedPosts){
      posts.value = JSON.parse(savedPosts)
    }
    else{
      posts.value = [
        {
          id: 1,
          text: "Мой первый пост",
          authorId: 1,
          likes: 0,
          liked: false,
          comments: [],
          isEdit: false
        }
      ]
    }
  })

  watch(posts, (newPost) => {
    localStorage.setItem('posts', JSON.stringify(newPost))
  }, {deep: true})

  function addPost(){
    posts.value.unshift({
      id: Date.now(),
      text: newPost.value,
      authorId: currentUserId.value,
      likes: 0,
      liked: false,
      comments: [],
      isEdit: false
    })
    newPost.value = ''
  } 

  const toggleLike = (postId) => {
    const post = posts.value.find(p => p.id === postId)
    if (post) {
      if (post.liked) {
        post.likes--
      } else {
        post.likes++
      }
      post.liked = !post.liked
    }
  }

  function deletePost(postId){
    posts.value = posts.value.filter(post => post.id !== postId)
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
    }
  }

  const addComment = (postId, commentText) => {
    const post = posts.value.find(p => p.id === postId)
    if (post) {
      post.comments.push({
        text: commentText
      })
    }
  }
</script>

<style scoped>
.post{
  border: 1px solid black;
  padding: 14px;
  border-radius: 10px;
}
</style>