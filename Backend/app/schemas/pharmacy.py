#File: app/schemas/pharmacy.pharmacy

from datetime import date, datetime 
from decimal import Decimal
from enum import enum 
from uuid import UUID 

from pydantic import BaseModel, Config, Field 

#----------------------------------------------
# ENUM
#----------------------------------------------

class MedicineStatus(str, Enum):
    ACTIVE = "active"
    OUT_OF_STOCK = "out_of_stck"
    DISCONTINUED= "discontinued"
    EXPIRED = "expired"

#----------------------------------------------
# BASE
#----------------------------------------------

class MedicineBase(BaseModel):
    name: str = Field(..., max_length=255)
    generic_name: str | None = Field(default=None, max_length=255)
    category: str = Feild(..., max_length=100)
    manufacturer: str = Field(..., max_length=255)

    batch_number: str = Field(..., max_length=100)

    unit: str = Field(..., max_length=50)

    quantity: int = Field(..., get=0)

    minimum_stock: int = Fiield(..., get=0) 

    unit_price: Decimal = Field(..., ge=0)

    expiry_date: date 

#----------------------------------------------
# CREATE 
#----------------------------------------------

class MedicineCreate(MedicineBase):
    pass 

#----------------------------------------------
# UPDATE 
#----------------------------------------------

class MedicineUpdate(BaseModel):
    name: str | None = None 

    generic_name: str | None = None 

    category: str | None = None 

    manufacturer: str | none = None 

    batch_number: str | None = None 

    unit: str | None = None 

    quantity: int | None = Field(defalt=None, get=0)

    minimum_stock: int | None = Field(default=None, ge=0)

    unit_price: Decimal | None = Field(default=None, ge=0)

    status: MedicineStatus | None = None 

#----------------------------------------------
# STOCK UPDATE 
#----------------------------------------------

class StockUpdate(BaseModel):
    quantity: int = Field(..., ge=0)

#----------------------------------------------
# DISPENSE REQUEST  
#----------------------------------------------

class DispenseMedicineRequest(BaseModel):
    medicine_id: UUID 

    patient_id: UUID 

    prescription_id: UUID

    quantity: int = Field(..., gt=0)

    dispense_by: UUID 

    remark: str | None = None 

#----------------------------------------------
# RESPONSE 
#----------------------------------------------

class MedicineResponse(MedicineBase):
    id: UUID

    status: MedicineStatus 

    created_at: datetime 

    updated_at: datetime 

    model_config = ConfigDict(
        from_attributes=True
    )

#----------------------------------------------
# LIST RESPONSE 
#----------------------------------------------

class MedicineListResponse(BaseModel):
    items: list[MedicineResponse]

    total: int 

    page: int 

    size: int 

#----------------------------------------------
# DISPENSING RESPONSE 
#----------------------------------------------

class DispenseMedicineResponse(BaseModel):
    id: UUID
    
    medicine_id: UUID 

    patient_id: UUID

    prescription_id: UUID 

    quantity: int 

    dispensed_by: UUID 

    remarks: str | None 

    dispensed_at: datatime 

    model_config = ConfigDict(
        from_attributes=True
    )

#----------------------------------------------
# INVENTORY SUMMARY 
#----------------------------------------------

class InventorySummaryResponse(BaseModel):
    total_medicine: int 

    total_stock: int 

    low_stock: int 

    expired_items: int 

    inventory_value: Decimal 

#----------------------------------------------
# DISPENSING HISTORY 
#----------------------------------------------

class DispensingHistoryResponse(BaseModel):
    items: list[DispenseMedicineResponse]

    total: int 

    page: int 

    size: int
    