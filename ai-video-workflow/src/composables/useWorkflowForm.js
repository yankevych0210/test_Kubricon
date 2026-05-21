import { reactive, computed } from 'vue';

export function useWorkflowForm() {
  const state = reactive({
    workflow: '',
    aspectRatio: '',
    duration: '',
    prompt: '',
    status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
  });

  const isFormValid = computed(() => {
    return (
      state.workflow !== '' &&
      state.aspectRatio !== '' &&
      state.duration !== '' &&
      state.prompt.trim() !== ''
    );
  });

  const submitForm = async () => {
    if (!isFormValid.value) return;

    state.status = 'loading';

    // Mock async request
    return new Promise((resolve) => {
      setTimeout(() => {
        // 80% success rate
        const isSuccess = Math.random() < 0.8;
        
        if (isSuccess) {
          state.status = 'success';
        } else {
          state.status = 'error';
        }
        
        resolve(state.status);
      }, 1500); // 1.5 second delay
    });
  };

  const resetStatus = () => {
    state.status = 'idle';
  };
  
  const resetForm = () => {
    state.workflow = '';
    state.aspectRatio = '';
    state.duration = '';
    state.prompt = '';
    state.status = 'idle';
  };

  return {
    state,
    isFormValid,
    submitForm,
    resetStatus,
    resetForm
  };
}
