<template>
    <div class="post-form">
        <textarea
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          placeholder="Что у вас нового?"
        ></textarea>
      <button @click="$emit('add')" :disabled="!modelValue.trim()">Добавить</button>
    </div>
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue','add'])
</script>
