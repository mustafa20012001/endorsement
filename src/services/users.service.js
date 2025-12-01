import api from "./services.js";

export const getUsers = (params) =>
  api.get("/Users", { params });

export const addUser = (data) =>
  api.post("/Users", data);

export const deleteUser = (id) =>
  api.delete(`/Users/${id}`);

export const updateUser = (id, data) =>
  api.put(`/Users/${id}`, data);
