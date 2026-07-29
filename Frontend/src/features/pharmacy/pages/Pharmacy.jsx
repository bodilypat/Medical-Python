/* ********************************************** */
/* File: src/features/pharmacy/pages/Pharmacy.jsx */
/* ********************************************** */
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
    MedicineTable,
    MediciineSearch,
    MedicineFilter,
    MedicineCard,
    LowStockAlert,
    StockBadge,
} from "../components";

import {
    useMedicines,
} from "../hooks";

const Pharmacy = () => {
    const navigate = useNavigate();

    const {
        medicines,
        loading,
        error,
        search,
        fitlers,
        setSearch,
        setFilters,
        clearSearch,
        clearFilters,
        fetchMedicines,
    } = useMedicines();

    /* ---------------------------- */
    /* Dashboard Statistics         */
    /* ---------------------------- */
    const statistics = useMemo(() => {

        const total = medicines.length;

        const available = medicines.filter(
            (medicine) => medicine.stock_quantity > 0 
        ).length;

        const lowStock = medicines.filter(
            (medicine) => 
                medicine.stock_quantity <= medicine.minimum_stock 
        ).length;

        const expired = medicines.filter(
            (medicine) => medicine.expiry_status === "expired "
        ).length;

        return {
            total, 
            available,
            lowStock,
            expired,
        };
    }, [medicines]);

    /* ---------------------------------- */
    /* View medicine details              */
    /* ---------------------------------- */
    const handleView = (
        medicine 
    ) => {
        navigate(
            `/pharmacy/${medicine.id}`
        );
    };

    /* ---------------------------------- */
    /* Edit medicine                      */
    /* ---------------------------------- */
    const handleEdit = (
        medicine 
    ) => {
        navigate(
            `/pharmacy/${medicine.id}/edit`
        );
    };

    /* ---------------------------------- */
    /* Create medicine                    */
    /* ---------------------------------- */
    const handleCreate = () => {
        navigate(
            "/pharmacy/create"
        );
    };

    /* ---------------------------------- */
    /* Inventory page                     */
    /* ---------------------------------- */
    const handleInventory = () => {
        navigate(
            "/pharmacy/inventory"
        );
    };

    /* ---------------------------------- */
    /* Purchase order                     */
    /* ---------------------------------- */
    const handlePurchaseOrders = () => {
        navigate(
            "/pharmacy/purchase-ordeer"
        );
    };

    return (
        <div className="pharmacy-page">

            <header className="page-header">
                <div>
                    <h1>Pharmacy Dashboard</h1>

                    <p>Manage medicine, inventory, and stock levels.</p>
                </div>

                <div className="page-actions">

                    <button 
                        type="button"
                        className="btn btn-secondary"
                        onClick={
                            handleInventory 
                        }
                    >
                        Inventory
                    </button>

                    <button 
                        type="button"
                        className="btn btn-secondary"
                        onClick={
                            handlePurchaseOrders
                        }
                    >
                        Purchase Orders
                    </button>

                    <button 
                        type="button"
                        className="btn btn-primary"
                        onClick={
                            handleCreate 
                        }
                    >

                        + Add Medicine 
                    </button>
                </div>
            </header>

            <section className="pharmacy-summary">

                <div className="summary-card">
                    <h3>Total Medicine</h3>

                    <strong>
                        { statistics.total }
                    </strong>
                </div>

                <div className="summary-card">
                    <h3>Available</h3>

                    <strong>
                        {statistics.available }
                    </strong>
                </div>

                <div className="summary-card warning">
                    <h3>Low Stock</h3>

                    <strong>
                        {statistics.lowStock }
                    </strong>
                </div>

                <div className="summary-card danger">
                    <h3>Expired</h3>

                    <strong>
                        {statistics.expired }
                    </strong>
                </div>

            </section>

            <section className="page-toolbar">

                <MedicineSearch 
                    value={ search }
                    onChange={ setSearch }
                    onClear={ clearSearch }
                />

                <MedicineFilter 
                    filter={ filters}
                    onChange={ setFilters }
                    onClear={ clearFilters }
                />

            </section>

            <section className="inventory-alerts">

                <LowStockAlert 
                    medicines={
                        medicines.filter(
                            (medicine) => 
                                medicine.stock_quantity <= medicine.minimum_stock 
                        )
                    }

                    onClick={ handleInventory }
                />

            </section>

            {loading && (
                <div className="loading-state">
                    Loading medicines...  
                </div>
            )}

            {error && (
                <div className="error-state">
                    <h3> Unable to load pharmacy data </h3>

                    <p>
                        {
                            error.message ?? 
                            "Something went wrong."
                        }
                    </p>

                    <button 
                        type="button"
                        onClick={ fetchMedicine }
                    >
                        Retry
                    </button>
                </div>
            )}

            {!loading && !error && (
                <>
                
                {/* Desktop View */}
                <div className="desktop-view">

                    <MedicineTable 
                        medicines={ medicines }
                        onView={ handleView }
                        onEdit= { handleEdit }
                    />

                </div>

                {/* Mobile View */}
                <div className="mobile-view">

                    { medicines.map((
                        medicine 
                    ) => (

                        <MedicineCard 
                            key={ medicine.id }
                            medicine= { medicine }
                            status={
                                <StockBadge 
                                    quantity={
                                        medicine.stock_quantity
                                    }
                                />
                            }
                            onClick={() => 
                                handleView(
                                    medicine 
                                )
                            }
                        />

                    ))}
                </div>
                </>
            )}
        </div>
    );
};

export default Pharmacy;


