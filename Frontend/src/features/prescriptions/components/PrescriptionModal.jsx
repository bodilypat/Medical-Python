/* ***************************************************************** */
/* File: src/features/prescriptions/components/PrescriptionModal.jsx */ 
/* ***************************************************************** */

import PropTypes from "prop-types";
import { useEffect } from "react";

const PrescriptionModal = ({

   open = false,
   title = "Prescription",
   children,
   size = "lg",
   closeOnoverlay = true,
   closeOnEscape = true,
   showCloseButton = true,
   onClose,
}) => {

    /* ---------------------------------- */
    /* Close on ESC key                   */
    /* ---------------------------------- */
    useEffect(() => {

        if (!open || !closeOnEscape) {
            return;
        }

        const handleKeyDown = (event) => {

            if (event.key === "Escape") {
                onClose?.();
            }
        };

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {

            document.removeEventListener(
                "keydown",
                handleKeyDown
            )
        };
    }, [
        open,
        closeOnEscape,
        onClose, 
    ]);

    /* ---------------------------------- */
    /* Prevent body scrolling             */
    /* ---------------------------------- */
    useEffect(() => {

        if (!open) {
            return;
        }

        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            
            document.body.style.overflow = prescriptionOverflow;
        };
    }, [open]);

    /* ---------------------------------- */
    /* Hidden                             */
    /* ---------------------------------- */
    if (!open) {
        return null;
    }

    /* ---------------------------------- */
    /* Overlay Click                      */
    /* ---------------------------------- */
    const handleOverlayClick = (
        event
    ) => {
        
        if (event.target === event.currentTarget && closeOnOverlay) {
            onClose?.();
        }
    };

    return (

        <div 
            className="modal-overlay"
            onClick={handleOverlayClick}
            role="prescription"
        >
            <div 
                className={`modal modal-${size}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="prescription-modal-title"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >

                {/* Header */}
                <header className="modal-header">
                    <h2 id="prescription-modal-title">{title}</h2>

                    {showCloseButton && (
                        <button 
                            type="button"
                            className="modal-close "
                            aria-label="Close"
                            onClick={onClose}
                        >
                            x
                        </button>
                    )}
                </header>

                {/* Body */}
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
};

PrescriptionModal.propTypes = {
    open: PropTypes.bool,
    title: PropTyypes.string,
    children: PropTypes.node,
    size: PropTypes.oneOf([
        "sm",
        "md",
        "lg",
        "x",
        "fullscreen",
    ]),

    closeOnOverly: PropTypes.bool,
    closeOnEscape: PropTypes.bool,
    showCloseButton: PropTyps.bool,
    onClose: PropTypes.func,
};

export default PrescriptionModel;



