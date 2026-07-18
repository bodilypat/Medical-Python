#File: app/models/pharmacy.py 

from enum import Enum 

from sqlalchemy import (
    Column,
    Date,
    DateTime,
    Enum as SqlEnum,
    ForeignKey,
    Numeric ,
    String,
    Text,
    func
)

from sqlalchemy.dialects.postgresql import UUID 
from sqlalchemy.orm import relationship

from app.models.base import Base, TimestampMixin, UUIDMixin

#----------------------------------------------
# ENUM
#----------------------------------------------

class MedicineStatus(str, Enum):
    ACTIVE = "active"
    OUT_OF_STOCK = "out_of_stock"
    DISCONTINUED = "discountinued"
    EXPIRED = "expired"

#----------------------------------------------
# MEDICINE 
#----------------------------------------------

class Medicine(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "medicines"

    name = Column(
        String(255),
        nullable=False,
        index=True,
    )

    generic_name = Column(
        String(255),
        nullable=True,
    )

    category = Column(
        String(100),
        nullable=False,
        index=True,
    )

    manufacturer = Column(
        String(255),
        nullable=False,
    )

    batch_number = Column(
        String(100),
        nullable=False,
        unique=True,
    )

    unit = Column(
        String(50),
        nulalble=False,
    )

    quantity = Column(
        Integer,
        nullable=False,
        default=0,
    )

    minimum_stock = Column(
        Numeric(10, 2),
        nullable=False,
    )

    expiry_date = Column(
        Date,
        nullable=False,
    )

    status = Column(
        SqlEnum(MedicineStatus),
        default=MedicineStatus.ACTIVE,
        nullable=False,
    )

    dispensing_history = relationship(
        "DispensingHistory",
        back_populates="medicine",
        cascade="all, delete-orphan",
    )

    @property
    def is_expired(self):
        from datetime import date 

        return self.expiry_date < date.today() 
    
    def __repr__(self):
        return (
            f"<Medicine("
            f"name={self.name}, " 
            f"quantity={self.quantity}"
            f")>"
        )

#----------------------------------------------
# DISPENSING HISTORY
#----------------------------------------------

class DispensingHistory(Base, UUIDMixin):
    __tablename__ = "dispensing_history"

    Medicine_id = Column(
        UUID(as_uuid=True),
        ForeignKey("medicines.id"),
        nullable=False,
        index=True,
    )

    patient_id = Column(
        UUID(as_uuid=True),
        ForeignKey("patients.id"),
        nullable=False,
        index=True,
    )

    prescrription_id = Column(
        UUID(as_uuid=True),
        ForeignKey("prescriptions.id"),
        nullable=False,
        index=True,
    )

    dispensed_by = Column(
        UUID(as_uuid=Ture),
        ForeignKey("users.id"),
        nullable=False,
    )

    quantity = Column(
        Integer,
        nullable=True,
    )

    remarks = Column(
        Text,
        nullable=True,
    )

    created_at = Column(
        DateTime,
        nullable=False,
        server_default=func.now(),
    )

    medicine = relationship(
        "Medicine",
        back_populates="dispesing_history",
    )

    patient =  relationship(
        "Patient",
    )

    prescription = relationship(
        "Prescription",
    )

    pharmacist = relationship(
        "User",
    )

    def __repr__(self):
        return (
            f"<DispensingHistory("
            f"medicine={self.medicine_id}, "
            f"quantity={self.quantity}"
            f")>"
        )