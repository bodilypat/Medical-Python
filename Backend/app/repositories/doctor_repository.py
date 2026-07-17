#app/resoisitories/doctor_repository.com 

from uuid import UUID 

from sqlalchemy import or_
from sqlchemay.orm import Session 

from app.models.doctor import Doctor 
from app.models.appointment import Appointment 
from app.models.patient import Patient

class DoctorRepository:

#----------------------------------------------
# Base Queries
#----------------------------------------------

    @staticmethod
    def get_by_id(
        db: Session,
        doctor_id: UUID,
    ) -> Doctor | None:
        
        return (
            db.query(Doctor)
            .filter(
                Doctor.doctor_id == doctor_id
            )
            .first()
        )

    @staticmethod
    def get_all(
        db: Session,
    ) -> list[Doctor]:
        
        return (
            db.query(Doctor)
            .all()
        )

    #----------------------------------------------
    # Create 
    #----------------------------------------------

    @staticmethod
    def create(
        db: Session,
        doctor: Doctor,
    ) -> Doctor:
        
        db.add(doctor)
        db.commit()
        db.refresh(doctor)

        return doctor 

    #----------------------------------------------
    # Update 
    #----------------------------------------------

    @staticmethod
    def update(
        db: Session,
        doctor: Doctor,
    ) -> Doctor:
        
        db.commit()
        db.refresh(doctor)

        return doctor 

    #----------------------------------------------
    # Delete 
    #----------------------------------------------

    @staticmethod
    def delete(
        db: Session,
        doctor: Doctor,
    ) -> None:
        
        db.delete(doctor)
        db.commit() 

    #-----------------------------------------------
    # Filtering / Pagination 
    #-----------------------------------------------

    @staticmethod
    def get_filtered(
        db: Session,
        *,
        page: int = 1,
        size: int = 10,
        search: str | None = None ,
        specializaton: str | None = None,
        department: str | None = None,
        available: bool | None = None 
    ):
        query = db.query(Doctor)

        if search:
            query = query.filter(
                or_(
                    Doctor.first_name.ilike(
                        f"%{search}%"
                    ),
                    Doctor.last_name.ilike(
                        f"%{search}%"
                    ),
                    Doctor.email.ilike(
                        f"%{search}%"
                    ),
                )
            )
        
        if specializaton:
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

        items = (
            query
            .offset((page - 1) * size)
            .limit(size)
            .all()
        )

        return total, items

    #----------------------------------------------
    # Status / Availability 
    #----------------------------------------------

    @staticmethod
    def update_status(
        db: Session,
        doctor: Doctor,
        status: str,
    ) -> Doctor:
        
        doctor.status = status 

        db.commit()
        db.refresh(doctor)

        return doctor

    @staticmethod
    def update_availability(
        db: Session,
        doctor: Doctor,
        available: bool,
    ) -> Doctor:
        
        doctor.is_available = available

        db.commit()
        db.refresh(doctor)

        return doctor 

    #----------------------------------------------
    # Schedule
    #----------------------------------------------

    @staticmethod
    def get_schedule(
        db: Session,
        doctor: Doctor,
    ):
        
        return doctor.schedule

    @staticmethod
    def update_schedule(
        db: Session,
        doctor: Doctor,
        schedule: dict,
    ) -> Doctor:
        
        doctor.schedule = schedule

        db.commit()
        db.refresh(docctor)

        return doctor 

    #----------------------------------------------
    # Doctor Appointment 
    #----------------------------------------------

    @staticmethod
    def get_appointment(
        db: Session,
        doctor_id: UUID,
        page: int = 1,
        size: int = 10,
    ):
        return (
            db.query(Appointment)
            .filter(
                Appointment.doctor_id == doctor_id
            )
            .offset((page - 1) * size)
            .limit(size)
            .all()
        )

    #----------------------------------------------
    # Doctor Patient 
    #----------------------------------------------
    @staticmethod
    def  get_patient(
        db: Session,
        doctor_id: UUID,
        page: int =1,
        size: int = 10,
    ):
        return (
            db.query(patient)
            .join(
                Appointment,
                Appointment.patient_id == Patient.patient_id,
            )
            .filter(
                Appointment.doctor_id == doctor_id
            )
            .distict()
            .offset((page -1) * size)
            .llmit(size)
            .all()
        )

    #----------------------------------------------
    # Statistic 
    #----------------------------------------------
    @staticmethod
    def count_appointments(
        db: Session,
        doctor_id: UUID,
    ) -> int: 
        
        return (
            db.query(Appointment)
            .filter(
                Appointment.doctor_id == doctor_id
            )
            .count()
        )

    @staticmethod
    def count_patients(
        db: Session,
        doctor_id: UUID,
    ) -> int:
        
        return (
            db.query(Patient)
            .join(Appointment)
            .filter(
                Appointment.patient_id == patient_id
            )
            .distinct()
            .count()
        )