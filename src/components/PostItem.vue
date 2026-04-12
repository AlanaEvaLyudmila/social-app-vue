<template>
    <div class="post">
      
      <p v-if="!post.isEdit">{{post.text}}</p>
      <textarea v-else v-model="editText"></textarea>
      
      <div class="actions">
        <button @click="$emit('like', post.id)">
          ❤{{post.likes}}
        </button>
        <button @click="$emit('delete', post.id)">
          Удалить
        </button>
        <button 
          v-if="!post.isEdit && post.authorId === currentUserId" 
          @click="$emit('startEdit', post.id)"
        >
          Редактировать
        </button>
        <button v-if="post.isEdit" @click="saveEdit">
          Сохранить
        </button>
      </div>
      
      <div>
        <div v-for="comment in post.comments" :key="comment.id">
          {{comment.text}}
        </div>
        <input v-model="newComment" placeholder="Комментарий">
        <button @click="addComment">Добавить</button>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['post', 'currentUserId'])
const emit = defineEmits(['like', 'delete', 'startEdit', 'saveEdit', 'addComment'])

const editText = ref(props.post.text)
const newComment = ref('')

const saveEdit = () => {
  emit('saveEdit', props.post.id, editText.value)
}

const addComment = () => {
  if(newComment.value.trim()) {
    emit('addComment', props.post.id, newComment.value)
    newComment.value = ''
  }
}
</script>