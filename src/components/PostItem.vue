<template>
  <div class="post">
    <div style="">
      <p style="margin: 0" v-if="!isEditing">{{ post.text }}</p>
      <input v-if="isEditing" placeholder="Новый текст" v-model.trim="edited" />
      <div class="actions">
        <button @click="$emit('like', post.id)">
          {{ post.liked ? '💙' : '🖤' }}{{ post.likes }}
        </button>
        <button @click="$emit('delete', post.id)">Удалить</button>
      </div>

      <div>
        <input v-model="comment" placeholder="напиши комментарий.."  />
        <button @click="addComment">отправить</button>
      </div>
      <div v-if="post.comments.length > 0">
        <PostComment
          v-for="comment in post.comments"
          :key="comment.id"
          :comment="comment"
        />
      </div>
    </div>
    <div class="buttons">
      <button v-if="!isEditing" @click="toggleEditing">Редактировать</button>
      <button v-if="isEditing" @click="saveEditing">Сохранить</button>
      <button v-if="isEditing" @click="cancelEditing">Отмена</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PostComment from './PostComment.vue';

let isEditing = ref(false)
let edited = ref('')

let comment= ref('')

function addComment(){
  post.comments.push({
    id: Date.now(),
    text: comment
  })
  comment=''
}

function toggleEditing() {
  isEditing.value = !isEditing.value
}
function cancelEditing() {
  isEditing.value = false
}
function saveEditing() {
  post.text = edited
  edited = ''
  isEditing.value = false
}

const { post } = defineProps(['post'])
defineEmits(['like', 'delete'])
</script>
