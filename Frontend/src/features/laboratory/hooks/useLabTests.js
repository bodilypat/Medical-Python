/* ********************************************* */
/* #src/features/laboratory/hooks/useLabTests.js */
/* ********************************************* */

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
  category: "",
  specimenType: "",
};

const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
};

const EMPTY_SUMMARY = {
  total: 0,
  active: 0,
  inactive: 0,
};

/* Helpers */

const normalizeFilters = (
  filters = {}
) => ({
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

const extractTests = (response) => {
  const data = extractData(response);

  if (Array.isArray(data)) {
    return {
      tests: data,
      pagination:
        DEFAULT_PAGINATION,
    };
  }

  if (Array.isArray(data?.tests)) {
    return {
      tests: data.tests,
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
      tests: data.items,
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

  if (Array.isArray(data?.results)) {
    const total =
      data.total ??
      data.count ??
      data.results.length;

    return {
      tests: data.results,
      pagination:
        data.pagination ||
        {
          ...DEFAULT_PAGINATION,
          total,
          totalPages:
            data.totalPages ??
            Math.ceil(
              total /
                (data.limit ??
                  DEFAULT_PAGINATION.limit)
            ),
        },
    };
  }

  return {
    tests: [],
    pagination:
      DEFAULT_PAGINATION,
  };
};

const extractTest = (response) => {
  const data = extractData(response);

  if (data?.test) {
    return data.test;
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

const isTestActive = (test) => {
  if (
    test?.isActive === false ||
    test?.active === false
  ) {
    return false;
  }

  const status = String(
    test?.status || "active"
  ).toLowerCase();

  return ![
    "inactive",
    "disabled",
    "archived",
  ].includes(status);
};

const calculateSummary = (tests) => {
  return tests.reduce(
    (summary, test) => {
      summary.total += 1;

      if (isTestActive(test)) {
        summary.active += 1;
      } else {
        summary.inactive += 1;
      }

      return summary;
    },
    { ...EMPTY_SUMMARY }
  );
};

/* Hook */

const useLabTests = ({
  initialFilters = {},
  initialPage = 1,
  initialLimit = 10,
  autoFetch = true,
} = {}) => {
  const mountedRef = useRef(true);

  const [tests, setTests] =
    useState([]);

  const [selectedTest, setSelectedTest] =
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

    /* Fetch tests */

  const fetchLabTests =
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
            await laboratoryService.getLabTests(
              params
            );

          const result =
            extractTests(response);

          if (!mountedRef.current) {
            return result;
          }

          setTests(result.tests);

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
              "Unable to load laboratory tests."
            );

          if (mountedRef.current) {
            setError(message);
            setTests([]);
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

    fetchLabTests().catch(() => {
    /* Error is already stored in hook state. */
    });

    /* Fetch only when the hook is initialized.
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

    /* Fetch single test */
  
  const getLabTest =
    useCallback(async (id) => {
      if (!id) {
        throw new Error(
          "Laboratory test ID is required."
        );
      }

      setActionError("");

      try {
        const response =
          await laboratoryService.getLabTest(
            id
          );

        const test =
          extractTest(response);

        if (mountedRef.current) {
          setSelectedTest(test);
        }

        return test;
      } catch (fetchError) {
        const message =
          extractMessage(
            fetchError,
            "Unable to load the laboratory test."
          );

        if (mountedRef.current) {
          setActionError(message);
        }

        throw fetchError;
      }
    }, []);

    /* Select test */
 
  const selectTest = useCallback(
    (test) => {
      setSelectedTest(test);
    },
    []
  );

  const clearSelectedTest =
    useCallback(() => {
      setSelectedTest(null);
    }, []);

  /* Create test */

  const createLabTest =
    useCallback(
      async (payload) => {
        setSaving(true);
        setActionError("");

        try {
          const response =
            await laboratoryService.createLabTest(
              payload
            );

          const createdTest =
            extractTest(response);

          if (mountedRef.current) {
            setSelectedTest(
              createdTest
            );
          }

          await fetchLabTests({
            silent: true,
          });

          return createdTest;
        } catch (createError) {
          const message =
            extractMessage(
              createError,
              "Unable to create the laboratory test."
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
      [fetchLabTests]
    );

  
    /* Update test */
  
  const updateLabTest =
    useCallback(
      async (id, payload) => {
        if (!id) {
          throw new Error(
            "Laboratory test ID is required."
          );
        }

        setSaving(true);
        setActionError("");

        try {
          const response =
            await laboratoryService.updateLabTest(
              id,
              payload
            );

          const updatedTest =
            extractTest(response);

          if (mountedRef.current) {
            setSelectedTest(
              updatedTest
            );

            setTests(
              (previous) =>
                previous.map(
                  (test) =>
                    String(
                      test.id
                    ) === String(id)
                      ? {
                          ...test,
                          ...updatedTest,
                        }
                      : test
                )
            );
          }

          await fetchLabTests({
            silent: true,
          });

          return updatedTest;
        } catch (updateError) {
          const message =
            extractMessage(
              updateError,
              "Unable to update the laboratory test."
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
      [fetchLabTests]
    );

    /* Delete test */
  
  const deleteLabTest =
    useCallback(
      async (id) => {
        if (!id) {
          throw new Error(
            "Laboratory test ID is required."
          );
        }

        setDeleting(true);
        setActionError("");

        try {
          await laboratoryService.deleteLabTest(
            id
          );

          if (mountedRef.current) {
            setTests(
              (previous) =>
                previous.filter(
                  (test) =>
                    String(
                      test.id
                    ) !== String(id)
                )
            );

            setSelectedTest(
              (previous) =>
                previous &&
                String(
                  previous.id
                ) === String(id)
                  ? null
                  : previous
            );
          }

          await fetchLabTests({
            silent: true,
          });

          return true;
        } catch (deleteError) {
          const message =
            extractMessage(
              deleteError,
              "Unable to delete the laboratory test."
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
      [fetchLabTests]
    );

    /* Toggle active status */

  const toggleLabTestStatus =
    useCallback(
      async (id, active) => {
        if (!id) {
          throw new Error(
            "Laboratory test ID is required."
          );
        }

        setSaving(true);
        setActionError("");

        try {
          let response;

          if (
            active &&
            typeof laboratoryService.activateLabTest ===
              "function"
          ) {
            response =
              await laboratoryService.activateLabTest(
                id
              );
          } else if (
            !active &&
            typeof laboratoryService.deactivateLabTest ===
              "function"
          ) {
            response =
              await laboratoryService.deactivateLabTest(
                id
              );
          } else {
            response =
              await laboratoryService.updateLabTest(
                id,
                {
                  isActive: active,
                  status: active
                    ? "active"
                    : "inactive",
                }
              );
          }

          const updatedTest =
            extractTest(response);

          if (mountedRef.current) {
            setSelectedTest(
              updatedTest
            );

            setTests(
              (previous) =>
                previous.map(
                  (test) =>
                    String(
                      test.id
                    ) === String(id)
                      ? {
                          ...test,
                          ...updatedTest,
                        }
                      : test
                )
            );
          }

          return updatedTest;
        } catch (statusError) {
          const message =
            extractMessage(
              statusError,
              "Unable to update the laboratory test status."
            );

          if (mountedRef.current) {
            setActionError(message);
          }

          throw statusError;
        } finally {
          if (mountedRef.current) {
            setSaving(false);
          }
        }
      },
      []
    );

  /* Refresh */
  
  const refresh = useCallback(
    async (options = {}) => {
      return fetchLabTests({
        ...options,
        silent:
          options.silent ?? false,
      });
    },
    [fetchLabTests]
  );

  /* Clear errors */

  const clearError = useCallback(() => {
    setError("");
    setActionError("");
  }, []);

  /* Derived state */

  const summary = useMemo(
    () => calculateSummary(tests),
    [tests]
  );

  const hasTests =
    tests.length > 0;

  const isEmpty =
    !loading && !hasTests;

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

  /* Return API */

  return {
    
    /* Data */

    tests,
    selectedTest,
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

    /* Test operations */

    fetchLabTests,
    getLabTest,
    createLabTest,
    updateLabTest,
    deleteLabTest,
    toggleLabTestStatus,

    /* Selection */

    selectTest,
    clearSelectedTest,

    /* Utilities */

    refresh,
    hasTests,
    isEmpty,
    lastUpdated,
  };
};

export default useLabTests;
