<template>
    <div class="post">

      <div v-if="!isEditing">

        <p>{{post.text}}</p>

        <div class="actions">
          <button @click="$emit('like',post.id)">❤{{post.likes}}</button>
          <button @click="editing">Редактировать</button>
          <button @click="$emit('delete',post.id)">Удалить</button>
        </div>

      </div>
      
      <div v-else>
        <textarea v-model="editedText"></textarea>
        <div class="edit-actions">
          <button @click="saveEdit">Сохранить</button>
          <button @click="cancelEdit">Отмена</button>
        </div>
      </div>


      <div class="comments-section">
        <h4>Комментарии {{ post.comments.length }}</h4>

        <div v-if="post.comments && post.comments.length">

          <div v-for="comment in post.comments" class="comment">
            <p>{{ comment.text }}</p>
          </div>

        </div>

        <p v-else> Будьте первым комментатором</p>

      </div>
      
      <div class="add-comment">
        <input v-model="newComment" @keyup.enter="addComment" type="text">
        <button @click="addComment" v-bind:disabled="!newComment.trim()">Отправить</button>
      </div>

    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(
  {
    post:{
      type: Object,
      required: true
    }
  }
)

const emit = defineEmits(['like', 'delete', 'update', 'add-comment'])

const isEditing = ref(false)
const editedText = ref('')

const newComment = ref('')

function editing() {
  editedText.value = props.post.text
  isEditing.value = true
    console.log('editing, text =', editedText.value);
}

function saveEdit() {
  if (editedText.value.trim() && editedText.value !== props.post.text) {
    emit('update', {
      id: props.post.id,
      text: editedText.value.trim()
    })
  }
  isEditing.value = false
}

function addComment() {
  const text = newComment.value.trim()
  if (!text) {
    return
  }

  emit('add-comment', {
    postId: props.post.id,
    comment: {
      id:Date.now(),
      text: text
    }
  })
  newComment.value = ''
}

</script>

<style scoped>
  .post{
    border: 1px solid #ccc;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 8px;
    background: #f9f9f9;
  }
  .actions{
    display: flex;
    gap: 10px;
    align-items: center;
    margin: 10px 0;
  }
  button{
    cursor: pointer;
    padding: 4px 8px;
  }
  .comment{
    background: white;
    padding: 8px;
    margin: 5px 0;
    border-radius: 4px;
  }
  .add-comment{
    display: flex;
    gap: 5px;
    margin-top: 10px;
  }
  .add-comment input{
    flex: 1;
    padding: 6;
  }
  .edit-actions{
    margin-top: 8px;
    display: flex;
    gap: 8px;
  }
  textarea{
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
</style>