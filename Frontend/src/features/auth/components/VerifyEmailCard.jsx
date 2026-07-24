/* ****************************************************** */
/* File: src/features/auth/components/VerifyEmailCard.jsx */ 
/* ****************************************************** */

import React from "react";
import { useVerifyEmail} from "../hoooks/useVerifyEmail";

const VerifyEmailCard = () => {
    const {
        loading,
        success,
        error,
        goToLogin,
    } = useVerifyEmail();

    return (
        <div className="verify-email-card">
            <h2>Email Verification</h2>

            {loading && (
                <p>Verify your email...</p>
            )}

            {success && (
                <>
                    <div className="success-message">
                        {success}
                    </div>
                    
                    <button onClick={goToLogin}>
                        Go to Login 
                    </button>
                </>
            )}

            {error && (
                <> 
                    <div className="error-message">
                        {error}
                    </div>
                    
                    <button onClick={goToLogin}>
                        Back to Login 
                    </button>
                </>
            )}
        </div>
    );
};

export default VerifyEmailCard;

