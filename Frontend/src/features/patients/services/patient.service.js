/* ******************************************************* */
/* File: src/features/patients/services/patient.service.js */ 
/* ******************************************************* */

import api from "../../../services/api";

const ENDPOINT = "/patients";

/* Validate resource ID. */
const validateId = (id) => {
    if (id === undefined || id === null || id === "") {
        throw new Error("Patient ID is required.");
    }
};

/* Patient API Service */
const patientService = {

    /* --------------------- */
    /*    Get all patients   */ 
    /* GET /api/v1/patients  */
    /* --------------------- */
    getAll(param = {}) {
        return api.get(ENDPOINT, {
            params, 
        }); 
    },

    /* ------------------------- */
    /*     Get patient by ID     */
    /*  GET /api/v1/patients/:id */
    /* ------------------------- */
    getById(id) {
        validateId(id);

        return api.get(`${ENDPOINT}/${id}`);
    },

    /* ------------------------- */
    /*       Create Patient      */
    /*    POST /api/v1/patients  */
    /* ------------------------- */
    create(data) {
        return api.post(ENDPOINT, data);
    },

    /* ------------------------- */
    /* Update patient            */
    /* PUT /api/v1/patients/:id  */
    /* ------------------------- */
    update(id, data) {
        validateId(id);

        return api.put(`${ENDPOINT}/${id}`, data);
    },

    /* -------------------------- */
    /* Pattial update             */
    /* PATCH /api/v1/patients/:id */
    /* -------------------------- */
    patch(id, data) {
        validateId(id);

        return api.patch(`${ENDPOINT}/${ID}`, data);
    },

    /* --------------------------- */
    /* Delete patient              */
    /* DELETE /API/V1/patients/id  */
    /* --------------------------- */
    remove(id) {
        validateId(id);

        return api.delete(`${ENDPOINT}/ ${id}`);
    },

    /* --------------------------- */
    /* Search patient              */
    /* GET /api/v1/patients/search */
    /* --------------------------- */
    search(keyword, param = {}) {
        return api.get(`${ENDPOINT}/search`, {
            param: {
                q: keyword,
                ...params, 
            }, 
        });
    },

    /* -------------------------------  */
    /* Upload patient documnet          */
    /* POST /api/v1/patients/:id/upload */
    /* -------------------------------- */
    uploadFile(id, file) {
        validateId(id);

        const formData = new FormData();
        formData.append("file", file);

        return api.post(
            `${ENDPOINT}/${id}/upload`,
            formData,
            {
                headers: {
                    "Content-Type" : "multipart/form-data", 
                }, 
            }
        ); 
    },

    /* --------------------------- */
    /* Export patients             */
    /* GET /api/v1/patients/export */
    /* --------------------------- */
    export(params = {}) {
        return api.get(`${ENDPOINT}/export`, {
            params,
            responseType: "blob", 
        }); 
    },
};

export default patientService;


