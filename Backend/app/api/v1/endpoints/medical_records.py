#app/api/v1/endpoints/medical_records.py

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.api.deps import get_current_user, require_role
from app.core.database import get_db
from app.schemas.medical_record import MedicalRecordCreate, MedicalRecordUpdate, MedicalRecordResponse
from app.services.medical_record_service import MedicalRecordService
from app.models.user import User

router = APIRouter()

# Create Medical Record (Doctor only)
@router.post(
    "/",
    response_model=MedicalRecordResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_role(["doctor"]))],
)
def create_medical_record(
    record_in: MedicalRecordCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = MedicalRecordService(db)
    record = service.create_medical_record(record_in, created_by=current_user.user_id)
    return record

# Get All Records (Optional filter by patient_id) 
@router.get(
    "/",
    response_model=List[MedicalRecordResponse],
    status_code=status.HTTP_200_OK,
)
def get_medical_records(
    patient_id: Optional[int] = Query(None, description="Filter by patient ID"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = MedicalRecordService(db)
    records = service.get_medical_records(patient_id=patient_id, requested_by=current_user.user_id)
    return records

# Get Single Record by ID
@router.get(
    "/{record_id}",
    response_model=MedicalRecordResponse,
    status_code=status.HTTP_200_OK,
)
def get_medical_record(
    record_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = MedicalRecordService(db)
    record = service.get_medical_record_by_id(record_id, requested_by=current_user.user_id)
    if not record:
        raise HTTPException(status_code=404, detail="Medical record not found")
    return record   

# Update Medical Record (Doctor only)
@router.put(
    "/{record_id}",
    response_model=MedicalRecordResponse,
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(require_role(["doctor"]))],
)   
def update_medical_record(
    record_id: int,
    record_in: MedicalRecordUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = MedicalRecordService(db)
    record = service.update_medical_record(record_id, record_in, updated_by=current_user.user_id)
    if not record:
        raise HTTPException(status_code=404, detail="Medical record not found")
    return record

# Delete Medical Record (Admin only)
@router.delete(
    "/{record_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_role(["admin"]))],
)
def delete_medical_record(
    record_id: int,
    db: Session = Depends(get_db),
):
    service = MedicalRecordService(db)
    success = service.delete_medical_record(record_id)
    if not success:
        raise HTTPException(status_code=404, detail="Medical record not found")
    return None

