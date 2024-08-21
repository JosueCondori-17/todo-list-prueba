import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref([])

  const addTask = (task) => {
    tasks.value.push({ ...task, id: Date.now() })
  }

  const updateTask = (id, updatedTask) => {
    const index = tasks.value.findIndex(task => task.id === id)
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...updatedTask }
    }
  }

  const deleteTask = (id) => {
    tasks.value = tasks.value.filter(task => task.id !== id)
  }

  return { tasks, addTask, updateTask, deleteTask }
})
