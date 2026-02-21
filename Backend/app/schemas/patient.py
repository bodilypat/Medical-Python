#app/schemas/patient.py

from pydantic import BaseModel
from typing import Optional
from datetime import date

class PatientBase(BaseModel):
    first_name: str
    last_name: str
    gender: str
    date_of_birth: Optional[date]
    contact_number: Optional[str]
    email: Optional[str]
    address: Optional[str]
    blood_group: Optional[str]

class PatientCreate(PatientBase):
    pass

class PatientUpdate(PatientBase):
    first_name: Optional[str]
    last_name: Optional[str]
    gender: Optional[str]
    date_of_birth: Optional[date]
    contact_number: Optional[str]
    email: Optional[str]
    address: Optional[str]
    blood_group: Optional[str]

class PatientResponse(PatientBase):
    patient_id: int

    class Config:
        orm_mode = True

        