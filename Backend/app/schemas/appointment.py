#app/schemas/appointment.py

from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AppointmentBase(BaseModel):
    patient_id: int
    doctor_id: int
    appointment_date: datetime
    status: Optional[str] = "scheduled"

class AppointmentCreate(AppointmentBase):
    pass

class AppointmentUpdate(BaseModel):
    appointment_date: Optional[datetime] 
    status: Optional[str] 

class AppointmmentResponse(AppointmentBase):
    appointment_id: int

    class Config:
        orm_mode = True


        

