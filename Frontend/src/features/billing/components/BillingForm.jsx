/* ********************************************************* */
/* #src/features/billing/components/BillingForm.jsx           */
/* ********************************************************* */

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

/* --------------------------------------------------------- */
/* Constants                                                  */
/* --------------------------------------------------------- */

const DEFAULT_ITEM = {
  description: "",
  quantity: 1,
  unitPrice: "",
  discount: 0,
  taxRate: 0,
};

const DEFAULT_FORM = {
  patientId: "",
  doctorId: "",
  billingDate: "",
  dueDate: "",
  currency: "USD",
  paymentTerms: "due_on_receipt",
  notes: "",
  items: [DEFAULT_ITEM],
};

const PAYMENT_TERMS = [
  {
    value: "due_on_receipt",
    label: "Due on receipt",
  },
  {
    value: "7_days",
    label: "Net 7 days",
  },
  {
    value: "15_days",
    label: "Net 15 days",
  },
  {
    value: "30_days",
    label: "Net 30 days",
  },
  {
    value: "60_days",
    label: "Net 60 days",
  },
];

const CURRENCIES = [
  {
    value: "USD",
    label: "USD — US Dollar",
  },
  {
    value: "EUR",
    label: "EUR — Euro",
  },
  {
    value: "GBP",
    label: "GBP — British Pound",
  },
  {
    value: "INR",
    label: "INR — Indian Rupee",
  },
];

const MAX_NOTES_LENGTH = 2000;
const MAX_ITEM_DESCRIPTION_LENGTH = 500;

/* --------------------------------------------------------- */
/* Helpers                                                    */
/* --------------------------------------------------------- */

const getPatientName = (patient) => {
  if (!patient) {
    return "";
  }

  if (patient.name) {
    return patient.name;
  }

  const name = [
    patient.firstName,
    patient.lastName,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    name ||
    `Patient #${patient.id}`
  );
};

