#app/services/medical_service.py

from sqlalchemy.orm import Session
from app.models.medical_record import MedicalRecord
from app.schemas.medical_records import MedicalRecordCreate, MedicalRecordUpdate
from app.core.exceptions import NotFoundException, ForbiddenException

class MedicalRecordService:

    @staticmethod
    def create_medical_record(db: Session, record_data: MedicalRecordCreate, user: User) -> MedicalRecord:
        if user.role not in ['doctor', 'admin']:
            raise ForbiddenException("You do not have permission to create medical records.")
        
        new_record = MedicalRecord(**record_data.dict())
        db.add(new_record)
        db.commit()
        db.refresh(new_record)
        return new_record
    
    @staticmethod
    def get_medical_record_by_id(db: Session, record_id: int, user: User) -> MedicalRecord:
        record = db.query(MedicalRecord).filter(MedicalRecord.record_id == record_id).first()
        if not record:
            raise NotFoundException("Medical record not found.")
        
        if user.role not in ['doctor', 'admin'] and record.patient_id != user.user_id:
            raise ForbiddenException("You do not have permission to view this medical record.")
        
        return record
    
    @staticmethod
    def update_medical_record(db: Session, record_id: int, record_data: MedicalRecordUpdate, user: User) -> MedicalRecord:
        record = db.query(MedicalRecord).filter(MedicalRecord.record_id == record_id).first()
        if not record:
            raise NotFoundException("Medical record not found.")
        
        if user.role not in ['doctor', 'admin']:
            raise ForbiddenException("You do not have permission to update medical records.")
        
        for key, value in record_data.dict(exclude_unset=True).items():
            setattr(record, key, value)
        
        db.commit()
        db.refresh(record)
        return record
    
    @staticmethod
    def delete_medical_record(db: Session, record_id: int, user: User) -> None:
        record = db.query(MedicalRecord).filter(MedicalRecord.record_id == record_id).first()
        if not record:
            raise NotFoundException("Medical record not found.")
        
        if user.role != 'admin':
            raise ForbiddenException("You do not have permission to delete medical records.")
        
        db.delete(record)
        db.commit()

