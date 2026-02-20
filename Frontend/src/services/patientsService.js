//src/services/patientsService.js 

import api from './api';

export const getPatients = async () => api.get('/patients');
export const getPatientById = async (id) => api.get(`/patients/${id}`);
export const createPatient = async (patientData) => api.post('/patients', patientData);
export const updatePatient = async (id, patientData) => api.put(`/patients/${id}`, patientData);
export const deletePatient = async (id) => api.delete(`/patients/${id}`);

