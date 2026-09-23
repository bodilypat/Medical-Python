/* ********************************************************* */
/* #src/features/billing/components/InvoiceForm.jsx           */
/* ********************************************************* */

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

/* Constants */

const DEFAULT_ITEM = {
  description: "",
  quantity: 1,
  unitPrice: "",
};

const DEFAULT_FORM = {
  patientId: "",
  doctorId: "",
  invoiceNumber: "",
  invoiceDate: "",
  dueDate: "",
  currency: "USD",
  taxRate: "",
  discount: "",
  notes: "",
  items: [],
};

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
  {
    value: "CAD",
    label: "CAD — Canadian Dollar",
  },
  {
    value: "AUD",
    label: "AUD — Australian Dollar",
  },
];

const MAX_NOTES_LENGTH = 2000;
const MAX_ITEMS = 100;

/* Helpers */

const createItem = () => ({
  ...DEFAULT_ITEM,
});

const getPatientName = (
  patient
) => {
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

const getDoctorName = (
  doctor
) => {
  if (!doctor) {
    return "";
  }

  if (doctor.name) {
    return doctor.name.startsWith(
      "Dr."
    )
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

const normalizeItem = (
  item
) => ({
  id:
    item?.id ??
    item?.itemId ??
    undefined,

  description:
    item?.description ??
    item?.name ??
    item?.serviceName ??
    "",

  quantity:
    item?.quantity ??
    item?.qty ??
    1,

  unitPrice:
    item?.unitPrice ??
    item?.price ??
    item?.rate ??
    "",
});

const normalizeItems = (
  items = []
) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map(
    normalizeItem
  );
};

const mapInvoiceToForm = (
  invoice
) => {
  if (!invoice) {
    return {
      ...DEFAULT_FORM,
      invoiceDate:
        new Date()
          .toISOString()
          .slice(0, 10),
      items: [
        createItem(),
      ],
    };
  }

  return {
    patientId:
      invoice.patientId ??
      invoice.patient?.id ??
      "",

    doctorId:
      invoice.doctorId ??
      invoice.doctor?.id ??
      "",

    invoiceNumber:
      invoice.invoiceNumber ??
      invoice.invoiceNo ??
      invoice.number ??
      "",

    invoiceDate:
      invoice.invoiceDate ??
      invoice.billingDate ??
      invoice.createdAt ??
      "",

    dueDate:
      invoice.dueDate ??
      invoice.paymentDueDate ??
      "",

    currency:
      invoice.currency ??
      "USD",

    taxRate:
      invoice.taxRate ??
      invoice.taxPercentage ??
      "",

    discount:
      invoice.discount ??
      invoice.discountAmount ??
      "",

    notes:
      invoice.notes ??
      "",

    items:
      normalizeItems(
        invoice.items ??
          invoice.invoiceItems ??
          []
      ),
  };
};

const toNumber = (
  value,
  fallback = 0
) => {
  const number =
    Number(value);

  return Number.isFinite(
    number
  )
    ? number
    : fallback;
};

const calculateItemAmount = (
  item
) =>
  Math.max(
    0,
    toNumber(
      item.quantity,
      0
    )
  ) *
  Math.max(
    0,
    toNumber(
      item.unitPrice,
      0
    )
  );

const formatCurrency = (
  amount,
  currency
) => {
  try {
    return new Intl.NumberFormat(
      undefined,
      {
        style: "currency",
        currency,
      }
    ).format(
      toNumber(amount)
    );
  } catch {
    return `${currency} ${toNumber(
      amount
    ).toFixed(2)}`;
  }
};


/* Component */


const InvoiceForm = ({
  invoice = null,
  patients = [],
  doctors = [],
  services = [],
  onSubmit,
  onCancel,
  loading = false,
  mode = "create",
}) => {
  const navigate =
    useNavigate();

  const isEditMode =
    mode === "edit" ||
    Boolean(invoice);

  const [formData, setFormData] =
    useState(
      DEFAULT_FORM
    );

  const [errors, setErrors] =
    useState({});

  const [submitError, setSubmitError] =
    useState("");

  const [serviceSearch, setServiceSearch] =
    useState("");

  /* Initialize */

  useEffect(() => {
    setFormData(
      mapInvoiceToForm(
        invoice
      )
    );

    setErrors({});
    setSubmitError("");
  }, [invoice]);

  /* Filter Services */

  const filteredServices =
    useMemo(() => {
      const search =
        serviceSearch
          .trim()
          .toLowerCase();

      if (!search) {
        return services;
      }

      return services.filter(
        (service) => {
          const name =
            String(
              service?.name ??
                service?.serviceName ??
                ""
            ).toLowerCase();

          const code =
            String(
              service?.code ??
                service?.serviceCode ??
                ""
            ).toLowerCase();

          return (
            name.includes(
              search
            ) ||
            code.includes(
              search
            )
          );
        }
      );
    }, [
      services,
      serviceSearch,
    ]);

  /* Financial Calculations  */

  const financialSummary =
    useMemo(() => {
      const subtotal =
        formData.items.reduce(
          (
            total,
            item
          ) =>
            total +
            calculateItemAmount(
              item
            ),
          0
        );

      const taxRate =
        Math.max(
          0,
          toNumber(
            formData.taxRate
          )
        );

      const discount =
        Math.max(
          0,
          toNumber(
            formData.discount
          )
        );

      const tax =
        Math.max(
          0,
          (subtotal *
            taxRate) /
            100
        );

      const total = Math.max(
        0,
        subtotal +
          tax -
          discount
      );

      return {
        subtotal,
        taxRate,
        tax,
        discount,
        total,
      };
    }, [
      formData.items,
      formData.taxRate,
      formData.discount,
    ]);

  /* Change Handler */

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

    if (errors[name]) {
      setErrors(
        (previous) => {
          const next = {
            ...previous,
          };

          delete next[name];

          return next;
        }
      );
    }

    if (submitError) {
      setSubmitError("");
    }
  };

  /* Item Handlers */

  const handleItemChange = (
    index,
    field,
    value
  ) => {
    setFormData(
      (previous) => ({
        ...previous,
        items:
          previous.items.map(
            (
              item,
              itemIndex
            ) =>
              itemIndex ===
              index
                ? {
                    ...item,
                    [field]:
                      value,
                  }
                : item
          ),
      })
    );

    const errorKey =
      `items.${index}.${field}`;

    if (errors[errorKey]) {
      setErrors(
        (previous) => {
          const next = {
            ...previous,
          };

          delete next[
            errorKey
          ];

          return next;
        }
      );
    }
  };

  const handleAddItem = () => {
    if (
      formData.items.length >=
      MAX_ITEMS
    ) {
      return;
    }

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
    if (
      formData.items.length <=
      1
    ) {
      setFormData(
        (previous) => ({
          ...previous,
          items: [
            createItem(),
          ],
        })
      );

      return;
    }

    setFormData(
      (previous) => ({
        ...previous,
        items:
          previous.items.filter(
            (
              _item,
              itemIndex
            ) =>
              itemIndex !==
              index
          ),
      })
    );
  };

  const handleServiceSelect = (
    service
  ) => {
    const description =
      service?.name ??
      service?.serviceName ??
      service?.description ??
      "";

    const price =
      service?.price ??
      service?.unitPrice ??
      service?.rate ??
      "";

    setFormData(
      (previous) => ({
        ...previous,
        items: [
          ...previous.items,
          {
            ...createItem(),
            description,
            unitPrice:
              price,
          },
        ],
      })
    );
  };

  /* Validation */

  const validate = () => {
    const validationErrors =
      {};

    if (!formData.patientId) {
      validationErrors.patientId =
        "Please select a patient.";
    }

    if (
      formData.invoiceDate &&
      Number.isNaN(
        new Date(
          formData.invoiceDate
        ).getTime()
      )
    ) {
      validationErrors.invoiceDate =
        "Please enter a valid invoice date.";
    }

    if (
      formData.dueDate &&
      formData.invoiceDate &&
      new Date(
        formData.dueDate
      ) <
        new Date(
          formData.invoiceDate
        )
    ) {
      validationErrors.dueDate =
        "Due date cannot be before the invoice date.";
    }

    if (
      !formData.currency
    ) {
      validationErrors.currency =
        "Please select a currency.";
    }

    if (
      formData.items.length ===
      0
    ) {
      validationErrors.items =
        "Please add at least one invoice item.";
    }

    formData.items.forEach(
      (item, index) => {
        if (
          !String(
            item.description ??
              ""
          ).trim()
        ) {
          validationErrors[
            `items.${index}.description`
          ] =
            "Description is required.";
        }

        const quantity =
          toNumber(
            item.quantity,
            NaN
          );

        if (
          !Number.isFinite(
            quantity
          ) ||
          quantity <= 0
        ) {
          validationErrors[
            `items.${index}.quantity`
          ] =
            "Quantity must be greater than 0.";
        }

        const unitPrice =
          toNumber(
            item.unitPrice,
            NaN
          );

        if (
          !Number.isFinite(
            unitPrice
          ) ||
          unitPrice < 0
        ) {
          validationErrors[
            `items.${index}.unitPrice`
          ] =
            "Unit price must be 0 or greater.";
        }
      }
    );

    const taxRate =
      toNumber(
        formData.taxRate,
        NaN
      );

    if (
      formData.taxRate !==
        "" &&
      (!Number.isFinite(
        taxRate
      ) ||
        taxRate < 0 ||
        taxRate > 100)
    ) {
      validationErrors.taxRate =
        "Tax rate must be between 0 and 100.";
    }

    const discount =
      toNumber(
        formData.discount,
        NaN
      );

    if (
      formData.discount !==
        "" &&
      (!Number.isFinite(
        discount
      ) ||
        discount < 0)
    ) {
      validationErrors.discount =
        "Discount cannot be negative.";
    }

    if (
      discount >
      financialSummary.subtotal +
        financialSummary.tax
    ) {
      validationErrors.discount =
        "Discount cannot exceed the invoice amount.";
    }

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

  /* Submit */

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

      invoiceNumber:
        formData.invoiceNumber.trim(),

      invoiceDate:
        formData.invoiceDate,

      dueDate:
        formData.dueDate || null,

      currency:
        formData.currency,

      taxRate:
        toNumber(
          formData.taxRate
        ),

      discount:
        toNumber(
          formData.discount
        ),

      subtotal:
        financialSummary.subtotal,

      tax:
        financialSummary.tax,

      total:
        financialSummary.total,

      notes:
        formData.notes.trim(),

      items:
        formData.items.map(
          (item) => ({
            ...(item.id
              ? {
                  id: item.id,
                }
              : {}),
            description:
              item.description.trim(),
            quantity:
              toNumber(
                item.quantity
              ),
            unitPrice:
              toNumber(
                item.unitPrice
              ),
            amount:
              calculateItemAmount(
                item
              ),
          })
        ),
    };

    try {
      await onSubmit?.(
        payload
      );
    } catch (error) {
      console.error(
        "Failed to save invoice:",
        error
      );

      setSubmitError(
        error?.response?.data
          ?.message ||
          error?.message ||
          "Unable to save the invoice. Please try again."
      );
    }
  };

  /* Cancel */

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      return;
    }

    navigate("/billing");
  };

  /* Render */

  return (
    <form
      className="invoice-form"
      onSubmit={
        handleSubmit
      }
      noValidate
    >

      {/* Header*/}

      <div className="form-header">
        <div>
          <h2>
            {isEditMode
              ? "Edit Invoice"
              : "Create Invoice"}
          </h2>

          <p>
            {isEditMode
              ? "Update the invoice information and billing items."
              : "Create a new invoice for the selected patient."}
          </p>
        </div>
      </div>

      {/* Submit Error */}

      {submitError && (
        <div
          className="alert alert-danger"
          role="alert"
        >
          {submitError}
        </div>
      )}

      {/* Invoice Information */}

      <section className="form-section">
        <div className="form-section-header">
          <h3>
            Invoice Information
          </h3>

          <p>
            Enter the basic invoice
            and patient information.
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
                    key={
                      patient.id
                    }
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
                {
                  errors.patientId
                }
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
                    key={
                      doctor.id
                    }
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

          {/* Invoice Number */}

          <div className="form-group">
            <label htmlFor="invoiceNumber">
              Invoice Number
            </label>

            <input
              id="invoiceNumber"
              name="invoiceNumber"
              type="text"
              value={
                formData.invoiceNumber
              }
              onChange={
                handleChange
              }
              placeholder="Leave blank to generate automatically"
              disabled={loading}
            />
          </div>

          {/* Currency */}

          <div className="form-group">
            <label htmlFor="currency">
              Currency{" "}
              <span className="required">
                *
              </span>
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
              className={
                errors.currency
                  ? "input-error"
                  : ""
              }
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
                    {
                      currency.label
                    }
                  </option>
                )
              )}
            </select>

            {errors.currency && (
              <span className="field-error">
                {
                  errors.currency
                }
              </span>
            )}
          </div>

          {/* Invoice Date */}

          <div className="form-group">
            <label htmlFor="invoiceDate">
              Invoice Date{" "}
              <span className="required">
                *
              </span>
            </label>

            <input
              id="invoiceDate"
              name="invoiceDate"
              type="date"
              value={
                formData.invoiceDate
              }
              onChange={
                handleChange
              }
              disabled={loading}
              className={
                errors.invoiceDate
                  ? "input-error"
                  : ""
              }
            />

            {errors.invoiceDate && (
              <span className="field-error">
                {
                  errors.invoiceDate
                }
              </span>
            )}
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
              min={
                formData.invoiceDate ||
                undefined
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
                {
                  errors.dueDate
                }
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Services                                           */}

      {services.length > 0 && (
        <section className="form-section">
          <div className="form-section-header">
            <h3>
              Add Services
            </h3>

            <p>
              Search available
              services and add them
              directly to the invoice.
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="serviceSearch">
              Search Services
            </label>

            <input
              id="serviceSearch"
              type="search"
              value={
                serviceSearch
              }
              onChange={(event) =>
                setServiceSearch(
                  event.target
                    .value
                )
              }
              placeholder="Search by service name or code..."
              disabled={loading}
            />
          </div>

          <div className="invoice-service-list">
            {filteredServices
              .slice(0, 20)
              .map((service) => (
                <button
                  key={
                    service.id ??
                    service.serviceId
                  }
                  type="button"
                  className="invoice-service-option"
                  onClick={() =>
                    handleServiceSelect(
                      service
                    )
                  }
                  disabled={loading}
                >
                  <span>
                    <strong>
                      {service.name ??
                        service.serviceName ??
                        service.description}
                    </strong>

                    {service.code && (
                      <small>
                        Code:{" "}
                        {
                          service.code
                        }
                      </small>
                    )}
                  </span>

                  <strong>
                    {formatCurrency(
                      service.price ??
                        service.unitPrice ??
                        service.rate ??
                        0,
                      formData.currency
                    )}
                  </strong>
                </button>
              ))}
          </div>
        </section>
      )}

      {/* Invoice Items                                     */}

      <section className="form-section">
        <div className="form-section-header invoice-items-header">
          <div>
            <h3>
              Invoice Items{" "}
              <span className="required">
                *
              </span>
            </h3>

            <p>
              Add services, procedures,
              laboratory tests, or
              other billable items.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={
              handleAddItem
            }
            disabled={
              loading ||
              formData.items
                .length >=
                MAX_ITEMS
            }
          >
            + Add Item
          </button>
        </div>

        {errors.items && (
          <span className="field-error">
            {errors.items}
          </span>
        )}

        <div className="invoice-items">
          {formData.items.map(
            (
              item,
              index
            ) => {
              const amount =
                calculateItemAmount(
                  item
                );

              return (
                <div
                  key={
                    item.id ??
                    `item-${index}`
                  }
                  className="invoice-item"
                >
                  <div className="invoice-item-number">
                    {index + 1}
                  </div>

                  <div className="invoice-item-fields">
                    {/* Description */}

                    <div className="form-group">
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
                        placeholder="Service or item description"
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
                        Quantity
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
                        Unit Price
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

                    {/* Amount */}

                    <div className="form-group invoice-item-amount">
                      <label>
                        Amount
                      </label>

                      <div className="invoice-item-total">
                        {formatCurrency(
                          amount,
                          formData.currency
                        )}
                      </div>
                    </div>
                  </div>

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
                    aria-label={`Remove item ${
                      index + 1
                    }`}
                  >
                    Remove
                  </button>
                </div>
              );
            }
          )}
        </div>
      </section>

      {/* Totals                                             */}

      <section className="form-section invoice-summary-section">
        <div className="form-section-header">
          <h3>
            Invoice Summary
          </h3>

          <p>
            Review taxes, discounts,
            and the final invoice
            amount.
          </p>
        </div>

        <div className="invoice-summary-grid">
          <div className="invoice-summary-fields">
            {/* Tax */}

            <div className="form-group">
              <label htmlFor="taxRate">
                Tax Rate (%)
              </label>

              <input
                id="taxRate"
                name="taxRate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={
                  formData.taxRate
                }
                onChange={
                  handleChange
                }
                placeholder="0"
                disabled={loading}
                className={
                  errors.taxRate
                    ? "input-error"
                    : ""
                }
              />

              {errors.taxRate && (
                <span className="field-error">
                  {
                    errors.taxRate
                  }
                </span>
              )}
            </div>

            {/* Discount */}

            <div className="form-group">
              <label htmlFor="discount">
                Discount
              </label>

              <input
                id="discount"
                name="discount"
                type="number"
                min="0"
                step="0.01"
                value={
                  formData.discount
                }
                onChange={
                  handleChange
                }
                placeholder="0.00"
                disabled={loading}
                className={
                  errors.discount
                    ? "input-error"
                    : ""
                }
              />

              {errors.discount && (
                <span className="field-error">
                  {
                    errors.discount
                  }
                </span>
              )}
            </div>
          </div>

          <div className="invoice-summary">
            <div className="invoice-summary-row">
              <span>
                Subtotal
              </span>

              <strong>
                {formatCurrency(
                  financialSummary.subtotal,
                  formData.currency
                )}
              </strong>
            </div>

            <div className="invoice-summary-row">
              <span>
                Tax (
                {
                  financialSummary.taxRate
                }
                %)
              </span>

              <strong>
                {formatCurrency(
                  financialSummary.tax,
                  formData.currency
                )}
              </strong>
            </div>

            <div className="invoice-summary-row">
              <span>
                Discount
              </span>

              <strong>
                -
                {formatCurrency(
                  financialSummary.discount,
                  formData.currency
                )}
              </strong>
            </div>

            <div className="invoice-summary-row invoice-summary-total">
              <strong>
                Total
              </strong>

              <strong>
                {formatCurrency(
                  financialSummary.total,
                  formData.currency
                )}
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* Notes                                              */}

      <section className="form-section">
        <div className="form-section-header">
          <h3>
            Notes
          </h3>

          <p>
            Add optional notes or
            billing instructions.
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="notes">
            Invoice Notes
          </label>

          <textarea
            id="notes"
            name="notes"
            rows={5}
            value={
              formData.notes
            }
            onChange={
              handleChange
            }
            maxLength={
              MAX_NOTES_LENGTH
            }
            placeholder="Add additional information for this invoice..."
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
                "Optional invoice information."
              )}
            </span>

            <span>
              {
                formData.notes
                  .length
              }
              /
              {
                MAX_NOTES_LENGTH
              }
            </span>
          </div>
        </div>
      </section>

      {/* Actions */}

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
            ? "Update Invoice"
            : "Create Invoice"}
        </button>
      </div>
    </form>
  );
};

export default InvoiceForm;
