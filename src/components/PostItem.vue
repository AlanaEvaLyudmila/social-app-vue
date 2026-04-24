<template>
  <div class="post">
    
    <div v-if="!isEditing">
      <p>{{ post.text }}</p>
    </div>

    <div v-else>
      <input v-model="editText" />
      <button @click="saveEdit">Сохранить</button>
      <button @click="isEditing = false">Отмена</button>
    </div>

    <div class="actions">
      <button @click="$emit('like', post.id)">
        ❤{{ post.likes }}
      </button>
      <button @click="$emit('delete', post.id)">
        Удалить
      </button>
      <button @click="startEdit">
        Редактировать
      </button>
    </div>

    <div class="comments">
      <p>Комментарии:</p>
      <p v-for="(comment, index) in post.comments" :key="index">
        {{ comment }}
      </p>
      <input v-model="newComment" placeholder="Оставьте комментарий" />
      <button @click="sendComment">Отправить</button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['post'])
const emit = defineEmits(['like', 'delete', 'comment', 'edit'])

const newComment = ref('')
const isEditing = ref(false)
const editText = ref('')

function sendComment() {
  if (!newComment.value.trim()) return

  emit('comment', props.post.id, newComment.value)
  newComment.value = ''
}

function startEdit() {
  isEditing.value = true
  editText.value = props.post.text
}

function saveEdit() {
  emit('edit', props.post.id, editText.value)
  isEditing.value = false
}

</script>
