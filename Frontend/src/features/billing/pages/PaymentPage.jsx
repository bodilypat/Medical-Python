/* ********************************************************* */
/* #src/features/billing/pages/PaymentPage.jsx               */
/* ********************************************************* */

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import PaymentForm from "../components/PaymentForm";
import PaymentStatus from "../components/PaymentStatus";
import usePayments from "../hooks/usePayments";

/* Helpers */

const getInvoiceFromResponse = (
  response
) => {
  if (!response) {
    return null;
  }

  return (
    response?.invoice ??
    response?.data?.invoice ??
    response?.data ??
    null
  );
};

const getPaymentFromResponse = (
  response
) => {
  if (!response) {
    return null;
  }

  return (
    response?.payment ??
    response?.data?.payment ??
    response?.data ??
    response
  );
};

const getErrorMessage = (
  error
) => {
  if (!error) {
    return "";
  }

  return (
    error?.response?.data?.message ??
    error?.response?.data?.error ??
    error?.message ??
    (
      typeof error ===
      "string"
        ? error
        : ""
    )
  );
};

const getInvoiceId = (
  invoice
) => {
  return (
    invoice?.id ??
    invoice?.invoiceId ??
    invoice?.invoice_id ??
    null
  );
};

const getInvoiceNumber = (
  invoice
) => {
  return (
    invoice?.invoiceNumber ??
    invoice?.invoice_number ??
    invoice?.number ??
    (
      getInvoiceId(
        invoice
      )
        ? `Invoice #${getInvoiceId(
            invoice
          )}`
        : "Invoice"
    )
  );
};

const getBalanceDue = (
  invoice
) => {
  const value =
    invoice?.balanceDue ??
    invoice?.balance_due ??
    invoice?.amountDue ??
    invoice?.amount_due ??
    invoice?.remainingAmount ??
    invoice?.remaining_amount ??
    null;

  if (
    value === null ||
    value === undefined
  ) {
    return null;
  }

  const amount =
    Number(value);

  return Number.isFinite(
    amount
  )
    ? amount
    : null;
};

