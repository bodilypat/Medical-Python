import { useCallback, useEffect, useState } from "react";
import billingService from "../services/billingService";

/**
 * Hook for managing payments.
 *
 * Supports:
 * - Fetching payments
 * - Fetching a single payment
 * - Creating payments
 * - Updating payments
 * - Invoice payment history
 * - Patient payment history
 * - Processing refunds
 * - Fetching refunds
 * - Fetching a single refund
 * - Searching/filtering
 * - Pagination
 * - Refetching
 */

const usePayments = (initialParams = {}) => {
  
  // STATE
  
  const [payments, setPayments] = useState([]);

  const [payment, setPayment] = useState(null);

  const [refunds, setRefunds] = useState([]);

  const [refund, setRefund] = useState(null);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const [params, setParams] = useState(initialParams);

  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [refundLoading, setRefundLoading] = useState(false);

  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [refunding, setRefunding] = useState(false);

  const [error, setError] = useState(null);

  
  // RESPONSE HELPERS
  
  /* Normalize a collection response. */

  const normalizeListResponse = useCallback(
    (response, key) => {
      const data = response?.data ?? response;

      if (Array.isArray(data)) {
        return {
          records: data,
          pagination: null,
        };
      }

      return {
        records:
          data?.[key] ||
          data?.records ||
          data?.items ||
          data?.data ||
          [],
        pagination: data?.pagination || null,
      };
    },
    []
  );

  /* Normalize a single resource response. */

  const normalizeSingleResponse = useCallback(
    (response, key) => {
      const data = response?.data ?? response;

      return (
        data?.[key] ||
        data?.data ||
        data
      );
    },
    []
  );

  // PAYMENTS

  /* Fetch payments. */

  const fetchPayments = useCallback(
    async (customParams = null) => {
      try {
        setLoading(true);
        setError(null);

        const requestParams =
          customParams ?? params;

        const response =
          await billingService.getPayments(
            requestParams
          );

        const normalized =
          normalizeListResponse(
            response,
            "payments"
          );

        setPayments(normalized.records);

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
          "Failed to load payments.";

        setError(message);

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [normalizeListResponse, params]
  );

  /* Fetch a single payment. */

  const fetchPayment = useCallback(
    async (paymentId) => {
      if (!paymentId) {
        const message =
          "Payment ID is required.";

        setError(message);
        throw new Error(message);
      }

      try {
        setPaymentLoading(true);
        setError(null);

        const response =
          await billingService.getPayment(
            paymentId
          );

        const data =
          normalizeSingleResponse(
            response,
            "payment"
          );

        setPayment(data);

        return data;
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load payment.";

        setError(message);

        throw err;
      } finally {
        setPaymentLoading(false);
      }
    },
    [normalizeSingleResponse]
  );

  /**
   * Automatically fetch payments when
   * parameters change.
   */

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  /*Create a payment. */

  const createPayment = useCallback(
    async (data) => {
      try {
        setCreating(true);
        setError(null);

        const response =
          await billingService.createPayment(
            data
          );

        const createdPayment =
          normalizeSingleResponse(
            response,
            "payment"
          );

        setPayment(createdPayment);

        await fetchPayments();

        return createdPayment;
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to create payment.";

        setError(message);

        throw err;
      } finally {
        setCreating(false);
      }
    },
    [fetchPayments, normalizeSingleResponse]
  );

  /* Update a payment. */ 

  const updatePayment = useCallback(
    async (paymentId, data) => {
      if (!paymentId) {
        const message =
          "Payment ID is required.";

        setError(message);
        throw new Error(message);
      }

      try {
        setUpdating(true);
        setError(null);

        const response =
          await billingService.updatePayment(
            paymentId,
            data
          );

        const updatedPayment =
          normalizeSingleResponse(
            response,
            "payment"
          );

        if (
          payment &&
          String(payment.id) ===
            String(paymentId)
        ) {
          setPayment(updatedPayment);
        }

        await fetchPayments();

        return updatedPayment;
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to update payment.";

        setError(message);

        throw err;
      } finally {
        setUpdating(false);
      }
    },
    [
      fetchPayments,
      normalizeSingleResponse,
      payment,
    ]
  );
  
  // INVOICE PAYMENT HISTORY
 
  /* Get all payments belonging to an invoice. */

  const getInvoicePayments = useCallback(
    async (invoiceId, customParams = {}) => {
      if (!invoiceId) {
        const message =
          "Invoice ID is required.";

        setError(message);
        throw new Error(message);
      }

      try {
        setLoading(true);
        setError(null);

        const response =
          await billingService.getInvoicePayments(
            invoiceId,
            customParams
          );

        const normalized =
          normalizeListResponse(
            response,
            "payments"
          );

        return normalized.records;
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load invoice payments.";

        setError(message);

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [normalizeListResponse]
  );

  // PATIENT PAYMENT HISTORY
  
  /* Get all payments belonging to a patient. */

  const getPatientPayments = useCallback(
    async (patientId, customParams = {}) => {
      if (!patientId) {
        const message =
          "Patient ID is required.";

        setError(message);
        throw new Error(message);
      }

      try {
        setLoading(true);
        setError(null);

        const response =
          await billingService.getPatientPayments(
            patientId,
            customParams
          );

        const normalized =
          normalizeListResponse(
            response,
            "payments"
          );

        return normalized.records;
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load patient payment history.";

        setError(message);

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [normalizeListResponse]
  );

  // REFUNDS

  /* Process a refund. */

  const refundPayment = useCallback(
    async (paymentId, data) => {
      if (!paymentId) {
        const message =
          "Payment ID is required.";

        setError(message);
        throw new Error(message);
      }

      if (!data?.amount || Number(data.amount) <= 0) {
        const message =
          "A valid refund amount is required.";

        setError(message);
        throw new Error(message);
      }

      if (!data?.reason) {
        const message =
          "Refund reason is required.";

        setError(message);
        throw new Error(message);
      }

      try {
        setRefunding(true);
        setError(null);

        const response =
          await billingService.refundPayment(
            paymentId,
            {
              amount: Number(data.amount),
              reason: data.reason,
              notes: data.notes || "",
            }
          );

        const createdRefund =
          normalizeSingleResponse(
            response,
            "refund"
          );

        setRefund(createdRefund);

        // Refresh the selected payment because
        // its refundable balance/status may have changed.
        if (
          payment &&
          String(payment.id) ===
            String(paymentId)
        ) {
          await fetchPayment(paymentId);
        }

        await fetchPayments();

        return createdRefund;
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to process refund.";

        setError(message);

        throw err;
      } finally {
        setRefunding(false);
      }
    },
    [
      fetchPayment,
      fetchPayments,
      normalizeSingleResponse,
      payment,
    ]
  );

  /* Fetch refunds. */

  const fetchRefunds = useCallback(
    async (customParams = {}) => {
      try {
        setRefundLoading(true);
        setError(null);

        const response =
          await billingService.getRefunds(
            customParams
          );

        const normalized =
          normalizeListResponse(
            response,
            "refunds"
          );

        setRefunds(normalized.records);

        return normalized.records;
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load refunds.";

        setError(message);

        throw err;
      } finally {
        setRefundLoading(false);
      }
    },
    [normalizeListResponse]
  );

  /* Fetch a single refund. */

  const fetchRefund = useCallback(
    async (refundId) => {
      if (!refundId) {
        const message =
          "Refund ID is required.";

        setError(message);
        throw new Error(message);
      }

      try {
        setRefundLoading(true);
        setError(null);

        const response =
          await billingService.getRefund(
            refundId
          );

        const data =
          normalizeSingleResponse(
            response,
            "refund"
          );

        setRefund(data);

        return data;
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load refund.";

        setError(message);

        throw err;
      } finally {
        setRefundLoading(false);
      }
    },
    [normalizeSingleResponse]
  );

  // FILTERS / PAGINATION
  
  /* Update payment filters. */
  const updateParams = useCallback(
    (newParams = {}) => {
      setParams((previous) => ({
        ...previous,
        ...newParams,
      }));
    },
    []
  );

  /* Reset payment filters. */
  const resetParams = useCallback(() => {
    setParams({
      page: 1,
      limit: 10,
    });
  }, []);

  /* Change current page.*/
  const changePage = useCallback((page) => {
    setParams((previous) => ({
      ...previous,
      page,
    }));
  }, []);

  /*Change page size.*/
  const changeLimit = useCallback((limit) => {
    setParams((previous) => ({
      ...previous,
      page: 1,
      limit,
    }));
  }, []);

  // UTILITIES

  /* Clear selected payment. */
  const clearPayment = useCallback(() => {
    setPayment(null);
  }, []);

  /* Clear selected refund. */
  const clearRefund = useCallback(() => {
    setRefund(null);
  }, []);

  /* Clear error. */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // RETURN

  return {

    // Payment data
    payments,
    payment,
    pagination,
    params,

    // Refund data
    refunds,
    refund,

    // Loading states
    loading,
    paymentLoading,
    refundLoading,
    creating,
    updating,
    refunding,

    // Error
    error,

    // Payment operations
    fetchPayments,
    fetchPayment,
    createPayment,
    updatePayment,

    // Payment history
    getInvoicePayments,
    getPatientPayments,

    // Refund operations
    refundPayment,
    fetchRefunds,
    fetchRefund,

    // Filters / pagination
    updateParams,
    resetParams,
    changePage,
    changeLimit,

    // Utilities
    clearPayment,
    clearRefund,
    clearError,

    // Alias
    refetch: fetchPayments,
  };
};

export default usePayments;
