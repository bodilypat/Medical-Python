/* ******************************************************** */
/* File: #src/features/medical-records/hooks/useMedicalRecord.js*/ 
/* ******************************************************** */

import { useCallback, useEffect, useState } from "react";
import {
  getMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
} from "../services/medicalRecordsApi";

const extractData = (response) => {
  if (response?.data !== undefined) {
    return response.data;
  }

  return response;
};

const useMedicalRecord = (id, options = {}) => {
  const { autoFetch = true } = options;

  const [record, setRecord] = useState(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState("");

  const fetchRecord = useCallback(async () => {
    if (!id) {
      setRecord(null);
      setError("Medical record ID is required.");
      return null;
    }

    try {
      setLoading(true);
      setError("");

      const response = await getMedicalRecord(id);
      const data = extractData(response);

      setRecord(data);

      return data;
    } catch (err) {
      console.error(
        "Failed to fetch medical record:",
        err
      );

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to load medical record.";

      setError(message);
      setRecord(null);

      return null;
    } finally {
      setLoading(false);
    }
  }, [id]);

  const updateRecord = useCallback(
    async (data) => {
      if (!id) {
        const message =
          "Medical record ID is required.";

        setError(message);
        throw new Error(message);
      }

      try {
        setSaving(true);
        setError("");

        const response = await updateMedicalRecord(
          id,
          data
        );

        const updatedRecord = extractData(response);

        setRecord(updatedRecord);

        return updatedRecord;
      } catch (err) {
        console.error(
          "Failed to update medical record:",
          err
        );

        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Unable to update medical record.";

        setError(message);

        throw err;
      } finally {
        setSaving(false);
      }
    },
    [id]
  );

  const removeRecord = useCallback(async () => {
    if (!id) {
      const message =
        "Medical record ID is required.";

      setError(message);
      return false;
    }

    try {
      setDeleting(true);
      setError("");

      await deleteMedicalRecord(id);

      setRecord(null);

      return true;
    } catch (err) {
      console.error(
        "Failed to delete medical record:",
        err
      );

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to delete medical record.";

      setError(message);

      return false;
    } finally {
      setDeleting(false);
    }
  }, [id]);

  const clearError = useCallback(() => {
    setError("");
  }, []);

  const clearRecord = useCallback(() => {
    setRecord(null);
  }, []);

  useEffect(() => {
    if (!autoFetch) {
      return;
    }

    fetchRecord();
  }, [autoFetch, fetchRecord]);

  return {
    // Data
    record,

    // Actions
    fetchRecord,
    updateRecord,
    removeRecord,
    clearRecord,
    clearError,

    // State
    loading,
    saving,
    deleting,
    error,
  };
};

export default useMedicalRecord;
