/* *********************************************** */
/* File: src/features/billing/pages/RefundPage.jsx */
/* *********************************************** */

import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import billingService from "../services/billingService";

const RefundPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const paymentId = searchParams.get("paymentId");

  const [formData, setFormData] = useState({
    amount: "",
    reason: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!paymentId) {
      setError("Payment ID is required.");
      return false;
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      setError("Please enter a valid refund amount.");
      return false;
    }

    if (!formData.reason.trim()) {
      setError("Please provide a reason for the refund.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      await billingService.refundPayment(paymentId, {
        amount: Number(formData.amount),
        reason: formData.reason.trim(),
        notes: formData.notes.trim(),
      });

      setSuccess("Refund has been processed successfully.");

      setFormData({
        amount: "",
        reason: "",
        notes: "",
      });

      setTimeout(() => {
        navigate("/billing/payments");
      }, 1500);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to process the refund. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-6">
          <button
            type="button"
            onClick={handleCancel}
            className="mb-4 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            ← Back
          </button>

          <h1 className="text-2xl font-bold text-gray-900">
            Process Refund
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            Refund a payment and record the reason for the transaction.
          </p>
        </div>

        {/* Payment information */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            Payment Information
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase text-gray-500">
                Payment ID
              </p>

              <p className="mt-1 break-all text-sm font-medium text-gray-900">
                {paymentId || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase text-gray-500">
                Status
              </p>

              <span className="mt-1 inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                Refund Pending
              </span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div
            role="alert"
            className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700"
          >
            {success}
          </div>
        )}

        {/* Refund form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Refund Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter the amount and reason for the refund.
            </p>
          </div>

          <div className="space-y-5">
            {/* Amount */}
            <div>
              <label
                htmlFor="amount"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Refund Amount <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>

                <input
                  id="amount"
                  name="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  disabled={loading}
                  className="w-full rounded-md border border-gray-300 py-2.5 pl-8 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Reason */}
            <div>
              <label
                htmlFor="reason"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Refund Reason <span className="text-red-500">*</span>
              </label>

              <select
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              >
                <option value="">Select a reason</option>
                <option value="Patient request">Patient request</option>
                <option value="Duplicate payment">Duplicate payment</option>
                <option value="Billing error">Billing error</option>
                <option value="Service cancelled">Service cancelled</option>
                <option value="Insurance adjustment">
                  Insurance adjustment
                </option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label
                htmlFor="notes"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Additional Notes
              </label>

              <textarea
                id="notes"
                name="notes"
                rows={4}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Enter any additional information about this refund..."
                disabled={loading}
                className="w-full resize-none rounded-md border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />
            </div>
          </div>

          {/* Warning */}
          <div className="mt-6 rounded-md border border-yellow-200 bg-yellow-50 p-4">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Please verify the payment and refund
              amount before submitting. Refund transactions should only be
              processed by authorized staff.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || !paymentId}
              className="rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Processing..." : "Process Refund"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RefundPage;
