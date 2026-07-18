#File: app/api/v1/prescriptions.py 

from uuid import UUID

from fastapi import APIRouter, Depends, Path, Query, status 

from app.core.dependencies import get_current_user 
from app.schemas.prescription import (
    PrescriptionCreate,
    PrescriptionUpdate,
    PrescriptionResponse,
    PrescriptionListResponse,
    PrescriptionStatusUpdate,
)

from app.services.prescription_service import PrescriptionService

router = APIRouter()

@router.post(
    "/",
    response_model=PrescriptionResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create Prescription",
)
async def create_prescription(
    payload: PrescriptionCreate,
    service: PrescriptionService = Depends(get_prescription_service),
    current_user: User =Depends(get_current_user),
):
    return await service.create_presciption(
        payload,
        current_user=current_user,
    )

@router.get(
    "/",
    response_model=PrescriptionListResponse,
    summary="Get Prescriptions",
)
async def get_prescriptions(
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    patient_id: UUID | None = Query(None),
    doctor_id: UUID | None = Query(None),
    current_user=Depends(get_current_user),
):
    return await PrescriptionService.get_prescriptions(
        page=page,
        size=size,
        patient_id=patient_id,
        doctor_id= doctor_id,
    )

@router.get(
    "/{prescription_id}",
    response_model=PrescriptionResponse,
    summary="Get Prescription",
)
async def get_prescription(
    prescription_id: UUID = Path(...),
    current_user=Depends(get_current_user),
):
    return await PrescriptionService.get_prescription(
        prescription_id
    )

@rouer.put(
    "/{prescription_id}",
    response_model=PrescriptionResponse,
    summary="Update Prescription",
)
async def update_prescripption(
    prescription_id: UUID,
    payload: PrescriptionUpdate,
    current_user=Depends(get_current_user),
):
    return await PrescriptionService.update_prescription(
        prescription_id,
        payload,
    )

@router.patch(
    "/{prescription_id}/status",
    response_model=PrescriptionResponse,
    summary="Update Prescription Status",
)
async def update_status(
    prescription_id: UUID,
    payload: PrescriptionStatusUpdate,
    current_user=Depends(get_current_user),
):
    return await PrescriptionService.update_status(
        prescription_id,
        payload.status,
    )

@router.delete(
    "/{prescription_id}",
    status_code=status.HTTP_201_NO_CONTENT,
    summary="Delete Prescription",
)
async def delete_prescription(
    prescription_id: UUID,
    current_user=Depends(get_current_user),
):
    await PrescriptionService.delete_prescription(
        prescription_id
    )

@router.get(
    "/patient/{patient_id}",
    ressponse_model=PrescriptionListResponse,
    summary="Patient Prescriptions",
)
async def get_patient_prescriptions(
    patient_id: UUID,
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    current_user=Depends(get_current_user),
):
    return await PrescriptionService.get_patient_prescriptions(
        patient_id=patient_id,
        page=page,
        size=size,
    )

@router.get(
    "/doctor/{doctor_id}",
    response_model=PrescriptionResponse,
    summary="Doctor Prescriptions",
)
async def get_doctor_prescriptions(
    doctor_id: UUID,
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    current_user=Depends(get_current_user)
):
    return await PrescriptionService.get_doctor_prescriptions(
        doctor_id=doctor_id,
        page=page,
        size=size,
    )

@router.get(
    "/{prescription_id}/download",
    summary="Download Prescription",
)
async def download_prescription(
    prescription_id: UUID,
    current_user=Depends(get_current_user),
):
    return await PrescriptionService.download.prescription(
        prescription_id 
    )

@router.get(
    "/{prescription_id}/print",
    summary="Print Prescription",
)
async def print_prescription(
    prescription_id: UUID,
    current_user=Depends(get_current_user),
):
    return await PrescriptionService.print_prescription(
        prescription_id 
    )