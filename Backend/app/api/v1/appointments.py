#File: app/api/v1/appointments.py

from uuid import UUID
from datetime import date 

from fastapi import APIRouter, Depends, Path, Query, status

from app.core.dependencies import get_current_user 
from app.schemas.appointment import (
    AppointmentCreate,
    AppointmentUpdate,
    AppointmentResponse,
    AppointmentListResponse,
    AppointmentStatusUpdate,
    AppointmentReschedule,
)

from app.services.apppointment_service import AppointmentService 

router = APIRouter()

@router.post(
    "/",
    response_model=AppointmentResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create Appointment",
)
async def create_appointment(
    payload: AppointmentCreate,
    current_user=Depends(get_current_user),
):
    return await AppointmentService.create_appointment(payload)

@router.get(
    "/",
    response_model=AppointmentListResponse,
    summary="gt Appointments",
)
async def get_appointments(
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    patient_id: UUID | None = Query(None),
    doctor_id: UUID | None = Query(None),
    appointment_date: date | None = Query(None),
    status_filter: str | None = Query(None, alias="status"),
    current_user=Depends(get_current_user),
):
    return await AppointmentService.get_appointments(
        page=page,
        size=size,
        patient_id=patient_id,
        doctor_id=doctor_id,
        appointment_date=appointment_date,
        status=status_filter,
    )

@router.get(
    "/{appointment_id}",
    response_model=AppointmentResponse,
    summary="Get Appointment",
)
async def get_appointment(
    appointment_id: UUID = Path(...),
    current_user=Depends(get_current_user),
):
    return await AppointmentService.get_appointment(appointment_id)

@router.put(
    "/{appointment_id}",
    response_model=AppointmentResponse,
    summary="Update Appointment",
)
async def update_appointment(
    appointment_id: UUID,
    payload: AppointmentUpdate,
    current_user=Depends(get_current_user)
):
    return await AppointmentService.update_appointment(
        appointment_id,
        payload,
    )

@router.patch(
    "/{apppointment_id}/status",
    response_model=AppointmentResponse,
    summary="Update Appointment Status",
)
async def update_status(
    appointment_id: UUID,
    payload: AppointmentStatusUpdate,
    current_user=Depends(get_current_user),
):
    return await AppointmentService.update_status(
        appointment_id,
        payload.status,
    )

@router.patch(
    "/{appointment_id}/reschedule",
    response_model=AppointmentResponse,
    summary="Reschedule Appointment",
)
async def reschedule_appointment(
    appointment_id: UUID,
    payload: AppointmentReschedule,
    current_user=Depends(get_current_user)
):
    return await AppointmentService.reschedule(
        appointment_id,
        payload,
    )

@router.delete(
    "/{appointment_id}",
    status_code=status.HTTP_204_CONTENT,
    summary="Cancel Appointment",
)
async def cancel_appointment(
    appointment_id: UUID,
    current_user=Depends(get_current_user),
):
    await AppointmentService.cancel_appointment(
        appointment_id
    )

@router.get(
    "/doctor/{doctor_id}",
    response_model=AppointmentListResponse,
    summary="Doctor Appointments",
)
async def get_doctor_appointments(
    doctor_id: UUID,
    page: int = Query(1, ge=1),
    size: int = Query(1, ge=1, le=100),
    current_user=Depends(get_current_user)
):
    return await AppointmentService.get_doctor_appointments(
        doctor_id=doctor_id,
        page=page,
        size=size,
    )

@router.get(
    "/patient/{patient_id}",
    response_model=AppointmentListResponse,
    summary="Patient Appointments",
)
async def get_patient_appointments(
    patient_id: UUID,
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    current_user=Depends(get_current_user),
):
    return await AppointmentService.get_patient_appointments(
        patient_id=patient_id,
        page=page,
        size=size,
    )

@router.get(
    "/calendar/{doctor_id}",
    summary="Doctor Calendar",
)
async def doctor_calendar(
    doctor_id: UUID,
    start_date: date = Query(...),
    end_date: date = Query(...),
    current_user=Depends(get_current_user),
):
    return await AppointmentService.get_calendar(
        doctor_id=doctor_id,
        start_date=start_date,
        end_date=end_date,
    )

@router.get(
    "/today",
    response_model=AppointmentListResponse,
    summary="Today's Appointments",
)
async def today_appointments(
    current_user=Depends(get_current_user),
):
    return await AppointmentService.get_today_appointments()