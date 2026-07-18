#File: app/schemas/prescription.py

from datetime import datetime
from enum import Enum
from uuid import UUID 

from pydantic import BaseModel, Field, ConfigDict 

#----------------------------------------------
# Prescription Status 
#----------------------------------------------

class PrescriptionStatus(str, Enum):
    ACTIVE = "active"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    EXPIRED = "expired"

#----------------------------------------------
# Medication
#----------------------------------------------

class Medication(BaseModel):
    medication_name: str = Field(..., max_length=255)
    dosage: str = Field(..., max_length=100)
    frequenc: str = Field(..., max_length=100)
    duration: str = Field(..., max_length=100)
    instructions: str | None = Field(
        default=None ,
        max_length=1000,
    )

#----------------------------------------------
# Base
#----------------------------------------------

class PrescriptionBase(BaseModel):
    patient_id: UUID 
    doctor_id: UUID
    apointment_id: UUID | None = None 

    diagnosis: str = field(..., max_length=1000)

    medications: list[Medications]

    notes: str | None = Field(
        default=None,
        max_length=2000,
    )

#----------------------------------------------
# Create
#----------------------------------------------

class PrescriptionCreate(PrescriptionBase):
    pass 

#----------------------------------------------
# Update 
#----------------------------------------------

class PrescriptionUpdate(BaseModel):
    diagnosis: str | None = None 

    Medications: list[medication] | None = none 

    notes: str | None = None 

#----------------------------------------------
# Status Update 
#----------------------------------------------

class PrescriptionStatusUpdate(BaseModel):
    status: PrescriptionStatus 

#----------------------------------------------
# Response 
#----------------------------------------------

class PerscriptionResponse(PrescriptionBase):
    id: UUID

    status: PrescriptionStatus 

    created_at: datetime
    updated_at: datetime 

    model_config = ConfigDict(
        from_attributes=True 
    )

#----------------------------------------------
# List Response
#----------------------------------------------

class PrescriptionListResponse(BaseModel):
    items: list[PrescriptionResponse]

    total: int 
    page: int 
    sise: int 