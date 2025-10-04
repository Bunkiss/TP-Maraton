import { defineStore } from "pinia";
import { getCiudades, getCiudadById, postCiudad, putCiudad, deleteCiudad } from "@/helpers/ciudadApi.js";

export const useCiudadesStore = defineStore("ciudades", {
  state: () => ({
    ciudades: [],
    ciudad: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchCiudades() {
      this.loading = true;
      try {
        this.ciudades = await getCiudades();
      } catch (err) {
        this.error = err.message || "Error cargando ciudades";
      } finally {
        this.loading = false;
      }
    },
    async fetchCiudadById(id) {
      this.loading = true;
      try {
        this.ciudad = await getCiudadById(id);
      } catch (err) {
        this.error = err.message || "Error cargando ciudad";
      } finally {
        this.loading = false;
      }
    },
    async addCiudad(data) {
      try {
        await postCiudad(data);
        await this.fetchCiudades();
      } catch (err) {
        this.error = err.message || "Error agregando ciudad";
      }
    },
    async updateCiudad(id, data) {
      try {
        await putCiudad(id, data);
        await this.fetchCiudades();
      } catch (err) {
        this.error = err.message || "Error actualizando ciudad";
      }
    },
    async deleteCiudad(id) {
      try {
        await deleteCiudad(id);
        await this.fetchCiudades();
      } catch (err) {
        this.error = err.message || "Error eliminando ciudad";
      }
    },
  },
});
