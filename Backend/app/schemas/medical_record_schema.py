#app/schemas/medical_record.py

from pydantic import BaseModel
from typing import Optional
from datetime import datetime

#--------------------------------------
# Base Medical Record Schema
#--------------------------------------
class MedicalRecordBase(BaseModel):
    patient_id: int
    doctor_id: int
    appointment_id: Optional[int] = None
    diagnosis: str
    symptoms: Optional[str] = None
    treatment: Optional[str] = None
    notes: Optional[str] = None
    record_type: Optional[str] = "consultation"  # consultation | lab | imaging | surgery | follow-up
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

#--------------------------------------
# Medical Record Create Schema
#--------------------------------------
class MedicalRecordCreate(MedicalRecordBase):
    pass # Inherits all fields from MedicalRecordBase

#--------------------------------------
# Medical Record Update Schema
#--------------------------------------
class MedicalRecordUpdate(MedicalRecordBase):
    patient_id: Optional[int] = None
    doctor_id: Optional[int] = None
    appointment_id: Optional[int] = None
    diagnosis: Optional[str] = None
    symptoms: Optional[str] = None
    treatment: Optional[str] = None
    notes: Optional[str] = None
    record_type: Optional[str] = None # consultation | lab | imaging | surgery | follow-up
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

#-----------------------------------------
# Schema for returning medical information 
# ----------------------------------------
class MedicalRecordResponse(MedicalRecordBase):
    id: int
    created_at: datetime
    updated_at: datetime
    

    class Config:
        orm_mode = True