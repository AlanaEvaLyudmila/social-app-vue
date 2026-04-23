<template>
    <div class="post">
      <p>{{post.text}}</p>
      <div class="actions">
        <button @click="$emit('like',post.id)">
          {{post.liked ? "❤" : "💥"}}{{post.likes}}
        </button>
      <button @click="$emit('delete',post.id)">
        Удалить
      </button>
      </div>
    </div>
</template>

<script setup>
defineProps(['post'])
defineEmits(['like','delete'])
</script>
