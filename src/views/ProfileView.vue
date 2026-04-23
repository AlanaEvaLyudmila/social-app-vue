<template>
  <article>
    <h1>Страница профиля</h1>
    <h2>{{ user.username }}</h2>
    <p>{{ user.description }}</p>
    <p>Count of posts: {{ user.posts.length }}</p>

    <div v-if="user.posts.length > 0">
      <PostItem v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </article>
</template>

<script setup>
import PostItem from '@/components/PostItem.vue';
import { reactive } from 'vue';

const user = reactive({
  username: 'AmletixQ',
  description: 'AmletixQ is the best',
  posts: [],
});
</script>

<style></style>
