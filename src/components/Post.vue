<template>
  <div class="post">
    <p v-if="!isEditing">{{ post.text }}</p>
    <textarea v-else v-model="editedText" rows="3"></textarea>
    <div v-if="isEditing">
      <button @click="saveEdit">Сохранить</button>
      <button @click="cancelEdit">Отмена</button>
    </div>
    
    <div class="actions">
      <button @click="toggleLike" :class="{ liked: post.liked }">👍 {{ post.likes }}</button>
      <button @click="$emit('delete', post.id)">🗑 Удалить</button>
      <button v-if="!isEditing" @click="startEdit">✏ Редактировать</button>
    </div>
    
    <div class="comments">
      <h4>Комментарии</h4>
      <div v-for="comment in post.comments" :key="comment.id" class="comment">
        <strong>{{ comment.author }}:</strong> {{ comment.text }}
      </div>
      <div class="add-comment">
        <input v-model="newComment" @keyup.enter="addComment" placeholder="Написать комментарий..." />
        <button @click="addComment">Отправить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['post'])
const emit = defineEmits(['like', 'delete', 'edit', 'add-comment'])

const isEditing = ref(false)
const editedText = ref(props.post.text)
const newComment = ref('')

const toggleLike = () => {
  emit('like', props.post.id, !props.post.liked)
}

const startEdit = () => {
  isEditing.value = true
}

const saveEdit = () => {
  if (editedText.value.trim()) {
    emit('edit', props.post.id, editedText.value)
    isEditing.value = false
  }
}

const cancelEdit = () => {
  isEditing.value = false
  editedText.value = props.post.text
}

const addComment = () => {
  if (newComment.value.trim()) {
    emit('add-comment', props.post.id, {
      id: Date.now(),
      author: 'Пользователь',
      text: newComment.value.trim()
    })
    newComment.value = ''
  }
}
</script>

<style scoped>
.post { border: 1px solid #ddd; padding: 15px; margin-bottom: 20px; border-radius: 8px; }
.actions { display: flex; gap: 10px; margin: 10px 0; }
.actions button { padding: 5px 10px; cursor: pointer; }
.actions button.liked { background: #4CAF50; color: white; }
.comments { margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee; }
.comment { background: #f5f5f5; padding: 5px 10px; margin: 5px 0; border-radius: 5px; }
.add-comment { display: flex; gap: 10px; margin-top: 10px; }
.add-comment input { flex: 1; padding: 5px; }
</style>