<template>
  <div class="comment">
    <p>{{ comment.text }}</p>
  </div>
</template>

<script setup>
defineProps(['comment']);
</script>

<style>
.comment {
  border: 1px solid gray;
  padding: 0.4rem;
}
</style>