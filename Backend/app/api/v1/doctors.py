#File: app/api/v1/doctors.py 

from uuid import UUID

from fastapi import APIRouter, Depends, Path, Query, status 

from app.core.dependencies import get_current_user 
from app.schemas.doctor import (
    DoctorCreate,
    DoctorUpdate,
    DoctorResponse,
    DoctorListResponse,
    DoctorStatusUpdate,
    DoctorAvailabilityUpdate,
)
from app.sevices.doctor_service import DoctorService

router = APIRouter() 

@router.post(
    "/",
    response_model=DoctorResponse,
    status_code=status.HTTP_201_CREATE,
    summary="Create Doctor",
)
async def create_doctor(
    payload: DoctorCreate,
    current_user=Depends(get_current_user),
):
    return await DoctorService.create_doctor(payload)

@router.get(
    "/",
    response_model=DoctorListResponse,
    summary="Get Doctors",
)
async def get_doctors(
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    search: str | None = Query(None),
    specialization: str | None = Query(None),
    department: str | None = Query(None),
    available: bool | None = Query(None),
    current_user=Depends(get_current_user),
):
    return await DoctorService.get_doctors(
        page=page,
        size=size,
        search=search,
        specialization=specialization,
        department=department,
        available=available,
    )

@router.get(
    "/{doctor_id}",
    response_model=DoctorResponse,
    summary="Get Doctor",
)
async def get_doctor(
    doctor_id: UUID = Path(...),
    current_user=Depends(get_current_user),
):
    return await DoctorService.get_doctor(doctor_id)


@router.put(
    "/{doctor_id}",
    response_model=DoctorResponse,
    summary="Update Doctor",
)
async def update_doctor(
    doctor_id: UUID,
    payload: DoctorUpdate,
    current_user=Depends(get_current_user),
):
    return await DoctorService.update_doctor(
        doctor_id,
        payload,
    )

@router.patch(
    "/{doctor_id}/status",
    response_model=DoctorResponse,
    summary="Update Doctor Status",
)
async def update_doctor_status(
    doctor_id: UUID,
    payload: DoctorStatusUpdate,
    current_user=Depends(get_current_user)
):
    return await DoctorService.update_status(
        doctor_id,
        payload.status,
    )

@router.patch(
    "/{doctor_id}/availability",
    response_model=DoctorResponse,
    summary="Updatew Doctor Availability",
)
async def update_availability(
    doctor_id: UUID,
    payload: DoctorAvailabilityUpdate,
    current_user=Depends(get_current_user)
):
    return await DoctorService.update_availability(
        doctor_id,
        payload,
    )

@router.delete(
    "/{doctor_id}",
    status_code=status.HTTP_204_CONTENT,
    summary="Delete Doctor",
)
async def delete_doctor(
    doctor_id: UUID,
    current_user=Depends(get_current_user),
):
    await DoctorService.delete_doctor(doctor_id)

@router.get(
    "/{doctor_id}/appointment",
    summary="Doctor Appointment",
)
async def get_doctor_appointments(
    doctor_id: UUID,
    page: int = Query(1, ge=1),
    size: int = Query(10, get=1, le=100),
    get_current_user=Depends(get_current_user),
):
    return await DoctorService.get_appointments(
        doctor_id=doctor_id,
        page=page,
        size=size,
    )

@router.get(
    "/{doctor_id}/patients",
    summary="Doctor Patients",
)
async def get_doctor_patients(
    doctor_id: UUID,
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    current_user=Depends(get_current_user),
):
    return await DoctorService.get_patients(
        doctor_id=doctor_id,
        page=page,
        size=size,
    )

@router.get(
    "/{doctor_id}/schedule",
    summary="Doctor Schedule",
)
async def get_doctor_schedule(
    doctor_id: UUID,
    current_user=Depends(get_current_user),
):
    return await DoctorService.get_schedule(doctor_id)

@router.put(
    "/{doctor_id}.schedule",
    summary="Update Doctor Schedule",
)
async def update_doctor_schedule(
    doctor_id: UUID,
    schedule: dict,
    current_user=Depends(get_current_user),
):
    return await DoctorService.update_schedule(
        doctor_id,
        schedule,
    )