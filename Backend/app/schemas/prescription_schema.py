#app/schemas/prescription.py

from pydantic import BaseModel
from typing import Optional
from datetime import datetime 

#-------------------------------------
# Base Prescription Schema
#-------------------------------------
class PrescriptionBase(BaseModel):
    patient_id: int
    doctor_id: int
    appointment_id: Optional[int] = None
    medication: str # List of medications + dosage instructions as text 
    instructions: Optional[str] = None
    notes: Optional[str] = None
    status: Optional[str] = "active"  # active | completed | cancelled
    valid_until: Optional[datetime] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

#-------------------------------------
# Schema for Creating a Prescription
#-------------------------------------
class PrescriptionCreate(PrescriptionBase):
    pass # Inherits all fields from PrescriptionBase

#-------------------------------------
# Schema for returning Prescription data
#-------------------------------------
class PrescriptionResponse(PrescriptionBase):
    id: int
    prescribed_at: datetime
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

