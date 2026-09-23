/* ********************************************************* */
/* #src/features/billing/pages/BillingsPage.jsx              */
/* ********************************************************* */

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useNavigate,
} from "react-router-dom";

import BillingTable from "../components/BillingTable";
import BillingCard from "../components/BillingCard";
import BillingSearch from "../components/BillingSearch";
import BilingFilters from "../components/BilingFilters";
import useBillings from "../hooks/useBillings";

/* Constants */

const DEFAULT_FILTERS = {
  status: "",
  paymentMethod: "",
  dateFrom: "",
  dateTo: "",
  minAmount: "",
  maxAmount: "",
};

const PAGE_SIZE_OPTIONS = [
  10,
  25,
  50,
  100,
];

/* Helpers */


const getRecordsFromResponse = (
  response
) => {
  if (
    Array.isArray(response)
  ) {
    return response;
  }

  if (
    Array.isArray(
      response?.data
    )
  ) {
    return response.data;
  }

  if (
    Array.isArray(
      response?.items
    )
  ) {
    return response.items;
  }

  if (
    Array.isArray(
      response?.results
    )
  ) {
    return response.results;
  }

  if (
    Array.isArray(
      response?.billings
    )
  ) {
    return response.billings;
  }

  if (
    Array.isArray(
      response?.invoices
    )
  ) {
    return response.invoices;
  }

  return [];
};

const getPaginationFromResponse = (
  response
) => {
  const pagination =
    response?.pagination ||
    response?.meta ||
    {};

  return {
    total:
      Number(
        pagination.total ??
          response?.total ??
          0
      ) || 0,

    page:
      Number(
        pagination.page ??
          response?.page ??
          1
      ) || 1,

    pageSize:
      Number(
        pagination.pageSize ??
          pagination.limit ??
          response?.pageSize ??
          response?.limit ??
          10
      ) || 10,

    totalPages:
      Number(
        pagination.totalPages ??
          response?.totalPages ??
          0
      ) || 0,
  };
};

const getBillingId = (
  billing
) => {
  return (
    billing?.id ??
    billing?.billingId ??
    billing?.invoiceId ??
    ""
  );
};

const getBillingAmount = (
  billing
) => {
  const value =
    billing?.totalAmount ??
    billing?.amount ??
    billing?.grandTotal ??
    billing?.balanceDue ??
    0;

  const numericValue =
    Number(value);

  return Number.isFinite(
    numericValue
  )
    ? numericValue
    : 0;
};

const getBillingStatus = (
  billing
) => {
  return (
    billing?.status ??
    billing?.billingStatus ??
    billing?.paymentStatus ??
    "unknown"
  );
};

const formatCurrency = (
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
    ).format(
      Number(amount) || 0
    );
  } catch {
    return `${currency} ${(
      Number(amount) || 0
    ).toFixed(2)}`;
  }
};

const normalizeSearchParams = (
  search
) => {
  const value =
    String(
      search || ""
    ).trim();

  return value;
};

/* Component */

