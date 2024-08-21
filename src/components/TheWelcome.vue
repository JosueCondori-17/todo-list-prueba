<script setup>
import { ref, computed } from 'vue'
import { useTaskStore } from '@/stores/tareaAlmacenamiento';

const dialogVisible = ref(null)
const dialogVisibleEdit = ref(null)
const descripcion = ref('')
const idEditando = ref(null)

const taskStore = useTaskStore()

const abrirDialog = () => {
  if (dialogVisible.value) {
    dialogVisible.value.showModal()
  }
}

const cerrarDialog = () => {
  if (dialogVisible.value) {
    dialogVisible.value.close()
  }
}

const abrirDialogEdit = (task) => {
  if (dialogVisibleEdit.value) {
    dialogVisibleEdit.value.showModal()
    descripcion.value = task.descripcion_tarea
    idEditando.value = task.id
  }
}

const cerrarDialogEdit = () => {
  if (dialogVisibleEdit.value) {
    dialogVisibleEdit.value.close()
    idEditando.value = null
    descripcion.value = ''
  }
}

const agregarTarea = () => {
  if (descripcion.value.trim() !== '') {
    const nuevaTarea = {
      descripcion_tarea: descripcion.value,
      completado_tarea: false
    }
    taskStore.addTask(nuevaTarea)
    descripcion.value = ''
    cerrarDialog()
  }
}

const editarTarea = () => {
  if (idEditando.value !== null && descripcion.value.trim() !== '') {
    taskStore.updateTask(idEditando.value, {
      descripcion_tarea: descripcion.value
    })
    cerrarDialogEdit()
  }
}

const toggleComplete = (task) => {
  taskStore.updateTask(task.id, {
    completado_tarea: !task.completado_tarea // Toggle the completion status
  })
}

// Computed property to filter incomplete tasks
const tareasNoCompletadas = computed(() => {
  return taskStore.tasks.filter(task => !task.completado_tarea)
})
</script>


<template>
  <div class="template-crud">
    <button class="boton-add" @click="abrirDialog">+ Agregar tarea</button>

    <dialog ref="dialogVisible">
      <h2>Agregar Tarea</h2>
      <div class="cuerpo">
        <p>Descripción</p>
        <input v-model="descripcion" type="text" placeholder="Escribe tu tarea..." />
      </div>
      <div class="pie">
        <button @click="cerrarDialog">Cerrar</button>
        <button @click="agregarTarea">Agregar</button>
      </div>
    </dialog>

    <dialog ref="dialogVisibleEdit">
      <h2>Editar Tarea</h2>
      <div class="cuerpo">
        <p>Descripción</p>
        <input v-model="descripcion" type="text" placeholder="Escribe tu tarea..." />
      </div>
      <div class="pie">
        <button @click="cerrarDialogEdit">Cerrar</button>
        <button @click="editarTarea">Editar</button>
      </div>
    </dialog>

    <ul>
      <li v-for="task in tareasNoCompletadas" :key="task.id">
        <input type="checkbox" :checked="task.completado_tarea" @change="toggleComplete(task)" />
        {{ task.descripcion_tarea }}
        <button @click="abrirDialogEdit(task)">Editar</button>
        <button @click="taskStore.deleteTask(task.id)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>


<style scoped>
.template-crud {
  border: 1px solid rgb(73, 201, 201);
  border-radius: 10px;
  width: 100%;
  height: 100%;
  padding: 10px 20px;
}

.boton-add {
  background-color: blue;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

dialog {
  border: none;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: auto;
}

button {
  background-color: #ff4d4f;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
</style>
