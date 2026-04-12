<template>
  <div class="comments">
    <div v-for="comment in comments" :key="comment.id" class="comment">
      {{ comment.text }}
    </div>
    <input v-model="newComment" placeholder="Комментарий...">
    <button @click="addComment">Отправить</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['comments'])
const emit = defineEmits(['add-comment'])

const newComment = ref('')

function addComment() {
  if (!newComment.value.trim()) return
  emit('add-comment', {
    id: Date.now(),
    text: newComment.value
  })
  newComment.value = ''
}
</script>