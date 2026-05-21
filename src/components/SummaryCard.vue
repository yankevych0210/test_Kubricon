<template>
  <div class="summary-card">
    <h3 class="summary-title">Summary</h3>
    
    <div class="summary-grid">
      <div class="summary-item">
        <span class="label">Workflow</span>
        <span class="value" :class="{ 'placeholder': !workflow }">
          {{ workflow || 'Not selected' }}
        </span>
      </div>
      
      <div class="summary-item">
        <span class="label">Aspect Ratio</span>
        <span class="value" :class="{ 'placeholder': !aspectRatio }">
          {{ aspectRatio || 'Not selected' }}
        </span>
      </div>
      
      <div class="summary-item">
        <span class="label">Duration</span>
        <span class="value" :class="{ 'placeholder': !duration }">
          {{ duration || 'Not selected' }}
        </span>
      </div>
      
      <div class="summary-item full-width">
        <span class="label">Prompt</span>
        <span class="value prompt-value" :class="{ 'placeholder': !prompt }">
          {{ prompt || 'No prompt entered' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  workflow: String,
  aspectRatio: String,
  duration: String,
  prompt: String
});
</script>

<style scoped>
.summary-card {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 20px 24px;
  margin-bottom: 24px;
  backdrop-filter: blur(12px);
}

.summary-title {
  margin: 0 0 16px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
}

.summary-title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 16px;
  background: var(--primary-color);
  border-radius: 4px;
  margin-right: 8px;
}

.summary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.full-width {
  grid-column: 1 / -1;
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.value {
  font-size: 0.95rem;
  color: var(--text-primary);
  font-weight: 500;
}

.value.placeholder {
  color: var(--text-muted);
  font-style: italic;
  font-weight: 400;
}

.prompt-value {
  white-space: pre-wrap;
  word-break: break-word;
  background: var(--bg-surface);
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  margin-top: 4px;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Mobile optimizations */
@media (max-width: 480px) {
  .summary-card {
    padding: 16px;
  }
  
  .summary-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .full-width {
    grid-column: 1;
  }
}
</style>
