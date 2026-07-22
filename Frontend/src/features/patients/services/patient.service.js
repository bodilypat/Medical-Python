/* ******************************************************* */
/* File: src/features/patients/services/patient.service.js */ 
/* ******************************************************* */

import api from "../../../services/axios";
 
// Get all patients 
// Backend APIRouter: GET / api/v1/patients

export const getPatients = (params = {}) => {
    return api.get("/patients", {
        params, 
    });
};

// Get patient by ID 
//Backend APIRouter: GET/api/v1/patients/: id 

export const getPatientById = (id) => {
    return api.get(`/patients/${id}`);
}

//Create a new patient
//Backend APIRouter -> POST / api/v1/patients

export const createPatient = (patientData) => {
    return api.post("/patients", patientData);
};

// Update an existing patient 
// Backend APIRouter -> PUT /api/v1/patients/: id 
export const updatePatient = (id, patientData) => {
    return api.put(`/patients/${id}`, patientData);
};

// Delete a patient 
// Backend APIRouter -> DELETE /api/v1/patient/:id 
export const deletePatient = (id) => {
    return api.delete(`/patients/${id}`);
};

// Search patients 
// Backend APIRouter -> GET / api/v1/patients/search 
export const searchPatient = (keyword) => {
    return api.get("/patients/search", {
        params: {
            q: keyword,
        },
    });
};

// Upload patient document 
// Backend APIRouter -> POST /api/v1/patients/:id/upload 

export const uploadPatientFile = (id, file) => {
    const formData = new FormData();

    formData.append("file", file);

    return api.post(
        `/patients/${id}/upload`,
        formData,
        {
            headers: {
                "Content-Type" : "multipart/form-data",
            },
        }
    );
};

