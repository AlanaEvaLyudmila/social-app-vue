<template>
  <article class="post">
    <div class="post-content">
      <div style="">
        <h2 style="margin: 0" v-if="!isEditing">{{ post.text }}</h2>
        <input
          v-if="isEditing"
          placeholder="New text..."
          v-model.trim="edited"
        />
        <div class="actions">
          <button @click="$emit('like', post.id)">
            {{ post.liked ? '❤' : '💥' }}{{ post.likes }}
          </button>
          <button @click="$emit('delete', post.id)">Удалить</button>
        </div>
      </div>

      <div class="buttons">
        <button v-if="!isEditing" @click="editings.toggleEditing">
          Редактировать
        </button>
        <button v-if="isEditing" @click="editings.saveEditing">
          Сохранить
        </button>
        <button v-if="isEditing" @click="editings.cancelEditing">Отмена</button>
      </div>
    </div>

    <div class="create-comment-block">
      <input
        v-model.trim="comment"
        :placeholder="
          post.comments.length === 0
            ? `Напишите первый комментарий`
            : `Напишите комментарий`
        "
      />
      <button @click="comments.addComment">Отправить</button>
    </div>

    <div v-if="post.comments.length > 0" class="post-comments">
      <PostComment
        v-for="comment in post.comments"
        :key="comment.id"
        :comment="comment"
      />
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue';
import PostComment from './PostComment.vue';

let isEditing = ref(false);
let edited = ref('');

let comment = ref('');

const editings = {
  toggleEditing() {
    isEditing.value = !isEditing.value;
  },

  cancelEditing() {
    isEditing.value = false;
  },
  saveEditing() {
    post.text = edited;
    edited = '';
    isEditing.value = false;
  },
};

const comments = {
  addComment() {
    if (!comment) return;

    post.comments.push({
      id: Date.now(),
      text: comment,
    });

    comment = '';
  },
};

const { post } = defineProps(['post']);
defineEmits(['like', 'delete']);
</script>

<style>
.post-content {
  display: flex;
  justify-content: space-between;
}

.buttons {
  display: flex;
  flex-direction: column;
}
.create-comment-block {
  display: flex;
  gap: 2px;

  & input {
    width: 100%;
  }
}
.post-comments {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
</style>
