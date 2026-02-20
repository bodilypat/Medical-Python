-- PostgreSQL Script for Python --
-- Create Database (Run Separately if needed)
-- CREATE DATABASE medical_management;
-- Connect to database 
-- \v medical_management;

-- 1. Users (Admin / Staff / Doctor Login)
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'staff', 'doctor')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Patients
CREATE TABLE patients (
    patient_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
    date_of_birth DATE,
    contact_number VARCHAR(15),
    email VARCHAR(100),
    address TEXT,
    blood_group VARCHAR(3) CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- 3. Doctors
CREATE TABLE doctors (
    doctor_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    specialization VARCHAR(100),
    phone_number VARCHAR(15),
    email VARCHAR(100),
    consultation_fee DECIMAL(10, 2),
    joined_at DATE,
);

-- 4. Appointments
CREATE TABLE appointments (
    appointment_id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL, 
    appointment_date TIMESTAMP NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR(20) CHECK (status IN ('scheduled', 'completed', 'cancelled')) DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_patient 
        FOREIGN KEY (patient_id) 
            REFERENCES patients(patient_id) 
            ON DELETE CASCADE,
    CONSTRAINT fk_doctor 
        FOREIGN KEY (doctor_id) 
            REFERENCES doctors(doctor_id) 
            ON DELETE CASCADE,
);

-- 5. Medical Records
CREATE TABLE medical_records (
    record_id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    diagnosis TEXT,
    treatment TEXT,
    prescription TEXT,
    notes TEXT,
    visit_date DATE,
    CONSTRAINT fk_patient_record 
        FOREIGN KEY (patient_id) 
            REFERENCES patients(patient_id) 
            ON DELETE CASCADE,
    CONSTRAINT fk_doctor_record 
        FOREIGN KEY (doctor_id) 
            REFERENCES doctors(doctor_id) 
            ON DELETE CASCADE,
);

-- 6. Billing
CREATE TABLE billing (
    bill_id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL,
    appointment_id INT,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_status VARCHAR(20) CHECK (payment_status IN ('paid', 'unpaid', 'pending')) DEFAULT 'pending',
    payment_method VARCHAR(20) CHECK (payment_method IN ('cash', 'card', 'insurance')),
    billing_date DATE,
    CONSTRAINT fk_patient_bill 
        FOREIGN KEY (patient_id) 
            REFERENCES patients(patient_id) 
            ON DELETE CASCADE,
    CONSTRAINT fk_appointment_bill 
        FOREIGN KEY (appointment_id) 
            REFERENCES appointments(appointment_id) 
            ON DELETE CASCADE,
            ON DELETE CASCADE,
);

-- 7. Medicines 
CREATE TABLE medicines (
    medicine_id SERIAL PRIMARY KEY,
    medicine_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    description TEXT,
    price DECIMAL(10, 2),
    stock_quantity INT,
    expiry_date DATE,
);

-- 8. Prescriptions
CREATE TABLE prescriptions (
    prescription_id SERIAL PRIMARY KEY,
    record_id INT NOT NULL,
    medicine_id INT NOT NULL,
    dosage VARCHAR(100),
    frequency VARCHAR(100),
    duration VARCHAR(10),
    instructions TEXT,
    CONSTRAINT fk_record_prescription 
        FOREIGN KEY (record_id) 
            REFERENCES medical_records(record_id) 
            ON DELETE CASCADE,
    CONSTRAINT fk_medicine_prescription 
        FOREIGN KEY (medicine_id) 
            REFERENCES medicines(medicine_id) 
            ON DELETE CASCADE,
);



