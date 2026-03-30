<template>
  <div class="app">
    <h1>Социальная сеть</h1>
    <PostForm v-model="newPost" @add="addPost"/>
    <div v-if="posts.length===0">
      Пока нет постов
    </div>
    <div v-for="post in posts" :key="post.id" class="post">
      <p>{{post.text}}</p>
      <div class="actions">
        <button @click="toggleLike(post.id)">
          ❤{{post.likes}}
        </button>

      <button @click="deletePost(post.id)">
        Удалить
      </button>
      </div>
    </div>
  </div>
</template>
<script setup>
  import {ref} from 'vue'
  import PostForm from './components/PostForm.vue'

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
