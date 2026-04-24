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
  margin: 0;
  padding: 0;
}
</style>