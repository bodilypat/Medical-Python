# app/schemas/appointment.py

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, validator
from app.core.constants import AppointmentStatus 

#-----------------------------------------------
# Base Appointment Schema (Shared Fields)
#-----------------------------------------------
class AppointmentBase(BaseModel):
    doctor_id: int = Field(..., description="ID of the doctor")
    appointment_date: datetime = Field(..., description="Date and time of the appointment")
    description: Optional[str] = Field(None, description="Description of the appointment")
    status: AppointmentStatus = Field(AppointmentStatus.SCHEDULED, description="Status of the appointment")
    reason: Optional[str] = Field(None, description="Reason for the appointment")
    notes: Optional[str] = Field(None, description="Additional notes for the appointment")

#-----------------------------------------------
# Appointment Creation Schema (Patient -> Create)
#-----------------------------------------------
class AppointmentCreate(AppointmentBase):
    patient_id: int = Field(..., description="ID of the patient")

    @validator('appointment_date')
    def validate_appointment_date(cls, v):
        if v < datetime.now():
            raise ValueError("Appointment date must be in the future")
        return v
    
#-----------------------------------------------------------
# Appointment Update Schema (Patient -> Reschedule / Cancel)
#-----------------------------------------------------------
class AppointmentUpdate(BaseModel):
    appointment_date: Optional[datetime] = Field(None, description="New date and time of the appointment")
    status: Optional[AppointmentStatus] = Field(None, description="Updated status of the appointment")
    reason: Optional[str] = Field(None, description="Updated reason for the appointment")
    notes: Optional[str] = Field(None, description="Updated notes for the appointment")

    @validator('appointment_date')
    def validate_appointment_date(cls, v):
        if v and v < datetime.now():
            raise ValueError("Appointment date must be in the future")
        return v
    
#------------------------------------------------------------
# Appointment Status Update (Doctor )
#------------------------------------------------------------
class AppointmentStatusUpdate(BaseModel):
    status: AppointmentStatus = Field(..., description="Updated status of the appointment")
    notes: Optional[str] = Field(None, description="Notes regarding the status update")

#------------------------------------------------------------
# Appointment Response Schema (API Output)
#------------------------------------------------------------
class AppointmentResponse(AppointmentBase):
    id: int = Field(..., description="ID of the appointment")
    patient_id: int = Field(..., description="ID of the patient")
    doctor_id: int = Field(..., description="ID of the doctor")
    appointment_date: datetime = Field(..., description="Date and time of the appointment")
    status: AppointmentStatus = Field(..., description="Status of the appointment")
    reason: Optional[str] = Field(None, description="Reason for the appointment")
    notes: Optional[str] = Field(None, description="Additional notes for the appointment")
    created_at: datetime = Field(..., description="Timestamp when the appointment was created")
    updated_at: datetime = Field(..., description="Timestamp when the appointment was last updated")

    class Config:
        orm_mode = True

        