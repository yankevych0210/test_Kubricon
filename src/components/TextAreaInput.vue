<template>
  <div class="textarea-input">
    <label class="input-label" :for="id">{{ label }}</label>
    <textarea
      :id="id"
      class="custom-textarea"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      rows="4"
    ></textarea>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Enter your prompt here...'
  }
});
defineEmits(['update:modelValue']);

const id = computed(() => `textarea-${props.label.replace(/\s+/g, '-').toLowerCase()}`);
</script>

<style scoped>
.textarea-input {
  margin-bottom: 24px;
}

.input-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.custom-textarea {
  width: 100%;
  padding: 16px;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-primary);
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.custom-textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  background: var(--bg-surface-hover);
}

.custom-textarea::placeholder {
  color: var(--text-muted);
}
</style>
