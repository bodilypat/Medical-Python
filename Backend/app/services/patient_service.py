#app/services/patient_service.py

from sqlalchemy.orm import Session
from app.models.patient import Patient
from app.schemas.patient import PatientCreate, PatientUpdate, PatientResponse
from app.core.exceptions import NotFoundException

class PatientService:

    @staticmethod
    def create_patient(db: Session, patient_data: PatientCreate) -> PatientResponse:
        new_patient = Patient(
            name=patient_data.name,
            date_of_birth=patient_data.date_of_birth,
            gender=patient_data.gender,
            phone=patient_data.phone,
            email=patient_data.email,
            address=patient_data.address
        )
        db.add(new_patient)
        db.commit()
        db.refresh(new_patient)
        return PatientResponse.from_orm(new_patient)
    
    @staticmethod
    def get_patient(db: Session, patient_id: int) -> PatientResponse:
        patient = db.query(Patient).filter(Patient.patient_id == patient_id).first()
        if not patient:
            raise NotFoundException("Patient not found")
        return PatientResponse.from_orm(patient)
    
    @staticmethod
    def update_patient(db: Session, patient_id: int, patient_data: PatientUpdate) -> PatientResponse:
        patient = db.query(Patient).filter(Patient.patient_id == patient_id).first()
        if not patient:
            raise NotFoundException("Patient not found")
        
        for key, value in patient_data.dict(exclude_unset=True).items():
            setattr(patient, key, value)
        
        db.commit()
        db.refresh(patient)
        return PatientResponse.from_orm(patient)
    
    @staticmethod
    def delete_patient(db: Session, patient_id: int) -> None:
        patient = db.query(Patient).filter(Patient.patient_id == patient_id).first()
        if not patient:
            raise NotFoundException("Patient not found")
        
        db.delete(patient)
        db.commit()

        