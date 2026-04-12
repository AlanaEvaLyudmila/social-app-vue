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
      @like="toggleLike"
      @delete="deletePost"
      @add-comment="addComment"
      @edit="editPost"
    />
  </div>
</template>
<script setup>
  import { ref, watch, onMounted } from 'vue'
  import { useUserStore } from '../stores/user'
  import PostForm from '../components/PostForm.vue'
  import PostItem from '../components/PostItem.vue'

  const userStore = useUserStore()
  const newPost = ref('')
  const posts = ref([])

  onMounted(() => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      posts.value = JSON.parse(savedPosts)

      posts.value.forEach(post => {
        if (!post.author) post.author = 'Пользователь'
      })
    } else {
      posts.value = [
        { id: 1, text: "Мой первый пост", likes: 0, liked: false, comments: [], author: userStore.username || 'Пользователь' }
      ]
    }
  })

  watch(
    posts, (newPost) =>{
      localStorage.setItem('posts',JSON.stringify(newPost))
    },
    {deep:true}
  )


  function addPost() {
    posts.value.unshift({
      id: Date.now(),
      text: newPost.value,
      likes: 0,
      liked: false,
      comments: [],
      author: userStore.username
    })
    newPost.value = ''
  }

  function toggleLike(postId) {
    const post = posts.value.find(post => post.id === postId)
    if (post) {
      post.likes = post.liked ? 0 : 1
      post.liked = !post.liked
    }
  }

  function deletePost(postId){
    posts.value = posts.value.filter(post => post.id !== postId)
  }
  
  function addComment(postId, comment) {
    const post = posts.value.find(p => p.id === postId)
    if (post) post.comments.push(comment)
  }

  function editPost(postId, newText) {
    const post = posts.value.find(p => p.id === postId)
    if (post) post.text = newText
  }

</script>