const BillingsPage = () => {
  const navigate =
    useNavigate();

  /* Local state */

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    filters,
    setFilters,
  ] = useState(
    DEFAULT_FILTERS
  );

  const [
    page,
    setPage,
  ] = useState(1);

  const [
    pageSize,
    setPageSize,
  ] = useState(10);

  const [
    viewMode,
    setViewMode,
  ] = useState("table");

  const [
    selectedBilling,
    setSelectedBilling,
  ] = useState(null);

  const [
    actionError,
    setActionError,
  ] = useState("");

  /* Billing hook */
  
  const billingHook =
    useBillings({
      page,
      pageSize,
      search,
      filters,
    });

  /*
   * The hook may expose slightly different names depending
   * on implementation. These fallbacks keep the page usable
   * with common hook APIs.
   */

  const {
    billings:
      hookBillings,
    data:
      hookData,
    response:
      hookResponse,

    loading:
      hookLoading,

    error:
      hookError,

    fetchBillings,
    refetch,
    reload,

    deleteBilling,
    removeBilling,

    refresh,
  } = billingHook || {};

  /* Resolve response */

  const response =
    hookResponse ||
    hookData ||
    hookBillings;

  const billings =
    useMemo(
      () =>
        getRecordsFromResponse(
          response
        ),
      [response]
    );

  const pagination =
    useMemo(
      () =>
        getPaginationFromResponse(
          response
        ),
      [response]
    );

  const loading =
    Boolean(
      hookLoading
    );

  const errorMessage =
    hookError?.response
      ?.data?.message ||
    hookError?.message ||
    (typeof hookError ===
    "string"
      ? hookError
      : "");

  /* Initial fetch fallback */

  useEffect(() => {
    if (
      typeof fetchBillings ===
      "function"
    ) {
      fetchBillings({
        page,
        pageSize,
        search,
        filters,
      });
    }
  }, [
    page,
    pageSize,
    search,
    filters,
    fetchBillings,
  ]);

  /* Refresh helper */
  
  const handleRefresh =
    useCallback(() => {
      setActionError("");

      if (
        typeof refresh ===
        "function"
      ) {
        refresh();
        return;
      }

      if (
        typeof refetch ===
        "function"
      ) {
        refetch();
        return;
      }

      if (
        typeof reload ===
        "function"
      ) {
        reload();
        return;
      }

      if (
        typeof fetchBillings ===
        "function"
      ) {
        fetchBillings({
          page,
          pageSize,
          search,
          filters,
        });
      }
    }, [
      refresh,
      refetch,
      reload,
      fetchBillings,
      page,
      pageSize,
      search,
      filters,
    ]);

  /* ------------------------------------------------------- */
  /* Search                                                   */
  /* ------------------------------------------------------- */

  const handleSearch =
    useCallback(
      (value) => {
        const normalized =
          normalizeSearchParams(
            value
          );

        setPage(1);
        setSearch(
          normalized
        );
      },
      []
    );

  const handleClearSearch =
    useCallback(() => {
      setSearch("");
      setPage(1);
    }, []);

  /* Filters */

  const handleFiltersChange =
    useCallback(
      (nextFilters) => {
        setFilters({
          ...DEFAULT_FILTERS,
          ...nextFilters,
        });

        setPage(1);
      },
      []
    );

  const handleFiltersApply =
    useCallback(
      (nextFilters) => {
        setFilters({
          ...DEFAULT_FILTERS,
          ...nextFilters,
        });

        setPage(1);
      },
      []
    );

  const handleFiltersReset =
    useCallback(() => {
      setFilters({
        ...DEFAULT_FILTERS,
      });

      setPage(1);
    }, []);

  /* ------------------------------------------------------- */
  /* Page navigation                                          */
  /* ------------------------------------------------------- */

  const total =
    pagination.total ||
    billings.length;

  const calculatedTotalPages =
    pagination.totalPages ||
    Math.max(
      1,
      Math.ceil(
        total / pageSize
      )
    );

  const currentPage =
    pagination.page ||
    page;

  const handlePageChange =
    (nextPage) => {
      const safePage =
        Math.max(
          1,
          Math.min(
            Number(nextPage) ||
              1,
            calculatedTotalPages
          )
        );

      setPage(
        safePage
      );
    };

  const handlePageSizeChange =
    (event) => {
      const nextSize =
        Number(
          event.target.value
        );

      setPageSize(
        nextSize
      );

      setPage(1);
    };

  /* Navigation */
  
  const handleCreateInvoice =
    () => {
      navigate(
        "/billing/invoices/create"
      );
    };

  const handleViewBilling =
    (billing) => {
      const id =
        getBillingId(
          billing
        );

      if (!id) {
        return;
      }

      setSelectedBilling(
        billing
      );

      navigate(
        `/billing/${id}`
      );
    };

  const handleEditBilling =
    (billing) => {
      const id =
        getBillingId(
          billing
        );

      if (!id) {
        return;
      }

      navigate(
        `/billing/${id}/edit`
      );
    };

  const handlePayment =
    (billing) => {
      const id =
        getBillingId(
          billing
        );

      if (!id) {
        return;
      }

      navigate(
        `/billing/payments/${id}`
      );
    };

  const handleRefund =
    (billing) => {
      const id =
        getBillingId(
          billing
        );

      if (!id) {
        return;
      }

      navigate(
        `/billing/refunds/${id}`
      );
    };

  /* Delete */
  

  const handleDelete =
    async (billing) => {
      const id =
        getBillingId(
          billing
        );

      if (
        !id ||
        typeof deleteBilling !==
          "function" &&
          typeof removeBilling !==
            "function"
      ) {
        return;
      }

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this billing record?"
        );

      if (!confirmed) {
        return;
      }

      setActionError("");

      try {
        if (
          typeof deleteBilling ===
          "function"
        ) {
          await deleteBilling(
            id
          );
        } else {
          await removeBilling(
            id
          );
        }

        handleRefresh();
      } catch (
        deleteError
      ) {
        console.error(
          "Failed to delete billing:",
          deleteError
        );

        setActionError(
          deleteError
            ?.response
            ?.data
            ?.message ||
            deleteError?.message ||
            "Unable to delete the billing record."
        );
      }
    };

  /* Table/Card callbacks  */
  
  const tableActions = {
    onView:
      handleViewBilling,
    onEdit:
      handleEditBilling,
    onPayment:
      handlePayment,
    onRefund:
      handleRefund,
    onDelete:
      handleDelete,
  };

  /* Summary statistics */
 
  const summary = useMemo(() => {
    const result =
      billings.reduce(
        (accumulator, billing) => {
          const amount =
            getBillingAmount(
              billing
            );

          const status =
            String(
              getBillingStatus(
                billing
              )
            ).toLowerCase();

          accumulator.totalAmount +=
            amount;

          if (
            [
              "paid",
              "completed",
              "complete",
            ].includes(status)
          ) {
            accumulator.paidAmount +=
              amount;
          }

          if (
            [
              "pending",
              "partially_paid",
              "overdue",
            ].includes(status)
          ) {
            accumulator.outstandingAmount +=
              amount;
          }

          accumulator.count += 1;

          return accumulator;
        },
        {
          count: 0,
          totalAmount: 0,
          paidAmount: 0,
          outstandingAmount: 0,
        }
      );

    return result;
  }, [billings]);

  
  /* Render      */
  

  return (
    <div className="billings-page">
     
      {/* Page Header   */}

      <div className="page-header">
        <div>
          <h1>
            Billing Management
          </h1>

          <p>
            Manage invoices, billing records,
            payments, and refunds.
          </p>
        </div>

        <div className="page-header-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={
              handleRefresh
            }
            disabled={
              loading
            }
          >
            {loading
              ? "Refreshing..."
              : "Refresh"}
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={
              handleCreateInvoice
            }
          >
            + Create Invoice
          </button>
        </div>
      </div>
   
      {/* Error */}
      

      {(errorMessage ||
        actionError) && (
        <div
          className="alert alert-danger"
          role="alert"
        >
          {actionError ||
            errorMessage}
        </div>
      )}

      {/* Summary Cards */}

      <div className="billing-summary-grid">
        <BillingCard
          title="Billing Records"
          value={
            summary.count
          }
          subtitle="Records on this page"
          variant="default"
        />

        <BillingCard
          title="Total Amount"
          value={formatCurrency(
            summary.totalAmount
          )}
          subtitle="Current result set"
          variant="primary"
        />

        <BillingCard
          title="Paid Amount"
          value={formatCurrency(
            summary.paidAmount
          )}
          subtitle="Paid or completed"
          variant="success"
        />

        <BillingCard
          title="Outstanding"
          value={formatCurrency(
            summary.outstandingAmount
          )}
          subtitle="Pending or unpaid"
          variant="warning"
        />
      </div>

      {/* Search */}

      <section className="billing-toolbar">
        <BillingSearch
          value={search}
          onChange={
            setSearch
          }
          onSearch={
            handleSearch
          }
          onClear={
            handleClearSearch
          }
          loading={
            loading
          }
        />
      </section>

      {/* Filters */}

      <section className="billing-filter-section">
        <BilingFilters
          filters={
            filters
          }
          onChange={
            handleFiltersChange
          }
          onApply={
            handleFiltersApply
          }
          onReset={
            handleFiltersReset
          }
          loading={
            loading
          }
        />
      </section>

      {/* Results Header                                     */}
     
      <div className="billing-results-header">
        <div>
          <h2>
            Billing Records
          </h2>

          <p>
            {total}{" "}
            {total === 1
              ? "record"
              : "records"}{" "}
            found
          </p>
        </div>

        <div className="billing-results-controls">
          <label htmlFor="billingPageSize">
            Rows per page
          </label>

          <select
            id="billingPageSize"
            value={
              pageSize
            }
            onChange={
              handlePageSizeChange
            }
            disabled={
              loading
            }
          >
            {PAGE_SIZE_OPTIONS.map(
              (size) => (
                <option
                  key={size}
                  value={size}
                >
                  {size}
                </option>
              )
            )}
          </select>

          <div
            className="billing-view-toggle"
            role="group"
            aria-label="Billing view"
          >
            <button
              type="button"
              className={
                viewMode ===
                "table"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setViewMode(
                  "table"
                )
              }
              aria-pressed={
                viewMode ===
                "table"
              }
            >
              Table
            </button>

            <button
              type="button"
              className={
                viewMode ===
                "card"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setViewMode(
                  "card"
                )
              }
              aria-pressed={
                viewMode ===
                "card"
              }
            >
              Cards
            </button>
          </div>
        </div>
      </div>

      {/* Loading */}

      {loading &&
        billings.length ===
          0 && (
          <div
            className="loading-state"
            role="status"
          >
            <div className="loading-spinner" />

            <p>
              Loading billing records...
            </p>
          </div>
        )}

      {/* Empty State */}
  

      {!loading &&
        billings.length ===
          0 && (
          <div className="empty-state">
            <div
              className="empty-state-icon"
              aria-hidden="true"
            >
              $
            </div>

            <h3>
              No billing records found
            </h3>

            <p>
              Try changing your search or
              filters, or create a new
              invoice.
            </p>

            <div className="empty-state-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={
                  handleFiltersReset
                }
              >
                Reset Filters
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={
                  handleCreateInvoice
                }
              >
                Create Invoice
              </button>
            </div>
          </div>
        )}

      {/* Table View */}

      {billings.length > 0 &&
        viewMode ===
          "table" && (
          <section className="billing-table-section">
            <BillingTable
              billings={
                billings
              }
              data={
                billings
              }
              loading={
                loading
              }
              selectedBilling={
                selectedBilling
              }
              onSelect={
                setSelectedBilling
              }
              onView={
                tableActions.onView
              }
              onEdit={
                tableActions.onEdit
              }
              onPayment={
                tableActions.onPayment
              }
              onRefund={
                tableActions.onRefund
              }
              onDelete={
                tableActions.onDelete
              }
            />
          </section>
        )}

      {/* Card View                                          */}
     
      {billings.length > 0 &&
        viewMode ===
          "card" && (
          <section className="billing-card-grid">
            {billings.map(
              (billing) => (
                <BillingCard
                  key={
                    getBillingId(
                      billing
                    )
                  }
                  billing={
                    billing
                  }
                  data={
                    billing
                  }
                  onView={
                    handleViewBilling
                  }
                  onEdit={
                    handleEditBilling
                  }
                  onPayment={
                    handlePayment
                  }
                  onRefund={
                    handleRefund
                  }
                  onDelete={
                    handleDelete
                  }
                />
              )
            )}
          </section>
        )}

      {/* Pagination                                         */}
     
      {billings.length > 0 && (
        <div className="billing-pagination">
          <div className="pagination-info">
            Page{" "}
            <strong>
              {currentPage}
            </strong>{" "}
            of{" "}
            <strong>
              {
                calculatedTotalPages
              }
            </strong>
          </div>

          <div className="pagination-controls">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() =>
                handlePageChange(
                  currentPage -
                    1
                )
              }
              disabled={
                loading ||
                currentPage <=
                  1
              }
            >
              Previous
            </button>

            {Array.from(
              {
                length:
                  Math.min(
                    calculatedTotalPages,
                    5
                  ),
              },
              (_, index) => {
                let pageNumber;

                if (
                  calculatedTotalPages <=
                  5
                ) {
                  pageNumber =
                    index +
                    1;
                } else if (
                  currentPage <=
                  3
                ) {
                  pageNumber =
                    index +
                    1;
                } else if (
                  currentPage >=
                  calculatedTotalPages -
                    2
                ) {
                  pageNumber =
                    calculatedTotalPages -
                    4 +
                    index;
                } else {
                  pageNumber =
                    currentPage -
                    2 +
                    index;
                }

                return (
                  <button
                    key={
                      pageNumber
                    }
                    type="button"
                    className={`pagination-page ${
                      pageNumber ===
                      currentPage
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      handlePageChange(
                        pageNumber
                      )
                    }
                    disabled={
                      loading
                    }
                    aria-current={
                      pageNumber ===
                      currentPage
                        ? "page"
                        : undefined
                    }
                  >
                    {
                      pageNumber
                    }
                  </button>
                );
              }
            )}

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() =>
                handlePageChange(
                  currentPage +
                    1
                )
              }
              disabled={
                loading ||
                currentPage >=
                  calculatedTotalPages
              }
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingsPage;
