import axios from "./services";

// ===============================
//  GET LIST: Return Transactions
// ===============================
export const getReturnTransactions = (params) => {
  return axios.get("/ReturnTransactions", { params });
};

// ===============================
//  POST: Create Return Transaction
// ===============================
export const addReturnTransaction = (data) => {
  return axios.post("/ReturnTransactions", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

// ===============================
//  PUT: Update Return Transaction
// ===============================
export const updateReturnTransaction = (id, data) => {
  return axios.put(`/ReturnTransactions/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

// ===============================
//  DELETE
// ===============================
export const deleteReturnTransaction = (id) => {
  return axios.delete(`/ReturnTransactions/${id}`);
};

// ===============================
//  GET BY ID
// ===============================
export const getReturnTransactionById = (id) => {
  return axios.get(`/ReturnTransactions/${id}`);
};


export const getReturnTransfers = (params) => {
  return axios.get("/ReturnTransactions/transfers", { params });
};

export const addReturnFollowUp = (formData) => {
  return axios.post("/ReturnTransactions", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};