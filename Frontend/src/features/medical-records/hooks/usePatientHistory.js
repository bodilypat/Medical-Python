/* ************************************************************* */
/* File: src/features/medical-records/hooks/usePatientHistory.js */
/* ************************************************************* */

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getMedicalRecords,
} from "../services/medicalRecordsApi";

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

  return [];
};

const usePatientHistory = (patientId, options = {}) => {
  const {
    autoFetch = true,
    sortOrder = "desc",
  } = options;

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchHistory = useCallback(
    async ({ silent = false } = {}) => {
      if (!patientId) {
        setRecords([]);
        setError("Patient ID is required.");
        return [];
      }

      try {
        if (silent) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const response = await getMedicalRecords({
          patientId,
        });

        const history = extractRecords(response);

        const sortedHistory = [...history].sort(
          (a, b) => {
            const dateA = new Date(
              a.date ||
                a.recordDate ||
                a.createdAt ||
                0
            ).getTime();

            const dateB = new Date(
              b.date ||
                b.recordDate ||
                b.createdAt ||
                0
            ).getTime();

            return sortOrder === "asc"
              ? dateA - dateB
              : dateB - dateA;
          }
        );

        setRecords(sortedHistory);

        return sortedHistory;
      } catch (err) {
        console.error(
          "Failed to fetch patient history:",
          err
        );

        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Unable to load patient medical history.";

        setError(message);

        return [];
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [patientId, sortOrder]
  );

  const refresh = useCallback(() => {
    return fetchHistory({ silent: true });
  }, [fetchHistory]);

  const clearHistory = useCallback(() => {
    setRecords([]);
    setError("");
  }, []);

  const clearError = useCallback(() => {
    setError("");
  }, []);

  /* Records grouped by year. */
  const recordsByYear = useMemo(() => {
    return records.reduce((groups, record) => {
      const recordDate =
        record.date ||
        record.recordDate ||
        record.createdAt;

      const year = recordDate
        ? new Date(recordDate).getFullYear()
        : "Unknown";

      if (!groups[year]) {
        groups[year] = [];
      }

      groups[year].push(record);

      return groups;
    }, {});
  }, [records]);

  /* Unique diagnoses found in the patient's history. */
  const diagnoses = useMemo(() => {
    const values = records
      .map((record) => record.diagnosis)
      .filter(Boolean)
      .map((diagnosis) => diagnosis.trim());

    return [...new Set(values)];
  }, [records]);

  /* Most recent medical record. */
  const latestRecord = useMemo(() => {
    return records.length > 0 ? records[0] : null;
  }, [records]);

  /* Number of records. */
  const recordCount = records.length;

  useEffect(() => {
    if (!autoFetch) {
      return;
    }

    fetchHistory();
  }, [autoFetch, fetchHistory]);

  return {
    /* History data */
    records,
    latestRecord,
    recordsByYear,
    diagnoses,
    recordCount,

    /* Fetching */
    fetchHistory,
    refresh,

    /* State */
    loading,
    refreshing,
    error,

   /* Utilities */
    clearHistory,
    clearError,
  };
};

export default usePatientHistory;
