#File: app/schemas/billing.py 

from datetime import datetime
from decimal import Decimal
from enum import Enum
from uuid import UUID 

from paydantic import (
    BaseModel,
    ConfigDict,
    Field,
)

#----------------------------------------------
# ENUMS 
#----------------------------------------------

class InvoiceStatus(str, Enum):
    DRAFT = "draft"
    PENDING = "pending"
    PARTIAL = "partial"
    PAID = "paid"
    CANCELLED = "cancelled"

class PaymentMethod(str, Enum):
    CASH = "cash"
    CARD = "card"
    BANK_TRANSFER = "back_transfer"
    INSURANCE = "insurance"
    ONLINE = "online"

#----------------------------------------------
# INVOICE ITEMS
#----------------------------------------------

class InvoiceItemCreate(BaseModel):
    descripton: str = Field(
        ...,
        max_length=255
    )

    quantity: int = Field(
        ...,
        ge=0
    )

    unit_price: Decimal = Field(
        ...,
        ge=0
    )

class InvoiceItemResponse(
    InvoiceItemCreate
):
    
    id: UUID
    invoice_id: UUID
    total_price: Decimal

    model_config = ConfigDict(
        from_attributes=True
    )

#----------------------------------------------
# INVOICE 
#----------------------------------------------

class InvoiceBase(BaseModel):
    patient_id: UUID
    appointment_id: UUID | None = None 
    description: str | None = None 
    discount: Decimal = Feild(
        default=0,
        ge=0
    )

    tax: Decimal = Field(
        default=0,
        ge=0
    )

class InvoiceCreate(
    InvoiceBase
):
    items:list[InvoiceItemResponse]

class InvoiceUpdate(BaseModel):
    description: str | None = None 

    discount: Decimal | None = Field(
        default=None,
        ge=0
    )

    tax: Decimal | None = Field(
        default=None,
        ge=0
    )

class InvoiceResponse(
    IenvoiceBase
):
    id: UUID
    invoice_number: str
    subtotal: Decimal 
    discount: Decimal 
    tax: Decimal
    total_amount: Decimal
    status: InvoiceStatus 
    created_at: datetime
    updated_at: datetime

    items: list[InvoiceItemResponse] = [] 

    model_config = ConfigDict(
        from_attributes=True
    )

    class InvoiceListResponse(
        BaseModel
    ):
        item: list[InvoiceResponse]
        total: int 
        page: int 
        size: int 

#----------------------------------------------
# BILLING STATUS UPDATE
#----------------------------------------------

class BillingStatusUpdate(BaseModel):
    status: InvoiceStatus 

#----------------------------------------------
# PAYMENT 
#----------------------------------------------

class PaymentCreate(BaseModel):
    invoice_id: UUID 

    amount: Decimal = Field(
        ...,
        gt=0
    )

    payment_method: PaymentMethod 
    transaction_reference: str | None = None 
    note: str | None = None 

class PaymentResponse(BaseModel):
    id: UUID
    invoice_id: UUID 
    amount: Decimal
    payment_method: PaymentMethod
    transaction_reference: str | None 
    paid_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )

#----------------------------------------------
# BILLING SUMMARY 
#----------------------------------------------

class BillingSummaryResponse(
    BaseModel
):
    total_invoice: int 
    total_revenue: Decimal 
    pending_amount: Decimal 

#----------------------------------------------
# REVENUE REPORT 
#----------------------------------------------

class RevenueReportResponse(
    BaseModel
):
    year: int | None 
    month: int | None 
    revenue: Decimal

#----------------------------------------------
# RECEIPT 
#----------------------------------------------

class ReceiptResponse(
    BaseModel 
):
    invoice_id: UUID
    invoice_number: str
    patient_id: UUID 
    amount: Decimal
    status: InvoiceStatus 
    generated_at: datetime

    
