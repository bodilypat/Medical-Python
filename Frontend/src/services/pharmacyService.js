//src/services/pharmacyService.js

import api from './api';

export const getMedications = async () => api.get('/medications');
export const getMedicationById = async (id) => api.get(`/medications/${id}`);
export const createMedication = async (medicationData) => api.post('/medications', medicationData);
export const updateMedication = async (id, medicationData) => api.put(`/medications/${id}`, medicationData);
export const deleteMedication = async (id) => api.delete(`/medications/${id}`);

