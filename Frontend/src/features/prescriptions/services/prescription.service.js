/* ***************************************************************** */
/* File: src/features/prescriptions/services/prescription.service.js */ 
/* ***************************************************************** */

import api from "../../../services/api";

const prescriptionService = {

    getAll(params){

        return api.get(
            "/prescriptions",
            {params}
        );

    },

    getById(id){

        return api.get(
            `/prescriptions/${id}` 
        );
    },

    create(data){

        return api.post(
            "/prescriptions",
            data 
        );
    },

    update(id, data){

        return api.put(
            `/prescriptions/${id}`,
            data 
        );
    },

    remove(id){

        return api.delete(
            `/prescriptions/${id}`
        );
    },

    getPatientHistory(PatientId){

        return api.get(
            `/patients/${patientId}/prescriptions`
        );
    },

    print(id){

        return api.get(
            `/prescriptions/${id}/print`,
            {
                responseType: "blob"
            }
        );
    }
};
export default prescriptionService;

