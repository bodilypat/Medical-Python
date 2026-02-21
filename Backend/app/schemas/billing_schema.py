#app/schemas/billing.py

from pydantic import BaseModel
from typing import Optional
from datetime import date

#---------------------------------------
# Base Billing Schema
#---------------------------------------
class BillingBase(BaseModel):
    patient_id: int
    appointment_id: Optional[int] = None
    prescription_id: Optional[int] = None
    total_amount: float
    paid_amount: Optional[float] = 0.0
    due_amount: Optional[float] = None
    payment_status: Optional[str] = "Pending" # |pending | paid | partial_paid | cancelled 
    payment_method: Optional[str] = None # | cash | card | insurance | online
    insurance_provider: Optional[str] = None
    insurance_claim_number: Optional[str] = None
    billing_date: Optional[date] = None
    notes: Optional[str] = None
    created_by: Optional[int] = None
    updated_by: Optional[int] = None
    is_active: Optional[bool] = True

#---------------------------------------
# Billing Create Schema
class BillingCreate(BillingBase):
    pass # Inherits all fields from BillingBase for creation

#---------------------------------------
# Billing Update Schema
#---------------------------------------
class BillingUpdate(BillingBase):
    patient_id: Optional[int]
    appointment_id: Optional[int]
    prescription_id: Optional[int]
    total_amount: Optional[float]
    paid_amount: Optional[float]
    due_amount: Optional[float]
    payment_status: Optional[str]
    payment_method: Optional[str]
    insurance_provider: Optional[str]
    insurance_claim_number: Optional[str]
    billing_date: Optional[date]
    notes: Optional[str]
    created_by: Optional[int]
    updated_by: Optional[int]
    is_active: Optional[bool]

#---------------------------------------
# Billing Response Schema
#---------------------------------------
class BillingResponse(BillingBase):
    id: int
    created_at: datetime 
    updated_at: datetime
    

    class Config:
        orm_mode = True




    