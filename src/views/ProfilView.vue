<template>
  <article>
    <h1>Страница профиля</h1>
    <h2>{{ user.name }}</h2>
    <p>{{ user.description }}</p>
    <p>Количество постов: {{ user.posts.length }}</p>

    <div v-if="user.posts.length > 0">
      <PostItem v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </article>
</template>

<script setup>
import PostItem from '../components/PostItem.vue';
import { reactive } from 'vue';

const user = reactive({
  name: 'Цагараева Арина',
  description: 'Студентка 2 курса матфака СОГУ',
  posts: [],
});
</script>

<style></style>