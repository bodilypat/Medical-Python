#app/services/doctor_service.py

from uuid import UUID 

from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.models.doctor import Doctpr 
from app.models.appointment import Appointment 
from app.models.patient import Patient 

from app.schema.doctor import (
    DoctorCreate,
    DoctorUpdate,
    DoctorStatusUpdate,
    DoctorAvailabilityUpdate,
    DoctorScheduleUpdate,
    DoctorOut,
    DoctorListResponse,
    DoctorAppointmentResponse,
    DoctorPatientListResponse,
)

from app.core.exceptions import NotFoundException

class DoctorService:

    @staticmethod
    def _get_doctor(
        db: Session,
        doctor_id: UUID,
    ) -> Doctor:
        
        doctor = (
            db.query(Doctor)
            .filter(Doctor.doctor_id == doctor_id)
            .first()
        )
        if not doctor:
            raise NotFoundException(
                f"Doctor with id {doctor_id} not found"
            )
        return doctor 
    
#----------------------------------------------
# Create
#----------------------------------------------

@staticmethod
def create_doctor(
    db: Session,
    payload: DoctorCreate,
) -> DoctorOut:
    
    doctor = Doctor(
        **payload.model_dump()
    )

    db.add(doctor)
    db.commit() 
    db.refresh(doctor)

    return DoctorOut.model_validate(doctor)

#----------------------------------------------
# Read 
#----------------------------------------------

@staticmethod
def get_doctor(
    db: Session,
    doctor_id: UUID,
) -> DoctorOut:
    
    doctor = DoctorService._get_doctor( 
        db,
        doctor_id,
    )

    return DoctorOut.model_validate(doctor)

@staticmethod
def get_doctor(
    db: Session,
    page: int = 1,
    size: int = 10,
    search: str | None = None,
    specialization: str | None = None,
    department: str | None = None,
    available: bool | None = None,
) -> DoctorListResponse:
    
    query = db.query(Doctor)

    if search:
        query = query.filter(
            or_(
                Doctor.first_name.ilike(f"%{search}%"),
                Doctor.last_name.ilike(f"%{search}"),
            )
        )

    if specialization:
        query = query.filter(
            Doctor.specialization == specialization
        )

    if department:
        query = query.filter(
            Doctor.department == department
        )

    if available is not None:
        query = query.filter(
            Doctor.is_available == available
        )

    total = query.count()
    
    doctors = (
        query 
        .offset((page -1) * size)
        .limit(size)
        .all()
    )

    return DoctorListResponse(
        total=total,
        page=page,
        size=size,
        items=[
            DoctorOut.model_validate(d)
            for d in doctors
        ],
    )
    
#----------------------------------------------
# Update
#----------------------------------------------

@staticmethod
def update_doctor(
    db: Session,
    doctor_id: UUID,
    payload : DoctorUpdate,
) -> DoctorOut:
    
    doctor = DoctorService._get_doctor(
        db,
        doctor_id,
    )

    for field, value in payload.model_dump(
        exclude_unset=True 
    ).items():
        
        setattr(
            doctor,
            field,
            value,
        )

    db.commit()
    db.refresh(doctor)

    return doctorOut.model_validate(doctor)

#----------------------------------------------
# Status 
#----------------------------------------------

@staticmethod
def update_status(
    db: Session,
    doctor_id: UUID,
    status_value: str,
) -> DoctorOut:
    
    doctor = DoctorService.get_doctor(
        db,
        doctor_id,
    )

    doctor.status = status_value 

    db.commit()
    db.refresh(doctor)

    return DoctorOut.model_valudate(doctor)

#----------------------------------------------
# Availability 
#----------------------------------------------

@staticmethod
def update_availability(
    db: Session,
    doctorid: UUID,
    payload: DoctorAvailabilityUpdate,
) -> DoctorOut:
    
    doctor = DoctorService._get_doctor(
        db,
        doctor_id, 
    )

    doctor.is_available = payload.available 

    db.commit()
    db.refresh(doctor)

    return DoctorOut.model_validate(doctor)

#----------------------------------------------
# Schedule 
#----------------------------------------------

@staticmethod
def get_schedule(
    db: Session,
    doctor_id: UUID,
) -> DoctorScheduleUpdate:
    
    doctor = DoctorService._get_doctor(
        db,
        doctor_id,
    )

    return DoctorScheduleResponse(
        doctor_id=doctor.doctor_id,
        schedule=doctor.schedule,
    )

@staticmethod
def update_schedule(
    db: Session,
    doctor_id: UUID,
    payload: DoctorScheduleUpdate,
) -> DoctorScheduleReponse:
    
    doctor = DoctorService._get_doctor(
        db,
        doctor_id,
    )

    doctor.schedule = payload.model_dump()
    
    db.commit()
    db.refresh(doctor)

    return DoctorScheduleResponse(
        doctor_id=doctor_id,
        schedule=doctor.schedule,
    )

#----------------------------------------------
# Related data 
#----------------------------------------------
@staticmethod
def get_appointment(
    db: Session,
    doctor_id: UUID,
    page: int,
    size: int,
) -> DoctorAppointmentListResponse:
    
    DoctorService._get_doctor(
        db,
        doctor_id,
    )

    appointments = (
        db.query(Apointmentment)
        .filter(
            Appointment.doctor_id == doctor_id
        )
        .offset((page - 1) * size)
        .limit(size)
        .all()
    )

    return DoctorAppointmentListResponse(
        items=appointments
    )

@staticmethod
def get_patients(
    db: Session,
    doctor_id: UUID,
    page: int,
    size: int,
) -> DoctorPatientListResponse:
    
    DoctorService._get_doctor(
        db,
        doctor_id,
    )

    patients = (
        db.query(Patient)
        .join(Appointment)
        .filter(
            Appointment.doctor_id == doctor_id
        )
        .distinct()
        .offset((page - 1) * size)
        .limit(size)
        .all()
    )

    return DoctorPatientResponse(
        items=patients
     )

#----------------------------------------------
# Delete 
#----------------------------------------------

@staticmethod
def delete_doctor(
    db: Session,
    doctor_id: UUID,
) -> None:
    
    doctor = DoctorService._get_doctor(
        db,
        doctor_id,
    )

    db.delete(doctor)
    db.commit() 

    