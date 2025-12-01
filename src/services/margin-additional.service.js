import axios from "./services"; 

export const getMarginAdditionalInfos = (params) => {
  return axios.get("/MarginAdditionalInfos", { params });
};

export const addMarginAdditionalInfo = (data) => {
  return axios.post("/MarginAdditionalInfos", data);
};

export const updateMarginAdditionalInfo = (id, data) => {
  return axios.put(`/MarginAdditionalInfos/${id}`, data);
};

export const deleteMarginAdditionalInfo = (id) => {
  return axios.delete(`/MarginAdditionalInfos/${id}`);
};

export const getByMarginNote = (marginNoteId) => {
  return axios.get(`/MarginAdditionalInfos/margin-note/${marginNoteId}`);
};


export const sendToFlowAfterMargin = (id) => {
  return axios.post(`/MarginAdditionalInfos/${id}/send-to-transaction-flow-after-margin`);
};
