#app/schemas/doctor.py

from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

#---------------------------------------
# Base Doctor Schema (shared attributes)
#---------------------------------------
class DoctorBase(BaseModel):
    first_name: str
    last_name: str
    specialty: Optional[str] = None
    license_number: str
    email: EmailStr
    phone_number: Optional[str] = None
    experience_years: Optional[int] = None
    address: Optional[str] = None
    is_active: bool = True

#---------------------------------------
# Doctor Creation Schema
#---------------------------------------
class DoctorCreate(DoctorBase):
    user_id: int # Assuming each doctor is linked to a user account

#---------------------------------------
# Doctor Update Schema
#---------------------------------------
class DoctorUpdate(DoctorBase):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    specialty: Optional[str] = None
    license_number: Optional[str] = None
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = None
    experience_years: Optional[int] = None
    address: Optional[str] = None
    is_active: Optional[bool] = None

#---------------------------------------
# Schema for returning Doctor data
#---------------------------------------
class DoctorOut(DoctorBase):
    id: int
    user_id: int
    created_at: date
    updated_at: date
    
    class Config:
        orm_mode = True

