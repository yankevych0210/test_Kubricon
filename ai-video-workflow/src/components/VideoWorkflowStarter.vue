<template>
  <div class="workflow-starter-container">
    <header class="app-header">
      <div class="logo-placeholder">AI</div>
      <h1>Video Workflow</h1>
      <p class="subtitle">Configure parameters to generate your next AI-powered video.</p>
    </header>

    <main class="main-content">
      <form @submit.prevent="handleSubmit" class="workflow-form">
        <OptionSelector
          label="Workflow"
          v-model="state.workflow"
          :options="workflowOptions"
        />

        <div class="row">
          <OptionSelector
            class="flex-1"
            label="Aspect Ratio"
            v-model="state.aspectRatio"
            :options="aspectRatioOptions"
          />

          <OptionSelector
            class="flex-1"
            label="Duration"
            v-model="state.duration"
            :options="durationOptions"
          />
        </div>

        <TextAreaInput
          label="Prompt / Description"
          v-model="state.prompt"
          placeholder="Describe your video in detail. What happens? What is the mood?"
        />

        <SummaryCard
          :workflow="state.workflow"
          :aspectRatio="state.aspectRatio"
          :duration="state.duration"
          :prompt="state.prompt"
        />

        <PrimaryButton
          :disabled="!isFormValid"
          :status="state.status"
          @click="handleSubmit"
        />
      </form>
    </main>
  </div>
</template>

<script setup>
import { useWorkflowForm } from '../composables/useWorkflowForm';
import OptionSelector from './OptionSelector.vue';
import TextAreaInput from './TextAreaInput.vue';
import SummaryCard from './SummaryCard.vue';
import PrimaryButton from './PrimaryButton.vue';

const { state, isFormValid, submitForm, resetStatus } = useWorkflowForm();

const workflowOptions = ['Beat Sync', 'UGC Video', 'Generate Video'];
const aspectRatioOptions = ['9:16', '16:9', '1:1'];
const durationOptions = ['Short', 'Medium', 'Long'];

const handleSubmit = async () => {
  if (state.status === 'loading') return;
  
  if (state.status === 'success' || state.status === 'error') {
    resetStatus();
  }
  
  await submitForm();
};
</script>

<style scoped>
.workflow-starter-container {
  max-width: 640px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.app-header {
  text-align: center;
  margin-bottom: 32px;
}

.logo-placeholder {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: white;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto 20px;
  box-shadow: 0 8px 24px var(--primary-glow);
}

h1 {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 10px 0;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 1.05rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

.main-content {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
}

.workflow-form {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  gap: 24px;
  margin-bottom: 0;
}

.flex-1 {
  flex: 1;
}

/* Mobile optimizations */
@media (max-width: 600px) {
  .workflow-starter-container {
    padding: 20px 16px;
    justify-content: flex-start;
  }

  h1 {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 0.95rem;
  }

  .main-content {
    padding: 20px;
    border-radius: 20px;
  }

  .row {
    flex-direction: column;
    gap: 0;
  }
}
</style>
