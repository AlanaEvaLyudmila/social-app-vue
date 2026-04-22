<template>
  <div class="post">

    <div v-if="!isEditing">
      <p>{{ post.text }}</p>
      <button @click="startEdit">Редактировать</button>
    </div>

    <div v-else>
      <input v-model="editedText" />
      <button @click="saveEdit">Сохранить</button>
    </div>

    <div class="actions">
      <button @click="$emit('like', post.id)">
        ❤ {{ post.likes }}
      </button>

      <button @click="$emit('delete', post.id)">
        Удалить
      </button>
    </div>

    <div>
      <p>Комментарии:</p>

      <div v-for="(c, i) in comments" :key="i">
        {{ c }}
      </div>

      <input v-model="newComment" placeholder="Комментарий" />
      <button @click="addComment">Отправить</button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['post'])
const emit = defineEmits(['like', 'delete', 'edit'])

const isEditing = ref(false)
const editedText = ref('')

const comments = ref([])
const newComment = ref('')

function startEdit() {
  isEditing.value = true
  editedText.value = props.post.text
}

function saveEdit() {
  emit('edit', {
    id: props.post.id,
    text: editedText.value
  })
  isEditing.value = false
}

function addComment() {
  if (newComment.value.trim() === '') return

  comments.value.push(newComment.value)
  newComment.value = ''
}
</script>