import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useVideoStore = defineStore('video', () => {
  // State
  const history = ref(JSON.parse(localStorage.getItem('videoHistory') || '[]'))
  const activeVideo = ref(null) // Holds the currently generated/selected video

  // Watch for changes and save to localStorage
  watch(history, (newVal) => {
    localStorage.setItem('videoHistory', JSON.stringify(newVal))
  }, { deep: true })

  // Actions
  function addVideo(videoData) {
    const newVideo = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...videoData,
      videoUrl: 'https://cdn.pixabay.com/video/2023/10/22/186026-876939527_large.mp4' // Dummy video
    }
    history.value.unshift(newVideo)
    activeVideo.value = newVideo
    return newVideo
  }

  function setActiveVideo(id) {
    const video = history.value.find(v => v.id === id)
    if (video) {
      activeVideo.value = video
    }
  }

  function clearActiveVideo() {
    activeVideo.value = null
  }

  function deleteVideo(id) {
    history.value = history.value.filter(v => v.id !== id)
    if (activeVideo.value?.id === id) {
      activeVideo.value = null
    }
  }

  return {
    history,
    activeVideo,
    addVideo,
    setActiveVideo,
    clearActiveVideo,
    deleteVideo
  }
})
