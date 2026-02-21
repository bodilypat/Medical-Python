#app/schemas/doctor.py

from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

class DoctorBase(BaseModel):
    first_name: str
    last_name: str
    specialization: Optional[str]
    phone_number: Optional[str]
    email: Optional[EmailStr]
    consultation_fee: Optional[float]
    joined_at: Optional[date]

class DoctorCreate(DoctorBase):
    pass

class DoctorUpdate(DoctorBase):
    first_name: Optional[str]
    last_name: Optional[str]
    specialization: Optional[str]
    phone_number: Optional[str]
    email: Optional[EmailStr]
    consultation_fee: Optional[float]
    joined_at: Optional[date]

class Doctor(DoctorBase):
    doctor_id: int

    class Config:
        orm_mode = True

        