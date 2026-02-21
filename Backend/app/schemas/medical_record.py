#app/schemas/medical_record.py

from pydantic import BaseModel
from datetime import date
from typing import Optional

class MedicalRecordBase(BaseModel):
    patient_id: int
    diagnosis: str
    treatment: str
    prescription: str
    notes: Optional[str]
    visit_date: date
    
class MedicalRecordCreate(MedicalRecordBase):
    pass

class MedicalRecordUpdate(BaseModel):
    diagnosis: Optional[str]
    treatment: Optional[str]
    prescription: Optional[str]
    notes: Optional[str]
    visit_date: Optional[date]

class MedicalRecordResponse(MedicalRecordBase):
    record_id: int

    class Config:
        orm_mode = True
        