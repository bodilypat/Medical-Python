/* ******************************************** */
/* File: src/features/hooks/usePatientSearch.js */
/* ******************************************** */
import { useCallback, useMemo, useState } from "react";

const INITIAL_FILTERS = Object.freeze({
    gender: "",
    blood_group: "",
    status: "", 
});

const INITIAL_PAGINATION = Object.freeze({
    page: 1,
    limit: 10,
});

const INITIAL_SORT = Object.freeze({
    field: "first_name",
    order: "asc", 
});

export const usePatientSearch = () => {
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState(INITIAL_FILTERS);
    const [pagination, setPagination] = useState(INITIAL_PAGINATION);
    const [sort, setSort] = useState(INITIAL_SORT);

    /* Search */
    const handleSearch =  useCallback((value) => {
        setSearch(value.trim());

        setPagination((prev) => ({
            ...prev,
            page: 1,
        }));
    }, []);

    /* Update one filter */
    const setFilter = useCallback((name, value) => {
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));

        setPagination((prev) => ({
            ...prev,
            page: 1,
        }));
    }, []);

    /* Update multiple filters */
    const updateFilters = useCallback((value) => {
        setFilters((prev) => ({
            ...prev,
            ...values,
        }));

        setPagination((prev) => ({
            ...prev,
            page: 1,
        }));
    }, []);

    /* Pagination */
    const setPage = useCallback((limit) => {
        setPagination({
            page: 1,
            limit,
        });
    }, []);

    /* Sorting */
    const setSorting = useCallback((field, order = "asc") => {
        setSort({
            field,
            order,
        });

        setPagination((prev) => ({
            ...prev,
            page: 1, 
        }));
    },[]);

    /* Clear */
    const clearSearch = useCallback(() => {
        setFilters(INITIAL_FILTERS);

        setPagination((prev) => ({
            ...prev,
            page: 1,
        }));
    }, []);

    const reset = useCallback(() => {
        setSearch("");
        setFilters(INITIAL_FILTERS);
        setPagination(INITIAL_PAGINATION);
        setSort(INITIAL_SORT);
    }, []);

    /* Helpers */
    const hasSearch = search.length > 0;

    const hasFilters = useMemo(
        () => 
            Object.values(filters).some(
                (value) => value !== "" 
            ),
        [filters]
    );

    /* API query */
    const queryParams = useMemo (
        () => ({
            search: search || undefined,

            ...Object.fromEntries(
                Object.entries(filters).filter(
                    ([, value]) => value !== "" 
                )
            ),

            page: pagination.page,
            limit: pagination.limit,

            sort_by: sort.field,
            sort_order: sort.order,
        }),
        [
            search,
            filters,
            pagination.page,
            pagination.limit,
            sort,
        ]
    );

    return {
        search,
        filters,
        pagination,
        sort,

        hasSearch,
        hasFilters,

        queryParams,

        setSearch: handleSearch,

        setFilter,
        setFilters: updateFilters,

        setPage,
        setLimit,

        setSorting,
        
        clearSearch,
        clearFitlers,
        reset,
    };
};

export default usePatientSearch;

