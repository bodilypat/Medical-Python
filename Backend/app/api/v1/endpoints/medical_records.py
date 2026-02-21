# app/api/v1/routes/medical_records.py

from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.core.dependencies import (
    get_current_user,
    require_roles,
    doctor_owns_patient,
) 
from app.core.constants import UserRole 
from app.schemas.medical_record import (
    MedicalRecordCreate, 
    MedicalRecordUpdate,
    MedicalRecordResponse
)

from app.services import medical_record_service as MedicalRecordService

router = APIRouter(
    prefix="/medical-records",
    tags=["Medical Records"]
)

#----------------------------------------------------------
# Create Medical Record (Doctor)
#----------------------------------------------------------
@router.post(
    "/",
    response_model=MedicalRecordResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[
        Depends(get_current_user),
        Depends(require_roles([UserRole.DOCTOR]))
    ]
)
def create_medical_record(
    record_in: MedicalRecordCreate,
    db: Session = Depends(get_db)
    current_user=Depends(get_current_user),
):
    medical_record = MedicalRecordService.create_medical_record(
        db=db,
        record_in=record_in
        doctor_id=current_user.id,
    )
    return medical_record

#----------------------------------------------------------
# Get Medical record by ID (Doctor / Pateint / Admin)
#----------------------------------------------------------
@router.get(
    "/{record_id}",
    response_model=MedicalRecordResponse,
    dependencies=[Depends(get_current_user)]
    summary="Get Medical Record by ID"
)
def get_medical_record(
    record_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    medical_record = MedicalRecordService.get_medical_record_by_id(
        db=db,
        record_id=record_id
        current_user=current_user,
    )

    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Medical record not found"
        )
    return medical_record

#----------------------------------------------------------
# Get Medical Records for a Patient
#----------------------------------------------------------
@router.get(
    "/patient/{patient_id}",
    response_model=List[MedicalRecordResponse],
    dependencies=[Depends(get_current_user)],
    summary="Get Medical Records for a Patient"
)
def get_patient_medical_records(
    patient_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
    _patient=Depends(doctor_owns_patient),
):
    medical_records = MedicalRecordService.get_medical_records_by_patient(
        db=db,
        patient_id=patient_id,
        user=current_user,
    )
    
    return medical_records

#----------------------------------------------------------
# Update Medical Record (Doctor)
#----------------------------------------------------------
@router.put(
    "/{record_id}",
    response_model=MedicalRecordResponse,
    dependancies=[Depends(get_current_user),
                  Depends(require_roles([UserRole.DOCTOR]))],
    summary="Update Medical Record"
)
def update_medical_record(
    record_id: int,
    record_in: MedicalRecordUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    updated_record = MedicalRecordService.update_medical_record(
        db=db,
        record_id=record_id,
        record_in=record_in,
        doctor_id=current_user.id,
    )

    if not updated_record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Medical record not found or not authorized to update"
        )
    return updated_record

#----------------------------------------------------------
# Delete Medical Record (Admin only)
#----------------------------------------------------------
@router.delete(
    "/{record_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependancies=[Depends(get_current_user),
                  Depends(require_roles([UserRole.ADMIN]))],
    summary="Delete Medical Record"
)
def delete_medical_record(
    record_id: int,
    db: Session = Depends(get_db),
):
    success = MedicalRecordService.delete_medical_record(
        db=db,
        record_id=record_id,
    )

    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Medical record not found"
        )
    return None


