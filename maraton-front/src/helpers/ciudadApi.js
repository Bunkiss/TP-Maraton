import api from "./api";

export async function getCiudades() {
  const res = await api.get("/ciudad");
  return res.data;
}

export async function getCiudadById(id) {
  const res = await api.get(`/ciudad/${id}`);
  return res.data;
}

export async function postCiudad(data) {
  const res = await api.post("/ciudad", data);
  return res.data;
}

export async function putCiudad(id, data) {
  const res = await api.put(`/ciudad/${id}`, data);
  return res.data;
}

export async function deleteCiudad(id) {
  const res = await api.delete(`/ciudad/${id}`);
  return res.data;
}
