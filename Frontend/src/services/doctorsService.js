//src/services/doctorsService.js 

import api from './api';

export const getDoctors = async () => api.get('/doctors');
export const getDoctorById = async (id) => api.get(`/doctors/${id}`);
export const createDoctor = async (doctorData) => api.post('/doctors', doctorData);
export const updateDoctor = async (id, doctorData) => api.put(`/doctors/${id}`, doctorData);
export const deleteDoctor = async (id) => api.delete(`/doctors/${id}`);

