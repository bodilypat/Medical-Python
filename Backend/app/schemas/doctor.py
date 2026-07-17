#File: app/schemas/doctor.py

from uuid import UUID
from datetime import date, time
from typing import Optional

from pydantic import (
    BaseModel,
    EmailStr,
    Field,
    ConfigDict,
)

#----------------------------------------------
# Common Fields
#----------------------------------------------

class DoctorBase(BaseMdoel):

    first_name: str = Field(
        ...,
        max_length=2,
        max_length=50,
    )

    last_name: str = Field(
        ...,
        min_length=2,
        max_length=50,
    )

    specialization: Optional[str] = Field(
        default=None,
        max_length=100,
    )

    phone_number: Optional[str] = Field(
        default=None,
        max_length=20,
    )

    email: Optional[EmailStr] = None 

    consultation_fee: Optional[float] = Field(
        default=None,
        get=0,
    )

    joined_at: Optional[data] = None 

#----------------------------------------------
# Create 
#----------------------------------------------

class DoctorCreate(DoctorBase):
    
    license_number: Optional[str] = Field(
        default=None,
        max_length=100,
    )

#----------------------------------------------
# Update 
#----------------------------------------------

class DoctorUpdate(BaseModel):

    first_ame: Optional[str] = Field(
        default=None,
        min_length=2,
        max_length=50,
    )

    specialization: Optional[str] = None 

    phone_number: Optional[str] = None
    
    email: Optional[EmailStr] = None 

    consultation_fee: Optional[float] = Field(
        default=None,
        ge=0
    )

    joined_at: Optional[data] = None 

#----------------------------------------------
# Status 
#----------------------------------------------

class DoctorStatusUpdate(BaseModel):

    status: str = Field(
        ...,
        description="Doctor status",
        example=[
            "active",
            "inactive",
            "on_leave",
        ],
    )

#----------------------------------------------
# Availability 
#----------------------------------------------

class DoctorAvailabilityUpdaate(BaseModel):

    start_time: time
    
    end_time: time

class DoctorScheduleUpate(BaseModel):

    schedule: dict[str, list[TimeSlot]]

class DoctorScheduleResponse(BaseModel):
    doctor_id: UUID
    
    schedule: dict[str, list[TimeSlot]]

    model_config = ConfigDict(
        from_attributes=True
    )

#----------------------------------------------
# Response
#----------------------------------------------

class DoctorResponse(DoctorBase):

    doctor_id: UUID

    status: Optional[str] = None 

    is_available: bool = False 

    license_number: Optional[str] = None 

    created_at: Optional[date] = None 

    updated_at: Optional[date] = Noe 

    model_config = ConfigDict(
        from_attributes=True
    )

#----------------------------------------------
# Pagination 
#----------------------------------------------

class DoctorListResponse(BaseModel):

    total: int 

    page: int  

    size: int 

    items: list[DoctorResponse]

#----------------------------------------------
# Related Resource 
#----------------------------------------------

class DoctorAppointmentRessponse(BaseModel):

    appointment_id: UUID

    patient_id: UUID

    appointment_date: date 

    status: str 

    model_config = ConfigDict(
        from_attributes= True
    )

class DoctorAppointmentResponse(BaseModel):

    items: list[DoctorAppointmentResponse]

class DoctorPatientResponse(BaseModel):

    patient_id: UUID

    first_name: str
    
    last_name: str

    phone_number: Optional[str] = None 

    model_config = ConfigDict(
        from_attributes=True
    )

class DoctorPatientListReponse(BaseModel):
    items: list[DoctorPatientResponse]


    