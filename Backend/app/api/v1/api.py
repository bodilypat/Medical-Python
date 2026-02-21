# app/api/v1/api_router.py

from fastapi import APIRouter

from app.api.v1.routes import (
    auth,
    users,
    roles,
    patients,
    doctors,
    appointments,
    medical_records,
    prescriptions,
    billing,
    reports,
)

#---------------------------------------
# API Router (V1)
#---------------------------------------
api_router = APIRouter()

#---------------------------------------
# Authentication & Authorization
#---------------------------------------
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])

#---------------------------------------
# User and Role Management
#---------------------------------------
api_router.include_router(roles.router, prefix="/roles", tags=["Roles"])    
api_router.include_router(users.router, prefix="/users", tags=["Users"])

#---------------------------------------
# Core Medical Modules
#---------------------------------------
api_router.include_router(patients.router, prefix="/patients", tags=["Patients"])

api_router.include_router(doctors.router, prefix="/doctors", tags=["Doctors"])

api_router.include_router(appointments.router, prefix="/appointments", tags=["Appointments"])

api_router.include_router(medical_records.router, prefix="/medical-records", tags=["Medical Records"])

api_router.include_router(prescriptions.router, prefix="/prescriptions", tags=["Prescriptions"])

#---------------------------------------
# Billing and Reports
#---------------------------------------
api_router.include_router(billing.router, prefix="/billing", tags=["Billing"])

api_router.include_router(reports.router, prefix="/reports", tags=["Reports"])

