<template>
  <div class="submit-area">
    <button
      class="primary-btn"
      :class="[status, { disabled: disabled }]"
      :disabled="disabled || status === 'loading'"
      @click="$emit('click')"
    >
      <span v-if="status === 'idle'">Start Generation <i class="icon">✨</i></span>
      <span v-else-if="status === 'loading'" class="loading-state">
        <span class="spinner"></span> Generating...
      </span>
      <span v-else-if="status === 'success'">Success! 🎉</span>
      <span v-else-if="status === 'error'">Failed. Try Again ❌</span>
    </button>
    
    <transition name="fade">
      <div v-if="status === 'success'" class="status-message success-message">
        Your AI video workflow has been successfully initiated.
      </div>
      <div v-else-if="status === 'error'" class="status-message error-message">
        There was a problem initiating the workflow. Please try again.
      </div>
    </transition>
  </div>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: 'idle' // 'idle', 'loading', 'success', 'error'
  }
});
defineEmits(['click']);
</script>

<style scoped>
.submit-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
}

.primary-btn {
  width: 100%;
  padding: 16px 24px;
  border-radius: 14px;
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.primary-btn.idle {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: white;
  box-shadow: 0 4px 15px var(--primary-glow);
}

.primary-btn.idle:hover:not(.disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--primary-glow);
}

.primary-btn.disabled {
  background: var(--bg-surface);
  color: var(--text-muted);
  cursor: not-allowed;
  box-shadow: none;
  border: 1px solid var(--border-color);
}

.primary-btn.loading {
  background: var(--bg-surface);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  cursor: wait;
}

.primary-btn.success {
  background: var(--success-color);
  color: white;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.primary-btn.error {
  background: var(--error-color);
  color: white;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
}

.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s ease-in-out infinite;
  margin-right: 8px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.status-message {
  font-size: 0.9rem;
  text-align: center;
  padding: 12px 16px;
  border-radius: 8px;
  width: 100%;
}

.success-message {
  background: rgba(16, 185, 129, 0.1);
  color: var(--success-color);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.error-message {
  background: rgba(239, 68, 68, 0.1);
  color: var(--error-color);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
