#File: app/api/v1/billing.py

from uuid import UUID 

from fastapi import APIRouter, Depends, Path, Query, status 

from app.core.dependencies import get_current_user 
from app.schemas.billing import(
    InvoiceCreate,
    InvoiceUpdate,
    InvoiceResponse,
    invoiceListResponse,
    PaymentCreate,
    PaymentResponse,
    BillingStatusUpdate,
)

from app.services.billing_service import BillingService 

router = APIRouter()

@router.post(
    "/invoices",
    response_code=status.HTTP_204_CREATED,
    summary="Create invoice",
)
async def create_invoice(
    payload: InvoiceCreate,
    current_user=Depends(get_current_user),
):
    return await BillingService.create_invoice(payload)

@router.get(
    "/invoices",
    response_model=invoiceListResponse,
    summary="Get Invoices",
)
async def get_invoices(
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    patient_id: UUID | None = Query(None),
    status_filter: str | None = Query(None, alias="status"),
    current_user=Depends(get_current_user),
):
    return await BillingService.get_invoices(
        page=page,
        size=size,
        patient_id=patient_id,
        status=status_filter,
    )

@router.get(
    "/invoices/{invoice_id}",
    response_model=InvoiceResponse,
    summary="Get Invoice",
)
async def get_invoice(
    invoice_id: UUID = Path(...),
    current_user=Depends(get_current_user),
): 
    return await BillingService.get_invoice(invoice_id)

@router.put(
    "/invoices/{invoice_id}",
    response_model=InvoiceResponse,
    summary="Update Invoice",
)
async def update_invoice(
    invoice_id: UUID,
    payload: InvoiceUpdate,
    current_user=Depends(get_current_user)
):
    return await BillingService.update_invoice(
        invoice_id,
        payload,
    )

@router.patch(
    "/invoices/{invoice_d}/status",
    response_model=InvoiceResponse,
    summary="Update Invoice Status",
)
async def update_invoice_status(
    invoice_id: UUID,
    payload: BillingStatusUpdate,
    current_user=Depends(get_current_user)
):
    return await BillingService.update_status(
        invoice_id,
        payload.status,
    )

@router.delete(
    "/invoices/{invoice_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete Invoice",
)
async def delete_invoice( 
    invoice_id: UUID,
    current_user=Depends(get_current_user)
):
    await BillingService.delete_invoice(invoice_id)

@router.post(
    "/payments",
    response_model=PaymentResponse,
    summary="Record Payment",
)
async def create_payment(
    payload: PaymentCreate,
    current_user=Depends(get_current_user),
):
    return await BillingService.get_payment(payload)

@router.get(
    "/payments/{payment_id}",
    response_model=PaymentResponse,
    summary="Get Payment",
)
async def get_payment(
    payment_id: UUID,
    current_user=Depends(get_current_user),
):
    return await BillingService.get_payment(payment_id)

@router.get(
    '/payments/{patient_id}/invoices',
    response_model=invoiceListResponse,
    summary="Patient Invoices",
)
async def get_patient_invoices(
    patient_id: UUID,
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    current_user=Depends(get_current_user),
):
    return await BillingService.get_patient_invoices(
        patient_id=patient_id,
        page=page,
        size=size,
    )

@router.get(
    "/summary",
    summary="Billing Summary",
)
async def billing_summary(
    current_user=Depends(get_current_user),
):
    return await BillingService.get_summary()

@router.get(
    "/repors/revenue",
    summary="Revenue Report",
)
async def revenue_report(
    year: int | None = Query(None),
    month: int | None = Query(None, ge=1, le=12)
):
    return await BillingService.get_revenue_report(
        year=year,
        month=month,
    )

@router.get(
    "/invoices/{invoice_id}/receipt",
    summary="Download Receipt",
)
async def download_receipt(
    invoice_id: UUID,
    current_user=Depends(get_current_user)
):
    return await BillingService.download_recept(invoice_id)