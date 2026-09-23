/* ********************************************** */
/* #src/features/laboratory/hooks/useLabOrders.js */
/* ********************************************** */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import laboratoryService from "../services/laboratoryService";

/* Constants */

const DEFAULT_FILTERS = {
  search: "",
  status: "",
  priority: "",
  patientId: "",
  doctorId: "",
  dateFrom: "",
  dateTo: "",
};

const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
};

const EMPTY_SUMMARY = {
  total: 0,
  pending: 0,
  inProgress: 0,
  completed: 0,
  verified: 0,
  cancelled: 0,
};

/* Helpers */

const normalizeFilters = (filters = {}) => ({
  ...DEFAULT_FILTERS,
  ...filters,
});

const normalizePagination = (
  pagination = {}
) => ({
  ...DEFAULT_PAGINATION,
  ...pagination,
});

const extractData = (response) => {
  if (response?.data?.data !== undefined) {
    return response.data.data;
  }

  if (response?.data !== undefined) {
    return response.data;
  }

  return response;
};

const extractOrders = (response) => {
  const data = extractData(response);

  if (Array.isArray(data)) {
    return {
      orders: data,
      pagination: DEFAULT_PAGINATION,
    };
  }

  if (Array.isArray(data?.orders)) {
    return {
      orders: data.orders,
      pagination:
        data.pagination ||
        DEFAULT_PAGINATION,
    };
  }

  if (Array.isArray(data?.items)) {
    return {
      orders: data.items,
      pagination:
        data.pagination ||
        {
          ...DEFAULT_PAGINATION,
          total:
            data.total ??
            data.count ??
            data.items.length,
          totalPages:
            data.totalPages ??
            Math.ceil(
              (data.total ??
                data.count ??
                data.items.length) /
                (data.limit ??
                  DEFAULT_PAGINATION.limit)
            ),
        },
    };
  }

  if (Array.isArray(data?.results)) {
    return {
      orders: data.results,
      pagination:
        data.pagination ||
        DEFAULT_PAGINATION,
    };
  }

  return {
    orders: [],
    pagination: DEFAULT_PAGINATION,
  };
};

const extractOrder = (response) => {
  const data = extractData(response);

  if (data?.order) {
    return data.order;
  }

  return data;
};

const extractMessage = (
  error,
  fallback
) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
};

const buildQueryParams = (
  filters,
  pagination
) => {
  const params = {};

  Object.entries(filters).forEach(
    ([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      ) {
        params[key] =
          typeof value === "string"
            ? value.trim()
            : value;
      }
    }
  );

  params.page = pagination.page;
  params.limit = pagination.limit;

  return params;
};

const calculateSummary = (orders) => {
  return orders.reduce(
    (summary, order) => {
      const status = String(
        order?.status || ""
      ).toLowerCase();

      summary.total += 1;

      switch (status) {
        case "pending":
          summary.pending += 1;
          break;

        case "in_progress":
        case "in-progress":
        case "processing":
          summary.inProgress += 1;
          break;

        case "completed":
          summary.completed += 1;
          break;

        case "verified":
          summary.verified += 1;
          break;

        case "cancelled":
        case "canceled":
          summary.cancelled += 1;
          break;

        default:
          break;
      }

      return summary;
    },
    { ...EMPTY_SUMMARY }
  );
};

/* Hook */

