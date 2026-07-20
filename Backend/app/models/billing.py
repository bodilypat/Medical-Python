#File: app/models/billing.py 

from enum import Enum 

from sqlalchemy import (
    Column,
    DateTime,
    Enum as SqlEnum,
    ForeignKey,
    Numeric,
    String,
    Text,
    func,
)

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.models.base import (
    Base,
    UUIDMixin,
    TimestampMixin,
)

#----------------------------------------------
# ENUM 
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
    BANK_TRANSFER = "bank_transfer"
    INSURANCE = "insurance"
    ONLINE = "online"

#----------------------------------------------
# INVOICE 
#----------------------------------------------

class Invoice(
    Base,
    UUIDMixin,
    TimestampMixin,
):
    
    __tablename__ = "invoices"

    invoice_number = Column(
        String(50),
        unique=True,
        nullable=False,
        index=True,
    )

    patient_id = Column(
        UUID(as_uuid=True),
        ForeignKey(
            "patient_id"
        ),
        nullable=False,
        index=True,
    )

    appointment_id = Column(
        UUID(as_uuid=True),
        ForeignKey(
            "appointment_id"
        ),
        nullable=True,
    )

    subtotal = Column(
        Numeric(12,2),
        nullable=False,
        default=0,
    )

    discount = Coulumn(
        Numeric(12,2),
        nullable=False,
        default=0,
    )

    tax = Column(
        Numeric(12,2),
        nullable=False,
        default=0,
    )

    total_amount = Column(
        Numeriic(12,2),
        nullable=False,
        default=0
    )

    status = Column(
        SqlEnum(
            InvoiceStatus
        ),
        nullable=False,
        default=InvoiceStatus.PENDING,
    )

    description = Column (
        Text,
        nullable=True,
    )

    items = relationship(
        "InvoiceItem",
        back_populates= "invoice",
        cascade ="all, delete-orphan",
    )

    payments = relationship(
        "Payment",
        back_populates="invoice",
        cascade="all, deleteorphan",
    )

    patient = relationship(
        "Patient",
        back_populates="invoices",
    )

    appointment = relationship(
        "Appointment",
    )

    def __repr__(self):
        return (
            f"<Invoice("
            f"number={self.invoice_number}, "
            f"amount={self.total_amount}"
            f")>"
        )
    
#----------------------------------------------
# INVOICE ITEM 
#----------------------------------------------

class InvoiceItem(
    Base,
    UUIDMixin,
):
    
    __tablename__ = "invoice_items"

    invoice_id = Column(
        UUID(as_uuid=True),
        ForeignKey(
            "invoices.id"
        ),
        nullable=False,
        index=Ture,
    )

    description = Column(
        String(255),
        nullable=False,
    )

    quantity = Column(
        Integer,
        nullable=False,
        default=1,
    )

    unit_price = Column(
        Numeric(12,2),
        nullable=False,
    )

    total_price = Column(
        Numeric(12,2),
        nullable=False,
    )

    invoice = relationship(
        "Invoice",
        back_populates="items",
    )

    def __repr__(self):
        return (
            f"<InvoiceItem("
            f"{self.description}" 
            f")>"
        )

#----------------------------------------------
# PAYMENT 
#----------------------------------------------

class Payment(
    Base,
    UUIDMixin
):
    
    __tablename__ = "payments"

    invoice_id = Column(
        UUID(as_uuid=True),
        ForeignKey(
            "invoices.id"
        ),
        nullable=False,
        index=True,
    )

    amount = Column(
        Numeric(12,2),
        nullable=False,
    )

    payment_method = Column(
        SqlEnum(
            PaymentMethod
        ),
        nullable=False,
    )

    transaction_reference = Column(
        String(255),
        nullable=True,
    )

    notes = Column(
        Text,
        nullable=True,
    )

    paid_at = Column(
        DateTime,
        nullable=False,
        server_default=func.now(),
    )

    invoice = relationship(
        "Invoice",
        back_populates="payments",
    )

    def __repr__(self):
        return (
            f"<Payment("
            f"invoice={self.invoice_id}," 
            f"amount={self.amount}"
            f")>"
        )
    

