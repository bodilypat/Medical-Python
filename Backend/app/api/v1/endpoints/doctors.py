#app/api/v1/endpoints/doctors.py

from fastapi import APIRouter, HTTPException, Depends, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.api.deps import get_current_user, require_role
from app.core.database import get_db
from app.schemas.doctor import DoctorCreate, DoctorUpdate, DoctorResponse
from app.services.doctor_service import DoctorService
from app.models import User

router = APIRouter()

# Create Doctor (Admin Only)
@router.post(
    "/", 
    response_model=DoctorResponse, 
    status_code=status.HTTP_201_CREATED
)
def create_doctor(
    doctor: DoctorCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not require_role(current_user, "admin"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    return DoctorService.create_doctor(db, doctor)

# Get All Doctors (Authenticated Users)
@router.get(
        "/", 
        response_model=List[DoctorResponse]
)
def get_all_doctors(
    db: Session = Depends(get_db),
    specialty: Optional[str] = Query(None, description="Filter by specialty"),
    current_user: User = Depends(get_current_user)
):
    return DoctorService.get_all_doctors(db, specialty=specialty)

# Get Doctor by ID (Authenticated Users)
@router.get(
    "/{doctor_id}", 
    response_model=DoctorResponse
)
def get_doctor_by_id(
    doctor_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    doctor = DoctorService.get_doctor_by_id(db, doctor_id)
    if not doctor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Doctor not found")
    return doctor

# Update Doctor (Admin Only)
@router.put(
    "/{doctor_id}", 
    response_model=DoctorResponse
)
def update_doctor(
    doctor_id: int,
    doctor_update: DoctorUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not require_role(current_user, "admin"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    doctor = DoctorService.update_doctor(db, doctor_id, doctor_update)
    if not doctor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Doctor not found")
    return doctor

# Delete Doctor (Admin Only)
@router.delete(
    "/{doctor_id}", 
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_doctor(
    doctor_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not require_role(current_user, "admin"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    success = DoctorService.delete_doctor(db, doctor_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Doctor not found")
    return None