const useLabOrders = ({
  initialFilters = {},
  initialPage = 1,
  initialLimit = 10,
  autoFetch = true,
} = {}) => {
  const mountedRef = useRef(true);

  const [orders, setOrders] =
    useState([]);

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [filters, setFiltersState] =
    useState(
      normalizeFilters(
        initialFilters
      )
    );

  const [pagination, setPagination] =
    useState({
      ...DEFAULT_PAGINATION,
      page: initialPage,
      limit: initialLimit,
    });

  const [loading, setLoading] =
    useState(false);

  const [fetching, setFetching] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [actionError, setActionError] =
    useState("");

  const [lastUpdated, setLastUpdated] =
    useState(null);

  /* Cleanup */

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  /* Fetch orders */

  const fetchOrders = useCallback(
    async ({
      nextFilters,
      nextPage,
      nextLimit,
      silent = false,
    } = {}) => {
      const activeFilters =
        nextFilters
          ? normalizeFilters(
              nextFilters
            )
          : filters;

      const activePagination = {
        ...pagination,
        ...(nextPage !== undefined
          ? { page: nextPage }
          : {}),
        ...(nextLimit !== undefined
          ? { limit: nextLimit }
          : {}),
      };

      if (!silent) {
        setLoading(true);
      }

      setFetching(true);
      setError("");

      try {
        const params =
          buildQueryParams(
            activeFilters,
            activePagination
          );

        const response =
          await laboratoryService.getLabOrders(
            params
          );

        const result =
          extractOrders(response);

        if (!mountedRef.current) {
          return result;
        }

        setOrders(result.orders);

        setPagination(
          normalizePagination({
            ...activePagination,
            ...result.pagination,
          })
        );

        setLastUpdated(
          new Date()
        );

        return result;
      } catch (fetchError) {
        const message =
          extractMessage(
            fetchError,
            "Unable to load laboratory orders."
          );

        if (mountedRef.current) {
          setError(message);
          setOrders([]);
        }

        throw fetchError;
      } finally {
        if (mountedRef.current) {
          setLoading(false);
          setFetching(false);
        }
      }
    },
    [filters, pagination]
  );

  /* Initial fetch */

  useEffect(() => {
    if (!autoFetch) {
      return;
    }

    fetchOrders().catch(() => {
      /* Error is already stored in hook state. */
    });

    /* Fetch only when the hook is initialized.
    ** Consumers can manually fetch after changing filters.
    ** eslint-disable-next-line react-hooks/exhaustive-deps 
    */
  }, [autoFetch]);

  /* Filter actions */

  const setFilters = useCallback(
    (nextFilters) => {
      setFiltersState(
        (previous) => {
          const resolved =
            typeof nextFilters ===
            "function"
              ? nextFilters(previous)
              : nextFilters;

          return normalizeFilters(
            resolved
          );
        }
      );

      setPagination(
        (previous) => ({
          ...previous,
          page: 1,
        })
      );
    },
    []
  );

  const updateFilter = useCallback(
    (name, value) => {
      setFiltersState(
        (previous) => ({
          ...previous,
          [name]: value,
        })
      );

      setPagination(
        (previous) => ({
          ...previous,
          page: 1,
        })
      );
    },
    []
  );

  const resetFilters = useCallback(() => {
    const resetFiltersValue = {
      ...DEFAULT_FILTERS,
    };

    setFiltersState(
      resetFiltersValue
    );

    setPagination(
      (previous) => ({
        ...previous,
        page: 1,
      })
    );

    return resetFiltersValue;
  }, []);

  /* Pagination */

  const setPage = useCallback(
    (page) => {
      const numericPage =
        Math.max(
          1,
          Number(page) || 1
        );

      setPagination(
        (previous) => ({
          ...previous,
          page: numericPage,
        })
      );
    },
    []
  );

  const setLimit = useCallback(
    (limit) => {
      const numericLimit =
        Math.max(
          1,
          Number(limit) || 10
        );

      setPagination(
        (previous) => ({
          ...previous,
          page: 1,
          limit: numericLimit,
        })
      );
    },
    []
  );

  const nextPage = useCallback(() => {
    setPagination(
      (previous) => ({
        ...previous,
        page:
          previous.totalPages &&
          previous.page >=
            previous.totalPages
            ? previous.page
            : previous.page + 1,
      })
    );
  }, []);

  const previousPage =
    useCallback(() => {
      setPagination(
        (previous) => ({
          ...previous,
          page: Math.max(
            1,
            previous.page - 1
          ),
        })
      );
    }, []);

  /* Get single order*/
  
  const getLabOrder =
    useCallback(async (id) => {
      if (!id) {
        throw new Error(
          "Laboratory order ID is required."
        );
      }

      setActionError("");

      try {
        const response =
          await laboratoryService.getLabOrder(
            id
          );

        const order =
          extractOrder(response);

        if (mountedRef.current) {
          setSelectedOrder(order);
        }

        return order;
      } catch (fetchError) {
        const message =
          extractMessage(
            fetchError,
            "Unable to load the laboratory order."
          );

        if (mountedRef.current) {
          setActionError(message);
        }

        throw fetchError;
      }
    }, []);

  /* Select order */

  const selectOrder = useCallback(
    (order) => {
      setSelectedOrder(order);
    },
    []
  );

  const clearSelectedOrder =
    useCallback(() => {
      setSelectedOrder(null);
    }, []);

  /* Create order */
 
  const createLabOrder =
    useCallback(
      async (payload) => {
        setSaving(true);
        setActionError("");

        try {
          const response =
            await laboratoryService.createLabOrder(
              payload
            );

          const createdOrder =
            extractOrder(response);

          if (mountedRef.current) {
            setSelectedOrder(
              createdOrder
            );
          }

          /* Refresh the current list. */
          await fetchOrders({
            silent: true,
          });

          return createdOrder;
        } catch (createError) {
          const message =
            extractMessage(
              createError,
              "Unable to create the laboratory order."
            );

          if (mountedRef.current) {
            setActionError(message);
          }

          throw createError;
        } finally {
          if (mountedRef.current) {
            setSaving(false);
          }
        }
      },
      [fetchOrders]
    );

  /* Update order */

  const updateLabOrder =
    useCallback(
      async (id, payload) => {
        if (!id) {
          throw new Error(
            "Laboratory order ID is required."
          );
        }

        setSaving(true);
        setActionError("");

        try {
          const response =
            await laboratoryService.updateLabOrder(
              id,
              payload
            );

          const updatedOrder =
            extractOrder(response);

          if (mountedRef.current) {
            setSelectedOrder(
              updatedOrder
            );

            setOrders(
              (previous) =>
                previous.map(
                  (order) =>
                    String(
                      order.id
                    ) === String(id)
                      ? {
                          ...order,
                          ...updatedOrder,
                        }
                      : order
                )
            );
          }

          /* Re-fetch so server-side
          ** pagination/counts stay accurate. 
          */
          await fetchOrders({
            silent: true,
          });

          return updatedOrder;
        } catch (updateError) {
          const message =
            extractMessage(
              updateError,
              "Unable to update the laboratory order."
            );

          if (mountedRef.current) {
            setActionError(message);
          }

          throw updateError;
        } finally {
          if (mountedRef.current) {
            setSaving(false);
          }
        }
      },
      [fetchOrders]
    );

  /* Delete order */
  
  const deleteLabOrder =
    useCallback(
      async (id) => {
        if (!id) {
          throw new Error(
            "Laboratory order ID is required."
          );
        }

        setDeleting(true);
        setActionError("");

        try {
          await laboratoryService.deleteLabOrder(
            id
          );

          if (mountedRef.current) {
            setOrders(
              (previous) =>
                previous.filter(
                  (order) =>
                    String(
                      order.id
                    ) !== String(id)
                )
            );

            setSelectedOrder(
              (previous) =>
                previous &&
                String(previous.id) ===
                  String(id)
                  ? null
                  : previous
            );
          }

          await fetchOrders({
            silent: true,
          });

          return true;
        } catch (deleteError) {
          const message =
            extractMessage(
              deleteError,
              "Unable to delete the laboratory order."
            );

          if (mountedRef.current) {
            setActionError(message);
          }

          throw deleteError;
        } finally {
          if (mountedRef.current) {
            setDeleting(false);
          }
        }
      },
      [fetchOrders]
    );

  /* Cancel order */

  const cancelLabOrder =
    useCallback(
      async (id, reason = "") => {
        if (!id) {
          throw new Error(
            "Laboratory order ID is required."
          );
        }

        setSaving(true);
        setActionError("");

        try {
          let response;

          if (
            typeof laboratoryService.cancelLabOrder ===
            "function"
          ) {
            response =
              await laboratoryService.cancelLabOrder(
                id,
                { reason }
              );
          } else {
            response =
              await laboratoryService.updateLabOrder(
                id,
                {
                  status: "cancelled",
                  cancellationReason:
                    reason,
                }
              );
          }

          const cancelledOrder =
            extractOrder(response);

          if (mountedRef.current) {
            setSelectedOrder(
              cancelledOrder
            );
          }

          await fetchOrders({
            silent: true,
          });

          return cancelledOrder;
        } catch (cancelError) {
          const message =
            extractMessage(
              cancelError,
              "Unable to cancel the laboratory order."
            );

          if (mountedRef.current) {
            setActionError(message);
          }

          throw cancelError;
        } finally {
          if (mountedRef.current) {
            setSaving(false);
          }
        }
      },
      [fetchOrders]
    );

  /* Refresh */

  const refresh = useCallback(
    async (options = {}) => {
      return fetchOrders({
        ...options,
        silent:
          options.silent ?? false,
      });
    },
    [fetchOrders]
  );

  /* Clear errors */

  const clearError = useCallback(() => {
    setError("");
    setActionError("");
  }, []);

  
  /* Derived state */
 
  const summary = useMemo(
    () => calculateSummary(orders),
    [orders]
  );

  const hasOrders =
    orders.length > 0;

  const hasActiveFilters =
    Object.entries(filters).some(
      ([key, value]) => {
        if (key === "search") {
          return Boolean(
            value?.trim()
          );
        }

        return Boolean(value);
      }
    );

  const isEmpty =
    !loading && !hasOrders;

  const isFirstPage =
    pagination.page <= 1;

  const isLastPage =
    pagination.totalPages > 0 &&
    pagination.page >=
      pagination.totalPages;

  /* Return API */

  return {
    /* Data */

    orders,
    selectedOrder,
    summary,

    /* Filters */

    filters,
    setFilters,
    updateFilter,
    resetFilters,
    hasActiveFilters,

    /* Pagination */

    pagination,
    setPage,
    setLimit,
    nextPage,
    previousPage,
    isFirstPage,
    isLastPage,

    /* Loading */

    loading,
    fetching,
    saving,
    deleting,

    /* Errors */

    error,
    actionError,
    clearError,

    /* Order operations */

    fetchOrders,
    getLabOrder,
    createLabOrder,
    updateLabOrder,
    deleteLabOrder,
    cancelLabOrder,

    /* Selection */

    selectOrder,
    clearSelectedOrder,

    /* Utilities */

    refresh,
    hasOrders,
    isEmpty,
    lastUpdated,
  };
};

export default useLabOrders;
