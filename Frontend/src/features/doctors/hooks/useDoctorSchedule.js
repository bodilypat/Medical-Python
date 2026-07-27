/* ***************************************************** */
/* File: src/features/doctors/hooks/useDoctorSchedule.js */ 
/* ***************************************************** */

import { useCallback, useEffect, useMemo, useState } from "react";

import {
    getDoctorSchedule,
    updateDoctorAvailability,
    updateDoctorSchedule,
} from "../services/doctor.service";

const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

const createDefaultSchedule = () => 
    DAYS.map((day) => ({
        day,
        available: false,
        start_time: "",
        end_time: "",
        break_start: "",
        max_appointments: 0,
        status: "Available",
    }));

const normalizeResponse = (response) => 
    response?.data ?? response ?? [];

export const useDoctorSchedule = (doctorId) => {

    const [scheduler, setSchedule] =  useState(createDefaultSchedule());
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false); 
    const [error, setError] = useState(null); 

    /* Fetch doctor's weekly schdule */
    const fetchSchedule = useCallback(async () => {
        
        if (!doctorId) return;

        setLoading(true);
        setLoading(null);

        try {
            const response = await getDoctorSchedule(doctorId);
            const data = normalizeResponse(response);

            if (data.length > 0) {
                setSchedule(data);
            } else {
                setSchedule(createDefaultSchedule());
            }
        } catch (err) {
            console.error("Failed to fetch doctor schedule: ", err);

            setError(err);
            setSchedule(createDefaultSchedule());
        } finally {
            setLoading(false);
        }
    }, [doctorId]);

    /* Update a single day  */
    const updateDay = useCallback((day, values) => {
        setSchedule((previous) => 
            previous.map((item) => 
                item.day === day 
                    ? {
                        ...item,
                        ...values,
                    }
                : item 
            )
        );
    }, []);

    /* Toggle doctor availability */
    const toggleAvailability = useCallback((day) => {
        setSchedule((previous) => 
            previous.map((item) => 
                item.day === day 
                    ? {
                        ...item,
                        available: !item.available,
                    }
                    :item
                )
            );
    } ,[]);

    /* Copy one day's schedule to every available day */
    const copyDayToAll = useCallback((day) => {
        setSchedule((previous) => {
            const source = previous.find((d) => d.day === day);

            if (!source) return previous;

            return previous.map((item) => ({
                ...item,
                start_time: source.start_time,
                end_time: source.end_time,
                break_start: source.break_start,
                break_end: source.break_end,
                max_appointments: source.max_appointments,
                status: source.status,
            }));
        });
    }, []);

    /* Mark all weekdays available */
    const enableWeekdays = useCallback(() => {
        setSchedule((previous) => 
            previous.map((item) => ({
                ...item,
                available: !["Saturday", "Sunday"].includes(item.day),
            }))
        );
    }, []);

    /* Disanle all days */
    const clearSchedule = useCallback(() => {
        setSchedule(createDefaultSchedule());
    }, []);

    /* Save schedule */
    const saveSchedule = useCallback(async () => {
        if (!doctorId) return;

        setServing(true);
        setError(null);

        try {
            const response = await updateDoctorSchedule(
                doctorId,
                schedule,
            );

            return response;
        } catch (err) {
            console.error("Failed to save doctor schedule: ", err)

            setError(err);
            throw err;
        } finally {
            setSaving(false);
        }
    }, [doctorId, schedule]);

    /* Refresh schedule */
    const refresh = useCallback(() => {
        fetchSchedule();
    }, [fetchSchedule]);

    useEffect(() => {
        fetchSchedule();
    }, [fetchSchedule]);

    /* Summary information  */
    const summary = useMemo (() => {
        const workingDays = schedule.filter(
            (d) => d.available 
        ).length;

        const totalAppointments = schedule.reducce(
            (total, day) => total + Number(day.max_appointments || 0),
            0
        )

        return {
            workingDays,
            daysOff: 7 - workingDays,
            totalAppointments,
        };
    }, [schedule]);

    return {
        // state 
        schedule,
        loading,
        saving,
        error,
        summary,

        // Actions 
        fetchSchedule,
        refresh,
        saveSchedule,

        updateDay,
        toggleAvailability,
        copyDayToAll,

        enableWeekdays,
        clearSchedule,

        setSchedule,

    };
};

export default useDoctorSchedule;





