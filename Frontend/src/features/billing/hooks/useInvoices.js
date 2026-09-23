/* ****************************************** */
/* File: #src/features/billing/useInvoices.js */
/* ****************************************** */

import { useCallback, useEffect, useState } from "react";
import billingService from "../services/billingService";

/*
 * Hook for managing invoices.
 *
 * Supports:
 * - Fetching invoices
 * - Fetching a single invoice
 * - Creating invoices
 * - Updating invoices
 * - Deleting invoices
 * - Searching/filtering
 * - Pagination
 * - Downloading invoice PDFs
 * - Refetching
 */

const useInvoices = (initialParams = {}) => {
  const [invoices, setInvoices] = useState([]);

  const [invoice, setInvoice] = useState(null);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const [params, setParams] = useState(initialParams);

  const [loading, setLoading] = useState(false);
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const [error, setError] = useState(null);

  /* Normalize API responses. */

  const normalizeListResponse = useCallback((response) => {
    const data = response?.data ?? response;

    if (Array.isArray(data)) {
      return {
        records: data,
        pagination: null,
      };
    }

    return {
      records:
        data?.invoices ||
        data?.records ||
        data?.items ||
        data?.data ||
        [],
      pagination: data?.pagination || null,
    };
  }, []);

  /* Normalize a single invoice response. */

  const normalizeInvoiceResponse = useCallback(
    (response) => {
      const data = response?.data ?? response;

      return (
        data?.invoice ||
        data?.data ||
        data
      );
    },
    []
  );

  /* Fetch invoices. */

  const fetchInvoices = useCallback(
    async (customParams = null) => {
      try {
        setLoading(true);
        setError(null);

        const requestParams =
          customParams ?? params;

        const response =
          await billingService.getInvoices(
            requestParams
          );

        const normalized =
          normalizeListResponse(response);

        setInvoices(normalized.records);

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
          "Failed to load invoices.";

        setError(message);

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [normalizeListResponse, params]
  );

  /* Fetch a single invoice. */
  const fetchInvoice = useCallback(
    async (id) => {
      if (!id) {
        const message =
          "Invoice ID is required.";

        setError(message);
        throw new Error(message);
      }

      try {
        setInvoiceLoading(true);
        setError(null);

        const response =
          await billingService.getInvoice(id);

        const data =
          normalizeInvoiceResponse(response);

        setInvoice(data);

        return data;
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load invoice.";

        setError(message);

        throw err;
      } finally {
        setInvoiceLoading(false);
      }
    },
    [normalizeInvoiceResponse]
  );

  /*
   * Automatically fetch invoice list
   * when query parameters change.
   */

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  /* Update filters/search parameters. */

  const updateParams = useCallback(
    (newParams = {}) => {
      setParams((previous) => ({
        ...previous,
        ...newParams,
      }));
    },
    []
  );

  /* Reset filters. */

  const resetParams = useCallback(() => {
    setParams({
      page: 1,
      limit: 10,
    });
  }, []);

  /* Change page. */

  const changePage = useCallback((page) => {
    setParams((previous) => ({
      ...previous,
      page,
    }));
  }, []);

  /* Change page size. */

  const changeLimit = useCallback((limit) => {
    setParams((previous) => ({
      ...previous,
      page: 1,
      limit,
    }));
  }, []);

  /* Create invoice. */

  const createInvoice = useCallback(
    async (data) => {
      try {
        setCreating(true);
        setError(null);

        const response =
          await billingService.createInvoice(
            data
          );

        const createdInvoice =
          normalizeInvoiceResponse(response);

        setInvoice(createdInvoice);

        await fetchInvoices();

        return createdInvoice;
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to create invoice.";

        setError(message);

        throw err;
      } finally {
        setCreating(false);
      }
    },
    [fetchInvoices, normalizeInvoiceResponse]
  );

  /* Update invoice. */

  const updateInvoice = useCallback(
    async (id, data) => {
      if (!id) {
        const message =
          "Invoice ID is required.";

        setError(message);
        throw new Error(message);
      }

      try {
        setUpdating(true);
        setError(null);

        const response =
          await billingService.updateInvoice(
            id,
            data
          );

        const updatedInvoice =
          normalizeInvoiceResponse(response);

        if (
          invoice &&
          String(invoice.id) === String(id)
        ) {
          setInvoice(updatedInvoice);
        }

        await fetchInvoices();

        return updatedInvoice;
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to update invoice.";

        setError(message);

        throw err;
      } finally {
        setUpdating(false);
      }
    },
    [
      fetchInvoices,
      invoice,
      normalizeInvoiceResponse,
    ]
  );

  /* Delete invoice. */
  const deleteInvoice = useCallback(
    async (id) => {
      if (!id) {
        const message =
          "Invoice ID is required.";

        setError(message);
        throw new Error(message);
      }

      try {
        setDeleting(true);
        setError(null);

        const response =
          await billingService.deleteInvoice(id);

        if (
          invoice &&
          String(invoice.id) === String(id)
        ) {
          setInvoice(null);
        }

        await fetchInvoices();

        return response;
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to delete invoice.";

        setError(message);

        throw err;
      } finally {
        setDeleting(false);
      }
    },
    [fetchInvoices, invoice]
  );

  /* Get invoice by invoice number.*/
  const getInvoiceByNumber = useCallback(
    async (invoiceNumber) => {
      if (!invoiceNumber) {
        const message =
          "Invoice number is required.";

        setError(message);
        throw new Error(message);
      }

      try {
        setInvoiceLoading(true);
        setError(null);

        const response =
          await billingService.getInvoiceByNumber(
            invoiceNumber
          );

        const data =
          normalizeInvoiceResponse(response);

        setInvoice(data);

        return data;
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to find invoice.";

        setError(message);

        throw err;
      } finally {
        setInvoiceLoading(false);
      }
    },
    [normalizeInvoiceResponse]
  );

  /*
   * Download invoice PDF.
   *
   * Returns the Blob so the calling component
   * can decide how it should be displayed/downloaded.
   */

  const downloadInvoice = useCallback(
    async (id, filename = "invoice.pdf") => {
      if (!id) {
        const message =
          "Invoice ID is required.";

        setError(message);
        throw new Error(message);
      }

      try {
        setDownloading(true);
        setError(null);

        const blob =
          await billingService.downloadInvoice(id);

        const url =
          window.URL.createObjectURL(blob);

        const link =
          document.createElement("a");

        link.href = url;
        link.download = filename;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

        return blob;
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to download invoice.";

        setError(message);

        throw err;
      } finally {
        setDownloading(false);
      }
    },
    []
  );

  /**
   * Clear selected invoice.
   */
  const clearInvoice = useCallback(() => {
    setInvoice(null);
  }, []);

  /**
   * Clear error.
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {

    // Data  
    invoices,
    invoice,
    pagination,
    params,

    // Loading states
    loading,
    invoiceLoading,
    creating,
    updating,
    deleting,
    downloading,

    // Error
    error,

    // Invoice list
    fetchInvoices,
    refetch: fetchInvoices,

    // Single invoice
    fetchInvoice,
    getInvoiceByNumber,
    clearInvoice,

    // CRUD
    createInvoice,
    updateInvoice,
    deleteInvoice,

    // PDF
    downloadInvoice,

    // Filters / pagination
    updateParams,
    resetParams,
    changePage,
    changeLimit,

    // Error handling
    clearError,
  };
};

export default useInvoices;
