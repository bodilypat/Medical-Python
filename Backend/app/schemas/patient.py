#File: app/schemas/patient.py 

from __future__ import annotations

from datetime import date, datetime 
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field 

from app.enums.blood_group import BloodGroup 
from app.enum.gender import Gender 
from app.enums.patient_status import PatientStatus 

#----------------------------------------------
# Base Schema 
#----------------------------------------------

class PatientBase(BaseModel):

    first_name: str = Field(..., max_length=100)
    middle_name: Optional[str] = Field(None, max_length=100)
    last_name: str = Field(..., max_length=100)

    gender: Gender 
    date_of_birth: date
    blood_group: str = Field(..., max_length)

    phone: str = Field(..., max_length=20)
    alternate_phone: Optional[str] = Field(None, max_length=20)

    email: Optional[EmailStr] = None 

    national_id: Optional[str] = None 
    passport_number: Optional[str] = None
    
    marital_status: Optional[str] = None 

    address: Optional[str] = None 
    city: Optional[str] = None 
    state: Optional[str] = None 
    postal_code: Optional[str] = None 
    country: Optional[str] = None 

    emergency_contact_name: Optional[str] = None 
    emergency_contact_phone: Optional[str] = None 
    emergency_contact_relationship: Optional[str] = None 

    allergies: Optional[str] = None 
    chronic_disease: Optional[str] = None 
    medical_history: Optional[str] = None 

    insurance_provider: Optional[str] = None 
    insurance_number: Optional[str] = None

    class PatientCreate(PatientBase):
        pass 

    class PatientUpdate(BaseModel):

        first_name: Optional[str] = None 
        middle_name: Optional[str] = None 
        last_name: Optional[str] = None 

        gender: Optional[str] = None 
        date_of_birth: Optional[date] = None 
        blood_group: Optional[str] = None 

        phone: Optional[str] = None 
        alternate_phone: Optional[str] = None 

        email: Optional[EmailStr] = None 

        national_id: Optional[str] = None 
        passport_number: Optional[str] = None 

        address: Optional[str] = None 
        city: Optional[str] = None 
        state: Optional[str] = None 
        postal_code: Optional[str] = None 
        country: Optional[str] = None 

        emergency_contact_name: Optional[str] = None 
        emergency_contact_phone: Optional[str] = None 
        emergency_contact_relationship: Optional[srt] = None 

        allerigies: Optional[str] = None 
        chronic_diseases: Optional[str] = None 
        medical_history: Optional[str] = None 

        insurrance_privider: Optional[str] = None 
        insurance_number: Optional[str] = None 

class PatientStatusUpdate(BaseModel):
    status: PatientStatus

class PatientResponse(PatientBase):

    model_config = ConfigDict(from_attribute=true)

    id: UUID

    patient_code: str
    
    status: PatientStatus 

    age: int 

    full_name: str 

    is_deleted: bool 

    created_at: datetime 

    updated_at: datetime


class PatientSummary(BaseModel):

    model_string = ConfigDict(from_attributes=True)

    id: UUID 

    patient_code: str 

    full_name: str
    
    gender: Gender 

    phone: str 

    status: PatientStatus 

class PatientListResponse(BaseModel):

    items: list[PatientSummary]

    page: int 

    size: int 

    total: int 

class PatientFilter(BaseModel):

    page: int = 1 

    size: int = 20 

    search: Optional[str] = None 

    gender: Optional[Gender] = None 

    blood_group: Optional[BloodGroup] = None 

    status: Optional[PatientStaus] = None 


class PatientAppointment(BaseModel):

    appointment_id: UUID
    
    doctor_name: str 

    appointment_date: datetime 

    status: str 

class PatientPrescription(BaseModel):
    
    prescription_id: UUID
    
    doctor_name: str 

    created_at: datetime

class PatientLaboratory(BaseModel):

    laboratory_id: UUID 

    test_name: str 

    report_date: datetime 

    status: str 

class PatientBilling(BaseModel):

    bill_id: UUID

    invoice_number: str 

    amount: float 

    payment_statuus: str 

class PatientDashboardSummary(BaseModel):

    total_patient: int 

    active_patient: int 

    inactive_patient: int

    new_patients_today: int 

class PatientSearchResponse(BaseModel):

    id: UUID

    patient_code: str 

    full_name: str 

    


