#app/services/doctor_service.py

from sqlalchemy.orm import Session
from app.mmodels.doctor import Doctor
from app.schemas.doctor import DoctorCreate, DoctorUpdate, DoctorOut
from app.core.exceptions import NotFoundException

class DoctorService:

    @staticmethod
    def create_doctor(db: Session, doctor_create: DoctorCreate) -> DoctorOut:
        doctor = Doctor(**doctor_create.dict())
        db.add(doctor)
        db.commit()
        db.refresh(doctor)
        return DoctorOut.from_orm(doctor)
    
    @staticmethod
    def get_doctor(db: Session, doctor_id: int) -> DoctorOut:
        doctor = db.query(Doctor).filter(Doctor.doctor_id == doctor_id).first()
        if not doctor:
            raise NotFoundException(f"Doctor with id {doctor_id} not found")
        return DoctorOut.from_orm(doctor)

    @staticmethod
    def get_all_doctors(db: Session) -> list[DoctorOut]:
        doctors = db.query(Doctor).all()
        return [DoctorOut.from_orm(doctor) for doctor in doctors]
    
    @staticmethod
    def update_doctor(db: Session, doctor_id: int, doctor_update: DoctorUpdate) -> DoctorOut:
        doctor = db.query(Doctor).filter(Doctor.doctor_id == doctor_id).first()
        if not doctor:
            raise NotFoundException(f"Doctor with id {doctor_id} not found")
        for key, value in doctor_update.dict(exclude_unset=True).items():
            setattr(doctor, key, value)
        db.commit()
        db.refresh(doctor)
        return DoctorOut.from_orm(doctor)
    
    @staticmethod
    def delete_doctor(db: Session, doctor_id: int) -> None:
        doctor = db.query(Doctor).filter(Doctor.doctor_id == doctor_id).first()
        if not doctor:
            raise NotFoundException(f"Doctor with id {doctor_id} not found")
        db.delete(doctor)
        db.commit()

    