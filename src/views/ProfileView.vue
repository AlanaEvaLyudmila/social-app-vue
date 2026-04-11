<template>
    <div class="profile">
        
        <h1>Профиль</h1>
        <div class="user-info">
            <h2>{{ userName }}</h2>
            <p>{{ userBio }}</p>
        </div>

        <div class="stats">
            <p>Всего постов: {{ userPosts.length }}</p>
        </div>

        <h3>Мои посты</h3>
        <div v-if="userPosts.length === 0">
            <p>Пока постов нет</p>
        </div>
        <div v-else>
            <PostItem 
                v-for="post in userPosts"
                v-bind:key="post.id"
                v-bind:post="post"
                @like="handleLike"
                @delete="handleDelete"
                @update="handleUpdate"
                @add-comment="handleAddComment"    
            />
        </div>
    </div>
</template>

<script setup>
    import {ref, computed, onMounted, handleError} from 'vue'
    import PostItem from '@/components/PostItem.vue';

    const userName = "Профиль"
    const userBio = 'Обо мне'

    const posts = ref([])

    onMounted(() => {
        const savedPosts = localStorage.getItem('posts')
        posts.value = savedPosts ? JSON.parse(savedPosts) : []
    })

    const userPosts = computed(() => {
        return posts.value.filter(posts => post.author === userName)
    })

    function handleLike(postId) {
        const targetPost = posts.value.find(p => p.id === postId)
        if (targetPost) {
            targetPost.likes = targetPost.likes === 0 ? 1 : 0
            saveToLocalStorage()
        }
    }

    function handleDelete(params) {
        posts.value = posts.value.filter(p => p.id !== postId)
        saveToLocalStorage()
    }

    function handleUpdate(params) {
        const targetPost = posts.value.find(p => p.id === id)
        if (targetPost) {
            targetPost.Text = text
            saveToLocalStorage()
        }
    }

    function handleAddComment(params) {
        const targetPost = posts.value.find(p => p.id === postId)
        if (targetPost) {
            if (!targetPost.comments) {
                targetPost.comments = []
            }
            targetPost.comments.push(comment)
            saveToLocalStorage()
        }
    }

    function saveToLocalStorage(params) {
        localStorage.setItem('posts', JSON.stringify(posts.value))
    }

</script>

<style>
    .profile{
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
    }
    .user-info{
        background: #f0f0f0;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
    }
    .stats{
        font-weight: bold;
    }
</style>