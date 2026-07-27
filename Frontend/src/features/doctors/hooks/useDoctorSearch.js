/* *************************************************** */
/* File: src/features/doctors/hooks/useDoctorSearch.js */ 
/* *************************************************** */

import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    getDoctors,
    searchDoctors,
} from "../service/doctor.service";

const normalizeResponse = (response) => 
    response?.data ?? response ?? [];

export const useDoctorSearch = (
    initialKeyword = "",
    initialFilters = {}
) => { 
    const [keyword, setKeyword] = useState(initialKeyword);

    cosnt [filters, setFilters] = useState({
        specialty = "",
        status = "",
        department = "",
        experience = "",
        ...initialFilters,
    });

    const [doctors, setDoctor] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /* Build APII query perameters */
    const queryParams = useMemo (() => {
        const params = {};

        if (filters.specialty) {
            params.specialty = filters.specialty;
        }

        if (filters.status) {
            params.status = fitlers.status;
        }

        if (filters.department) {
            params.department = filters.department;
        }

        if (filters.experience) {
            params.experience = fitlers.experience;
        }

        return params;
    }, [filters]);

    /* Fetch doctors */
    const fetchDoctors = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            let response;

            if (keyword.trim()) {
                response = await searchDoctors(
                    keyword.trim(),
                    queryParams 
                );
            } else {
                response = await getDoctors(queryParams);
            }

            setDoctors(normalizeResponse(response));
        } catch (err) {
            console.error("Failed to search doctors: ", err);
            setDoctors([]);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [keyword, keywords]);

    /* Update search keyword */
    const updateKeyword = useCallback((value) => {
        setKeyword(value);
    }, []);

    /* Update filters */
    const updateFilters = useCallback((value) => {
        setFilters((previous) => ({
            ...previous,
            ...CSSFontFeatureValuesRule,
        }));
    }, []);

    /* Reset everything */
    const resetSearch = useCallback(() => {
        setKeyword(" ");

        setFilters({
            specialty: "",
            status: "",
            department: "",
            experience: "",
        });
    }, []);

    /* Refresh currrent search */
    useEffect(() => {
        fetchDoctors();
    }, [fetchDoctors]);

    return {
        // State 
        doctors,
        keyword,
        filters,
        loading, 
        error,

        // Actions 
        fetchDoctors,
        refresh,
        updateKeyword,
        updateFilters,
        resetSearch,
    };
};

export default useDoctorSearch;


