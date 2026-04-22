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
    @edit="editPost"
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

    posts.value.forEach(post => {
      if(post.liked === undefined){
        post.liked = false
      }
    })
  }
  else{
    posts.value = [
      {id:1, text:"Мой первый пост", likes:0, liked:false}
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
    text: newPost.value,
    likes: 0,
    liked: false
  })
}

  function toggleLike(postId){
    const post = posts.value.find(post => post.id === postId)

    if(!post) return

    if(post.liked){
      post.likes--
    } else {
      post.likes++
    }

    post.liked = !post.liked
  }

  function deletePost(postId){
    posts.value = posts.value.filter(post => post.id !== postId)
  }

  function editPost(data){
  const post = posts.value.find(p => p.id === data.id)

  if(post){
    post.text = data.text
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
