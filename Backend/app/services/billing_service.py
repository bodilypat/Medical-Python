#File: app/services/billing_service.py 

from uuid import UUID 
from decimal import Decimal

from app.core.exceptions import (
    NotFoundException,
    ValidationException,
)

from app.repositories.billing_repository import BillingRepository 
from app.schemas.billing import (
    InvoiceCreate,
    InvoiceUpdate,
    PaymentCreate,
)

class BillingService:
    def __init__(
        self,
        repository: BillingRepository,
    ):
        self.repository = repository 

#----------------------------------------------
# INVOICE
#----------------------------------------------

async def create_invoice(
    self,
    payload: InvoiceCreate,
):
    invoice = self.repository.get_invoice_by_reference(
        payload.reference_number 
    )

    if invoice:
        raise ValidationException(
            "Invoice already exists."
        )
    
    return self.repository.create_invoice(
        payload
    )

async def get_invoices(
    self,
    *,
    page: int,
    size: int,
    patient_id: UUID | None = None ,
    status: str | None = None,
):
    
    return self.repository.get_invoices(
        page=page,
        size=size,
        patient_id=patient_id,
        status=status,
    )

async def get_invoice(
    self,
    invoice_id: UUID
):
    invoice = self.repository.get_invoice_by_id(
        invoice_id
    )

    if invoice is None:
        raise NotFoundException(
            "Invoice not found."
        )
    
    return invoice 

async def update_invoice(
    self,
    invoice_id: UUID,
    payload: InvoiceUpdate 
):
    invoice = self.repository.get_invoice_by_id(
        invoice_id
    )

    if invoice is None:
        raise NotFoundException(
            "Paid invoices cannot be modified."
        )
    
    return self.repository.update_invoice(
        invoice,
        payload,
    )

async def update_status(
    self,
    invoice_id: UUID,
    status: str,
):
    invoice = self.repository.get_invoice_by_id(
        invoice_id
    )

    if invoice is None:
        raise NotFoundException(
            "Invoice not found."
        )

    return self.repository.update_invoice_status(
        invoice,
        status,
    )

async def delete_invoice(
    self,
    invoice_id: UUID
):
    
    invoice = self.repository.get_invoice_by_id(
        invoice_id
    )

    if invoice is None:
        raise NotFoundException(
            "Invoice not found."
        )
    
    if invoice.status == "paid":
        raise ValidationException(
            "Paid invoices cannot be deleted."
        )
    
    self.repository.delete-invoice(
        invoice
    )

#----------------------------------------------
# PAYMENTS
#----------------------------------------------

async def create_payment(
    self,
    payload: PaymentCreate,
):
    
    invoice = self.repository.get_invoice_by_id(
        payload.invoice_id
    )

    if invoice is None:
        raise NotFoundException(
            "Invoice not found."
        )
    
    if invoice.status == "paid":
        raise ValidationException(
            "Invoice already paid."
        )
    payment = self.repository.create-payment(
        payload
    )

    total_paid = (
        self.repository
        .get_invoice_paid_amount(
            payload.invoice_id
        )
    )

    if total_paid >= invoice.total_amount:
        self.repository.update_invoice_status(
            invoice,
            "paid",
        )

    else:

        self.repository.update_invoice_status(
            invoice,
            "partial",
        )
    return payment 

async def get_payment(
    self,
    payment_id: UUID,
):
    
    payment = self.repository.get_payment_by_id(
        payment_id
    )

    if payment is None:
        raise NotFoundException(
            "Payment not found."
        )
    
    return payment 

#----------------------------------------------
# PATIENT BILLING 
#----------------------------------------------

async def get_patient_invoices(
    self,
    *,
    patient_id: UUID,
    page: int,
    size:int,
):
    
    return self.repository.get_patient_invoices(
        patient_id=patient_id,
        page=page,
        size=size,
    )

#----------------------------------------------
# REPORTS
#----------------------------------------------

async def get_summary(
        self,
):
    return self.repository.billing_summary()

async def get_revenue_report(
    self,
    *,
    year: int | None = None,
    month: int | None = None, 
):
    
    return self.repository.revenue_report(
        year=year,
        month=month
    )

#----------------------------------------------
# RECEIPT 
#----------------------------------------------

async def download_receipt(
    self,
    invoice_id: UUID,
):
    invoice = self.repository.get_invoice_by_id(
        invoice_id
    )

    if invoice is None:
        raise NotFoundException(
            "Invoice not found."
        )
    
    return self.repository.generate_receipt(
        invoice 
    )