const getDoctorName = (doctor) => {
  if (!doctor) {
    return "";
  }

  if (doctor.name) {
    return doctor.name.startsWith("Dr.")
      ? doctor.name
      : `Dr. ${doctor.name}`;
  }

  const name = [
    doctor.firstName,
    doctor.lastName,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (!name) {
    return `Doctor #${doctor.id}`;
  }

  return name.startsWith("Dr.")
    ? name
    : `Dr. ${name}`;
};

const toNumber = (
  value,
  fallback = 0
) => {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : fallback;
};

const roundMoney = (value) =>
  Math.round(
    (toNumber(value) + Number.EPSILON) *
      100
  ) / 100;

const formatMoney = (
  amount,
  currency = "USD"
) => {
  try {
    return new Intl.NumberFormat(
      undefined,
      {
        style: "currency",
        currency,
      }
    ).format(toNumber(amount));
  } catch {
    return `${currency} ${toNumber(
      amount
    ).toFixed(2)}`;
  }
};

const createItem = () => ({
  ...DEFAULT_ITEM,
});

const normalizeItem = (item = {}) => ({
  description:
    item.description ??
    item.name ??
    "",
  quantity:
    item.quantity ??
    1,
  unitPrice:
    item.unitPrice ??
    item.price ??
    "",
  discount:
    item.discount ??
    0,
  taxRate:
    item.taxRate ??
    item.tax ??
    0,
});

const normalizeItems = (items) => {
  if (
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return [createItem()];
  }

  return items.map(normalizeItem);
};

const mapBillingToForm = (
  billing
) => {
  if (!billing) {
    return {
      ...DEFAULT_FORM,
      items: [createItem()],
    };
  }

  return {
    patientId:
      billing.patientId ??
      billing.patient?.id ??
      "",
    doctorId:
      billing.doctorId ??
      billing.doctor?.id ??
      "",
    billingDate:
      billing.billingDate ??
      billing.invoiceDate ??
      "",
    dueDate:
      billing.dueDate ??
      "",
    currency:
      billing.currency ??
      "USD",
    paymentTerms:
      billing.paymentTerms ??
      "due_on_receipt",
    notes:
      billing.notes ??
      "",
    items: normalizeItems(
      billing.items ??
        billing.lineItems ??
        billing.invoiceItems ??
        []
    ),
  };
};

const calculateItemTotals = (
  item
) => {
  const quantity = Math.max(
    0,
    toNumber(item.quantity)
  );

  const unitPrice = Math.max(
    0,
    toNumber(item.unitPrice)
  );

  const discount = Math.max(
    0,
    toNumber(item.discount)
  );

  const taxRate = Math.max(
    0,
    toNumber(item.taxRate)
  );

  const gross = roundMoney(
    quantity * unitPrice
  );

  const discountAmount = roundMoney(
    Math.min(discount, gross)
  );

  const taxableAmount = roundMoney(
    gross - discountAmount
  );

  const taxAmount = roundMoney(
    taxableAmount *
      (taxRate / 100)
  );

  const total = roundMoney(
    taxableAmount + taxAmount
  );

  return {
    gross,
    discountAmount,
    taxableAmount,
    taxAmount,
    total,
  };
};

/* --------------------------------------------------------- */
/* Component                                                   */
/* --------------------------------------------------------- */

const BillingForm = ({
  billing = null,
  patients = [],
  doctors = [],
  onSubmit,
  onCancel,
  loading = false,
  mode = "create",
}) => {
  const navigate = useNavigate();

  const isEditMode =
    mode === "edit" ||
    Boolean(billing);

  const [formData, setFormData] =
    useState(DEFAULT_FORM);

  const [errors, setErrors] =
    useState({});

  const [submitError, setSubmitError] =
    useState("");

  /* ------------------------------------------------------- */
  /* Initialize                                               */
  /* ------------------------------------------------------- */

  useEffect(() => {
    setFormData(
      mapBillingToForm(billing)
    );
    setErrors({});
    setSubmitError("");
  }, [billing]);

  /* ------------------------------------------------------- */
  /* Totals                                                   */
  /* ------------------------------------------------------- */

  const totals = useMemo(() => {
    return formData.items.reduce(
      (summary, item) => {
        const itemTotals =
          calculateItemTotals(
            item
          );

        return {
          subtotal: roundMoney(
            summary.subtotal +
              itemTotals.gross
          ),
          discount: roundMoney(
            summary.discount +
              itemTotals.discountAmount
          ),
          tax: roundMoney(
            summary.tax +
              itemTotals.taxAmount
          ),
          total: roundMoney(
            summary.total +
              itemTotals.total
          ),
        };
      },
      {
        subtotal: 0,
        discount: 0,
        tax: 0,
        total: 0,
      }
    );
  }, [formData.items]);

  /* ------------------------------------------------------- */
  /* Change handlers                                          */
  /* ------------------------------------------------------- */

  const clearFieldError = (
    field
  ) => {
    if (!errors[field]) {
      return;
    }

    setErrors((previous) => {
      const next = {
        ...previous,
      };

      delete next[field];

      return next;
    });
  };

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );

    clearFieldError(name);

    if (submitError) {
      setSubmitError("");
    }
  };

  /* ------------------------------------------------------- */
  /* Item handlers                                            */
  /* ------------------------------------------------------- */

  const handleItemChange = (
    index,
    field,
    value
  ) => {
    setFormData(
      (previous) => ({
        ...previous,
        items: previous.items.map(
          (item, itemIndex) =>
            itemIndex === index
              ? {
                  ...item,
                  [field]: value,
                }
              : item
        ),
      })
    );

    setErrors((previous) => {
      const next = {
        ...previous,
      };

      delete next.items;

      Object.keys(next).forEach(
        (key) => {
          if (
            key.startsWith(
              `items.${index}.`
            )
          ) {
            delete next[key];
          }
        }
      );

      return next;
    });

    if (submitError) {
      setSubmitError("");
    }
  };

  const handleAddItem = () => {
    setFormData(
      (previous) => ({
        ...previous,
        items: [
          ...previous.items,
          createItem(),
        ],
      })
    );
  };

  const handleRemoveItem = (
    index
  ) => {
    setFormData(
      (previous) => {
        if (
          previous.items.length <= 1
        ) {
          return previous;
        }

        return {
          ...previous,
          items:
            previous.items.filter(
              (_, itemIndex) =>
                itemIndex !== index
            ),
        };
      }
    );

    setErrors((previous) => {
      const next = {
        ...previous,
      };

      delete next.items;

      Object.keys(next).forEach(
        (key) => {
          if (
            key.startsWith(
              `items.${index}.`
            )
          ) {
            delete next[key];
          }
        }
      );

      return next;
    });
  };

  /* ------------------------------------------------------- */
  /* Validation                                               */
  /* ------------------------------------------------------- */

  const validate = () => {
    const validationErrors =
      {};

    if (!formData.patientId) {
      validationErrors.patientId =
        "Please select a patient.";
    }

    if (
      formData.billingDate &&
      formData.dueDate &&
      formData.dueDate <
        formData.billingDate
    ) {
      validationErrors.dueDate =
        "Due date cannot be before the billing date.";
    }

    if (
      !formData.items.length
    ) {
      validationErrors.items =
        "At least one billing item is required.";
    }

    formData.items.forEach(
      (item, index) => {
        const description =
          String(
            item.description || ""
          ).trim();

        const quantity = toNumber(
          item.quantity
        );

        const unitPrice = toNumber(
          item.unitPrice
        );

        const discount = toNumber(
          item.discount
        );

        const taxRate = toNumber(
          item.taxRate
        );

        if (!description) {
          validationErrors[
            `items.${index}.description`
          ] =
            "Description is required.";
        } else if (
          description.length >
          MAX_ITEM_DESCRIPTION_LENGTH
        ) {
          validationErrors[
            `items.${index}.description`
          ] =
            `Description cannot exceed ${MAX_ITEM_DESCRIPTION_LENGTH} characters.`;
        }

        if (
          !Number.isFinite(
            quantity
          ) ||
          quantity <= 0
        ) {
          validationErrors[
            `items.${index}.quantity`
          ] =
            "Quantity must be greater than zero.";
        }

        if (
          !Number.isFinite(
            unitPrice
          ) ||
          unitPrice < 0
        ) {
          validationErrors[
            `items.${index}.unitPrice`
          ] =
            "Unit price cannot be negative.";
        }

        if (
          !Number.isFinite(
            discount
          ) ||
          discount < 0
        ) {
          validationErrors[
            `items.${index}.discount`
          ] =
            "Discount cannot be negative.";
        }

        if (
          discount >
          quantity * unitPrice
        ) {
          validationErrors[
            `items.${index}.discount`
          ] =
            "Discount cannot exceed the item amount.";
        }

        if (
          !Number.isFinite(
            taxRate
          ) ||
          taxRate < 0 ||
          taxRate > 100
        ) {
          validationErrors[
            `items.${index}.taxRate`
          ] =
            "Tax rate must be between 0 and 100.";
        }
      }
    );

    if (
      formData.notes.length >
      MAX_NOTES_LENGTH
    ) {
      validationErrors.notes =
        `Notes cannot exceed ${MAX_NOTES_LENGTH} characters.`;
    }

    setErrors(
      validationErrors
    );

    return (
      Object.keys(
        validationErrors
      ).length === 0
    );
  };

  /* ------------------------------------------------------- */
  /* Submit                                                   */
  /* ------------------------------------------------------- */

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setSubmitError("");

    if (!validate()) {
      return;
    }

    const payload = {
      patientId:
        formData.patientId,
      doctorId:
        formData.doctorId || null,
      billingDate:
        formData.billingDate || null,
      dueDate:
        formData.dueDate || null,
      currency:
        formData.currency,
      paymentTerms:
        formData.paymentTerms,
      notes:
        formData.notes.trim(),
      items: formData.items.map(
        (item) => ({
          description:
            item.description.trim(),
          quantity: toNumber(
            item.quantity
          ),
          unitPrice: roundMoney(
            toNumber(
              item.unitPrice
            )
          ),
          discount: roundMoney(
            toNumber(
              item.discount
            )
          ),
          taxRate: toNumber(
            item.taxRate
          ),
        })
      ),
      subtotal: totals.subtotal,
      discount: totals.discount,
      tax: totals.tax,
      total: totals.total,
    };

    try {
      await onSubmit?.(payload);
    } catch (error) {
      console.error(
        "Failed to save billing:",
        error
      );

      setSubmitError(
        error?.response?.data
          ?.message ||
          error?.message ||
          "Unable to save the billing information. Please try again."
      );
    }
  };

  /* ------------------------------------------------------- */
  /* Cancel                                                   */
  /* ------------------------------------------------------- */

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      return;
    }

    navigate("/billing");
  };

  /* ------------------------------------------------------- */
  /* Render                                                    */
  /* ------------------------------------------------------- */

  return (
    <form
      className="billing-form"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* ------------------------------------------------- */}
      {/* Header                                             */}
      {/* ------------------------------------------------- */}

      <div className="form-header">
        <div>
          <h2>
            {isEditMode
              ? "Edit Billing"
              : "Create Billing"}
          </h2>

          <p>
            {isEditMode
              ? "Update the billing information and line items below."
              : "Enter the patient, billing, and charge information below."}
          </p>
        </div>
      </div>

      {/* ------------------------------------------------- */}
      {/* Error                                               */}
      {/* ------------------------------------------------- */}

      {submitError && (
        <div
          className="alert alert-danger"
          role="alert"
        >
          {submitError}
        </div>
      )}

      {/* ------------------------------------------------- */}
      {/* Billing Information                               */}
      {/* ------------------------------------------------- */}

      <section className="form-section">
        <div className="form-section-header">
          <h3>
            Billing Information
          </h3>

          <p>
            Select the patient and
            provide the billing dates and
            payment terms.
          </p>
        </div>

        <div className="form-grid">
          {/* Patient */}

          <div className="form-group">
            <label htmlFor="patientId">
              Patient{" "}
              <span className="required">
                *
              </span>
            </label>

            <select
              id="patientId"
              name="patientId"
              value={
                formData.patientId
              }
              onChange={
                handleChange
              }
              disabled={loading}
              className={
                errors.patientId
                  ? "input-error"
                  : ""
              }
            >
              <option value="">
                Select patient
              </option>

              {patients.map(
                (patient) => (
                  <option
                    key={patient.id}
                    value={
                      patient.id
                    }
                  >
                    {getPatientName(
                      patient
                    )}
                    {patient.patientNumber
                      ? ` — ${patient.patientNumber}`
                      : ""}
                  </option>
                )
              )}
            </select>

            {errors.patientId && (
              <span className="field-error">
                {errors.patientId}
              </span>
            )}
          </div>

          {/* Doctor */}

          <div className="form-group">
            <label htmlFor="doctorId">
              Doctor
            </label>

            <select
              id="doctorId"
              name="doctorId"
              value={
                formData.doctorId
              }
              onChange={
                handleChange
              }
              disabled={loading}
            >
              <option value="">
                Select doctor
              </option>

              {doctors.map(
                (doctor) => (
                  <option
                    key={doctor.id}
                    value={
                      doctor.id
                    }
                  >
                    {getDoctorName(
                      doctor
                    )}
                    {doctor.specialization
                      ? ` — ${doctor.specialization}`
                      : ""}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Billing Date */}

          <div className="form-group">
            <label htmlFor="billingDate">
              Billing Date
            </label>

            <input
              id="billingDate"
              name="billingDate"
              type="date"
              value={
                formData.billingDate
              }
              onChange={
                handleChange
              }
              disabled={loading}
            />
          </div>

          {/* Due Date */}

          <div className="form-group">
            <label htmlFor="dueDate">
              Due Date
            </label>

            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={
                formData.dueDate
              }
              onChange={
                handleChange
              }
              disabled={loading}
              className={
                errors.dueDate
                  ? "input-error"
                  : ""
              }
            />

            {errors.dueDate && (
              <span className="field-error">
                {errors.dueDate}
              </span>
            )}
          </div>

          {/* Currency */}

          <div className="form-group">
            <label htmlFor="currency">
              Currency
            </label>

            <select
              id="currency"
              name="currency"
              value={
                formData.currency
              }
              onChange={
                handleChange
              }
              disabled={loading}
            >
              {CURRENCIES.map(
                (currency) => (
                  <option
                    key={
                      currency.value
                    }
                    value={
                      currency.value
                    }
                  >
                    {currency.label}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Payment Terms */}

          <div className="form-group">
            <label htmlFor="paymentTerms">
              Payment Terms
            </label>

            <select
              id="paymentTerms"
              name="paymentTerms"
              value={
                formData.paymentTerms
              }
              onChange={
                handleChange
              }
              disabled={loading}
            >
              {PAYMENT_TERMS.map(
                (term) => (
                  <option
                    key={term.value}
                    value={
                      term.value
                    }
                  >
                    {term.label}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- */}
      {/* Line Items                                         */}
      {/* ------------------------------------------------- */}

      <section className="form-section">
        <div className="form-section-header form-section-header-row">
          <div>
            <h3>
              Billing Items{" "}
              <span className="required">
                *
              </span>
            </h3>

            <p>
              Add the services, procedures,
              tests, or other charges.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={
              handleAddItem
            }
            disabled={loading}
          >
            + Add Item
          </button>
        </div>

        {errors.items && (
          <div className="field-error">
            {errors.items}
          </div>
        )}

        <div className="billing-items">
          {formData.items.map(
            (item, index) => {
              const itemTotals =
                calculateItemTotals(
                  item
                );

              return (
                <div
                  key={index}
                  className="billing-item"
                >
                  <div className="billing-item-header">
                    <h4>
                      Item{" "}
                      {index + 1}
                    </h4>

                    {formData.items
                      .length > 1 && (
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          handleRemoveItem(
                            index
                          )
                        }
                        disabled={
                          loading
                        }
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="form-grid">
                    {/* Description */}

                    <div className="form-group form-group-full">
                      <label
                        htmlFor={`item-description-${index}`}
                      >
                        Description{" "}
                        <span className="required">
                          *
                        </span>
                      </label>

                      <input
                        id={`item-description-${index}`}
                        type="text"
                        value={
                          item.description
                        }
                        onChange={(
                          event
                        ) =>
                          handleItemChange(
                            index,
                            "description",
                            event
                              .target
                              .value
                          )
                        }
                        placeholder="e.g. Consultation, CBC Test, Room Charges"
                        maxLength={
                          MAX_ITEM_DESCRIPTION_LENGTH
                        }
                        disabled={
                          loading
                        }
                        className={
                          errors[
                            `items.${index}.description`
                          ]
                            ? "input-error"
                            : ""
                        }
                      />

                      {errors[
                        `items.${index}.description`
                      ] && (
                        <span className="field-error">
                          {
                            errors[
                              `items.${index}.description`
                            ]
                          }
                        </span>
                      )}
                    </div>

                    {/* Quantity */}

                    <div className="form-group">
                      <label
                        htmlFor={`item-quantity-${index}`}
                      >
                        Quantity{" "}
                        <span className="required">
                          *
                        </span>
                      </label>

                      <input
                        id={`item-quantity-${index}`}
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={
                          item.quantity
                        }
                        onChange={(
                          event
                        ) =>
                          handleItemChange(
                            index,
                            "quantity",
                            event
                              .target
                              .value
                          )
                        }
                        disabled={
                          loading
                        }
                        className={
                          errors[
                            `items.${index}.quantity`
                          ]
                            ? "input-error"
                            : ""
                        }
                      />

                      {errors[
                        `items.${index}.quantity`
                      ] && (
                        <span className="field-error">
                          {
                            errors[
                              `items.${index}.quantity`
                            ]
                          }
                        </span>
                      )}
                    </div>

                    {/* Unit Price */}

                    <div className="form-group">
                      <label
                        htmlFor={`item-price-${index}`}
                      >
                        Unit Price{" "}
                        <span className="required">
                          *
                        </span>
                      </label>

                      <input
                        id={`item-price-${index}`}
                        type="number"
                        min="0"
                        step="0.01"
                        value={
                          item.unitPrice
                        }
                        onChange={(
                          event
                        ) =>
                          handleItemChange(
                            index,
                            "unitPrice",
                            event
                              .target
                              .value
                          )
                        }
                        placeholder="0.00"
                        disabled={
                          loading
                        }
                        className={
                          errors[
                            `items.${index}.unitPrice`
                          ]
                            ? "input-error"
                            : ""
                        }
                      />

                      {errors[
                        `items.${index}.unitPrice`
                      ] && (
                        <span className="field-error">
                          {
                            errors[
                              `items.${index}.unitPrice`
                            ]
                          }
                        </span>
                      )}
                    </div>

                    {/* Discount */}

                    <div className="form-group">
                      <label
                        htmlFor={`item-discount-${index}`}
                      >
                        Discount
                      </label>

                      <input
                        id={`item-discount-${index}`}
                        type="number"
                        min="0"
                        step="0.01"
                        value={
                          item.discount
                        }
                        onChange={(
                          event
                        ) =>
                          handleItemChange(
                            index,
                            "discount",
                            event
                              .target
                              .value
                          )
                        }
                        placeholder="0.00"
                        disabled={
                          loading
                        }
                        className={
                          errors[
                            `items.${index}.discount`
                          ]
                            ? "input-error"
                            : ""
                        }
                      />

                      {errors[
                        `items.${index}.discount`
                      ] && (
                        <span className="field-error">
                          {
                            errors[
                              `items.${index}.discount`
                            ]
                          }
                        </span>
                      )}
                    </div>

                    {/* Tax */}

                    <div className="form-group">
                      <label
                        htmlFor={`item-tax-${index}`}
                      >
                        Tax Rate (%)
                      </label>

                      <input
                        id={`item-tax-${index}`}
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={
                          item.taxRate
                        }
                        onChange={(
                          event
                        ) =>
                          handleItemChange(
                            index,
                            "taxRate",
                            event
                              .target
                              .value
                          )
                        }
                        placeholder="0"
                        disabled={
                          loading
                        }
                        className={
                          errors[
                            `items.${index}.taxRate`
                          ]
                            ? "input-error"
                            : ""
                        }
                      />

                      {errors[
                        `items.${index}.taxRate`
                      ] && (
                        <span className="field-error">
                          {
                            errors[
                              `items.${index}.taxRate`
                            ]
                          }
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Item Total */}

                  <div className="billing-item-total">
                    <span>
                      Item Total
                    </span>

                    <strong>
                      {formatMoney(
                        itemTotals.total,
                        formData.currency
                      )}
                    </strong>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </section>

      {/* ------------------------------------------------- */}
      {/* Notes                                              */}
      {/* ------------------------------------------------- */}

      <section className="form-section">
        <div className="form-section-header">
          <h3>Notes</h3>

          <p>
            Add any additional billing
            information or instructions.
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="notes">
            Billing Notes
          </label>

          <textarea
            id="notes"
            name="notes"
            rows={5}
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add additional billing notes..."
            maxLength={
              MAX_NOTES_LENGTH
            }
            disabled={loading}
            className={
              errors.notes
                ? "input-error"
                : ""
            }
          />

          <div className="input-meta">
            <span>
              {errors.notes ? (
                <span className="field-error">
                  {errors.notes}
                </span>
              ) : (
                "Optional billing information."
              )}
            </span>

            <span>
              {formData.notes.length}/
              {MAX_NOTES_LENGTH}
            </span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- */}
      {/* Summary                                            */}
      {/* ------------------------------------------------- */}

      <section className="billing-summary">
        <div className="billing-summary-row">
          <span>Subtotal</span>

          <strong>
            {formatMoney(
              totals.subtotal,
              formData.currency
            )}
          </strong>
        </div>

        <div className="billing-summary-row">
          <span>Discount</span>

          <strong>
            -
            {formatMoney(
              totals.discount,
              formData.currency
            )}
          </strong>
        </div>

        <div className="billing-summary-row">
          <span>Tax</span>

          <strong>
            {formatMoney(
              totals.tax,
              formData.currency
            )}
          </strong>
        </div>

        <div className="billing-summary-row billing-summary-total">
          <span>Total</span>

          <strong>
            {formatMoney(
              totals.total,
              formData.currency
            )}
          </strong>
        </div>
      </section>

      {/* ------------------------------------------------- */}
      {/* Actions                                            */}
      {/* ------------------------------------------------- */}

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={
            handleCancel
          }
          disabled={loading}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading
            ? isEditMode
              ? "Updating..."
              : "Creating..."
            : isEditMode
            ? "Update Billing"
            : "Create Billing"}
        </button>
      </div>
    </form>
  );
};

export default BillingForm;
