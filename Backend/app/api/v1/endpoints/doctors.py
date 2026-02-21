#app/api/v1/routes/doctors.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.dependencies import get_current_user, require_role
from app.core.constants import UserRole

router = APIRouter()

# Create Doctor(Admin only)
@router.post(
    "/",
    response_model=DoctorResponse,
    dependencies=[Depends(require_role([UserRole.ADMIN]))],
    status_code=status.HTTP_201_CREATED,
)
def create_doctor(
    doctor: DoctorCreate,
    db: Session = Depends(get_db),
):
    db_doctor = DoctorService.create_doctor(db, doctor)
    return db_doctor

# Get Doctor by ID (Admin and Doctor themselves)
@router.get(
    "/{doctor_id}",
    response_model=DoctorResponse,
    dependencies=[Depends(get_current_user)],
)
def get_doctor(
    doctor_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if current_user.role != UserRole.ADMIN and current_user.id != doctor_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to access this resource")
    
    db_doctor = DoctorService.get_doctor_by_id(db, doctor_id)
    if not db_doctor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Doctor not found")
    return db_doctor

# List Doctors (Public / Patient)
@router.get(
    "/",
    response_model=List[DoctorResponse],
    dependencies=[Depends(get_current_user)],
)
def list_doctors(
    db: Session = Depends(get_db),
):
    doctors = DoctorService.list_doctors(db)
    return doctors

# Update Doctor (Admin only)
@router.put(
    "/{doctor_id}",
    response_model=DoctorResponse,
    dependencies=[Depends(require_role([UserRole.ADMIN]))],
)
def update_doctor(
    doctor_id: int,
    doctor_update: DoctorUpdate,
    db: Session = Depends(get_db),
):
    db_doctor = DoctorService.update_doctor(db, doctor_id, doctor_update)
    if not db_doctor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Doctor not found")
    return db_doctor

# Delete Doctor (Admin only)
@router.delete(
    "/{doctor_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_role([UserRole.ADMIN]))],
)
def delete_doctor(
    doctor_id: int,
    db: Session = Depends(get_db),
):
    success = DoctorService.delete_doctor(db, doctor_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Doctor not found")
    return

# Get Doctors by Availability (Public / Patient)
@router.get(
    "/availability/{available}",
    response_model=List[DoctorResponse],
    dependencies=[Depends(get_current_user)],
)
def get_doctors_by_availability(
    available: bool,
    db: Session = Depends(get_db),
):
    doctors = DoctorService.get_doctors_by_availability(db, available)
    return doctors

# View Doctor Availability Calendar (Public / Patient)
@router.get(
    "/{doctor_id}/availability",
    response_model=DoctorAvailabilityResponse,
    dependencies=[Depends(get_current_user)],
)
def view_doctor_availability(
    doctor_id: int,
    db: Session = Depends(get_db),
):
    availability = DoctorService.get_doctor_availability(db, doctor_id)
    if availability is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Doctor not found")
    return availability


