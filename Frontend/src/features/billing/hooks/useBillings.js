/* *********************************************** */
/* File: src/features/billing/hooks/useBillings.js */ 
/* *********************************************** */

import { useCallback, useEffect, useMemo, useState } from "react";
import billingService from "../services/billingService";

/*
 * Hook for managing billing records.
 *
 * Supports:
 * - Fetching billing records
 * - Searching/filtering
 * - Pagination
 * - Creating billing records
 * - Updating billing records
 * - Deleting billing records
 * - Refetching
 * - Loading/error states
 */

const useBillings = (initialParams = {}) => {
  const [billings, setBillings] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const [params, setParams] = useState(initialParams);

  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState(null);

  /*
   * Normalize API response.
   */
  const normalizeResponse = useCallback((response) => {
    const data = response?.data ?? response;

    if (Array.isArray(data)) {
      return {
        records: data,
        pagination: null,
      };
    }

    return {
      records:
        data?.billings ||
        data?.records ||
        data?.items ||
        data?.data ||
        [],
      pagination: data?.pagination || null,
    };
  }, []);

  /*
   * Fetch billing records.
   */
  const fetchBillings = useCallback(
    async (customParams = null) => {
      try {
        setLoading(true);
        setError(null);

        const requestParams = customParams ?? params;

        const response =
          await billingService.getBillings(requestParams);

        const normalized = normalizeResponse(response);

        setBillings(normalized.records);

        if (normalized.pagination) {
          setPagination((previous) => ({
            ...previous,
            ...normalized.pagination,
          }));
        } else {
          setPagination((previous) => ({
            ...previous,
            page:
              Number(requestParams?.page) ||
              previous.page ||
              1,
            limit:
              Number(requestParams?.limit) ||
              previous.limit ||
              10,
            total: normalized.records.length,
            totalPages: 1,
          }));
        }

        return normalized.records;
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load billing records.";

        setError(message);

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [normalizeResponse, params]
  );

   /* Automatically fetch records when params change. */

  useEffect(() => {
    fetchBillings();
  }, [fetchBillings]);

  /* Update search/filter parameters.*/
  
  const updateParams = useCallback((newParams = {}) => {
    setParams((previous) => ({
      ...previous,
      ...newParams,
    }));
  }, []);

  /* Reset filters.*/

  const resetParams = useCallback(() => {
    setParams({
      page: 1,
      limit: 10,
    });
  }, []);

  /* Change page.*/

  const changePage = useCallback((page) => {
    setParams((previous) => ({
      ...previous,
      page,
    }));
  }, []);

  /* Change page size.*/ 

  const changeLimit = useCallback((limit) => {
    setParams((previous) => ({
      ...previous,
      page: 1,
      limit,
    }));
  }, []);

  /* Create billing record.*/

  const createBilling = useCallback(
    async (data) => {
      try {
        setCreating(true);
        setError(null);

        const response =
          await billingService.createBilling(data);

        await fetchBillings();

        return response;
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to create billing record.";

        setError(message);

        throw err;
      } finally {
        setCreating(false);
      }
    },
    [fetchBillings]
  );

  /* Update billing record.*/

  const updateBilling = useCallback(
    async (id, data) => {
      try {
        setUpdating(true);
        setError(null);

        const response =
          await billingService.updateBilling(id, data);

        await fetchBillings();

        return response;
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to update billing record.";

        setError(message);

        throw err;
      } finally {
        setUpdating(false);
      }
    },
    [fetchBillings]
  );

  /* Delete billing record.*/

  const deleteBilling = useCallback(
    async (id) => {
      try {
        setDeleting(true);
        setError(null);

        const response =
          await billingService.deleteBilling(id);

        await fetchBillings();

        return response;
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to delete billing record.";

        setError(message);

        throw err;
      } finally {
        setDeleting(false);
      }
    },
    [fetchBillings]
  );

  /* Search billing records.*/

  const searchBillings = useCallback(
    async (query, additionalParams = {}) => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await billingService.searchBillings(
            query,
            {
              ...additionalParams,
              page: additionalParams.page || 1,
              limit:
                additionalParams.limit ||
                pagination.limit,
            }
          );

        const normalized = normalizeResponse(response);

        setBillings(normalized.records);

        if (normalized.pagination) {
          setPagination((previous) => ({
            ...previous,
            ...normalized.pagination,
          }));
        }

        return normalized.records;
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to search billing records.";

        setError(message);

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [normalizeResponse, pagination.limit]
  );

  /* Manually clear current error.*/

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /* Computed values. */
  
  const isEmpty = useMemo(
    () => !loading && billings.length === 0,
    [loading, billings.length]
  );

  const hasBillings = useMemo(
    () => billings.length > 0,
    [billings.length]
  );

  const isProcessing = useMemo(
    () =>
      loading ||
      creating ||
      updating ||
      deleting,
    [loading, creating, updating, deleting]
  );

  return {
    // Data
    billings,
    pagination,
    params,

    // State
    loading,
    creating,
    updating,
    deleting,
    isProcessing,
    error,

    // Computed
    isEmpty,
    hasBillings,

    // Fetching
    fetchBillings,
    refetch: fetchBillings,

    // Parameters
    updateParams,
    resetParams,
    changePage,
    changeLimit,

    // CRUD
    createBilling,
    updateBilling,
    deleteBilling,

    // Search
    searchBillings,

    // Error handling
    clearError,
  };
};

export default useBillings;
