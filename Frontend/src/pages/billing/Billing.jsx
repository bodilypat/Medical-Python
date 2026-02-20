//src/pages/billing/Billing.jsx

import React, { useState, useEffect } from 'react';
import Table from "../../components/table";
import Modal from "../../components/modal";
import {
    getBills,
    addBill,
    updateBill,
    deleteBill
} from "../../services/billingService";
import "./Billing.css";

const Billing = () => {
    const [bills, setBills] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentBill, setCurrentBill] = useState(null);

    // Fetch all bills 
    const fetchBills = async () => {
        try {
            const response = await getBills();
            setBills(response.data);
        } catch (error) {
            console.error("Error fetching bills:", error);
        }
    };

    useEffect(() => {
        fetchBills();
    }, []);

    // Add or Update Bill 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const billData = {
            patientId: form.patientId.value,
            amount: parseFloat(form.amount.value),
            billing_date: form.billingDate.value,
            status: form.status.value
        };

        try {
            if (editBill) {
                await updateBill(editBill.id, billData);
            } else {
                await addBill(billData);
            }
            setShowModal(false);
            setEditBill(null);
            fetchBills();
        } catch (error) {
            console.error("Error saving bill:", error);
        }
    };

    // Delete Bill
    const handleDelete = async (bill) => {
        if (window.confirm("Are you sure you want to delete this bill?")) {
            try {
                await deleteBill(bill.id);
                fetchBills();
            } catch (error) {
                console.error("Error deleting bill:", error);
            }
        }
    };

    const columns = [
        "Patient ID",
        "Amount",
        "Billing Date",
        "Status",
        "Actions"
    ];

    const actions = [
        {
            label: "Edit",
            onClick: (bill) => {
                setCurrentBill(bill);
                setShowModal(true);
            }
        },
        {
            label: "Delete",
            onClick: (bill) => handleDelete(bill)
        }
    ];

    return (
        <div className="billing-container">
            <h1>Billing Management</h1>
            <button onClick={() => setShowModal(true)}>Add Bill</button>
            <Table columns={columns} data={bills} actions={actions} />
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <h2>{currentBill ? "Edit Bill" : "Add Bill"}</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Patient ID:
                            <input
                                type="text"
                                name="patientId"
                                defaultValue={currentBill ? currentBill.patientId : ""}
                                required
                            />
                        </label>
                        <label>
                            Amount:
                            <input
                                type="number"
                                name="amount"
                                defaultValue={currentBill ? currentBill.amount : ""}
                                required
                            />
                        </label>
                        <label>
                            Billing Date:
                            <input
                                type="date"
                                name="billingDate"
                                defaultValue={currentBill ? currentBill.billing_date.split("T")[0] : ""}
                                required
                            />
                        </label>
                        <label>
                            Status:
                            <select name="status" defaultValue={currentBill ? currentBill.status : "Pending"} required>
                                <option value="Pending">Pending</option>
                                <option value="Paid">Paid</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </label>
                        <button type="submit">{currentBill ? "Update" : "Add"}</button>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default Billing;


