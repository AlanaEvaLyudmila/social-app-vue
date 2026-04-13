<template>
    <div class="box">
      <input type="text" 
       :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
      placeholder="Что у вас нового???">
      <button @click="emit('add')">Добавить</button>
    </div>
</template>

<script setup>
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue','add'])
</script>

<style scoped>
.form{
  display:flex;
  gap:10px;
}

input{
  flex:1;
  padding:12px;
  border:1px solid #ddd;
  border-radius:10px;
  font-size:16px;
}

button{
  padding:12px 18px;
  border:none;
  background:#3b82f6;
  color:white;
  border-radius:10px;
  cursor:pointer;
}

button:hover{
  background:#2563eb;
}
</style>