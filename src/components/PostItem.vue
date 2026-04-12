<template>
  <div class="post">
    <p class="author">{{ post.author }}</p>
    <input v-if="isEditing" v-model="editText">
    <p class="postText" v-else>{{ post.text }}</p>
    
    <div class="actions">
      <button @click="$emit('like', post.id)">
        ❤ {{ post.likes }}
      </button>
      <button 
        v-if="post.author === userStore.username"
        @click="isEditing ? saveEdit() : (isEditing = true)"
      >
        {{ isEditing ? 'Сохранить' : 'Редактировать' }}
      </button>
      <button 
        v-if="post.author === userStore.username"
        @click="$emit('delete', post.id)"
      >
        Удалить
      </button>
    </div>
    
    <CommentSection 
      :comments="post.comments" 
      @add-comment="(comment) => $emit('add-comment', post.id, comment)"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import CommentSection from './CommentSection.vue'

const userStore = useUserStore()
const props = defineProps(['post'])
const emit = defineEmits(['like', 'delete', 'add-comment', 'edit'])

const isEditing = ref(false)
const editText = ref(props.post.text)

function saveEdit() {
  emit('edit', props.post.id, editText.value)
  isEditing.value = false
}
</script>

<style scoped>
.post{
  border: 1px solid black;
  padding: 14px;
  padding-top: 0%;
  border-radius: 10px;
}
</style>
