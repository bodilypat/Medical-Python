import { useCallback, useEffect, useState } from "react";
import billingService from "./services/billingService";

/*
 * Hook for managing a single billing record.
 *
 * Supports:
 * - Fetching a billing record
 * - Creating a billing record
 * - Updating a billing record
 * - Deleting a billing record
 * - Refetching
 * - Loading/error states
 *
 * @param {string|number|null} billingId
 * @param {Object} options
 * @param {boolean} options.enabled
 */

const useBilling = (billingId = null, options = {}) => {
  const {
    enabled = true,
  } = options;

  const [billing, setBilling] = useState(null);

  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState(null);

  /* Fetch a single billing record. */

  const fetchBilling = useCallback(
    async (id = billingId) => {
      if (!id) {
        setBilling(null);
        return null;
      }

      try {
        setLoading(true);
        setError(null);

        const response =
          await billingService.getBilling(id);

        const data =
          response?.data ??
          response?.billing ??
          response;

        setBilling(data);

        return data;
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load billing record.";

        setError(message);

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [billingId]
  );

  /* Fetch automatically when billingId changes. */

  useEffect(() => {
    if (!enabled || !billingId) {
      return;
    }

    fetchBilling();
  }, [billingId, enabled, fetchBilling]);

  /* Create a billing record. */

  const createBilling = useCallback(async (data) => {
    try {
      setCreating(true);
      setError(null);

      const response =
        await billingService.createBilling(data);

      const createdBilling =
        response?.data ??
        response?.billing ??
        response;

      setBilling(createdBilling);

      return createdBilling;
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
  }, []);

  /* Update the current billing record. */

  const updateBilling = useCallback(
    async (data) => {
      if (!billingId) {
        const message =
          "Billing ID is required to update a billing record.";

        setError(message);
        throw new Error(message);
      }

      try {
        setUpdating(true);
        setError(null);

        const response =
          await billingService.updateBilling(
            billingId,
            data
          );

        const updatedBilling =
          response?.data ??
          response?.billing ??
          response;

        setBilling(updatedBilling);

        return updatedBilling;
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
    [billingId]
  );

  /*
   * Update a billing record by an explicit ID.
   *
   * Useful when the hook is not currently bound
   * to a billing ID.
   */

  const updateBillingById = useCallback(
    async (id, data) => {
      if (!id) {
        const message = "Billing ID is required.";

        setError(message);
        throw new Error(message);
      }

      try {
        setUpdating(true);
        setError(null);

        const response =
          await billingService.updateBilling(
            id,
            data
          );

        const updatedBilling =
          response?.data ??
          response?.billing ??
          response;

        if (String(id) === String(billingId)) {
          setBilling(updatedBilling);
        }

        return updatedBilling;
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
    [billingId]
  );

  /* Delete the current billing record. */

  const deleteBilling = useCallback(async () => {
    if (!billingId) {
      const message =
        "Billing ID is required to delete a billing record.";

      setError(message);
      throw new Error(message);
    }

    try {
      setDeleting(true);
      setError(null);

      const response =
        await billingService.deleteBilling(
          billingId
        );

      setBilling(null);

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
  }, [billingId]);

  /* Delete a billing record by explicit ID. */

  const deleteBillingById = useCallback(
    async (id) => {
      if (!id) {
        const message = "Billing ID is required.";

        setError(message);
        throw new Error(message);
      }

      try {
        setDeleting(true);
        setError(null);

        const response =
          await billingService.deleteBilling(id);

        if (String(id) === String(billingId)) {
          setBilling(null);
        }

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
    [billingId]
  );

  /* Clear the currently loaded billing record. */

  const clearBilling = useCallback(() => {
    setBilling(null);
    setError(null);
  }, []);

  /* Clear the current error. */
  
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // Data
    billing,

    // State
    loading,
    creating,
    updating,
    deleting,
    error,

    // Fetch
    fetchBilling,
    refetch: fetchBilling,

    // CRUD
    createBilling,
    updateBilling,
    updateBillingById,
    deleteBilling,
    deleteBillingById,

    // Utilities
    clearBilling,
    clearError,
  };
};

export default useBilling;
