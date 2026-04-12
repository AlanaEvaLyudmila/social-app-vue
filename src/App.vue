<template>
  <div class="app">
    <nav class="nav">
      <RouterLink to="/">Лента</RouterLink>
      <RouterLink to="/stats">Статистика</RouterLink>
      <RouterLink to="/profile">Профиль</RouterLink>
      <button v-if="userStore.username" @click="logout">Выйти</button>
    </nav>
    
    <div v-if="!userStore.username" class="login">
      <input v-model="inputName" placeholder="Введите имя">
      <button @click="login">Войти</button>
    </div>
    
    <RouterView v-else />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from './stores/user'

const userStore = useUserStore()
const inputName = ref('')

function login() {
  if (inputName.value.trim()) {
    userStore.setUser(inputName.value)
  }
}

function logout() {
  userStore.setUser('')
  localStorage.removeItem('username')
}
</script>