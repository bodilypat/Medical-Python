/* ***************************************************** */
/* File: src/features/pharmacy/pages/MedicineDetails.jsx */
/* ***************************************************** */
import { useNavigate, useParams } from "react-router-dom";

import {
    MedicineProfile,
    StockBadge,
    StockTransactions,
    SupplierCard,
} from "../components";

import {
    useMedicine,
} from "../hooks";

const MedicineDetails = () => {
    const navigate = useNavigate();

    const { medicineId } = useParams();

    const {
        medicine,
        loading,
        error,
        refreshMedicine,
        removeMedicine,
    } = useMedicine(medicineId);

    /* ---------------------------------- */
    /* Edit medicine                      */
    /* ---------------------------------- */
    const handleEdit = () => {
        navigate(
            `/pharmacy/${medicineId}/adjust-stock`
        );
    };

    /* ---------------------------------- */
    /* Stock adjustment                   */
    /* ---------------------------------- */
    const handleAdjustStock = () => {
        navigate(
            `/pharmacy/${medicineId}/adjust-stock`
        );
    };

    /* ---------------------------------- */
    /* Dispense medicine                  */
    /* ---------------------------------- */
    const handleDispense = () => {
        navigate(
            `/pharmacy/dispense?medicine=${medicineId}`
        );
    };

    /* ---------------------------------- */
    /* Delete medicine                    */
    /* ---------------------------------- */
    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this medicine?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await removeMedicine();

            navigate("/pharmacy", {
                replace: true,
            });
        } catch (error) {
            console.error(
                "Failed to delete medicine:",
                error  
            );
        }
    };

    if (loading) {
        return (
            <div className="medicine-details-page">
                <div className="loading-state">
                    Loading medicine... 
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="medicine-details-page">
                <div className="error-state">

                    <h3>Unable to load medicine</h3>

                    <p>{error.message ?? "Something went wrong."}</p>

                    <button 
                        type="button"
                        onClick={ refresMedicine }
                    >
                        Retry 
                    </button>
                </div>
            </div>
        );
    }

    if (!medicine) {
        return (
            <div className="medicine-details-page">
                <div className="empty-state">

                    <h3>Medicine not found</h3>

                    <button 
                        type="button"
                        onClick={() => 
                            navigate(
                                "/pharmacy"
                            )
                        }
                    >
                        Back to Pharmacy 
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="medicine-details-page">

            <header className="page-header">
                <div>
                    <h1>Medicine Details</h1>

                    <p>View medicine,
                       inventory, supplier, 
                       and stock information.
                    </p>
                </div>

                <div className="page-actions">
                    
                    <button 
                        type="button"
                        className="btn btn-secondary"
                        onClick={ handleAdjustStock }
                    >
                        Adjust Stock
                    </button>

                    <button 
                        type="button"
                        className="btn btn-secondary"
                        onClick={ handleDispense }
                    >
                        Disponse
                    </button>

                    <button 
                        type="button"
                        className="btn btn-primary"
                        onClick={ handleEdit }
                    >
                        Edit 
                    </button>

                    <button 
                        type="button"
                        clssName="btn btn-danger"
                        onClick={ handleDelete }
                    >
                        Delete
                    </button>
                </div>
            </header>

            <section className="medicine-summary">
                <div className="summary-card">

                    <h2>{medicine.name}</h2>

                    <p>{medicine.generic_name}</p>

                    <StockBadge 
                        quantity= { medicine.stock_quantity}
                        minimum= { medicine.minimum_stock }
                    />

                </div>
            </section>

            <section className="medicine-profile">

                <MedicineProfile 
                    medicine={ medicine }
                />

            </section>

            <section className="supplier-information">
                <div className="card">

                    <div className="card-header">
                        <h2>Supplier</h2>
                    </div>

                    <div className="card-body">

                        <SupplierCard
                            supplier={ medicine.supplier }
                        />

                    </div>

                </div>
            </section>

            <section className="inventory-information">
                <div className="card">

                    <div className="card-header">
                        <h2>Inventory</h2>

                        <div className="card-body">

                            <div className="info-grid">
                                <label>Batch Number</label>

                                <p>{ medicine.batch_number }</p>
                            </div>

                            <div>
                                <label>Stock</label>

                                <p>{ medicine.stock_quantity}</p>
                            </div>

                            <div>
                                <label>Unit Price</label>

                                <p>$ {medicine.unit_price}</p>
                            </div>

                            <div>
                                <label>Expiry Date</label>

                                <p>{ medicine.expiry_date }</p>
                            </div>

                            <div>
                                <label>Manufacturer</label>

                                <p>{ medicine.manufacturer }</p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <section className="stock-history">
                <div className="card">

                    <div className="card-header">
                        <h2>Stock Transactions</h2>
                    </div>

                    <div className="card-body">

                        <StockTransactions
                            transactions={ 
                                medicine.stock_transactions ?? []
                            }
                        />

                    </div>
                </div>

            </section>
        </div>
    );
};

export default MedicineDetails;


