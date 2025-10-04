<template>
  <div class="confirm-overlay">
    <div class="confirm-dialog card shadow-sm p-3">
      <h5 class="mb-3">{{ message }}</h5>
      <div class="d-flex justify-content-end gap-2">
        <button class="btn btn-sm btn-secondary" @click="$emit('cancel')">
          Cancelar
        </button>
        <button class="btn btn-sm btn-danger" @click="$emit('confirm')">
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: { type: Boolean, required: true },
  message: { type: String, default: "¿Estás seguro?" }
});
</script>

<style scoped>
.confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.confirm-dialog {
  max-width: 400px;
  width: 90%;
  background: #fff;
  border-radius: 8px;
}
</style>
