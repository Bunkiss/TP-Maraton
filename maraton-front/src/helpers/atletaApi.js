import api from "./api";

export async function getAtletas() {
  const res = await api.get("/atleta");
  return res.data;
}

export async function getAtletaById(id) {
  const res = await api.get(`/atleta/${id}`);
  return res.data;
}

export async function postAtleta(data) {
  const res = await api.post("/atleta", data);
  return res.data;
}

export async function putAtleta(id, data) {
  const res = await api.put(`/atleta/${id}`, data);
  return res.data;
}

export async function deleteAtleta(id) {
  const res = await api.delete(`/atleta/${id}`);
  return res.data;
}
