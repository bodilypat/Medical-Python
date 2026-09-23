/* ***************************************************** */
/* File: src/features/billing/services/billingService.js */
/* ***************************************************** */

import api from "@/services/api";

/**
 * Billing Service
 *
 * Centralized API service for:
 * - Billing records
 * - Invoices
 * - Payments
 * - Refunds
 *
 * The service assumes an Axios instance is available at:
 * @/services/api
 */

const billingService = {
  // BILLING

  /*
   * Get all billing records.
   *
   * @param {Object} params
   * @returns {Promise<Object>}
   */

  getBillings: async (params = {}) => {
    const response = await api.get("/billing", {
      params,
    });

    return response.data;
  },

  /*
   * Get a single billing record.
   *
   * @param {string|number} id
   * @returns {Promise<Object>}
   */

  getBilling: async (id) => {
    if (!id) {
      throw new Error("Billing ID is required.");
    }

    const response = await api.get(`/billing/${id}`);

    return response.data;
  },

  /*
   * Create a billing record.
   *
   * @param {Object} data
   * @returns {Promise<Object>}
   */

  createBilling: async (data) => {
    if (!data) {
      throw new Error("Billing data is required.");
    }

    const response = await api.post("/billing", data);

    return response.data;
  },

  /*
   * Update a billing record.
   *
   * @param {string|number} id
   * @param {Object} data
   * @returns {Promise<Object>}
   */

  updateBilling: async (id, data) => {
    if (!id) {
      throw new Error("Billing ID is required.");
    }

    const response = await api.patch(`/billing/${id}`, data);

    return response.data;
  },

  /*
   * Delete a billing record.
   *
   * @param {string|number} id
   * @returns {Promise<Object>}
   */

  deleteBilling: async (id) => {
    if (!id) {
      throw new Error("Billing ID is required.");
    }

    const response = await api.delete(`/billing/${id}`);

    return response.data;
  },

  // INVOICES

  /*
   * Get invoices.
   *
   * @param {Object} params
   * @returns {Promise<Object>}
   */

  getInvoices: async (params = {}) => {
    const response = await api.get("/billing/invoices", {
      params,
    });

    return response.data;
  },

  /*
   * Get a single invoice.
   *
   * @param {string|number} id
   * @returns {Promise<Object>}
   */

  getInvoice: async (id) => {
    if (!id) {
      throw new Error("Invoice ID is required.");
    }

    const response = await api.get(`/billing/invoices/${id}`);

    return response.data;
  },

  /*
   * Create an invoice.
   *
   * @param {Object} data
   * @returns {Promise<Object>}
   */

  createInvoice: async (data) => {
    if (!data) {
      throw new Error("Invoice data is required.");
    }

    const response = await api.post("/billing/invoices", data);

    return response.data;
  },

  /*
   * Update an invoice.
   *
   * @param {string|number} id
   * @param {Object} data
   * @returns {Promise<Object>}
   */

  updateInvoice: async (id, data) => {
    if (!id) {
      throw new Error("Invoice ID is required.");
    }

    const response = await api.patch(
      `/billing/invoices/${id}`,
      data
    );

    return response.data;
  },

  /*
   * Delete an invoice.
   *
   * @param {string|number} id
   * @returns {Promise<Object>}
   */

  deleteInvoice: async (id) => {
    if (!id) {
      throw new Error("Invoice ID is required.");
    }

    const response = await api.delete(
      `/billing/invoices/${id}`
    );

    return response.data;
  },

  /*
   * Get invoice by invoice number.
   *
   * @param {string} invoiceNumber
   * @returns {Promise<Object>}
   */

  getInvoiceByNumber: async (invoiceNumber) => {
    if (!invoiceNumber) {
      throw new Error("Invoice number is required.");
    }

    const response = await api.get(
      `/billing/invoices/number/${encodeURIComponent(invoiceNumber)}`
    );

    return response.data;
  },

  /*
   * Generate/download invoice PDF.
   *
   * @param {string|number} id
   * @returns {Promise<Blob>}
   */

  downloadInvoice: async (id) => {
    if (!id) {
      throw new Error("Invoice ID is required.");
    }

    const response = await api.get(
      `/billing/invoices/${id}/pdf`,
      {
        responseType: "blob",
      }
    );

    return response.data;
  },

  // PAYMENTS

  /*
   * Get payments.
   *
   * @param {Object} params
   * @returns {Promise<Object>}
   */

  getPayments: async (params = {}) => {
    const response = await api.get("/billing/payments", {
      params,
    });

    return response.data;
  },

  /*
   * Get a single payment.
   *
   * @param {string|number} id
   * @returns {Promise<Object>}
   */

  getPayment: async (id) => {
    if (!id) {
      throw new Error("Payment ID is required.");
    }

    const response = await api.get(`/billing/payments/${id}`);

    return response.data;
  },

  /*
   * Create a payment.
   *
   * @param {Object} data
   * @returns {Promise<Object>}
   */

  createPayment: async (data) => {
    if (!data) {
      throw new Error("Payment data is required.");
    }

    const response = await api.post(
      "/billing/payments",
      data
    );

    return response.data;
  },

  /*
   * Update payment status/details.
   *
   * @param {string|number} id
   * @param {Object} data
   * @returns {Promise<Object>}
   */

  updatePayment: async (id, data) => {
    if (!id) {
      throw new Error("Payment ID is required.");
    }

    const response = await api.patch(
      `/billing/payments/${id}`,
      data
    );

    return response.data;
  },

  /*
   * Get payment history for an invoice.
   *
   * @param {string|number} invoiceId
   * @param {Object} params
   * @returns {Promise<Object>}
   */

  getInvoicePayments: async (
    invoiceId,
    params = {}
  ) => {
    if (!invoiceId) {
      throw new Error("Invoice ID is required.");
    }

    const response = await api.get(
      `/billing/invoices/${invoiceId}/payments`,
      {
        params,
      }
    );

    return response.data;
  },

  /*
   * Get payment history for a patient.
   *
   * @param {string|number} patientId
   * @param {Object} params
   * @returns {Promise<Object>}
   */

  getPatientPayments: async (
    patientId,
    params = {}
  ) => {
    if (!patientId) {
      throw new Error("Patient ID is required.");
    }

    const response = await api.get(
      `/billing/patients/${patientId}/payments`,
      {
        params,
      }
    );

    return response.data;
  },

  // REFUNDS

  /*
   * Process a payment refund.
   *
   * @param {string|number} paymentId
   * @param {Object} data
   * @param {number} data.amount
   * @param {string} data.reason
   * @param {string} data.notes
   * @returns {Promise<Object>}
   */

  refundPayment: async (paymentId, data) => {
    if (!paymentId) {
      throw new Error("Payment ID is required.");
    }

    if (!data) {
      throw new Error("Refund data is required.");
    }

    if (!data.amount || Number(data.amount) <= 0) {
      throw new Error("A valid refund amount is required.");
    }

    if (!data.reason) {
      throw new Error("Refund reason is required.");
    }

    const response = await api.post(
      `/billing/payments/${paymentId}/refund`,
      {
        amount: Number(data.amount),
        reason: data.reason,
        notes: data.notes || "",
      }
    );

    return response.data;
  },

  /*
   * Get refunds.
   *
   * @param {Object} params
   * @returns {Promise<Object>}
   */

  getRefunds: async (params = {}) => {
    const response = await api.get("/billing/refunds", {
      params,
    });

    return response.data;
  },

  /*
   * Get a single refund.
   *
   * @param {string|number} refundId
   * @returns {Promise<Object>}
   */

  getRefund: async (refundId) => {
    if (!refundId) {
      throw new Error("Refund ID is required.");
    }

    const response = await api.get(
      `/billing/refunds/${refundId}`
    );

    return response.data;
  },

  // SEARCH / FILTERING

  /*
   * Search billing records.
   *
   * @param {string} query
   * @param {Object} params
   * @returns {Promise<Object>}
   */

  searchBillings: async (
    query,
    params = {}
  ) => {
    const response = await api.get("/billing/search", {
      params: {
        search: query,
        ...params,
      },
    });

    return response.data;
  },

  /*
   * Get billing summary/statistics.
   *
   * @param {Object} params
   * @returns {Promise<Object>}
   */
  
  getBillingSummary: async (params = {}) => {
    const response = await api.get(
      "/billing/summary",
      {
        params,
      }
    );

    return response.data;
  },
};

export default billingService;
