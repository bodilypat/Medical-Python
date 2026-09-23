/* *********************************************** */
/* #src/features/laboratory/hooks/useLabResults.js */
/* *********************************************** */

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
  patientId: "",
  doctorId: "",
  labOrderId: "",
  testId: "",
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
  completed: 0,
  verified: 0,
  abnormal: 0,
  critical: 0,
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
  if (
    response?.data?.data !== undefined
  ) {
    return response.data.data;
  }

  if (
    response?.data !== undefined
  ) {
    return response.data;
  }

  return response;
};

const extractResults = (response) => {
  const data = extractData(response);

  if (Array.isArray(data)) {
    return {
      results: data,
      pagination: DEFAULT_PAGINATION,
    };
  }

  if (Array.isArray(data?.results)) {
    return {
      results: data.results,
      pagination:
        data.pagination ||
        DEFAULT_PAGINATION,
    };
  }

  if (Array.isArray(data?.labResults)) {
    return {
      results: data.labResults,
      pagination:
        data.pagination ||
        DEFAULT_PAGINATION,
    };
  }

  if (Array.isArray(data?.items)) {
    const total =
      data.total ??
      data.count ??
      data.items.length;

    const limit =
      data.limit ??
      DEFAULT_PAGINATION.limit;

    return {
      results: data.items,
      pagination:
        data.pagination ||
        {
          ...DEFAULT_PAGINATION,
          total,
          totalPages:
            data.totalPages ??
            Math.ceil(
              total / limit
            ),
        },
    };
  }

  return {
    results: [],
    pagination: DEFAULT_PAGINATION,
  };
};

