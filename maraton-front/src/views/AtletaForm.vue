<template>
  <div class="container py-4">
    <h2 class="mb-4">{{ isEdit ? "Editar Atleta" : "Nuevo Atleta" }}</h2>

    <Form @submit="onSubmit" :validation-schema="schema">
      <div class="mb-3">
        <label class="form-label">Nombre</label>
        <Field name="nombre" class="form-control" />
        <ErrorMessage name="nombre" class="text-danger small" />
      </div>

      <div class="mb-3">
        <label class="form-label">DNI</label>
        <Field name="dni" type="number" class="form-control" />
        <ErrorMessage name="dni" class="text-danger small" />
      </div>

      <div class="mb-3">
        <label class="form-label">Tiempo</label>
        <Field name="tiempo" placeholder="Ej: 2h 07m 30s" class="form-control" />
        <ErrorMessage name="tiempo" class="text-danger small" />
      </div>

      <div class="mb-3">
        <label class="form-label">Posición</label>
        <Field name="posicion" type="number" class="form-control" />
        <ErrorMessage name="posicion" class="text-danger small" />
      </div>

      <div class="mb-3">
        <label class="form-label">Ciudad</label>
        <Field as="select" name="ciudadId" class="form-select">
          <option value="">Seleccionar ciudad...</option>
          <option v-for="c in ciudades" :key="c.id" :value="c.id">
            {{ c.nombre }}
          </option>
        </Field>
        <ErrorMessage name="ciudadId" class="text-danger small" />
      </div>

      <button type="submit" class="btn btn-primary">
        {{ isEdit ? "Actualizar" : "Guardar" }}
      </button>
      <router-link to="/atletas" class="btn btn-secondary ms-2">
        Cancelar
      </router-link>
    </Form>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAtletasStore } from "@/stores/atletaStore.js";
import { useCiudadesStore } from "@/stores/ciudadStore.js";
import { Form, Field, ErrorMessage } from "vee-validate";
import schema from "@/schemas/atletaSchema";

const route = useRoute();
const router = useRouter();
const atletasStore = useAtletasStore();
const ciudadesStore = useCiudadesStore();

const isEdit = computed(() => route.params.id !== undefined);
const atletaId = computed(() => route.params.id);

const ciudades = ref([]);

onMounted(async () => {
  await ciudadesStore.fetchCiudades();
  ciudades.value = ciudadesStore.ciudades;

  if (isEdit.value) {
    await atletasStore.fetchAtletaById(atletaId.value);
  }
});

async function onSubmit(values) {
  if (isEdit.value) {
    await atletasStore.updateAtleta(atletaId.value, values);
  } else {
    await atletasStore.addAtleta(values);
  }
  router.push("/atletas");
}
</script>
