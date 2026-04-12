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
    import { ref, watch } from 'vue'
    import { useRoute } from 'vue-router'
    import PostItem from '@/components/PostItem.vue';

    const route = useRoute()

    const userName = "Профиль"
    const userBio = 'Обо мне'

    const userPosts = ref([])

    function loadPosts() {
        const saved = localStorage.getItem('posts')
        const allPosts = saved ? JSON.parse(saved) : []
        userPosts.value = allPosts.filter(post => post.author === userName)
    }

    loadPosts()

    watch(
        () => route.path,
        (newPath) => {
            if (newPath === '/profile') {
                loadPosts()
            }
        },
        { immediate: true }
    )

    function handleLike(postId) {
        const saved = localStorage.getItem('posts')
        const allPosts = saved ? JSON.parse(saved) : []
        const post = allPosts.find(p => p.id === postId)
        if (post) {
            post.likes = post.likes > 0 ? post.likes - 1 : post.likes + 1;
            saveAndReload(allPosts)
        }
    }

    function handleDelete(postId) {
        const saved = localStorage.getItem('posts')
        let allPosts = saved ? JSON.parse(saved) : []
        allPosts = allPosts.filter(p => p.id !== postId)
        saveAndReload(allPosts)
    }

    function handleUpdate({ id, text }) {
        const saved = localStorage.getItem('posts')
        const allPosts = saved ? JSON.parse(saved) : []
        const post = allPosts.find(p => p.id === id)
        if (post) {
            post.text = text
            saveAndReload(allPosts)
        }
    }

    function handleAddComment({ postId, comment }) {
        const saved = localStorage.getItem('posts')
        const allPosts = saved ? JSON.parse(saved) : []
        const post = allPosts.find(p => p.id === postId)
        if (post) {
            if (!post.comments) {
                post.comments = []
            }
            post.comments.push(comment)
            saveAndReload(allPosts)
        }
    }

    function saveAndReload(updatedPosts) {
        localStorage.setItem('posts', JSON.stringify(updatedPosts))
        loadPosts()
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