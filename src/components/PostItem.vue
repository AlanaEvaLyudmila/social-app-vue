<template>
    <div class="post"> 
      <div v-if="!isEditing">
      <p>{{post.text}}</p> 
      </div>

<div v-else>
      <textarea 
        v-model="editText"  rows="3"
      ></textarea>
      <div  >
        <button @click="saveEdit">Сохранить</button>
        <button @click="cancelEdit"  >Отмена</button>
      </div>
    </div>

      <div class="actions">
        <button @click="$emit('like',post.id)"
        :style="{color:post.isLiked? 'red':'black'}">
          ❤{{post.likes}}
        </button>
        <button @click="startEdit" v-if="!isEditing">edit</button>
      <button @click="$emit('delete',post.id)">
        Удалить
      </button>
      </div>

<div  >
  <h4  >Комментарии</h4> 
  <div v-if="post.comments && post.comments.length > 0" >
    <div v-for="comment in post.comments" :key="comment.id" class="comment" >
      {{ comment.text }}
    </div>
  </div>
  <div v-else  >
    Пока нет комментариев
  </div>
   
  <div  >
    <input 
      v-model="newComment"  
      @keyup.enter="addComment" 
    />
    <button @click="addComment">Отправить</button>
  </div>
</div>


    </div>
</template>

<script setup>
import {ref} from 'vue'
const props=defineProps(['post'])
const emits=defineEmits(['like','delete', 'update'])

const isEditing = ref(false)
const editText = ref('test')

function startEdit() {
  editText.value = props.post.text
  isEditing.value = true
}

function cancelEdit() {
  isEditing.value = false
  editText.value = ''
}
  
function saveEdit() {
  if (editText.value.trim()) {
    emits('update', props.post.id, editText.value)
  }
  cancelEdit()
}
  const newComment = ref('')

function addComment() {
  if (!newComment.value) return
   
  if (!props.post.comments) {
    props.post.comments = []
  }
  props.post.comments.push({
              
    text: newComment.value
  }) 
  newComment.value = ''

}
</script>
