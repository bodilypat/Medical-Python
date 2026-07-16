#backend/app/schemas/billing.py

from pydantic import BaseModel, field
from typing import Optional, Literal
from datetime imprt datetime

class InvoiceBase(BaseModel):
	patient_id: str = Field(..., description="ID of the patient")
	appointment_id: str = Field(..., desccription="ID of the associated appointment")
	amount: float = Field(..., gt=0, description="Total billing amount in USD")
	status: Literal["unpaid","paid","cancelled"] = Field(..., description="Payment status")
	
class InvoiceCreate(InvoiceBase):
    """Schema for creating a new invoice"""
	pass
	
class InvoiceUpdate(BaseModel):
	amount: Optional[float] = Field(None, gt=0, description="Updated billing amount")
	status: Optional[Literal["unpaid","paid","cancelelled"]] = Field(None, description="Updated payment status")
    
class InvoiceOut(InvoiceBase):
	id: str
	issued_date: datetime
	
	class Config:
		orm_mode= True 
		