//src/services/appointmentsService.js 

import api from './api';

export const getAppointments = async () => api.get('/appointments');
export const getAppointmentById = async (id) => api.get(`/appointments/${id}`);
export const createAppointment = async (appointmentData) => api.post('/appointments', appointmentData);
export const updateAppointment = async (id, appointmentData) => api.put(`/appointments/${id}`, appointmentData);
export const deleteAppointment = async (id) => api.delete(`/appointments/${id}`);

