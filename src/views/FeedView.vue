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
    @toggle-edit="toggleEdit"
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
        {id:1, text:"Мой первый пост",likes:0}
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
      liked:false,
      comments:[],
      isEditing:false
    })

    newPost.value = ''
  }

  function toggleLike(postId){
    const post = posts.value.find(post => post.id === postId);
    if(post) {
      post.liked = !post.liked
      post.likes +=post.liked ? 1:-1
    }

  }
  function addComment(postId, commentText){
  const post = posts.value.find(p => p.id === postId)
  if(post && commentText.trim()){
    post.comments.push(commentText)
  }
}

function editPost(postId, newText){
  const post = posts.value.find(p => p.id === postId)
  if(post){
    post.text = newText
    post.isEditing = false
  }
}

function toggleEdit(postId){
  const post = posts.value.find(p => p.id === postId)
  if(post){
    post.isEditing = !post.isEditing
  }
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
