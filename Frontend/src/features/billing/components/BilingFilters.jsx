/* ********************************************************* */
/* File: #src/features/billing/components/BilingFilters.jsx  */
/* ********************************************************* */

import {
  useEffect,
  useMemo,
  useState,
} from "react";

/* Constants */

const DEFAULT_FILTERS = {
  status: "",
  paymentMethod: "",
  dateFrom: "",
  dateTo: "",
  minAmount: "",
  maxAmount: "",
};

const BILLING_STATUSES = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "paid",
    label: "Paid",
  },
  {
    value: "partially_paid",
    label: "Partially Paid",
  },
  {
    value: "overdue",
    label: "Overdue",
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
  {
    value: "refunded",
    label: "Refunded",
  },
];

const PAYMENT_METHODS = [
  {
    value: "cash",
    label: "Cash",
  },
  {
    value: "card",
    label: "Card",
  },
  {
    value: "credit_card",
    label: "Credit Card",
  },
  {
    value: "debit_card",
    label: "Debit Card",
  },
  {
    value: "bank_transfer",
    label: "Bank Transfer",
  },
  {
    value: "insurance",
    label: "Insurance",
  },
  {
    value: "online",
    label: "Online Payment",
  },
  {
    value: "other",
    label: "Other",
  },
];

/* Helpers */

const normalizeFilters = (
  filters = {}
) => ({
  ...DEFAULT_FILTERS,
  ...filters,
});

const hasActiveFilters = (
  filters
) => {
  return Object.values(
    filters
  ).some(
    (value) =>
      value !== "" &&
      value !== null &&
      value !== undefined
  );
};

/* Component */

