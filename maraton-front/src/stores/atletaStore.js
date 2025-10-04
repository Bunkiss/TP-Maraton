import { defineStore } from "pinia";
import { getAtletas, getAtletaById, postAtleta, putAtleta, deleteAtleta } from "@/helpers/atletaApi.js";

export const useAtletasStore = defineStore("atletas", {
  state: () => ({
    atletas: [],
    atleta: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchAtletas() {
      this.loading = true;
      try {
        this.atletas = await getAtletas();
      } catch (err) {
        this.error = err.message || "Error cargando atletas";
      } finally {
        this.loading = false;
      }
    },
    async fetchAtletaById(id) {
      this.loading = true;
      try {
        this.atleta = await getAtletaById(id);
      } catch (err) {
        this.error = err.message || "Error cargando atleta";
      } finally {
        this.loading = false;
      }
    },
    async addAtleta(data) {
      try {
        await postAtleta(data);
        await this.fetchAtletas();
      } catch (err) {
        this.error = err.message || "Error agregando atleta";
      }
    },
    async updateAtleta(id, data) {
      try {
        await putAtleta(id, data);
        await this.fetchAtletas();
      } catch (err) {
        this.error = err.message || "Error actualizando atleta";
      }
    },
    async deleteAtleta(id) {
      try {
        await deleteAtleta(id);
        await this.fetchAtletas();
      } catch (err) {
        this.error = err.message || "Error eliminando atleta";
      }
    },
  },
});
