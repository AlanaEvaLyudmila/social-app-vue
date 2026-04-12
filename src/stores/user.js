import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const username = ref(localStorage.getItem('username') || '')
  const bio = ref('')

  function setUser(name) {
      username.value = name
      localStorage.setItem('username', name)
    }

  function updateBio(newBio) {
    bio.value = newBio
  }

  function setUser(name) {
      username.value = name
      if (name) {
        localStorage.setItem('username', name)
      } else {
        localStorage.removeItem('username')
      }
    }

  return { username, bio, setUser, updateBio }
})