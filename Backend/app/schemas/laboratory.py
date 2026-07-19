#File: app/schemas/laboratory.py 

from datetime import datetime 
from enum import Enum
from uuid import UUID
from pydantic import ( 
    BaseModel,
    ConfigDict,
    Field,
)

#----------------------------------------------
# ENUMS 
#----------------------------------------------

class LaboratoryTestStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

#----------------------------------------------
# LABORATORY TEST 
#----------------------------------------------

class LaboratoryTestBase(BaseModel):
    patient_id: UUID
    doctor_id: UUID
    test_name: str = Field(
        ...,
        max_length=255
    )

    category: str | None = None 
    description: str | None = None 

class LaboratoryTestCreate(LaboratoryTestBase):
    pass 

class LaboratoryTestUpdate(BaseModel):
    test_name: str | None = None 
    category: str | None = None 
    description: str | None = None 

class LaboratoryStatusUpdate(BaseModel):
    status: LaboratoryTestStatus 

class LaboratoryTestResponse(
    LaboratoryTestBase
):
    id: UUID 
    status: str | None = None 
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )

class LaboratoryTestListResponse(
    BaseModel
):
    items: list[LaboratoryTestResponse]
    total: int 
    page: int 
    size: int 

#----------------------------------------------
# LABORATORY RESULT 
#----------------------------------------------

class LaboratoryResultCreate(BaseModel):
    result_value: str
    result_unit: str | None = None 
    reference_range: str | None = None 
    remarks: str | None = None 

class LaboratoryResultResponse(BaseModel):
    id: UUID
    laboratory_test_id: UUID
    result_value: str 
    result_unit: str | None 
    reference_range: str | None     
    remarks: str | None 
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )

#----------------------------------------------
# REPORT RESPONSE 
#----------------------------------------------

class LaboratoryResponse(BaseModel):
    test_id: UUID
    file_name: str
    file_path: str 
    uploaded_at: datetime 

    
    
    