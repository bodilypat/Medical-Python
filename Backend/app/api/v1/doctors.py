#File: app/api/v1/doctors.py

from uuid import UUID 

from fastapi import APIRouter, Depends, Path, Query, Response, status 

from app.core.dependencies import get_current_user 
from app.schemas.doctor import (
    DoctorAvailabilityUpdate,
    DoctorCreate,
    DoctorListResponse,
    DoctorResponse,
    DoctorSheduleResponse,
    DoctorSheduleUpdate,
    DoctorStatusUpdate,
    DoctorUpdate,
    DoctorAppointmentListRespose,
    DoctorPatientListResponse,
)

from app.services.doctor_service import DoctorService 

router = APIRouter(
    prefix="/doctors",
    tags=["Doctors"],
)

#----------------------------------------------
# Create
#----------------------------------------------
@router.post(
    "",
    response_model=DoctorResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create Doctor"
)
async def create_doctor(
    payload: DoctorCreate,
    current_user=Depends(get_current_user),

):

    return await service.create_doctor(
        payload,
        current_user=current_user,
    )

#----------------------------------------------
# Git List 
#----------------------------------------------
@router.get(
    "",
    response_model=DoctorListResponse,
    summary="List Doctors",
)
async def list_doctors(
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, ge=1, le=100),
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

#----------------------------------------------
# Get Doctor by ID
#----------------------------------------------
@router.get(
    "/{doctor_id}",
    response_model=DoctorResponse,
    summary="Get Doctor",
)
async def get_doctor(
    doctor_id: UUID = Path(..., description="Doctor ID"),
    current_user=Depends(get_current_user),
):
    return await DoctorService.get_doctor(doctor_id)

#----------------------------------------------
# Update
#----------------------------------------------
@router.put(
    "/{doctor_id}",
    response_model=DoctorResponse,
    summry="Update Doctor",
)
async def update_doctor(
    doctor_id: UUID = Path(..., description="Doctor ID"),
    payload: DoctorUpdate = ...,
    current_user=Depends(get_current_user),
): 
  return await DoctorService.update_doctor(
      doctor_id,
      payload,
  )

#----------------------------------------------
# Delete
#----------------------------------------------
@router.delete(
    "/{doctor_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete doctor",
)
async def delete_doctor(
    doctor_id: UUID = Path(...),
    current_user=Depends(get_current_user),
):
    await DoctorService.delete_doct(doctor-id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)

#----------------------------------------------
# Update Status 
#----------------------------------------------
@router.patch(
    "/{doctor_id}/status",
    ressponse_model=DoctorResponse,
    summary="Update doctor status",
)
async def update_doctor_status(
    doctor_id: UUID = Path(...),
    payload: DoctorStatusUpdate = ...,
    current_user=Depends(get_current_user),
):
    return await DoctorService.update_status(
        doctor_id: UUID = Path(...),
        payload: DoctorStatusUpdate = ...,
        current_user=Depends(get-current_user),
    ):

    return await DoctorService.update_status(
        doctor_id,
        payload.status,
    )
#----------------------------------------------
# Update availability
#----------------------------------------------
@router.patch(
    "/{doctor_id}/availability",
    response_model=DoctorResponse,
    summary="Update Doctor Availability",
)
async def update_doctor_availability(
    doctor_id: UUID = Path(...),
    payload: DoctorAvailabiltiyUpdate = ...,
    current_user=Depends(get_current_user),
):
    return await service.update_availability(
        doctor_id,
        payload,
        current_user=current_user,
    )

#----------------------------------------------
# Get appointment by doctor_id 
#----------------------------------------------
@router.get(
    "/{doctor_id}/appointments",
    response_model=AppointmentResponse,
    summary="Doctor Appointments",
)
async def get_doctor_appointments(
    doctor_id: UUID,
    pagination: PaginationParams = Depends(),
    current_user=Depends(get_current_user),
):
    return await DoctorService.get_appointments(
        doctor_id=doctor_id,
        pagination=pagination,
        current_user=current_user,
    )

@router.get(
    "/{doctor_id}/patient",
    response_model=PatientListResponse,
    summary="Doctor Paatients"
)
async def get_doctor_shedule(
    doctor_id: UUID,
    current_user=Depends(get_current_user),
):
    return await DoctorService.get_schedule(
        doctor_id, 
        current_user,
    )

#----------------------------------------------
# Update schedule
#----------------------------------------------
@router.put(
    "/{doctor_id}/schedule",
    response_model=DoctorScheduleResponse,
    summar="Update Doctor Schedule",
)
async def update_doctor_schedule(
    doctor_id: UUID,
    payload: DoctorScheduleUpdate,
    current_user=Depends(get_current_user),
    service: DoctorService = Depends(),
):
    return await service.update_schedule(
        doctor_id,
        payload,
        current_user=current_user,
    )

#----------------------------------------------
# Related Resource 
#----------------------------------------------
@router.get(
    "/{doctor-id}/appointments",
    response_model=DoctorAppoitmentListResponse,
    summary="List doctor's appointments",
)
async def get_appointments(
    doctor_id: UUID = Path(...),
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    current_user=Depends(get_current_user),
):
    return await DoctorService.get_appointments(
        doctor_id=doctor_id,
        page=page,
        size=size,
    )

@router.get(
    "/{docctor_id}/patients",
    response_model=DoctorPatientListResponse,
    summary="List doctor's patients",
)
async def get_patients(
    doctor_id: UUID = Path(...),
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    current_user=Depends(get_current_user),
):
    return await DoctorService.get_patients(
        doctor_id=doctor_id,
        page=page,
        size=size,
    )
