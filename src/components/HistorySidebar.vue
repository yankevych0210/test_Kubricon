<template>
  <aside class="history-sidebar" :class="{ 'is-open': isOpen }">
    <div class="sidebar-header">
      <h2>Generations</h2>
      <button class="close-btn" @click="$emit('close')">&times;</button>
    </div>

    <div class="history-list" v-if="videoStore.history.length > 0">
      <div 
        v-for="video in videoStore.history" 
        :key="video.id" 
        class="history-item"
        :class="{ active: videoStore.activeVideo?.id === video.id }"
        @click="videoStore.setActiveVideo(video.id)"
      >
        <div class="thumbnail-placeholder">
          ▶
        </div>
        <div class="item-details">
          <div class="item-workflow">{{ video.workflow }}</div>
          <div class="item-prompt">{{ truncate(video.prompt, 40) }}</div>
          <div class="item-meta">{{ new Date(video.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }} &middot; {{ video.aspectRatio }}</div>
        </div>
        <button class="delete-btn" @click.stop="videoStore.deleteVideo(video.id)">
          🗑
        </button>
      </div>
    </div>
    
    <div class="empty-state" v-else>
      No videos generated yet.
    </div>
  </aside>
</template>

<script setup>
import { useVideoStore } from '../stores/videoStore'

defineProps({
  isOpen: Boolean
})

defineEmits(['close'])

const videoStore = useVideoStore()

const truncate = (text, length) => {
  return text.length > length ? text.substring(0, length) + '...' : text
}
</script>

<style scoped>
.history-sidebar {
  width: 320px;
  background: rgba(15, 23, 42, 0.95);
  border-left: 1px solid var(--border-color);
  height: 100vh;
  position: fixed;
  top: 0;
  right: -320px;
  transition: right 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 100;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(20px);
}

.history-sidebar.is-open {
  right: 0;
}

.sidebar-header {
  padding: 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-header h2 {
  font-size: 1.2rem;
  margin: 0;
  font-weight: 600;
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

.history-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.history-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.history-item:hover {
  background: var(--bg-surface-hover);
}

.history-item.active {
  border-color: var(--primary-color);
  background: rgba(99, 102, 241, 0.1);
}

.thumbnail-placeholder {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: white;
  flex-shrink: 0;
}

.item-details {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item-workflow {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--primary-color);
  text-transform: uppercase;
}

.item-prompt {
  font-size: 0.9rem;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 4px 0;
}

.item-meta {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.delete-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
}

.history-item:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  color: var(--error-color);
}

.empty-state {
  padding: 40px 20px;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .history-sidebar {
    width: 100%;
    right: -100%;
  }
}
</style>
