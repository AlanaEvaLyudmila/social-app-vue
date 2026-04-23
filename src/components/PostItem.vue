<template>
  <div class="post">
    <div style="">
      <p style="margin: 0" v-if="!isEditing">{{ post.text }}</p>
      <input v-if="isEditing" placeholder="New text..." v-model.trim="edited" />
      <div class="actions">
        <button @click="$emit('like', post.id)">
          {{ post.liked ? '❤' : '💥' }}{{ post.likes }}
        </button>
        <button @click="$emit('delete', post.id)">Удалить</button>
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

let isEditing = ref(false);
let edited = ref('');

function toggleEditing() {
  isEditing.value = !isEditing.value;
}
function cancelEditing() {
  isEditing.value = false;
}
function saveEditing() {
  post.text = edited;
  edited = '';
  isEditing.value = false;
}

const { post } = defineProps(['post']);
defineEmits(['like', 'delete']);
</script>
