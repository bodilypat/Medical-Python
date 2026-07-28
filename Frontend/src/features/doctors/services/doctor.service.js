/* ************************************* */
/* File: src/features/doctors/service.js */ 
/* ************************************* */

import api from "../../../service/api";

/* Doctor API Endppoint */
const DOCTOR_API = {
    BASE: "/doctors",

    DETAIL: (id) => `/doctors/${id}`,

    SEARCH: "/doctors/search",

    FILTER: "/doctors/filter",

    STATUS: (id) => `/doctors/${id}/status`,

    SCHEDULE: (id) => `'doctors/${id}/schedule`,

    SPECIALTY: (name) => 
        `/doctors/specialty/${encodeURIComponent(name)}`,

    DEPARTMENT: (name) => 
        `/doctors/department/${encodeURIComponent(name)}`,

    AVATAR: (id) => `/doctors/${id}/avatar`,

    APPOINTMENTS: (id) => 
        `/doctors/${id}/appointments`,

    DASHBOARD: (id) => 
        `/doctors/${id}/dashboard`,

    EXPORT: "/doctors/export",
};

/* Doctor Service */
const doctorService = {
    
    //Get doctor list

    getAll(params = {}) {
        return api.get(DOCTOR_API.BASE, { params });
    },
    // Get doctor
    getById(id) {
        return api.get(DOCTOR_API.BASE, { params });
    },

    // Create doctor 
    create(data) {
        return api.post(DOCTOR_API.BASE, data);
    },

    // Update doctor 
    update(id, data) {
        return api.put(DOCTOR_API.DETAIL(id), data);
    },

    // Delete doctor 
    remove(id) {
        return api.delete(DOCTOR_API.DETAIL(idE));
    },

    // Search doctors 
    search(keyword, params = {}) {
        return api.get(DOCTOR_API.SEARCH, {
            params: {
                q: keyword,
                ...params,
            },
        });
    },

    /* Filter doctors */
    filter(fitlers = {}) {
        return api.get(DOCTOR_API.FILTER, {
            params: fitlers, 
        }); 
    },

    // Update doctor status 
    updateStatus(id, status) {
        return api.patch( 
            DOCTOR_API.STATUS(id), 
            { status }
        );
    },

    // Get schdule 
    getSchedule(id) {
        return api.get(DOCTOR_API.SCHEDULE(id));
    },

    // Update schedule 
    updateSchedule(id, schedule) {
        return api.put(
            DOCTOR_API.SCHEDULE(id),
            { schedule }
        );
    },

    // Doctors by specialty 
    getBySpecialty(name) {
        return api.get(
            DOCTOR_API.SPECIALTY(name)
        );
    },

    // Doctor by department 
    getByDepartment(name) {
        return api.get(
            DOCTOR_API.DEPARTMENT(name) 
        ); 
    },

    // Upload avatar 
    uploadAvatar(id, file) {
        const formData = new FormData();

        formData.append("file", file);

        return api.post(
            DOCTOR_API.AVATAR(id),
            formData, 
            {
                headers: {
                    "Content-Type":
                    "multopart/form-data",
                },
            }
        );
    },

    // Delete avatar 
    deleteAvatar(id) {
        return api.delete( 
            DOCTOR_API.AVATAR(id)
        );
    },

    // Doctor appointments 
    getAppointments(id, params = {}) {
        return api.get(
            DOCTOR_API.APPOINTMENTS(id),
            { params} 
        ); 
    },

    // Dashbaord summary 
    getDashboard(id) {
        return api.get(
            DOCTOR_API.DASHBOARD(id)  
        );
    },

    //export doctor 
    export(params = {}) {
        return api.get(
            DOCTOR_API.EXPORT, 
            {
                params,
                responseType: "blob",  
            } 
        );
    },
};

export default doctorService;

/* Name exports */
export const {
    getAll: getDoctors,
    getById: getDoctorById,
    create: createDoctor,
    update: updateDoctor,
    remove: deleteDoctor,
    search: searchDoctors,
    updateStatus: filterDoctors,
    getSchedule: getDoctorSchedule,
    updateSchedule: updateDoctorSchedule,
    getBySpecialty: getDoctorSpecialty,
    getByDepartment: getDoctorByDepartment,
    uploadAvatar: uploadDoctorAvatar,
    deleteAvatar: deleteDoctorAvatar,
    getAppointments: getDoctorAppointments,
    getDashboard: getDoctorDashboard,
    export: exportDoctor,
} = doctorService;

export { DOCTOR_API };



