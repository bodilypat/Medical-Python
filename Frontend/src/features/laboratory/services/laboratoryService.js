/* ********************************************************* */
/* #src/features/laboratory/services/laboratoryService.js     */
/* ********************************************************* */

import api from "../../../services/api";


/* API Endpoints */

const ENDPOINTS = {
  orders: "/laboratory/orders",
  tests: "/laboratory/tests",
  results: "/laboratory/results",
};

/* Helpers */

/* Remove undefined/null values before sending query params.*/

const cleanParams = (params = {}) => {
  return Object.entries(params).reduce(
    (result, [key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        result[key] = value;
      }

      return result;
    },
    {}
  );
};

/*
 * Normalize an API error so consumers receive
 * a predictable Error object while retaining
 * the original Axios response.
 */
const normalizeError = (
  error,
  fallbackMessage
) => {
  if (!error) {
    return new Error(fallbackMessage);
  }

  if (error.response) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      fallbackMessage;

    const normalizedError =
      new Error(message);

    normalizedError.response =
      error.response;

    normalizedError.status =
      error.response.status;

    normalizedError.code =
      error.code;

    return normalizedError;
  }

  if (error instanceof Error) {
    return error;
  }

  return new Error(
    fallbackMessage
  );
};

/*
 * Execute an API request with consistent
 * error handling.
 */
const request = async (
  requestCallback,
  fallbackMessage
) => {
  try {
    return await requestCallback();
  } catch (error) {
    throw normalizeError(
      error,
      fallbackMessage
    );
  }
};

/* Laboratory Orders */


/*
 * Get laboratory orders.
 *
 * Supports:
 * - search
 * - status
 * - priority
 * - patientId
 * - doctorId
 * - dateFrom
 * - dateTo
 * - page
 * - limit
 */
const getLabOrders = async (
  params = {}
) => {
  return request(
    () =>
      api.get(ENDPOINTS.orders, {
        params: cleanParams(
          params
        ),
      }),
    "Unable to load laboratory orders."
  );
};

/* Get one laboratory order.*/
const getLabOrder = async (id) => {
  if (!id) {
    throw new Error(
      "Laboratory order ID is required."
    );
  }

  return request(
    () =>
      api.get(
        `${ENDPOINTS.orders}/${id}`
      ),
    "Unable to load the laboratory order."
  );
};

/* Create a laboratory order.*/
const createLabOrder = async (
  payload
) => {
  if (!payload) {
    throw new Error(
      "Laboratory order data is required."
    );
  }

  return request(
    () =>
      api.post(
        ENDPOINTS.orders,
        payload
      ),
    "Unable to create the laboratory order."
  );
};

/* Update a laboratory order.*/
const updateLabOrder = async (
  id,
  payload
) => {
  if (!id) {
    throw new Error(
      "Laboratory order ID is required."
    );
  }

  if (!payload) {
    throw new Error(
      "Laboratory order data is required."
    );
  }

  return request(
    () =>
      api.put(
        `${ENDPOINTS.orders}/${id}`,
        payload
      ),
    "Unable to update the laboratory order."
  );
};

/* Delete a laboratory order. */
const deleteLabOrder = async (id) => {
  if (!id) {
    throw new Error(
      "Laboratory order ID is required."
    );
  }

  return request(
    () =>
      api.delete(
        `${ENDPOINTS.orders}/${id}`
      ),
    "Unable to delete the laboratory order."
  );
};

/* Cancel a laboratory order. */
const cancelLabOrder = async (
  id,
  payload = {}
) => {
  if (!id) {
    throw new Error(
      "Laboratory order ID is required."
    );
  }

  return request(
    () =>
      api.patch(
        `${ENDPOINTS.orders}/${id}/cancel`,
        payload
      ),
    "Unable to cancel the laboratory order."
  );
};

/* Laboratory Tests */

/*
 * Get laboratory tests.
 *
 * Supports:
 * - search
 * - status
 * - category
 * - specimenType
 * - page
 * - limit
 */
const getLabTests = async (
  params = {}
) => {
  return request(
    () =>
      api.get(ENDPOINTS.tests, {
        params: cleanParams(
          params
        ),
      }),
    "Unable to load laboratory tests."
  );
};

/* Get one laboratory test. */
const getLabTest = async (id) => {
  if (!id) {
    throw new Error(
      "Laboratory test ID is required."
    );
  }

  return request(
    () =>
      api.get(
        `${ENDPOINTS.tests}/${id}`
      ),
    "Unable to load the laboratory test."
  );
};

/* Create a laboratory test. */
const createLabTest = async (
  payload
) => {
  if (!payload) {
    throw new Error(
      "Laboratory test data is required."
    );
  }

  return request(
    () =>
      api.post(
        ENDPOINTS.tests,
        payload
      ),
    "Unable to create the laboratory test."
  );
};

/* Update a laboratory test. */
const updateLabTest = async (
  id,
  payload
) => {
  if (!id) {
    throw new Error(
      "Laboratory test ID is required."
    );
  }

  if (!payload) {
    throw new Error(
      "Laboratory test data is required."
    );
  }

  return request(
    () =>
      api.put(
        `${ENDPOINTS.tests}/${id}`,
        payload
      ),
    "Unable to update the laboratory test."
  );
};

/* Delete a laboratory test. */
const deleteLabTest = async (id) => {
  if (!id) {
    throw new Error(
      "Laboratory test ID is required."
    );
  }

  return request(
    () =>
      api.delete(
        `${ENDPOINTS.tests}/${id}`
      ),
    "Unable to delete the laboratory test."
  );
};

/* Activate a laboratory test. */
const activateLabTest = async (
  id
) => {
  if (!id) {
    throw new Error(
      "Laboratory test ID is required."
    );
  }

  return request(
    () =>
      api.patch(
        `${ENDPOINTS.tests}/${id}/activate`
      ),
    "Unable to activate the laboratory test."
  );
};

