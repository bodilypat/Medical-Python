#app/schemas/patient.py

from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date, datetime

#---------------------------------------
# Patient Base Schema (shared fields)
#---------------------------------------
class PatientBase(BaseModel):
    first_name: str
    last_name: str
    gender: str
    date_of_birth: date
    email: EmailStr
    phone_number: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    country: Optional[str] = None
    blood_group: Optional[str] = None
    allergies: Optional[str] = None
    medical_conditions: Optional[str] = None
    emergency_contact_info: Optional[str] = None
    assigned_doctor_id: Optional[int] = None
    next_appointment: Optional[datetime] = None
    insurance_provider: Optional[str] = None
    insurance_policy_number: Optional[str] = None
    is_active: bool = True
    is_deleted: bool = False
    
#---------------------------------------
# Patient Create Schema
#---------------------------------------
class PatientCreate(PatientBase):
    user_id: Optional[int] = None

#---------------------------------------
# Patient Update Schema details
#---------------------------------------
class PatientUpdate(PatientBase):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    gender: Optional[str] = None
    date_of_birth: Optional[date] = None
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    country: Optional[str] = None
    blood_group: Optional[str] = None
    allergies: Optional[str] = None
    emergency_contact_info: Optional[str] = None
    medical_conditions: Optional[str] = None
    insurance_provider: Optional[str] = None
    insurance_policy_number: Optional[str] = None
    is_active: Optional[bool] = None
    is_deleted: Optional[bool] = None
    user_id: Optional[int] = None

#---------------------------------------
# Patient Response Schema patient info
#---------------------------------------
class PatientResponse(PatientBase):
    id: int
    user_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True


