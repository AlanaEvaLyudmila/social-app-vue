<template>
    <div class="box">
      <input type="text" 
       :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
      placeholder="Что у вас нового?">
      <button @click="emit('add')">Добавить</button>
    </div>
</template>

<script setup>
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue','add'])
</script>