/* Deactivate a laboratory test. */
const deactivateLabTest = async (
  id
) => {
  if (!id) {
    throw new Error(
      "Laboratory test ID is required."
    );
  }

  return request(
    () =>
      api.patch(
        `${ENDPOINTS.tests}/${id}/deactivate`
      ),
    "Unable to deactivate the laboratory test."
  );
};

/* Laboratory Results */


/*
 * Get laboratory results.
 *
 * Supports:
 * - search
 * - status
 * - patientId
 * - doctorId
 * - labOrderId
 * - testId
 * - dateFrom
 * - dateTo
 * - page
 * - limit
 */
const getLabResults = async (
  params = {}
) => {
  return request(
    () =>
      api.get(ENDPOINTS.results, {
        params: cleanParams(
          params
        ),
      }),
    "Unable to load laboratory results."
  );
};

/* Get one laboratory result. */
const getLabResult = async (id) => {
  if (!id) {
    throw new Error(
      "Laboratory result ID is required."
    );
  }

  return request(
    () =>
      api.get(
        `${ENDPOINTS.results}/${id}`
      ),
    "Unable to load the laboratory result."
  );
};

/*
 * Get all results belonging to
 * one laboratory order.
 */
const getResultsByLabOrder =
  async (labOrderId) => {
    if (!labOrderId) {
      throw new Error(
        "Laboratory order ID is required."
      );
    }

    return request(
      () =>
        api.get(
          `${ENDPOINTS.orders}/${labOrderId}/results`
        ),
      "Unable to load results for the laboratory order."
    );
  };

/* Create a laboratory result. */
const createLabResult = async (
  payload
) => {
  if (!payload) {
    throw new Error(
      "Laboratory result data is required."
    );
  }

  return request(
    () =>
      api.post(
        ENDPOINTS.results,
        payload
      ),
    "Unable to create the laboratory result."
  );
};

/*Update a laboratory result. */
const updateLabResult = async (
  id,
  payload
) => {
  if (!id) {
    throw new Error(
      "Laboratory result ID is required."
    );
  }

  if (!payload) {
    throw new Error(
      "Laboratory result data is required."
    );
  }

  return request(
    () =>
      api.put(
        `${ENDPOINTS.results}/${id}`,
        payload
      ),
    "Unable to update the laboratory result."
  );
};

/* Delete a laboratory result. */
const deleteLabResult = async (id) => {
  if (!id) {
    throw new Error(
      "Laboratory result ID is required."
    );
  }

  return request(
    () =>
      api.delete(
        `${ENDPOINTS.results}/${id}`
      ),
    "Unable to delete the laboratory result."
  );
};

/*
 * Verify a laboratory result.
 *
 * verificationData can contain fields such as:
 * - verifiedBy
 * - verificationNotes
 * - comments
 */
const verifyLabResult = async (
  id,
  verificationData = {}
) => {
  if (!id) {
    throw new Error(
      "Laboratory result ID is required."
    );
  }

  return request(
    () =>
      api.patch(
        `${ENDPOINTS.results}/${id}/verify`,
        verificationData
      ),
    "Unable to verify the laboratory result."
  );
};

/* Reports */

/*
 * Get a laboratory report.
 *
 * The endpoint can be adjusted to match the
 * backend report implementation.
 */
const getLabReport = async (
  id,
  params = {}
) => {
  if (!id) {
    throw new Error(
      "Laboratory order ID is required."
    );
  }

  return request(
    () =>
      api.get(
        `${ENDPOINTS.orders}/${id}/report`,
        {
          params: cleanParams(
            params
          ),
        }
      ),
    "Unable to load the laboratory report."
  );
};

/* Generate a laboratory report. */
const generateLabReport = async (
  id,
  payload = {}
) => {
  if (!id) {
    throw new Error(
      "Laboratory order ID is required."
    );
  }

  return request(
    () =>
      api.post(
        `${ENDPOINTS.orders}/${id}/report`,
        payload
      ),
    "Unable to generate the laboratory report."
  );
};

/*
 * Download a laboratory report.
 *
 * Returns the Axios response containing
 * the Blob/file data.
 */
const downloadLabReport = async (
  id,
  params = {}
) => {
  if (!id) {
    throw new Error(
      "Laboratory order ID is required."
    );
  }

  return request(
    () =>
      api.get(
        `${ENDPOINTS.orders}/${id}/report/download`,
        {
          params: cleanParams(
            params
          ),
          responseType: "blob",
        }
      ),
    "Unable to download the laboratory report."
  );
};

/* Statistics / Dashboard */


/**
 * Get laboratory dashboard statistics.
 */
const getLabStatistics =
  async (params = {}) => {
    return request(
      () =>
        api.get(
          "/laboratory/statistics",
          {
            params: cleanParams(
              params
            ),
          }
        ),
      "Unable to load laboratory statistics."
    );
  };

/* Service Object */

const laboratoryService = {
  /* Orders */

  getLabOrders,
  getLabOrder,
  createLabOrder,
  updateLabOrder,
  deleteLabOrder,
  cancelLabOrder,

  /* Tests */

  getLabTests,
  getLabTest,
  createLabTest,
  updateLabTest,
  deleteLabTest,
  activateLabTest,
  deactivateLabTest,

  /* Results */

  getLabResults,
  getLabResult,
  getResultsByLabOrder,
  createLabResult,
  updateLabResult,
  deleteLabResult,
  verifyLabResult,

  /* Reports */

  getLabReport,
  generateLabReport,
  downloadLabReport,

  /* Statistics */

  getLabStatistics,
};

export default laboratoryService;
