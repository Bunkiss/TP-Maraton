<template>
  <div class="container py-4">
    <h2 class="mb-4">Listado de Atletas</h2>

    <div class="mb-3">
      <router-link class="btn btn-primary" to="/atletas/nuevo">
        + Nuevo Atleta
      </router-link>
    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Posición</th>
          <th>Nombre</th>
          <th>DNI</th>
          <th>Tiempo</th>
          <th>Ciudad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(atleta, index) in atletas"
          :key="atleta.id"
          :class="{
            'table-warning': index === 0,
            'table-secondary': index === 1,
            'table-danger': index === 2
          }"
        >
          <td>{{ atleta.posicion }}</td>
          <td>{{ atleta.nombre }}</td>
          <td>{{ atleta.dni }}</td>
          <td>{{ atleta.tiempo }}</td>
          <td>{{ atleta.ciudad?.nombre }}</td>
          <td>
            <router-link
              class="btn btn-sm btn-outline-secondary me-2"
              :to="`/atletas/editar/${atleta.id}`"
            >
              Editar
            </router-link>
            <button
              class="btn btn-sm btn-outline-danger"
              @click="abrirConfirm(atleta.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <ConfirmDelete
      v-if="atletaAEliminar"
      :show="true"
      message="¿Estás seguro de eliminar este atleta?"
      @confirm="eliminarAtleta"
      @cancel="atletaAEliminar = null"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAtletasStore } from "@/stores/atletaStore.js";
import ConfirmDelete from "@/components/ConfirmDelete.vue";

const store = useAtletasStore();
const atletas = store.atletas;
const atletaAEliminar = ref(null);

onMounted(() => {
  store.fetchAtletas();
});

function abrirConfirm(id) {
  atletaAEliminar.value = id;
}

async function eliminarAtleta() {
  if (atletaAEliminar.value) {
    await store.deleteAtleta(atletaAEliminar.value);
    atletaAEliminar.value = null;
  }
}
</script>

