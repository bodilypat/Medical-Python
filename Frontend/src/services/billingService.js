//src/services/billingService.js 

import api from './api';

export const getBills = async () => api.get('/bills');
export const getBillById = async (id) => api.get(`/bills/${id}`);
export const createBill = async (billData) => api.post('/bills', billData);
export const updateBill = async (id, billData) => api.put(`/bills/${id}`, billData);
export const deleteBill = async (id) => api.delete(`/bills/${id}`);

