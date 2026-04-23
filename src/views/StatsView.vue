<template>
    <div class="stats">
        <h1>Статистика</h1>
        <p>Всего постов: {{totalPosts}}</p>
        <p>Всего лайков:{{totalLikes}} </p>
        <p>Среднее количество лайков:{{averageLikes}} </p>

        <div v-if="mostPopularPost">
            <h2>Самый популярный пост</h2>
            <p>{{mostPopularPost.text}}</p>
            <p>Лайков: {{mostPopularPost.likes}}</p>
        </div>

    </div>
</template>
<script setup>
import {ref,computed,onMounted} from 'vue'

const posts = ref([])

onMounted(() =>{
    const savedPosts = localStorage.getItem('posts')
    posts.value = savedPosts ? JSON.parse(savedPosts): []
})

const totalPosts = computed(()=> posts.value.length)

const totalLikes = computed(()=>{
    return posts.value.reduce((sum,post) => sum + post.likes,0)
})

const averageLikes = computed(()=>{
    if(posts.value.length===0)  return 0
    return (totalLikes.value/posts.value.length).toFixed(0)
})

const mostPopularPost = computed(()=>{
     if(posts.value.length===0)  return null
    return [...posts.value].sort((a,b) => b.likes-a.likes)[0]
})

</script>
