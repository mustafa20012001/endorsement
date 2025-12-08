
import axios from "./services"; 
import api from "./services.js";


export const getAuditingAndData = (params) => {
  return axios.get("/AuditingAndData", { params });
};

export const addAuditingAndData = (data) => {
  return axios.post("/AuditingAndData", data);
};

export const updateAuditingAndData = (id, data) => {
  return axios.put(`/AuditingAndData/${id}`, data);
};

export const deleteAuditingAndData = (id) => {
  return axios.delete(`/AuditingAndData/${id}`);
};

export const transferAuditingAndData = (data) => {
  return axios.post("/AuditingAndData/transfers", data);
};

// GET TRANSFERS LIST
export const getTransfers = (params) => {
  return api.get("/AuditingAndData/transfers", { params });
};

export function changeStatusAuditing(body) {
  return axios.post("/api/AuditingAndData/change-status", body);
}

