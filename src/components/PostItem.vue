<template>
    <div class="post">
      <div v-if="!isEditing">
        <p>{{ post.text }}</p>
      </div>

      <div v-else>
        <input v-model="editedText" />
      </div>
      <div class="actions">
        <button @click="$emit('like',post.id)">
          ❤{{post.likes}}
        </button>
      <button @click="$emit('delete',post.id)">
        Удалить
      </button>
      <button @click="startEdit">
    Редактировать
      </button>
      <button v-if="isEditing" @click="saveEdit">
        Сохранить
      </button>
        <button v-if="isEditing" @click="cancelEdit">
        Отмена
      </button>
      </div>
    </div>
    <div class="comments">
      <p v-for="(comment, index) in post.comments" :key="index">
        {{ comment }}
      </p>

      <input
        v-model="newComment"
        type="text"
        placeholder="Написать комментарий"
      />

      <button @click="addComment">
        Отправить
      </button>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const isEditing = ref(false)
const editedText = ref('')

const props = defineProps(['post'])
defineEmits(['like','delete'])
const newComment = ref('')

function startEdit() {
  isEditing.value = true
  editedText.value = props.post.text
}

function saveEdit() {
  if (editedText.value.trim() === '') return

  props.post.text = editedText.value
  isEditing.value = false
}
function cancelEdit() {
  isEditing.value = false
  editedText.value = props.post.text
}

function addComment() {
  if (newComment.value.trim() !== '') {
    props.post.comments.push(newComment.value)
    newComment.value = ''
  }
}
</script>

<style scoped>
.post{
  background:white;
  padding:20px;
  border-radius:16px;
  box-shadow:0 6px 18px rgba(0,0,0,0.08);
}

.post p{
  margin-bottom:15px;
  font-size:18px;
}

.actions{
  display:flex;
  gap:10px;
  margin-bottom:15px;
}

button{
  border:none;
  padding:10px 14px;
  border-radius:10px;
  cursor:pointer;
  background:#f1f5f9;
  transition:0.2s;
}

button:hover{
  background:#dbeafe;
}

.comments{
  margin-top:15px;
}

.comments input{
  width:100%;
  padding:10px;
  border:1px solid #ddd;
  border-radius:10px;
  margin-bottom:10px;
}
</style>