<template>
  <div class="layout-wrapper">
    <div class="workflow-starter-container" :class="{ 'shifted': isSidebarOpen }">
      <header class="app-header">
        <button class="history-toggle" @click="isSidebarOpen = true">
          🕒 History
        </button>
        <div class="logo-placeholder">AI</div>
        <h1>Video Workflow</h1>
        <p class="subtitle">Configure parameters to generate your next AI-powered video.</p>
      </header>

      <main class="main-content" v-if="!videoStore.activeVideo">
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

      <VideoPlayer 
        v-else 
        :video="videoStore.activeVideo" 
        @close="videoStore.clearActiveVideo()"
        @regenerate="handleRegenerate"
      />
    </div>

    <HistorySidebar :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />
    
    <ToastNotification 
      :show="toast.show" 
      :type="toast.type" 
      :title="toast.title" 
      :message="toast.message" 
      @close="toast.show = false" 
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useWorkflowForm } from '../composables/useWorkflowForm';
import { useVideoStore } from '../stores/videoStore';
import OptionSelector from './OptionSelector.vue';
import TextAreaInput from './TextAreaInput.vue';
import SummaryCard from './SummaryCard.vue';
import PrimaryButton from './PrimaryButton.vue';
import HistorySidebar from './HistorySidebar.vue';
import VideoPlayer from './VideoPlayer.vue';
import ToastNotification from './ToastNotification.vue';

const { state, isFormValid, submitForm, resetStatus } = useWorkflowForm();
const videoStore = useVideoStore();

const isSidebarOpen = ref(false);
const toast = reactive({ show: false, type: 'success', title: '', message: '' });

const workflowOptions = ['Beat Sync', 'UGC Video', 'Generate Video'];
const aspectRatioOptions = ['9:16', '16:9', '1:1'];
const durationOptions = ['Short', 'Medium', 'Long'];

const showToast = (type, title, message) => {
  toast.type = type;
  toast.title = title;
  toast.message = message;
  toast.show = true;
  setTimeout(() => { toast.show = false; }, 4000);
}

const handleSubmit = async () => {
  if (state.status === 'loading') return;
  if (state.status === 'success' || state.status === 'error') {
    resetStatus();
  }
  
  const result = await submitForm();
  
  if (result === 'success') {
    showToast('success', 'Generation Complete', 'Your video has been successfully generated!');
    videoStore.addVideo({
      workflow: state.workflow,
      aspectRatio: state.aspectRatio,
      duration: state.duration,
      prompt: state.prompt
    });
  } else {
    showToast('error', 'Generation Failed', 'There was an issue processing your request. Please try again.');
  }
};

const handleRegenerate = () => {
  // Populate form with active video data and clear active video
  const v = videoStore.activeVideo;
  if(v) {
    state.workflow = v.workflow;
    state.aspectRatio = v.aspectRatio;
    state.duration = v.duration;
    state.prompt = v.prompt;
  }
  videoStore.clearActiveVideo();
  resetStatus();
};
</script>

<style scoped>
.layout-wrapper {
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
}

.workflow-starter-container {
  max-width: 640px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.workflow-starter-container.shifted {
  transform: translateX(-160px); /* Shift left when sidebar opens on desktop */
}

.app-header {
  text-align: center;
  margin-bottom: 32px;
  position: relative;
}

.history-toggle {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(8px);
}

.history-toggle:hover {
  background: var(--bg-surface-hover);
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
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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
@media (max-width: 768px) {
  .workflow-starter-container.shifted {
    transform: none;
  }
}

@media (max-width: 600px) {
  .workflow-starter-container {
    padding: 20px 16px;
    justify-content: flex-start;
  }

  .history-toggle {
    position: relative;
    float: right;
    margin-bottom: 16px;
  }

  h1 {
    font-size: 1.8rem;
    clear: both;
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
