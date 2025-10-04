<template>
  <div class="container py-4">
    <h2 class="mb-4">Listado de Ciudades</h2>

    <div class="mb-3">
      <router-link class="btn btn-primary" to="/ciudades/nueva">
        + Nueva Ciudad
      </router-link>
    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ciudad in ciudades" :key="ciudad.id">
          <td>{{ ciudad.id }}</td>
          <td>{{ ciudad.nombre }}</td>
          <td>
            <router-link
              class="btn btn-sm btn-outline-secondary me-2"
              :to="`/ciudades/editar/${ciudad.id}`"
            >
              Editar
            </router-link>
            <button
              class="btn btn-sm btn-outline-danger"
              @click="abrirConfirm(ciudad.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <ConfirmDelete
      v-if="ciudadAEliminar"
      :show="true"
      message="¿Estás seguro de eliminar esta ciudad?"
      @confirm="eliminarCiudad"
      @cancel="ciudadAEliminar = null"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCiudadesStore } from "@/stores/ciudadStore.js";
import ConfirmDelete from "@/components/ConfirmDelete.vue";

const store = useCiudadesStore();
const ciudades = store.ciudades;
const ciudadAEliminar = ref(null);

onMounted(() => {
  store.fetchCiudades();
});

function abrirConfirm(id) {
  ciudadAEliminar.value = id;
}

async function eliminarCiudad() {
  if (ciudadAEliminar.value) {
    await store.deleteCiudad(ciudadAEliminar.value);
    ciudadAEliminar.value = null;
  }
}
</script>