const formatCurrency = (
  value,
  currency = "USD"
) => {
  const amount =
    Number(value) || 0;

  try {
    return new Intl.NumberFormat(
      undefined,
      {
        style: "currency",
        currency,
      }
    ).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(
      2
    )}`;
  }
};

/* Component */

const PaymentPage = () => {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const {
    invoiceId:
      routeInvoiceId,
    paymentId:
      routePaymentId,
    id,
  } = useParams();

  /*
   * The page supports both:
   *
   * /billing/payments/:invoiceId
   * /billing/invoices/:invoiceId/payment
   *
   * and a generic :id route.
   */
  const resolvedInvoiceId =
    routeInvoiceId ||
    location.state
      ?.invoiceId ||
    location.state
      ?.invoice?.id ||
    id;

  const existingInvoice =
    location.state
      ?.invoice ||
    null;

  /* State */

  const [
    invoice,
    setInvoice,
  ] = useState(
    existingInvoice
  );

  const [
    payment,
    setPayment,
  ] = useState(null);

  const [
    pageError,
    setPageError,
  ] = useState("");

  const [
    submitError,
    setSubmitError,
  ] = useState("");

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  /* Payment hook */

  const paymentHook =
    usePayments() || {};

  const {
    createPayment,
    recordPayment,

    getInvoice,
    fetchInvoice,

    getPayment,
    fetchPayment,

    loading:
      hookLoading,

    error:
      hookError,
  } = paymentHook;

  /* Load invoice */

  const loadInvoice =
    useCallback(
      async () => {
        if (
          invoice ||
          !resolvedInvoiceId
        ) {
          return;
        }

        const loader =
          typeof getInvoice ===
          "function"
            ? getInvoice
            : fetchInvoice;

        if (
          typeof loader !==
          "function"
        ) {
          setPageError(
            "Invoice information could not be loaded."
          );

          return;
        }

        try {
          const response =
            await loader(
              resolvedInvoiceId
            );

          const loadedInvoice =
            getInvoiceFromResponse(
              response
            );

          if (
            loadedInvoice
          ) {
            setInvoice(
              loadedInvoice
            );
          } else {
            setPageError(
              "The requested invoice could not be found."
            );
          }
        } catch (error) {
          console.error(
            "Failed to load invoice:",
            error
          );

          setPageError(
            getErrorMessage(
              error
            ) ||
              "Unable to load the invoice."
          );
        }
      },
      [
        invoice,
        resolvedInvoiceId,
        getInvoice,
        fetchInvoice,
      ]
    );

  useEffect(() => {
    loadInvoice();
  }, [loadInvoice]);

  /* Load existing payment */

  const loadPayment =
    useCallback(
      async () => {
        if (
          !routePaymentId
        ) {
          return;
        }

        const loader =
          typeof getPayment ===
          "function"
            ? getPayment
            : fetchPayment;

        if (
          typeof loader !==
          "function"
        ) {
          return;
        }

        try {
          const response =
            await loader(
              routePaymentId
            );

          const loadedPayment =
            getPaymentFromResponse(
              response
            );

          setPayment(
            loadedPayment
          );
        } catch (error) {
          console.error(
            "Failed to load payment:",
            error
          );

          setPageError(
            getErrorMessage(
              error
            ) ||
              "Unable to load the payment."
          );
        }
      },
      [
        routePaymentId,
        getPayment,
        fetchPayment,
      ]
    );

  useEffect(() => {
    loadPayment();
  }, [loadPayment]);

  /* Derived values */

  const invoiceNumber =
    useMemo(
      () =>
        getInvoiceNumber(
          invoice
        ),
      [invoice]
    );

  const balanceDue =
    useMemo(
      () =>
        getBalanceDue(
          invoice
        ),
      [invoice]
    );

  const currency =
    invoice?.currency ||
    "USD";

  const invoiceStatus =
    invoice?.status ??
    invoice?.paymentStatus ??
    "unknown";

  /* Submit  */

  const handleSubmit =
    useCallback(
      async (payload) => {
        setSubmitError("");
        setSuccessMessage(
          ""
        );
        setSubmitting(
          true
        );

        const submitHandler =
          typeof createPayment ===
          "function"
            ? createPayment
            : recordPayment;

        if (
          typeof submitHandler !==
          "function"
        ) {
          const error =
            new Error(
              "A payment creation method is not available from usePayments()."
            );

          setSubmitError(
            error.message
          );

          setSubmitting(
            false
          );

          throw error;
        }

        /*
         * Automatically attach the invoice ID when
         * the form does not already provide one.
         */
        const paymentPayload = {
          ...payload,
          invoiceId:
            payload?.invoiceId ||
            resolvedInvoiceId,
        };

        try {
          const response =
            await submitHandler(
              paymentPayload
            );

          const createdPayment =
            getPaymentFromResponse(
              response
            );

          setPayment(
            createdPayment
          );

          setSuccessMessage(
            "Payment recorded successfully."
          );

          /*
           * Navigate back to invoice details when an
           * invoice is available.
           */
          if (
            resolvedInvoiceId
          ) {
            navigate(
              `/billing/invoices/${resolvedInvoiceId}`,
              {
                replace: true,
                state: {
                  successMessage:
                    "Payment recorded successfully.",
                },
              }
            );
          } else {
            navigate(
              "/billing",
              {
                replace: true,
                state: {
                  successMessage:
                    "Payment recorded successfully.",
                },
              }
            );
          }

          return response;
        } catch (error) {
          console.error(
            "Failed to record payment:",
            error
          );

          const message =
            getErrorMessage(
              error
            ) ||
            "Unable to record the payment. Please try again.";

          setSubmitError(
            message
          );

          throw error;
        } finally {
          setSubmitting(
            false
          );
        }
      },
      [
        createPayment,
        recordPayment,
        resolvedInvoiceId,
        navigate,
      ]
    );

  /* Cancel */

  const handleCancel =
    useCallback(() => {
      if (
        resolvedInvoiceId
      ) {
        navigate(
          `/billing/invoices/${resolvedInvoiceId}`
        );

        return;
      }

      navigate(
        "/billing"
      );
    }, [
      navigate,
      resolvedInvoiceId,
    ]);

  /* Render: loading */

  const loading =
    Boolean(
      hookLoading ||
        submitting
    );

  if (
    loading &&
    !invoice &&
    !pageError
  ) {
    return (
      <div className="payment-page">
        <div
          className="loading-state"
          role="status"
        >
          <div className="loading-spinner" />

          <p>
            Loading payment information...
          </p>
        </div>
      </div>
    );
  }

  /* Render  */

  return (
    <div className="payment-page">

      {/* Header  */}

      <div className="page-header">
        <div>
          <div className="breadcrumb">
            <button
              type="button"
              className="breadcrumb-link"
              onClick={() =>
                navigate(
                  "/billing"
                )
              }
            >
              Billing
            </button>

            <span
              className="breadcrumb-separator"
              aria-hidden="true"
            >
              /
            </span>

            {resolvedInvoiceId && (
              <>
                <button
                  type="button"
                  className="breadcrumb-link"
                  onClick={() =>
                    navigate(
                      `/billing/invoices/${resolvedInvoiceId}`
                    )
                  }
                >
                  {invoiceNumber}
                </button>

                <span
                  className="breadcrumb-separator"
                  aria-hidden="true"
                >
                  /
                </span>
              </>
            )}

            <span>
              Payment
            </span>
          </div>

          <h1>
            Record Payment
          </h1>

          <p>
            Record a payment against
            {invoice
              ? ` ${invoiceNumber}.`
              : " an invoice."}
          </p>
        </div>

        <div className="page-header-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={
              handleCancel
            }
            disabled={
              loading
            }
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Errors */}

      {(pageError ||
        submitError ||
        getErrorMessage(
          hookError
        )) && (
        <div
          className="alert alert-danger"
          role="alert"
        >
          {pageError ||
            submitError ||
            getErrorMessage(
              hookError
            )}
        </div>
      )}

      {/* Success */}  

      {successMessage && (
        <div
          className="alert alert-success"
          role="status"
        >
          {successMessage}
        </div>
      )}

      {/* Invoice Summary                                    */}

      {invoice && (
        <section className="payment-invoice-summary">
          <div className="payment-summary-header">
            <div>
              <h2>
                {invoiceNumber}
              </h2>

              <p>
                {invoice.patient?.name ||
                  invoice.patientName ||
                  invoice.customerName ||
                  "Patient"}
              </p>
            </div>

            <PaymentStatus
              status={
                invoiceStatus
              }
              paymentStatus={
                invoice?.paymentStatus
              }
              invoice={
                invoice
              }
            />
          </div>

          <div className="payment-summary-grid">
            <div className="payment-summary-item">
              <span>
                Invoice Total
              </span>

              <strong>
                {formatCurrency(
                  invoice?.totalAmount ??
                    invoice?.total ??
                    invoice?.amount ??
                    0,
                  currency
                )}
              </strong>
            </div>

            <div className="payment-summary-item">
              <span>
                Paid
              </span>

              <strong>
                {formatCurrency(
                  invoice?.paidAmount ??
                    invoice?.amountPaid ??
                    invoice?.paid ??
                    0,
                  currency
                )}
              </strong>
            </div>

            <div className="payment-summary-item">
              <span>
                Balance Due
              </span>

              <strong>
                {balanceDue ===
                null
                  ? "—"
                  : formatCurrency(
                      balanceDue,
                      currency
                    )}
              </strong>
            </div>
          </div>
        </section>
      )}


      {/* Payment Form                                       */}

      <main className="page-content">
        <div className="payment-form-card">
          <div className="form-card-header">
            <h2>
              Payment Information
            </h2>

            <p>
              Enter the payment amount,
              method, and transaction
              information.
            </p>
          </div>

          <div className="form-card-body">
            <PaymentForm
              invoice={
                invoice
              }
              invoiceId={
                resolvedInvoiceId
              }
              payment={
                payment
              }
              balanceDue={
                balanceDue
              }
              currency={
                currency
              }
              onSubmit={
                handleSubmit
              }
              onCancel={
                handleCancel
              }
              loading={
                loading
              }
              mode="create"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
