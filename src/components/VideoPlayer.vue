<template>
  <div class="video-player-container" v-if="video">
    <div class="video-header">
      <h3>Generation Result</h3>
      <button class="close-btn" @click="$emit('close')">&times;</button>
    </div>
    
    <div class="video-wrapper">
      <video 
        :src="video.videoUrl" 
        controls 
        autoplay 
        loop
        class="main-video"
      ></video>
    </div>

    <div class="video-info">
      <div class="info-row">
        <span class="badge">{{ video.workflow }}</span>
        <span class="badge secondary">{{ video.aspectRatio }}</span>
        <span class="badge secondary">{{ video.duration }}</span>
      </div>
      <p class="prompt-text">"{{ video.prompt }}"</p>
    </div>

    <div class="action-buttons">
      <button class="btn secondary" @click="downloadVideo">
        Download MP4
      </button>
      <button class="btn primary" @click="$emit('regenerate')">
        Regenerate Similar
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  video: {
    type: Object,
    required: true
  }
})

defineEmits(['close', 'regenerate'])

const downloadVideo = () => {
  // Mock download
  const a = document.createElement('a')
  a.href = props.video.videoUrl
  a.download = `AI_Video_${props.video.id}.mp4`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
</script>

<style scoped>
.video-player-container {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px);
  margin-top: 24px;
  animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.video-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.video-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: var(--text-primary);
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.5rem;
  cursor: pointer;
}

.close-btn:hover {
  color: var(--text-primary);
}

.video-wrapper {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  background: #000;
  aspect-ratio: 16 / 9; /* Default, real app would adapt to selected ratio */
  margin-bottom: 20px;
}

.main-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.info-row {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.badge {
  background: var(--primary-color);
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.badge.secondary {
  background: var(--bg-surface-hover);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

.prompt-text {
  font-style: italic;
  color: var(--text-primary);
  margin: 0 0 24px 0;
  line-height: 1.5;
  font-size: 0.95rem;
  background: rgba(0,0,0,0.2);
  padding: 12px;
  border-radius: 8px;
  border-left: 3px solid var(--primary-color);
}

.action-buttons {
  display: flex;
  gap: 16px;
}

.btn {
  flex: 1;
  padding: 14px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-size: 0.95rem;
}

.btn.primary {
  background: var(--primary-color);
  color: white;
}

.btn.primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

.btn.secondary {
  background: var(--bg-surface);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn.secondary:hover {
  background: var(--bg-surface-hover);
}

@media (max-width: 600px) {
  .action-buttons {
    flex-direction: column;
  }
}
</style>
