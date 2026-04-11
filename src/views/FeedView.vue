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
    @update="updatePost"
    @add-comment="addComment"
    />
  </div>
</template>

<script setup>
  import {ref, watch,onMounted} from 'vue'
  import PostForm from '../components/PostForm.vue'
  import PostItem from '../components/PostItem.vue'

  const newPost = ref('')
  const posts = ref([])

  onMounted(()=>{
    const savedPosts = localStorage.getItem('posts');
    if(savedPosts){
      posts.value = JSON.parse(savedPosts)
    }
    else{
      posts.value = [
        {id:1, text:"Мой первый пост",likes:0, comments:[]}
      ]
    }
  })

  watch(
    posts, (newPost) =>{
      localStorage.setItem('posts',JSON.stringify(newPost))
    },
    {deep:true}
  )


  function addPost(){
    posts.value.unshift({
      id: Date.now(),
      text:newPost.value,
      likes:0,
      comments: []
    })

    newPost.value = ''
  }

  function toggleLike(postId){
    const post = posts.value.find(post => post.id === postId);
    if(post) post.likes = post.likes > 0 ? post.likes - 1 : post.likes + 1;
  }

  function deletePost(postId){
    posts.value = posts.value.filter(post => post.id !== postId)
  }

  function updatePost({id, text}) {
    const post = posts.value.find(p => p.id === id)
    if (post) {
      post.text = text
    }
  }

  function addComment({ postId, comment }) {
    const post = posts.value.find(p => p.id === postId)
    if (post) {
      if (!post.comments) {
        post.comments = []
      }
      post.comments.push(comment)
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
