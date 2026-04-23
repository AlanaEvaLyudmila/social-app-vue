<template>
  <div class="post">
    <div v-if="post.isEditing">
      <input v-model="editText" />
      <button @click="saveEdit">Сохранить</button>
    </div>

    <div v-else>
      <p>{{ post.text }}</p>
    </div>
    <div class="actions">
      <button @click="$emit('like', post.id)">
        ❤ {{ post.likes }}
      </button>

      <button @click="$emit('toggle-edit', post.id)">
        Редактировать
      </button>

      <button @click="$emit('delete', post.id)">
        Удалить
      </button>
    </div>
    <div class="comments">
      <h4>Комментарии:</h4>

      <div v-if="post.comments.length === 0">
        Нет комментариев
      </div>

      <ul>
        <li v-for="(comment, index) in post.comments" :key="index">
          {{ comment }}
        </li>
      </ul>

      <input
        v-model="newComment"
        placeholder="Написать комментарий..."
      />
      <button @click="addComment">Отправить</button>
    </div>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['post'])

const emit = defineEmits([
  'like',
  'delete',
  'add-comment',
  'edit',
  'toggle-edit'
])

const newComment = ref('')
const editText = ref(props.post.text)
watch(() => props.post.isEditing, (val) => {
  if(val){
    editText.value = props.post.text
  }
})

function addComment(){
  if(newComment.value.trim()){
    emit('add-comment', props.post.id, newComment.value)
    newComment.value = ''
  }
}

function saveEdit(){
  emit('edit', props.post.id, editText.value)
}
</script>