const BilingFilters = ({
  value,
  filters,
  onChange,
  onApply,
  onReset,

  loading = false,
  disabled = false,

  showApplyButton = true,
  showResetButton = true,

  statuses = BILLING_STATUSES,
  paymentMethods =
    PAYMENT_METHODS,

  currency = "USD",

  className = "",
}) => {
  const externalFilters =
    value || filters;

  const initialFilters =
    useMemo(
      () =>
        normalizeFilters(
          externalFilters
        ),
      [externalFilters]
    );

  const [
    localFilters,
    setLocalFilters,
  ] = useState(
    initialFilters
  );

  /* Sync external filters */

  useEffect(() => {
    setLocalFilters(
      normalizeFilters(
        externalFilters
      )
    );
  }, [externalFilters]);

  /* Change handler */

  const handleChange = (
    event
  ) => {
    const {
      name,
      value: fieldValue,
    } = event.target;

    const nextFilters = {
      ...localFilters,
      [name]: fieldValue,
    };

    setLocalFilters(
      nextFilters
    );

    if (onChange) {
      onChange(
        nextFilters
      );
    }
  };

  /* Apply */

  const handleApply = () => {
    const normalized =
      normalizeFilters(
        localFilters
      );

    if (onApply) {
      onApply(normalized);
      return;
    }

    if (onChange) {
      onChange(normalized);
    }
  };

  /* Reset */

  const handleReset = () => {
    const resetFilters = {
      ...DEFAULT_FILTERS,
    };

    setLocalFilters(
      resetFilters
    );

    if (onReset) {
      onReset(resetFilters);
      return;
    }

    if (onChange) {
      onChange(
        resetFilters
      );
    }
  };

  /* Form submit */

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    if (
      loading ||
      disabled
    ) {
      return;
    }

    handleApply();
  };

  /* Active state */

  const active =
    hasActiveFilters(
      localFilters
    );

  /* Classes */

  const containerClasses = [
    "billing-filters",
    active
      ? "has-active-filters"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  /* Render */

  return (
    <form
      className={
        containerClasses
      }
      onSubmit={
        handleSubmit
      }
    >

      {/* Header */}

      <div className="billing-filters-header">
        <div>
          <h3>
            Billing Filters
          </h3>

          <p>
            Narrow billing records using
            status, payment, date, and
            amount criteria.
          </p>
        </div>

        {active && (
          <span className="billing-filter-count">
            Filters active
          </span>
        )}
      </div>

      {/* Filter Grid */}

      <div className="billing-filters-grid">
        {/* Status */}

        <div className="form-group">
          <label htmlFor="billingFilterStatus">
            Billing Status
          </label>

          <select
            id="billingFilterStatus"
            name="status"
            value={
              localFilters.status
            }
            onChange={
              handleChange
            }
            disabled={
              disabled ||
              loading
            }
          >
            <option value="">
              All statuses
            </option>

            {statuses.map(
              (status) => (
                <option
                  key={
                    status.value
                  }
                  value={
                    status.value
                  }
                >
                  {
                    status.label
                  }
                </option>
              )
            )}
          </select>
        </div>

        {/* Payment Method */}

        <div className="form-group">
          <label htmlFor="billingFilterPaymentMethod">
            Payment Method
          </label>

          <select
            id="billingFilterPaymentMethod"
            name="paymentMethod"
            value={
              localFilters.paymentMethod
            }
            onChange={
              handleChange
            }
            disabled={
              disabled ||
              loading
            }
          >
            <option value="">
              All payment methods
            </option>

            {paymentMethods.map(
              (method) => (
                <option
                  key={
                    method.value
                  }
                  value={
                    method.value
                  }
                >
                  {
                    method.label
                  }
                </option>
              )
            )}
          </select>
        </div>

        {/* Date From */}

        <div className="form-group">
          <label htmlFor="billingFilterDateFrom">
            Date From
          </label>

          <input
            id="billingFilterDateFrom"
            type="date"
            name="dateFrom"
            value={
              localFilters.dateFrom
            }
            onChange={
              handleChange
            }
            disabled={
              disabled ||
              loading
            }
          />
        </div>

        {/* Date To */}

        <div className="form-group">
          <label htmlFor="billingFilterDateTo">
            Date To
          </label>

          <input
            id="billingFilterDateTo"
            type="date"
            name="dateTo"
            value={
              localFilters.dateTo
            }
            min={
              localFilters.dateFrom ||
              undefined
            }
            onChange={
              handleChange
            }
            disabled={
              disabled ||
              loading
            }
          />
        </div>

        {/* Minimum Amount */}

        <div className="form-group">
          <label htmlFor="billingFilterMinAmount">
            Minimum Amount
          </label>

          <div className="input-with-prefix">
            <span>
              {currency}
            </span>

            <input
              id="billingFilterMinAmount"
              type="number"
              name="minAmount"
              min="0"
              step="0.01"
              value={
                localFilters.minAmount
              }
              onChange={
                handleChange
              }
              placeholder="0.00"
              disabled={
                disabled ||
                loading
              }
            />
          </div>
        </div>

        {/* Maximum Amount */}

        <div className="form-group">
          <label htmlFor="billingFilterMaxAmount">
            Maximum Amount
          </label>

          <div className="input-with-prefix">
            <span>
              {currency}
            </span>

            <input
              id="billingFilterMaxAmount"
              type="number"
              name="maxAmount"
              min="0"
              step="0.01"
              value={
                localFilters.maxAmount
              }
              onChange={
                handleChange
              }
              placeholder="0.00"
              disabled={
                disabled ||
                loading
              }
            />
          </div>
        </div>
      </div>

      {/* Amount Validation */}

      {localFilters.minAmount !==
        "" &&
        localFilters.maxAmount !==
          "" &&
        Number(
          localFilters.minAmount
        ) >
          Number(
            localFilters.maxAmount
          ) && (
          <div
            className="alert alert-warning"
            role="alert"
          >
            Minimum amount cannot be
            greater than maximum amount.
          </div>
        )}

      {/* Actions */}
     
      <div className="billing-filters-actions">
        {showResetButton && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={
              handleReset
            }
            disabled={
              disabled ||
              loading ||
              !active
            }
          >
            Reset Filters
          </button>
        )}

        {showApplyButton && (
          <button
            type="submit"
            className="btn btn-primary"
            disabled={
              disabled ||
              loading ||
              (localFilters.minAmount !==
                "" &&
                localFilters.maxAmount !==
                  "" &&
                Number(
                  localFilters.minAmount
                ) >
                  Number(
                    localFilters.maxAmount
                  ))
            }
          >
            {loading
              ? "Applying..."
              : "Apply Filters"}
          </button>
        )}
      </div>
    </form>
  );
};

/* Named exports */

export {
  DEFAULT_FILTERS,
  BILLING_STATUSES,
  PAYMENT_METHODS,
  normalizeFilters,
  hasActiveFilters,
};

export default BilingFilters;
