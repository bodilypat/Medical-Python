/* ********************************************************* */
/* File: #src/features/laboratory/hooks/useLabOrder.js       */
/* ********************************************************* */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import laboratoryService from "../services/laboratoryService";

/* Constants */

const INITIAL_STATE = {
  order: null,
  loading: false,
  saving: false,
  deleting: false,
  error: "",
  actionError: "",
};

/* Helpers */

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

/* Hook */

const useLabOrder = (
  orderId = null,
  {
    autoFetch = true,
  } = {}
) => {
  const mountedRef = useRef(true);

  const [
    order,
    setOrder,
  ] = useState(
    INITIAL_STATE.order
  );

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    actionError,
    setActionError,
  ] = useState("");

  /* Cleanup */

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  /* Fetch order */

  const fetchLabOrder =
    useCallback(
      async (id = orderId) => {
        if (!id) {
          const message =
            "Laboratory order ID is required.";

          if (mountedRef.current) {
            setError(message);
            setOrder(null);
          }

          throw new Error(message);
        }

        setLoading(true);
        setError("");

        try {
          const response =
            await laboratoryService.getLabOrder(
              id
            );

          const fetchedOrder =
            extractOrder(response);

          if (mountedRef.current) {
            setOrder(fetchedOrder);
          }

          return fetchedOrder;
        } catch (fetchError) {
          const message =
            extractMessage(
              fetchError,
              "Unable to load the laboratory order."
            );

          if (mountedRef.current) {
            setError(message);
            setOrder(null);
          }

          throw fetchError;
        } finally {
          if (mountedRef.current) {
            setLoading(false);
          }
        }
      },
      [orderId]
    );

  /* Initial fetch  */

  useEffect(() => {
    if (!autoFetch || !orderId) {
      return;
    }

    fetchLabOrder().catch(() => {
      // Error is already stored in state.
    });
  }, [
    autoFetch,
    orderId,
    fetchLabOrder,
  ]);

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
            setOrder(createdOrder);
          }

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
      []
    );

  /* Update order */

  const updateLabOrder =
    useCallback(
      async (
        payload,
        id = orderId
      ) => {
        if (!id) {
          const message =
            "Laboratory order ID is required.";

          if (mountedRef.current) {
            setActionError(message);
          }

          throw new Error(message);
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
            setOrder(updatedOrder);
          }

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
      [orderId]
    );

  /* Delete order */

  const deleteLabOrder =
    useCallback(
      async (id = orderId) => {
        if (!id) {
          const message =
            "Laboratory order ID is required.";

          if (mountedRef.current) {
            setActionError(message);
          }

          throw new Error(message);
        }

        setDeleting(true);
        setActionError("");

        try {
          await laboratoryService.deleteLabOrder(
            id
          );

          if (mountedRef.current) {
            setOrder(null);
          }

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
      [orderId]
    );

  /* Cancel order */

  const cancelLabOrder =
    useCallback(
      async (
        reason = "",
        id = orderId
      ) => {
        if (!id) {
          const message =
            "Laboratory order ID is required.";

          if (mountedRef.current) {
            setActionError(message);
          }

          throw new Error(message);
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
            setOrder(cancelledOrder);
          }

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
      [orderId]
    );

  /* Refresh order */

  const refresh =
    useCallback(async () => {
      return fetchLabOrder();
    }, [fetchLabOrder]);

  /* Clear errors */

  const clearError =
    useCallback(() => {
      setError("");
      setActionError("");
    }, []);

  /* Clear order */

  const clearOrder =
    useCallback(() => {
      setOrder(null);
      setError("");
      setActionError("");
    }, []);

  /* Derived state */

  const hasOrder =
    Boolean(order);

  const isBusy =
    loading ||
    saving ||
    deleting;

  /* Return API */

  return {

    /* Data */
    order,
    hasOrder,

    /* State */
    loading,
    saving,
    deleting,
    isBusy,

    /* Errors */
    error,
    actionError,
    clearError,

    /* Operations */
    fetchLabOrder,
    createLabOrder,
    updateLabOrder,
    deleteLabOrder,
    cancelLabOrder,
    refresh,

    /* Local state */
    setOrder,
    clearOrder,
  };
};

export default useLabOrder;
