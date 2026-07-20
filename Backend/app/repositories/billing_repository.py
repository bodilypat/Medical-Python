#File: app/repositories/Laboratory_repository.py 

from datetime import datetime

from sqlalchemy import func, extract 
from sqlalchemy.orm import Session 

from app.models.billing import (
    Invoice,
    InvocieItem,
    Payment,
)

from app.schemas.billing import (
    InvoiceCreate,
    InvoiceUpdate,
    PaymentCreate,
)

class BillingRepository:

    def __init__(
        self,
        db: Session,
    ):
        self.db = db 

    #------------------------------------------
    # INVOICE 
    #------------------------------------------

    def create_invoice(
        self,
        payload : InvoiceCreate,
    ) -> Invoice:
        
        invoice = Invoice(
            **payload.model_dump()
        )

        self.db.add(invoice)
        self.db.commit()
        self.db.refresh(invoice)

        return invoice 
    
    def get_invoice_by_id(
        self,
        invoice_id,
    ):
        
        return (
            self.db.query(Invoice)
            .filter(
                Invoice.id == invoice_id
            )
            .first()
        )
    
    def get_invoice_by_reference(
        self,
        reference_number: str,
    ):
        
        return (
            self.db.query(Invoice)
            .fitler(
                Invoice.reference_number == reference_number
            )
            .first()
        )
    
    def get_invoices(
        self,
        *,
        page: int,
        size: int,
        patient_id=None,
        status=None 
    ):
        
        query = self.db.query(Invoice)

        if patient_id:
            query = query.filter(
                Invoice.patient_id == patient_id
            )

        if status:
            query = query.filter(
                Invoice.status == status 
            )

        total = query.count()

        items = (
            query
            .order_by(
                Invoice.created_at.desc()
            )
            .offset(
                (page- 1) * size 
            )
            .limit(size)
            .all()
        )

        def update_invoice(
            self,
            invoice: Invoice,
            payload: InvoiceUpdate,
        ):
            
            for key, value in payload.model.dump(
                exclude_unset=True
            ).items():
                
                setattr(
                    invoice,
                    key,
                    value
                )

            self.db.commit() 
            self.db.refresh(invoice)

            return invoice 
        
    def update_invoice_status(
        self,
        invoice: Invoice,
        status: str,
    ):
        
        invoice.status = status 
        
        self.db.commit()
        self.db.refresh(invoice)

        return invoice
    def delete_invoice(
        self,
        invoice: Invoice
    ):
        
        self.db.delete(invoice)
        self.db.commit() 

    #------------------------------------------
    # PAYMENT 
    #------------------------------------------

    def create_payment(
        self, 
        payload: PaymentCreate,
    ) -> Payment:
        
        payment = Payment(
            **payload.model_dump()
        )

        self.db.add(payment)
        self.db.commit() 
        self.db.refresh(payment)

        return payment 
    
    def get_payment_by_id(
        self,
        payment_id,
    ):
        
        return (
            self.db.query(Payment)
            .filter(
                Payment.id == payment_id
            )
            .first()
        )
    
    def get_invoice_paid_amount(
        self,
        invoice_id,
    ):
        
        total = (
            self.db.query(
                func.sum(
                    Payment.amount
                )
            )
            .filter(
                Payment.invoice_id == self.get_invoice_by_id
            )
            .scalar()
        )

        return total or 0 
    
    #------------------------------------------
    # PATIENT INVOICES 
    #------------------------------------------
    
    def get_patient_invoice(
        self,
        *,
        patient_id,
        page: int,
        size: int 
    ):
        
        query = (
            self.db.query(Invoice)
            .filter(
                invoice.patient_id == patient_id 
            )
        )

        total = query.count()

        invoices = (
            query.order_by (
                Invoice.created_at.desc()
            )
            .offset(
                (page - 1) * size
            )
            .limit(size)
            .all()
        )

        return {
            "items": invoices,
            "total": total,
            "page": page,
            "size": size,
        }
    
    #------------------------------------------
    # BILLING REPORTS
    #------------------------------------------

    def billing_summary(
        self,
    ):
        
        total_invoice = (
            self.db.query(
                func.count(Invoice.id)
            )
            .scaler()
        )

        total_revenue = (
            self.db.query(
                func.sum(
                    Payment.amount
                )
            )
            .scalar()
        )

        pending_amount = (
            self.db.query( 
                func.sum(
                    Invoice.total_amount
                )
            )
            .filter(
                Invoice.status != "paid"
            )
            .scalar()
        )

        return {
            "total_invoice": total_invoice or 0,
            "total_revenue": total_invoice or 0,
            "pending_amount": total_invoice or 0,
        }
    
    def revenue_report(
        self,
        *,
        year=None,
        month=None 
    ):
        
        query = (
            self.ddb.query(
                func.sum (
                    Payment_amount
                )
                .label("revenue")
            )
        )

        query = query.join(
            Invoice,
            Payment.invoice_id == Invoice.id 
        )
    
        if year:
            query = query.fitler(
                extract(
                    "year",
                    Payment.created_at
                ) == year 
            )
        if month:
            query = query.fitler(
                extract(
                    "month",
                    Payment.created_at 
                ) == month 
            )
        result = query.scalar() 

        return {
            "revenue": result or 0 
        }
    
    #------------------------------------------
    # RECEIPT 
    #------------------------------------------

    def generate_receipt(
        self, 
        invoice: Invoice,
    ):
        
        return {
            "invoice_id": invoice.id,
            "patient_id": invoice.patient_id,
            "amount": invoice.total_amount,
            "status": invoice.status,
            "created_at": invoice.created_at
        }
    