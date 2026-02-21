#app/services/appointment_service.py

from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timedelta
from app.models.appointment import Appointment
from app.schemas.appointments import AppointmentCreate, AppointmentUpdate, AppointmentResponse
from app.core.exceptions import NotFoundException, ValidationException
from fastapi import HTTPException, status

APPOINTMENT_DURATION_MINUTES = 30 

class AppointmentService:
    
    @staticmethod
    def create_appointment(db: Session, appointment_data: AppointmentCreate):
        # Check schedule confict
        start_time = appointment_data.appointment_datetime
        end_time = start_time + timedelta(minutes=APPOINTMENT_DURATION_MINUTES)

        conflict = db.query(Appointment).filter(
            Appointment.doctor_id == appointment_data.doctor_id,
            Appointment.appointment_datetime < end_time,
            (Appointment.appointment_datetime + timedelta(minutes=APPOINTMENT_DURATION_MINUTES)) > start_time
        ).first()

        if conflict:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Doctor is not available at this time"
            )
        appointment = Appointment(**appointment_data.dict().values())
        db.add(appointment)
        db.commit()
        db.refresh(appointment)
        return appointment
    
    @staticmethod
    def get_all_appointments(db: Session, doctor_id=None, patient_id=None, status=None, skip=0, limit=10):
        query = db.query(Appointment)

        if doctor_id:
            query = query.filter(Appointment.doctor_id == doctor_id)

        if patient_id:
            query = query.filter(Appointment.patient_id == patient_id)

        if status:
            query = query.filter(Appointment.status == status)

        return query.offset(skip).limit(limit).all()
    
    @staticmethod
    def get_appointment_by_id(db: Session, appointment_id: int):
        appointment = db.query(Appointment).filter(Appointment.appointment_id == appointment_id).first()
        if not appointment:
            raise NotFoundException("Appointment not found")
        return appointment
    
    @staticmethod
    def update_appointment(db: Session, appointment_id: int, appointment_data: AppointmentUpdate):
        appointment = db.query(Appointment).filter(Appointment.appointment_id == appointment_id).first()
        if not appointment:
            raise NotFoundException("Appointment not found")
        
        for key, value in appointment_data.dict(exclude_unset=True).items():
            setattr(appointment, key, value)
        
        db.commit()
        db.refresh(appointment)
        return appointment
    
    @staticmethod
    def delete_appointment(db: Session, appointment_id: int):
        appointment = db.query(Appointment).filter(Appointment.appointment_id == appointment_id).first()
        if not appointment:
            raise NotFoundException("Appointment not found")
        
        db.delete(appointment)
        db.commit()
        return True
    
    @staticmethod
    def get_appointments_by_doctor(db: Session, doctor_id: int, skip=0, limit=10):
        return db.query(Appointment).filter(Appointment.doctor_id == doctor_id).offset(skip).limit(limit).all()
    
    @staticmethod
    def get_appointments_by_patient(db: Session, patient_id: int, skip=0, limit=10):
        return db.query(Appointment).filter(Appointment.patient_id == patient_id).offset(skip).limit(limit).all()
    
    