# app/v1/routes/appointments.py 

from typing import List 

from fastapi import (
    APIRouter, 
    Depends, 
    HTTPException, 
    status,
    BackgroundTasks,
)
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.appointment import (
    AppointmentCreate,
    AppointmentResponse,
    AppointmentUpdate,
    AppointmentFilter,
    AppointmentStatusUpdate,
)
from app.services import appointment_service as AppointmentService
from app.core.dependencies import get_current_user,require_roles 
from app.core.constants import UserRoles

router = APIRouter(
    prefix="/appointments",
    tags=["Appointments"],
)   

#-------------------------------------
# Book an Appointment (Patient)
#-------------------------------------
@router.post(
    "/",
    response_model=AppointmentResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_roles([UserRoles.PATIENT]))],
    summary="Book an Appointment",
    description="Allows a patient to book a new appointment.",
)
def book_appointment(
    appointment: AppointmentCreate,
    background_tasks: BackgroundTasks = None,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    try:
        new_appointment = AppointmentService.create_appointment(
            db=db,
            appointment=appointment,
            patient_id=current_user.id,
            background_tasks=background_tasks,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    
    # Scheduling remainder email (non-blocking)
    background_tasks.add_task(
        Appointment_service.send_appointment_remainder,
        new_appointment.id,
    )
    return new_appointment

#-------------------------------------
# Update Appointment Status (Doctor)
#-------------------------------------
@router.put(
    "/{appointment_id}/status",
    response_model=AppointmentResponse,
    dependencies=[Depends(require_roles([UserRoles.DOCTOR]))],
    summary="Update Appointment Status",
    description="Allows a doctor to update the status of an appointment.",
)
def update_appointment_status(
    appointment_id: int,
    status_update: AppointmentStatusUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    appointment = AppointmentService.update_appointment_status(
        db=db,
        appointment_id=appointment_id,
        doctor_id=current_user.id,
        status=status_update.status,
    )

    if appointment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found or access denied.",
        )
    return appointment

#-------------------------------------
# Reschedule or Cancel Appointment (Patient)
#-------------------------------------
@router.put(
    "/{appointment_id}",
    response_model=AppointmentResponse,
    dependencies=[Depends(require_roles([UserRoles.PATIENT]))],
    summary="Reschedule or Cancel Appointment",
    description="Allows a patient to reschedule or cancel an appointment.",
)
def reschedule_or_cancel_appointment(
    appointment_id: int,
    appointment__update: AppointmentUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    appointment = AppointmentService.reschedule_or_cancel_appointment(
        db=db,
        appointment_id=appointment_id,
        update_data=appointment_update,
        patient_id=current_user.id,
    )
    if appointment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found or access denied.",
        )
    return appointment

#-------------------------------------
# Cancel Appointment (Patient)
#-------------------------------------
@router.delete(
    "/{appointment_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_roles([UserRoles.PATIENT]))],
    summary="Cancel Appointment",
    description="Allows a patient to cancel an appointment.",
)
def cancel_appointment(
    appointment_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    success = AppointmentService.cancel_appointment(
        db=db,
        appointment_id=appointment_id,
        patient_id=current_user.id,
    )
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found or access denied.",
        )
    return None

#-------------------------------------
# Get Appointments (Patient & Doctor)
#-------------------------------------
@router.get(
    "/",
    response_model=List[AppointmentResponse],
    summary="Get Appointments",
    description="Retrieve a list of appointments for the current user with optional filters.",
)
def get_appointments(
    filters: AppointmentFilter = Depends(),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    appointments = AppointmentService.get_appointments(
        db=db,
        user_id=current_user.id,
        user_role=current_user.role,
        filters=filters,
    )
    return appointments
#-------------------------------------
# Get Appointment Details (Patient & Doctor)
@router.get(
    "/{appointment_id}",
    response_model=AppointmentResponse,
    summary="Get Appointment Details",
    description="Retrieve details of a specific appointment.",
)   
def get_appointment_details(
    appointment_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    appointment = AppointmentService.get_appointment_details(
        db=db,
        appointment_id=appointment_id,
        user_id=current_user.id,
        user_role=current_user.role,
    )
    if appointment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found or access denied.",
        )
    return appointment

#-------------------------------------
# Calendar-Based Time Slots 
#-------------------------------------
@router.get(
    "/available-slots/",
    response_model=List[str],
    summary="Get Available Time Slots",
    description="Retrieve available time slots for booking appointments based on calendar data.",
)
def get_available_time_slots(
    date: str,
    db: Session = Depends(get_db),
):
    try:
        available_slots = AppointmentService.get_available_time_slots(
            db=db,
            date=date,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    return available_slots

