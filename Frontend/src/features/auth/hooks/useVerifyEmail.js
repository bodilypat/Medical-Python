/* *********************************************** */
/* File: src/features/auth/hooks/useVerifyEmail.js */ 
/* *********************************************** */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

const useVerifyEmail = () => {
    const navigate = useNavigate();
    const { token } = useParams();

    const verifyEmail = useAuthStore(
        (state) => state.verifyEmail
    );

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const verify = async () => {
            if (!token) {
                if(isMounted) {
                    setError("Invalid or missing vefication token.");
                    setLoading(false);
                }
                return;
            }

            try {
                const response = await verifyEmail(token);

                if (isMounted) {
                    setSuccess(
                        response?.message ||
                        "Your emal has been verified successfully."
                    );
                }
            } catch (err) {
                if (isMounted) {
                    setError(
                        err?.message || "Email verification failed."
                    );
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        verify();

        return () => {
            isMounted = false;
        };
    }, [token, verifyEmail]);

    const goToLogin = () => {
        navigate("/logi", {
            replace: true,
            state: {
                message: "Email verified successfully. Please sign in.",
            },
        });
    };

    return {
        loading,
        success,
        error,
        goToLogin,
    };
};

