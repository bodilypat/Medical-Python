/* ***************************************************** */
/* File: src/features/doctors/services/doctor.service.js */ 
/* ***************************************************** */

import api from "../../../services/axios";

// Get all doctors 
// Backend => APIRouter: GET /api/v1/doctors 
export const getDoctors = (params = {}) => {
    return api.get(
        "/doctors",
        {
            params,  
        }
    );
};

// Get doctor details by ID 
// Backend => APIRouter: GET /api/v1/doctors/{id}
export const getDoctorById = (doctorId) => {
    return api.get(
        `/doctors/${doctorId}`
    );
};

// Create new doctor 
// Backend => APIRouter: POST /api/v1/doctors 
export const createDoctor = (doctorData) => {
    return api.post(
        "/doctors",
        doctorData
    );
};

// Update doctor 
// Backend => APIRouter: PUT/api/v1/doctors/{id}
export const updateDoctor = (
    doctorId,
    doctorData
) => {
    return api.put(
        `/doctors/${doctorId}`,
        doctorData 
    );
};

// Delete doctor 
// Backend => APIRouter: api/v1/doctors/{id}
export const deleteDoctor = (doctorId) => {
    return api.delete(
        `/doctors/${doctorId}`
    );
};

// Search doctors 
// Backend => APIRouter: GET /api/v1/doctors/{id}
export const searchDoctors = (
    keyword
) => {
    return api.get(
        "/doctors/search",
        {
            params: {
                query: keyword, 
            }, 
        }
    );
};

// GET doctors by specialty
// Backend => APIRouter: GET /api/v1/doctors/specialty/{speciallty}
export const getDoctorsBySpecialty = (
    specialty 
) => {
    return api.get(
        `/doctors/specialty/${specialty}`
    );
};

// Get doctor's appointments
// Backend => APIRouter: GET /api/v1/doctors/{id}/appointments 
export const getDoctorAppointments = (
    doctorId 
) => {
    return api.get(
        `/doctors/${doctorId}/appointments`
    );
};

// Update doctor availability
// Backend => APIRouter: PUT/api/v1/doctors/{id}/availability 
export const updateDoctorAvailability = (
    doctorId,
    availability 
) => {
    return api.put(
        `/doctors/${doctorId}/availability`,
        availability 
    );
};

// Upload doctor profile image 
// Backend => APIRouter: POST /api/v1/doctors/{id}/image 
export const uploadDoctorImage = (
    doctorId,
    imageFile
) => {
    const formData = new FormData();
    formData.append(
        "image",
        imageFile  
    );
    return  api.post(
        `/doctors/${doctorId}/image`,

        formData,
        {
            header: {
                "Content-Type":
                "multipart/form-data",
            },
        }
    );
};


