import { createRouter, createWebHistory } from "vue-router";
import AtletasView from "@/views/AtletasView.vue";
import CiudadesView from "@/views/CiudadesView.vue";
import AtletaForm from "@/views/AtletaForm.vue";
import CiudadForm from "@/views/CiudadForm.vue";

const routes = [
  {
    path: "/",
    redirect: "/atletas",
  },
  {
    path: "/atletas",
    name: "Atletas",
    component: AtletasView,
  },
  {
    path: "/atletas/nuevo",
    name: "NuevoAtleta",
    component: AtletaForm,
  },
  {
    path: "/atletas/editar/:id",
    name: "EditarAtleta",
    component: AtletaForm,
    props: true,
  },
  {
    path: "/ciudades",
    name: "Ciudades",
    component: CiudadesView,
  },
  {
    path: "/ciudades/nueva",
    name: "NuevaCiudad",
    component: CiudadForm,
  },
  {
    path: "/ciudades/editar/:id",
    name: "EditarCiudad",
    component: CiudadForm,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
