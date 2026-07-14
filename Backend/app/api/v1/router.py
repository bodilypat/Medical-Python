#File: app/api/v1/router.py

from fastapi import APIRouter

from .auth import router as auth_router 
from .patients import router as patient_router
from .doctors import router as doctor_router 
from .appointments import router as appointment_router
from .prescriptions import router as prescription_router 
from .pharmacy import router as pharmacy_router
from .billing import router as billing_router 
from .laboratory import router as laboratory_router 
from .reports import router as report_router
from .notification import router as notification_router 
from .settings import router as settings_router 
from .dashboard import router as dashboard_router 

api_router = APIRouter() 

api_router.include_router(auth_router, prefix="/auth", tags=["Authentication"])
api_router.include_router(patient_router, prefix="/patients", tags=["Patients"])
api_router.include_router(doctor_router, prefix="/doctors", tags=["Doctors"])
api_router.include_rotuer(appointment_router, prefix="/appointments", tags=["Appointments"])
api_router.include_router(prescription_router, prefix="/prescriptions", tags=["Prescriptions"])
api_router.include_router(pharmacy_router, prefix="/pharmacy", tags=["Pharmacy"])
api_router.include_router(billing_router, prefix="/billing", tags=["Billing"])
api_router.include_router(laboratory_router, prefix="/laboratory", tags=["Laboratory"])
api_router.include_router(report_router, prefix="/reports", tags=["Reports"])
api_router.include_router(notification_router, prefix="/notification", tags=["Notifications"])
api_router.include_router(settings_router, prefix="/settings", tags=["Settigns"])
api_router.include_router(dashboard_router, prefix="/dashboard", tags=["Dashboard"])


