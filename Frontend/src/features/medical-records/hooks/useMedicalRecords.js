/* ************************************************************** */
/* File: src/features/medical-records/hooks/useMedicalRecords.js */ 
/* ************************************************************** */

import { useCallback, useEffect, useState } from "react";
import {
  createMedicalRecord,
  deleteMedicalRecord,
  getMedicalRecord,
  getMedicalRecords,
  updateMedicalRecord,
} from "../services/medicalRecordsApi";

const DEFAULT_FILTERS = {
  search: "",
  doctorId: "",
  diagnosis: "",
  dateFrom: "",
  dateTo: "",
  sortBy: "date",
  sortOrder: "desc",
};

const extractData = (response) => {
  if (response?.data !== undefined) {
    return response.data;
  }

  return response;
};

const extractRecords = (response) => {
  const data = extractData(response);

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.records)) {
    return data.records;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(response?.records)) {
    return response.records;
  }

  return [];
};

const useMedicalRecords = (options = {}) => {
  const {
    patientId = "",
    autoFetch = true,
    initialFilters = {},
  } = options;

  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState(null);

  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });

  const [loading, setLoading] = useState(false);
  const [fetchingRecord, setFetchingRecord] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState("");
  const [recordError, setRecordError] = useState("");

  const clearError = useCallback(() => {
    setError("");
    setRecordError("");
  }, []);

  /**
   * Fetch all medical records.
   */
  const fetchRecords = useCallback(
    async (customFilters = filters) => {
      try {
        setLoading(true);
        setError("");

        const requestFilters = {
          ...customFilters,
        };

        if (patientId) {
          requestFilters.patientId = patientId;
        }

        const response = await getMedicalRecords(
          requestFilters
        );

        const fetchedRecords = extractRecords(response);

        setRecords(fetchedRecords);

        return fetchedRecords;
      } catch (err) {
        console.error(
          "Failed to fetch medical records:",
          err
        );

        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Unable to load medical records.";

        setError(message);

        return [];
      } finally {
        setLoading(false);
      }
    },
    [filters, patientId]
  );

  /**
   * Fetch a single medical record.
   */
  const fetchRecord = useCallback(async (id) => {
    if (!id) {
      setRecord(null);
      setRecordError("Medical record ID is required.");
      return null;
    }

    try {
      setFetchingRecord(true);
      setRecordError("");

      const response = await getMedicalRecord(id);
      const fetchedRecord = extractData(response);

      setRecord(fetchedRecord);

      return fetchedRecord;
    } catch (err) {
      console.error(
        "Failed to fetch medical record:",
        err
      );

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to load the medical record.";

      setRecordError(message);

      return null;
    } finally {
      setFetchingRecord(false);
    }
  }, []);

  /**
   * Apply filters and fetch records.
   */
  const applyFilters = useCallback(
    async (newFilters = {}) => {
      const updatedFilters = {
        ...DEFAULT_FILTERS,
        ...filters,
        ...newFilters,
      };

      setFilters(updatedFilters);

      return fetchRecords(updatedFilters);
    },
    [filters, fetchRecords]
  );

  /**
   * Search records.
   */
  const search = useCallback(
    async (searchTerm) => {
      return applyFilters({
        search: searchTerm || "",
      });
    },
    [applyFilters]
  );

  /**
   * Reset all filters.
   */
  const resetFilters = useCallback(async () => {
    const resetFiltersValue = {
      ...DEFAULT_FILTERS,
    };

    setFilters(resetFiltersValue);

    return fetchRecords(resetFiltersValue);
  }, [fetchRecords]);

  /**
   * Create a medical record.
   */
  const addRecord = useCallback(async (data) => {
    try {
      setSaving(true);
      setError("");

      const response = await createMedicalRecord(data);
      const newRecord = extractData(response);

      if (newRecord) {
        setRecords((previous) => [
          newRecord,
          ...previous,
        ]);
      }

      return newRecord;
    } catch (err) {
      console.error(
        "Failed to create medical record:",
        err
      );

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to create medical record.";

      setError(message);

      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  /**
   * Update a medical record.
   */
  const editRecord = useCallback(
    async (id, data) => {
      try {
        setSaving(true);
        setError("");

        const response = await updateMedicalRecord(
          id,
          data
        );

        const updatedRecord = extractData(response);

        if (updatedRecord) {
          setRecords((previous) =>
            previous.map((item) =>
              item.id === id
                ? updatedRecord
                : item
            )
          );

          setRecord((previous) =>
            previous?.id === id
              ? updatedRecord
              : previous
          );
        }

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
    []
  );

  /**
   * Delete a medical record.
   */
  const removeRecord = useCallback(async (id) => {
    if (!id) {
      return false;
    }

    try {
      setDeleting(true);
      setError("");

      await deleteMedicalRecord(id);

      setRecords((previous) =>
        previous.filter((item) => item.id !== id)
      );

      setRecord((previous) =>
        previous?.id === id ? null : previous
      );

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
  }, []);

  /**
   * Refresh records using the current filters.
   */
  const refresh = useCallback(() => {
    return fetchRecords(filters);
  }, [fetchRecords, filters]);

  /**
   * Automatically fetch records on mount.
   */
  useEffect(() => {
    if (!autoFetch) {
      return;
    }

    fetchRecords(filters);
  }, [autoFetch, patientId]);

  return {
    // Data
    records,
    record,

    // Filters
    filters,
    setFilters,
    applyFilters,
    search,
    resetFilters,

    // Fetching
    fetchRecords,
    fetchRecord,
    refresh,

    // CRUD
    addRecord,
    editRecord,
    removeRecord,

    // Loading states
    loading,
    fetchingRecord,
    saving,
    deleting,

    // Errors
    error,
    recordError,
    clearError,
  };
};

export default useMedicalRecords;
