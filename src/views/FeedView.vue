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
    />
  </div>
</template>
<script setup>
  import {ref} from 'vue'
  import PostForm from '../components/PostForm.vue'
  import PostItem from '../components/PostItem.vue'

  const newPost = ref('')

  const posts = ref([
    {id: 1, text:"Мой первый пост", likes: 0}
  ])

  function addPost(){
    posts.value.unshift({
      id: Date.now(),
      text:newPost.value,
      likes:0
    })

    newPost.value = ''
  }

  function toggleLike(postId){
    const post = posts.value.find(post => post.id === postId);
    if(post) post.likes++;
  }

  function deletePost(postId){
    posts.value = posts.value.filter(post => post.id !== postId)
  }


</script>

<style scoped>
.post{
  border: 1px solid black;
  padding: 14px;
  border-radius: 10px;
}
</style>
