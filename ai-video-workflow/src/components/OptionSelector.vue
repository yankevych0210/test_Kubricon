<template>
  <div class="option-selector">
    <label class="selector-label">{{ label }}</label>
    <div class="options-container">
      <button
        v-for="option in options"
        :key="option"
        type="button"
        class="option-btn"
        :class="{ active: modelValue === option }"
        @click="$emit('update:modelValue', option)"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  }
});
defineEmits(['update:modelValue']);
</script>

<style scoped>
.option-selector {
  margin-bottom: 24px;
}

.selector-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.options-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.option-btn {
  flex: 1;
  min-width: calc(33.333% - 10px);
  padding: 12px 14px;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.option-btn:hover {
  background: var(--bg-surface-hover);
  border-color: var(--border-hover);
}

.option-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  box-shadow: 0 4px 12px var(--primary-glow);
  font-weight: 600;
}

/* Mobile optimizations */
@media (max-width: 480px) {
  .options-container {
    flex-direction: column;
    gap: 8px;
  }
  
  .option-btn {
    width: 100%;
    min-width: 100%;
    padding: 14px;
    font-size: 0.95rem;
  }
}
</style>
