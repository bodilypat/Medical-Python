#app/api/v1/endpoints/appointments.py

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from types import List,  Optional
from datetime import datetime

from app.api.v1.deps import get_current_user, require_role
from app.core.database import get_db
from app.schemas.appointments import AppointmentCreate, AppointmentUpdate, AppointmmentResponse
from app.models import User
from app.services.appointment_service import AppointmentService

router = APIRouter()

# Create Appointment (Staff / Admin)
@router.post(
    "/",
    response_model=AppointmmentResponse,
    status_code=status.HTTP_201_CREATED
)
def create_appointment(
    appointment: AppointmentCreate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    require_role(current_user, ["admin", "staff"])
    
    # Validate appointment time
    if appointment.appointment_time < datetime.now():
        raise HTTPException(status_code=400, detail="Appointment time must be in the future")
    
    new_appointment = AppointmentService.create_appointment(db, appointment)
    return new_appointment

# Get All Appointments (Authenticated Users)
@router.get(
    "/",
    response_model=List[AppointmmentResponse]
)
def get_appointments(
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user),
    skip: int = 0, 
    limit: int = Query(10, le=100)
):
    if current_user.role == "doctor":
        appointments = AppointmentService.get_appointments_by_doctor(db, current_user.user_id, skip, limit)
    elif current_user.role == "staff":
        appointments = AppointmentService.get_appointments_by_patient(db, current_user.user_id, skip, limit)
    else:
        appointments = AppointmentService.get_all_appointments(db, skip, limit)
    
    return appointments


# Get Appointment By ID
@router.get(
    "/{appointment_id}", 
    response_model=AppointmmentResponse
)
def get_appointment(
    appointment_id: int, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    appointment = AppointmentService.get_appointment_by_id(db, appointment_id)
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    # Authorization check
    if current_user.role == "doctor" and appointment.doctor_id != current_user.user_id:
        raise HTTPException(status_code=403, detail="Not authorized to view this appointment")
    if current_user.role == "staff" and appointment.patient_id != current_user.user_id:
        raise HTTPException(status_code=403, detail="Not authorized to view this appointment")
    
    return appointment


# Update Appointment (Staff / Admin)
@router.put(
    "/{appointment_id}", 
    response_model=AppointmmentResponse
)
def update_appointment(
    appointment_id: int, 
    appointment_update: AppointmentUpdate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    require_role(current_user, ["admin", "staff"])
    
    appointment = AppointmentService.get_appointment_by_id(db, appointment_id)
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    # Validate new appointment time
    if appointment_update.appointment_time and appointment_update.appointment_time < datetime.now():
        raise HTTPException(status_code=400, detail="Appointment time must be in the future")
    
    updated_appointment = AppointmentService.update_appointment(db, appointment, appointment_update)
    return updated_appointment

# Delete Appointment (Admin Only)
@router.delete(
    "/{appointment_id}", 
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_appointment(
    appointment_id: int, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    require_role(current_user, ["admin"])
    
    appointment = AppointmentService.get_appointment_by_id(db, appointment_id)
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    AppointmentService.delete_appointment(db, appointment)
    return None

