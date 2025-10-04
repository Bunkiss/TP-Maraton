<template>
  <div class="container py-4">
    <h2 class="mb-4">{{ isEdit ? "Editar Ciudad" : "Nueva Ciudad" }}</h2>

    <Form @submit="onSubmit" :validation-schema="schema">
      <div class="mb-3">
        <label class="form-label">Nombre</label>
        <Field name="nombre" class="form-control" />
        <ErrorMessage name="nombre" class="text-danger small" />
      </div>

      <button type="submit" class="btn btn-primary">
        {{ isEdit ? "Actualizar" : "Guardar" }}
      </button>
      <router-link to="/ciudades" class="btn btn-secondary ms-2">
        Cancelar
      </router-link>
    </Form>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCiudadesStore } from "@/stores/ciudadStore.js";
import { Form, Field, ErrorMessage } from "vee-validate";
import schema from "@/schemas/ciudadSchema";

const route = useRoute();
const router = useRouter();
const ciudadesStore = useCiudadesStore();

const isEdit = computed(() => route.params.id !== undefined);
const ciudadId = computed(() => route.params.id);

async function onSubmit(values) {
  if (isEdit.value) {
    await ciudadesStore.updateCiudad(ciudadId.value, values);
  } else {
    await ciudadesStore.addCiudad(values);
  }
  router.push("/ciudades");
}
</script>
