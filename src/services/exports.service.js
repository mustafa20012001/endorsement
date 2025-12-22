import api from "./services";

export const getExports = (params) =>
  api.get("/Landa/exports", { params });

export const createExport = (data) =>
  api.post("/Landa/exports", data);

export const updateExport = (id, data) =>
  api.put(`/Landa/exports/${id}`, data);

export const deleteExport = (id) =>
  api.delete(`/Landa/exports/${id}`);
