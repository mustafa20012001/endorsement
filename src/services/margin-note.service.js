import axios from "./services";


export const getMarginNotes = (params) => {
  return axios.get("/MarginNotes", { params });
};

export const addMarginNote = (data) => {
  return axios.post("/MarginNotes", data);
};

export const updateMarginNote = (id, data) => {
  return axios.put(`/MarginNotes/${id}`, data);
};


export const deleteMarginNote = (id) => {
  return axios.delete(`/MarginNotes/${id}`);
};

export const getMarginNoteById = (id) => {
  return axios.get(`/MarginNotes/${id}`);
};

export const transferMarginNote = (formData) => {
  return axios.post("/MarginNotes/transfer", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export const changeMarginNoteStatus = (data) => {
  return axios.post("/MarginNotes/change-status", data);
};