const extractResult = (response) => {
  const data = extractData(response);

  if (data?.result) {
    return data.result;
  }

  if (data?.labResult) {
    return data.labResult;
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

const getResultStatus = (result) =>
  String(
    result?.status ||
      result?.resultStatus ||
      ""
  ).toLowerCase();

const isAbnormalResult = (result) => {
  if (
    result?.isAbnormal === true ||
    result?.abnormal === true
  ) {
    return true;
  }

  const interpretation =
    String(
      result?.interpretation ||
        result?.flag ||
        ""
    ).toLowerCase();

  return [
    "abnormal",
    "high",
    "low",
    "positive",
    "borderline",
    "outside_range",
    "out-of-range",
  ].includes(interpretation);
};

const isCriticalResult = (result) => {
  if (
    result?.isCritical === true ||
    result?.critical === true
  ) {
    return true;
  }

  const interpretation =
    String(
      result?.interpretation ||
        result?.flag ||
        ""
    ).toLowerCase();

  return [
    "critical",
    "panic",
    "critical-high",
    "critical-low",
  ].includes(interpretation);
};

const calculateSummary = (results) => {
  return results.reduce(
    (summary, result) => {
      const status =
        getResultStatus(result);

      summary.total += 1;

      if (
        status === "pending"
      ) {
        summary.pending += 1;
      }

      if (
        status === "completed" ||
        status === "complete"
      ) {
        summary.completed += 1;
      }

      if (
        status === "verified" ||
        status === "approved"
      ) {
        summary.verified += 1;
      }

      if (
        isAbnormalResult(result)
      ) {
        summary.abnormal += 1;
      }

      if (
        isCriticalResult(result)
      ) {
        summary.critical += 1;
      }

      return summary;
    },
    { ...EMPTY_SUMMARY }
  );
};

/* Hook */

const useLabResults = ({
  initialFilters = {},
  initialPage = 1,
  initialLimit = 10,
  autoFetch = true,
} = {}) => {
  const mountedRef = useRef(true);

  const [results, setResults] =
    useState([]);

  const [
    selectedResult,
    setSelectedResult,
  ] = useState(null);

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

  const [verifying, setVerifying] =
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

  
  /* Fetch results */
 
  const fetchLabResults =
    useCallback(
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
            await laboratoryService.getLabResults(
              params
            );

          const parsed =
            extractResults(response);

          if (!mountedRef.current) {
            return parsed;
          }

          setResults(
            parsed.results
          );

          setPagination(
            normalizePagination({
              ...activePagination,
              ...parsed.pagination,
            })
          );

          setLastUpdated(
            new Date()
          );

          return parsed;
        } catch (fetchError) {
          const message =
            extractMessage(
              fetchError,
              "Unable to load laboratory results."
            );

          if (mountedRef.current) {
            setError(message);
            setResults([]);
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

    fetchLabResults().catch(() => {
      /* Error is already stored in state. */
    });

    /* Only fetch during initial hook setup.
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

  const resetFilters =
    useCallback(() => {
      const resetValue = {
        ...DEFAULT_FILTERS,
      };

      setFiltersState(
        resetValue
      );

      setPagination(
        (previous) => ({
          ...previous,
          page: 1,
        })
      );

      return resetValue;
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

  /* Fetch single result */

  const getLabResult =
    useCallback(async (id) => {
      if (!id) {
        throw new Error(
          "Laboratory result ID is required."
        );
      }

      setActionError("");

      try {
        const response =
          await laboratoryService.getLabResult(
            id
          );

        const result =
          extractResult(response);

        if (mountedRef.current) {
          setSelectedResult(result);
        }

        return result;
      } catch (fetchError) {
        const message =
          extractMessage(
            fetchError,
            "Unable to load the laboratory result."
          );

        if (mountedRef.current) {
          setActionError(message);
        }

        throw fetchError;
      }
    }, []);

  /* Results by order */

  const getResultsByLabOrder =
    useCallback(
      async (labOrderId) => {
        if (!labOrderId) {
          throw new Error(
            "Laboratory order ID is required."
          );
        }

        setLoading(true);
        setError("");

        try {
          let response;

          if (
            typeof laboratoryService.getResultsByLabOrder ===
            "function"
          ) {
            response =
              await laboratoryService.getResultsByLabOrder(
                labOrderId
              );
          } else {
            response =
              await laboratoryService.getLabResults(
                {
                  labOrderId,
                }
              );
          }

          const parsed =
            extractResults(response);

          if (mountedRef.current) {
            setResults(
              parsed.results
            );
          }

          return parsed.results;
        } catch (fetchError) {
          const message =
            extractMessage(
              fetchError,
              "Unable to load results for this laboratory order."
            );

          if (mountedRef.current) {
            setError(message);
          }

          throw fetchError;
        } finally {
          if (mountedRef.current) {
            setLoading(false);
          }
        }
      },
      []
    );

  /* Select result */

  const selectResult =
    useCallback((result) => {
      setSelectedResult(result);
    }, []);

  const clearSelectedResult =
    useCallback(() => {
      setSelectedResult(null);
    }, []);

  /* Create result */

  const createLabResult =
    useCallback(
      async (payload) => {
        setSaving(true);
        setActionError("");

        try {
          const response =
            await laboratoryService.createLabResult(
              payload
            );

          const createdResult =
            extractResult(response);

          if (mountedRef.current) {
            setSelectedResult(
              createdResult
            );
          }

          await fetchLabResults({
            silent: true,
          });

          return createdResult;
        } catch (createError) {
          const message =
            extractMessage(
              createError,
              "Unable to create the laboratory result."
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
      [fetchLabResults]
    );

  /* Update result */

  const updateLabResult =
    useCallback(
      async (id, payload) => {
        if (!id) {
          throw new Error(
            "Laboratory result ID is required."
          );
        }

        setSaving(true);
        setActionError("");

        try {
          const response =
            await laboratoryService.updateLabResult(
              id,
              payload
            );

          const updatedResult =
            extractResult(response);

          if (mountedRef.current) {
            setSelectedResult(
              updatedResult
            );

            setResults(
              (previous) =>
                previous.map(
                  (result) =>
                    String(
                      result.id
                    ) === String(id)
                      ? {
                          ...result,
                          ...updatedResult,
                        }
                      : result
                )
            );
          }

          await fetchLabResults({
            silent: true,
          });

          return updatedResult;
        } catch (updateError) {
          const message =
            extractMessage(
              updateError,
              "Unable to update the laboratory result."
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
      [fetchLabResults]
    );

  /* Verify result */

  const verifyLabResult =
    useCallback(
      async (
        id,
        verificationData = {}
      ) => {
        if (!id) {
          throw new Error(
            "Laboratory result ID is required."
          );
        }

        setVerifying(true);
        setActionError("");

        try {
          let response;

          if (
            typeof laboratoryService.verifyLabResult ===
            "function"
          ) {
            response =
              await laboratoryService.verifyLabResult(
                id,
                verificationData
              );
          } else {
            response =
              await laboratoryService.updateLabResult(
                id,
                {
                  ...verificationData,
                  status: "verified",
                  verifiedAt:
                    new Date().toISOString(),
                }
              );
          }

          const verifiedResult =
            extractResult(response);

          if (mountedRef.current) {
            setSelectedResult(
              verifiedResult
            );

            setResults(
              (previous) =>
                previous.map(
                  (result) =>
                    String(
                      result.id
                    ) === String(id)
                      ? {
                          ...result,
                          ...verifiedResult,
                        }
                      : result
                )
            );
          }

          return verifiedResult;
        } catch (verifyError) {
          const message =
            extractMessage(
              verifyError,
              "Unable to verify the laboratory result."
            );

          if (mountedRef.current) {
            setActionError(message);
          }

          throw verifyError;
        } finally {
          if (mountedRef.current) {
            setVerifying(false);
          }
        }
      },
      []
    );

  /* Delete result */

  const deleteLabResult =
    useCallback(
      async (id) => {
        if (!id) {
          throw new Error(
            "Laboratory result ID is required."
          );
        }

        setDeleting(true);
        setActionError("");

        try {
          await laboratoryService.deleteLabResult(
            id
          );

          if (mountedRef.current) {
            setResults(
              (previous) =>
                previous.filter(
                  (result) =>
                    String(
                      result.id
                    ) !== String(id)
                )
            );

            setSelectedResult(
              (previous) =>
                previous &&
                String(
                  previous.id
                ) === String(id)
                  ? null
                  : previous
            );
          }

          await fetchLabResults({
            silent: true,
          });

          return true;
        } catch (deleteError) {
          const message =
            extractMessage(
              deleteError,
              "Unable to delete the laboratory result."
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
      [fetchLabResults]
    );

  /* Refresh */

  const refresh = useCallback(
    async (options = {}) => {
      return fetchLabResults({
        ...options,
        silent:
          options.silent ?? false,
      });
    },
    [fetchLabResults]
  );

  /* Clear errors */

  const clearError = useCallback(() => {
    setError("");
    setActionError("");
  }, []);

  /* Derived state */

  const summary = useMemo(
    () => calculateSummary(results),
    [results]
  );

  const hasResults =
    results.length > 0;

  const isEmpty =
    !loading && !hasResults;

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

  const isFirstPage =
    pagination.page <= 1;

  const isLastPage =
    pagination.totalPages > 0 &&
    pagination.page >=
      pagination.totalPages;

  const isBusy =
    loading ||
    saving ||
    verifying ||
    deleting;

   /* Return API */

  return {
    /* Data */

    results,
    selectedResult,
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
    verifying,
    deleting,
    isBusy,

    /* Errors */

    error,
    actionError,
    clearError,

    /* Result operations */

    fetchLabResults,
    getLabResult,
    getResultsByLabOrder,
    createLabResult,
    updateLabResult,
    verifyLabResult,
    deleteLabResult,

    /* Selection */

    selectResult,
    clearSelectedResult,

    /* Utilities */

    refresh,
    hasResults,
    isEmpty,
    lastUpdated,

    /* Direct state setter */

    setResults,
  };
};

export default useLabResults;
