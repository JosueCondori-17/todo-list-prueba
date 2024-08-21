<script setup>
import { computed } from 'vue'
import { useTaskStore } from '@/stores/tareaAlmacenamiento' // Ajusta la ruta según tu estructura

const taskStore = useTaskStore()

// Computed property to filter completed tasks
const tareasCompletadas = computed(() => {
  return taskStore.tasks.filter(task => task.completado_tarea)
})
</script>

<template>
  <div class="about">
    <h1>Tareas completadas</h1>
    <ul>
      <li v-for="task in tareasCompletadas" :key="task.id">
        {{ task.descripcion_tarea }}
      </li>
      <!-- Si no hay tareas completadas, podrías agregar un mensaje opcional -->
      <li v-if="tareasCompletadas.length === 0">No hay tareas completadas</li>
    </ul>
  </div>
</template>


<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: start;
    justify-content: start;
    flex-direction: column;
    padding: 20px 40px;
  }
}
</style>
