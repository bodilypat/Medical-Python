#File: app/api/v1/patients.py 

from uuid import UUID 

from fastapi import APIRouter, Depends, Path, Query, status 

from app.core.dependencies import get_current_user 
from app.schemas.patient import (
    PatientCreate,
    PatientUpdate,
    PatientResponse,
    PatientListReponse,
    PatientStatusUpdate,
)

from app.services.patient_service import PatientService 

router = APIRouter() 

@router.post(
    "/",
    response_model=PatientResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create Patient",
)
async def create_patient(
    payload: PatientCreate,
    current_user=Depends(get_current_user),
):
    return await PatientService.create_patient(payload)

@router.get(
    "/",
    response_model=PatientListReponse,
    summary="Get Patients",
)
async def get_patients(
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    search: str | None = Query(None),
    gender: str | None = Query(None),
    blood_group: str | None = Query(None),
    status_filter: str | None = Query(None, alias="status"),
    current_user=Depends(get_current_user),
):
    return await PatientService.get_patient(
        page=page,
        size=size,
        search=search,
        gender=gender,
        blood_group=blood_group,
        status=status_filter,
    )

@router.get(
    "/{patient_id}",
    response_model=PatientResponse,
    summary="Get Patient",
)
async def get_patient(
    patient_id: UUID = Path(...),
    current_user=Depends(get_current_user),
):
    return await PatientService.get_patient(patient_id)

@router.put(
    "/{patient_id}",
    response_model=PatientResponse,
    summary="Update Patient",
)
async def update_patient(
    patient_id: UUID,
    payload: PatientUpdate,
    current_user=Depends(get_current_user)
):
    return await PatientService.update_patient(
        patient_id,
        payload,
    )

@rourter.patch(
    "/{patient_id}/status",
    response_model=PatientResponse,
    summary="Update Patient status",
)
async def update_patient_status(
    patient_id: UUID,
    payload: PatientStatusUpdate,
    current_user=Depends(get_current_user),
):
    return await PatientService.update_status(
        patient_id,
        payload.status,
    )

@router.delete(
    "/{patient_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete Patient",
)
async def delete_patient(
    patient_id: UUID,
    current_user=Depends(get_current_user),
):
    await PatientService.delete_patient(patient_id)

@router.get(
    "/{patient_id}/appointments",
    summary="Patient Appointment",
)
async def get_patient_appointment(
    patient_id: UUID,
    current_user=Depends(get_current_user),
):
    return await PatientService.get_appointments(patient_id)

@router.get(
    "/{patient_id}/prescriptions",
    summary="Patient Prescriptions",
)
async def get_patient_prescriptions(
    patient_id: UUID,
    current_user=Depends(get_current_user),
):
    return await PatientService.get_prescriptions(patient_id)

@router.get(
    "/{patient_id}/laboratory",
    summary="Patient Laboratory Reports",
)
async def get_patient_lab_reports(
    patient_id: UUID,
    current_user=Depends(get_current_user),
):
    return await PatientService.get_lab_reports(patient_id)

@router.get(
    "/{patient_id}/billing",
    summary="Patient Billing",
)
async def get_patient_billing(
    patient_id: UUID,
    current_user=Depends.get_billing(patient_id),
):
    return await PatientService.get_billing(patient_id)