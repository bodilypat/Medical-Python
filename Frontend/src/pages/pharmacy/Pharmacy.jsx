//src/pages/pharmacy/Pharmacy.jsx 

import React, { useState, useEffect } from 'react';
import Table from '../../components/table';
import Modal from '../../components/modal';
import {
    getMedicines,
    addMedicine,
    updateMedicine,
    deleteMedicine
} from '../../services/pharmacyService';
import './Pharmacy.css';

const Pharmacy = () => {
    const [medicines, setMedicines] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMedicine, setEditMedicine] = useState(null);

    // Fetch medicines from API
    const fetchMedicines = async () => {
        try {
            const response = await getMedicines();
            setMedicines(response.data);
        } catch (error) {
            console.error('Error fetching medicines:', error);
        }
    };

    useEffect(() => {
        fetchMedicines();
    }, []);

    // Add or update Medicine
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const medicineData = {
            name: form.name.value,
            quantity: form.quantity.value,
            price: form.price.value,
            expiry_date: form.expiry_date.value
        };

        try {
            if (editMedicine) {
                await updateMedicine(editMedicine.id, medicineData);
            } else {
                await addMedicine(medicineData);
            }
            setShowModal(false);
            setEditMedicine(null);
            fetchMedicines(); // Refresh the list of medicines
        } catch (error) {
            console.error('Error adding/updating medicine:', error);
        }
    };

    // Delete Medicine
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this medicine?')) {
            try {
                await deleteMedicine(id);
                fetchMedicines(); // Refresh the list of medicines
            } catch (error) {
                console.error('Error deleting medicine:', error);
            }
        }
    };

    const columns = [
        "name",
        "quantity",
        "price",
        "expiry_date"
    ];

    const actions = [
        {           
            label: 'Edit',
            onClick: (medicine) => {
                setEditMedicine(medicine);
                setShowModal(true);
            }
        },
        {
            label: 'Delete',
            onClick: (medicine) => handleDelete(medicine.id)
        }
    ];

    return (
        <div className="pharmacy-container">
            <h1>Pharmacy Management</h1>
            <button 
                className="add-medicine-btn"
                onClick={() => {
                    setEditMedicine(null);
                    setShowModal(true);
                }}
            >
                Add Medicine
            </button>
            <Table
                data={medicines}
                columns={columns}
                actions={actions}
            />
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <h2>{editMedicine ? 'Edit Medicine' : 'Add Medicine'}</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                defaultValue={editMedicine ? editMedicine.name : ''}
                                required
                            />
                        </label>
                        <label>
                            Quantity:
                            <input
                                type="number"
                                name="quantity"
                                defaultValue={editMedicine ? editMedicine.quantity : ''}
                                required
                            />
                        </label>
                        <label>
                            Price:
                            <input
                                type="number"
                                name="price"
                                defaultValue={editMedicine ? editMedicine.price : ''}
                                required
                            />
                        </label>
                        <label>
                            Expiry Date:
                            <input
                                type="date"
                                name="expiry_date"
                                defaultValue={editMedicine ? editMedicine.expiry_date : ''}
                                required
                            />
                        </label>
                        <button type="submit">{editMedicine ? 'Update' : 'Add'}</button>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default Pharmacy;
