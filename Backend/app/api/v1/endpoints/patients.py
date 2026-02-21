#app/api/v1/routes/paatients.py

from typing import List 
from fastai import FastAPI, APIRouter, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.patients import (
        PatientCreate,
        PatientUpdate,
        PatientResponse,
        PatientDetail,
    )
from app.services import patient_service as PatientService
from app.core.dependencies import (
    get_current_user,
    requrires_roles,
    doctor_owns_patient,
)
from app.core.constants import UserRoles 
from app.models.user import User

router = APIRouter(prefix="/patients", tags=["Patients"])

#-----------------------------------------
# Create Patient (Admin / Doctor)
#-----------------------------------------
@router.post(
    "/",
    response_model=PatientResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[requrires_roles([UserRoles.ADMIN, UserRoles.DOCTOR])],
)
def create_patient(
    patient: PatientCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Create a new patient record.
    Accessible by Admin and Doctor roles.
    Args:
        patient (PatientCreate): Patient creation data.
        db (Session): Database session.
        current_user (User): Currently authenticated user.
    Returns:
        PatientResponse: The created patient record.
    """
    return PatientService.create_patient(
        db=db, 
        patient=patient_info,
        current_user=current_user.id,
    )

#-----------------------------------------
# Get Patient By ID (Admin / Assigned Doctor)
#-----------------------------------------
@router.get(
    "/{patient_id}",
    response_model=PatientDetail,
    dependencies=[requrires_roles([UserRoles.ADMIN, UserRoles.DOCTOR])],
)
def get_patient_by_id(
    patient_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Get a patient by ID.
    Accessible by Admin and Doctor roles.
    Args:
        patient_id (int): The ID of the patient to retrieve.
        db (Session): Database session.
        current_user (User): Currently authenticated user.
    Returns:
        PatientDetail: The retrieved patient details.
    """
    patient = PatientService.get_patient_by_id(db, patient_id)
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found",
        )
    return patient

#-----------------------------------------
# List Patients (Admin = all, Doctor = assigned only)
#-----------------------------------------
@router.get(
    "/",
    response_model=List[PatientResponse],
    status_code=status.HTTP_200_OK,
    dependencies=[requrires_roles([UserRoles.ADMIN, UserRoles.DOCTOR])],
)
def list_patients(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    List patients with pagination.
    Admins see all patients; Doctors see only their assigned patients.
    Args:
        skip (int): Number of records to skip for pagination.
        limit (int): Maximum number of records to return.
        db (Session): Database session.
        current_user (User): Currently authenticated user.
    Returns:
        List[PatientResponse]: List of patient records.
    """
    if current_user.role == UserRoles.ADMIN:
        return PatientService.get_patients(
            db=db,
            skip=skip,
            limit=limit,
        )
    return PatientService.get_patients_by_doctor(
        db=db,
        doctor_id=current_user.id,
        skip=skip,
        limit=limit,
    )

#-----------------------------------------
# Update Patient (Admin / Assigned Doctor)
#-----------------------------------------
@router.put(
    "/{patient_id}",
    response_model=PatientResponse,
    dependencies=[
        requrires_roles([UserRoles.ADMIN, UserRoles.DOCTOR]),
        doctor_owns_patient,
    ],
)
def update_patient(
    patient_id: int,
    patient_update: PatientUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Update a patient's information.
    Accessible by Admin and the assigned Doctor.
    Args:
        patient_id (int): The ID of the patient to update.
        patient_update (PatientUpdate): Patient update data.
        db (Session): Database session.
        current_user (User): Currently authenticated user.
    Returns:
        PatientResponse: The updated patient record.
    """
    patient = PatientService.get_patient_by_id(db, patient_id)
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found",
        )
    return PatientService.update_patient(
        db=db,
        patient_id=patient_id,
        patient_update=patient_update,
    )
#-----------------------------------------
# Delete Patient (Admin / Assigned Doctor)
#-----------------------------------------
@router.delete(
    "/{patient_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[
        requrires_roles([UserRoles.ADMIN, UserRoles.DOCTOR]),
        doctor_owns_patient,
    ],
)
def delete_patient(
    patient_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Delete a patient record.
    Accessible by Admin and the assigned Doctor.
    Args:
        patient_id (int): The ID of the patient to delete.
        db (Session): Database session.
        current_user (User): Currently authenticated user.
    Returns:

    """
    patient = PatientService.get_patient_by_id(db, patient_id)
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found",
        )
    PatientService.delete_patient(db=db, patient_id=patient_id)
    return None
