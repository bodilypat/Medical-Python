#app/api/v1/endpoints/patients.py

from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from typing import List

from app.api.deps import get_db, require_role, get_current_user
from app.core.database import get_db
from app.schemas.patient import PatientCreate, PatientResponse, PatientUpdate
from app.services.patient_service import PatientService
from app.models.user import User

router = APIRouter()

# Create Patient (Admin / Staff)
@router.post(
    "/", 
    response_model=PatientResponse, 
    status_code=status.HTTP_201_CREATED,
)
def create_patient(
    patient_in: PatientCreate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(require_role(["admin", "staff"]))
):
    patient_service = PatientService(db)
    patient = patient_service.create_patient(patient_in)
    return patient

# Get All Patients (Admin / Staff / Doctor)
@router.get("/", response_model=List[PatientResponse])
def get_patients(
    db: Session = Depends(get_db), 
    current_user: User = Depends(require_role(["admin", "staff", "doctor"]))
):
    patient_service = PatientService(db)
    patients = patient_service.get_patients()
    return patients

# Get Patient by ID (Admin / Staff / Doctor)
@router.get("/{patient_id}", response_model=PatientResponse)
def get_patient(
    patient_id: int, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(require_role(["admin", "staff", "doctor"]))
):
    patient_service = PatientService(db)
    patient = patient_service.get_patient(patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

# Update Patient (Admin / Staff)
@router.put("/{patient_id}", response_model=PatientResponse)
def update_patient(
    patient_id: int, 
    patient_in: PatientUpdate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(require_role(["admin", "staff"]))
):
    patient_service = PatientService(db)
    patient = patient_service.update_patient(patient_id, patient_in)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient  

# Delete Patient (Admin)
@router.delete("/{patient_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_patient(
    patient_id: int, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(require_role("admin"))
):
    patient_service = PatientService(db)
    success = patient_service.delete_patient(patient_id)
    if not success:
        raise HTTPException(status_code=404, detail="Patient not found")
    return None

