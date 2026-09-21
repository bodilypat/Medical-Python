/* ************************************************************** */
/* #File: src/featues/medical-record/services/medicalRecordApi.js */
/* ************************************************************** */

import axios from "axios";

const API_URL = "/api/medical-records";

/**
 * Extract API error message.
 */
const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "An unexpected error occurred."
  );
};

/**
 * Get all medical records.
 *
 * Supported filters:
 * - patientId
 * - doctorId
 * - search
 * - diagnosis
 * - dateFrom
 * - dateTo
 * - sortBy
 * - sortOrder
 * - page
 * - limit
 */
export const getMedicalRecords = async (filters = {}) => {
  try {
    const response = await axios.get(API_URL, {
      params: filters,
    });

    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);

    throw new Error(message);
  }
};

/**
 * Get a single medical record by ID.
 */
export const getMedicalRecord = async (id) => {
  if (!id) {
    throw new Error("Medical record ID is required.");
  }

  try {
    const response = await axios.get(
      `${API_URL}/${id}`
    );

    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);

    throw new Error(message);
  }
};

/**
 * Get all medical records for a patient.
 */
export const getPatientMedicalHistory = async (
  patientId,
  filters = {}
) => {
  if (!patientId) {
    throw new Error("Patient ID is required.");
  }

  try {
    const response = await axios.get(
      `${API_URL}/patient/${patientId}`,
      {
        params: filters,
      }
    );

    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);

    throw new Error(message);
  }
};

/**
 * Create a medical record.
 */
export const createMedicalRecord = async (data) => {
  if (!data) {
    throw new Error(
      "Medical record data is required."
    );
  }

  try {
    const response = await axios.post(
      API_URL,
      data
    );

    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);

    throw new Error(message);
  }
};

/**
 * Update a medical record.
 */
export const updateMedicalRecord = async (
  id,
  data
) => {
  if (!id) {
    throw new Error("Medical record ID is required.");
  }

  if (!data) {
    throw new Error(
      "Medical record data is required."
    );
  }

  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      data
    );

    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);

    throw new Error(message);
  }
};

/**
 * Partially update a medical record.
 */
export const patchMedicalRecord = async (
  id,
  data
) => {
  if (!id) {
    throw new Error("Medical record ID is required.");
  }

  if (!data) {
    throw new Error(
      "Medical record data is required."
    );
  }

  try {
    const response = await axios.patch(
      `${API_URL}/${id}`,
      data
    );

    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);

    throw new Error(message);
  }
};

/**
 * Delete a medical record.
 */
export const deleteMedicalRecord = async (id) => {
  if (!id) {
    throw new Error("Medical record ID is required.");
  }

  try {
    const response = await axios.delete(
      `${API_URL}/${id}`
    );

    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);

    throw new Error(message);
  }
};

/**
 * Search medical records.
 */
export const searchMedicalRecords = async (
  search,
  filters = {}
) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        ...filters,
        search: search?.trim() || "",
      },
    });

    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);

    throw new Error(message);
  }
};

/**
 * Get records by doctor.
 */
export const getDoctorMedicalRecords = async (
  doctorId,
  filters = {}
) => {
  if (!doctorId) {
    throw new Error("Doctor ID is required.");
  }

  try {
    const response = await axios.get(API_URL, {
      params: {
        ...filters,
        doctorId,
      },
    });

    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);

    throw new Error(message);
  }
};

/**
 * Get records by diagnosis.
 */
export const getMedicalRecordsByDiagnosis =
  async (diagnosis, filters = {}) => {
    if (!diagnosis?.trim()) {
      throw new Error("Diagnosis is required.");
    }

    try {
      const response = await axios.get(API_URL, {
        params: {
          ...filters,
          diagnosis: diagnosis.trim(),
        },
      });

      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);

      throw new Error(message);
    }
  };

/**
 * Get records within a date range.
 */
export const getMedicalRecordsByDateRange = async (
  dateFrom,
  dateTo,
  filters = {}
) => {
  if (!dateFrom && !dateTo) {
    throw new Error(
      "At least one date is required."
    );
  }

  try {
    const response = await axios.get(API_URL, {
      params: {
        ...filters,
        ...(dateFrom && { dateFrom }),
        ...(dateTo && { dateTo }),
      },
    });

    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);

    throw new Error(message);
  }
};

export default {
  getMedicalRecords,
  getMedicalRecord,
  getPatientMedicalHistory,
  createMedicalRecord,
  updateMedicalRecord,
  patchMedicalRecord,
  deleteMedicalRecord,
  searchMedicalRecords,
  getDoctorMedicalRecords,
  getMedicalRecordsByDiagnosis,
  getMedicalRecordsByDateRange,
};
