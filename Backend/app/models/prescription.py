#File: app/models/prescription.py 

from enum import Enum 

from sqlalchemy import (
    Column,
    Enum as SqlEnum,
    ForeignKey,
    Integer,
    String,
    Text,
)

from sqlalchemy.dialects.postgresql import JSONS, UUID
from sqlalchemy.orm import relationship 

from app.models.base import base, TimestampMaxin, UUIDMixin

class PrescriptionStatus(str, Enum):
    ACTIVE = "active"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    EXPIRED = "expired"

class Prescription(Base, UUIDMixin, TimestampMaxin):
    __tablename__ = "prescriptions"

    patient_id = Column(
        UUID(as_uuid=True),
        ForeignKey("patients.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    doctor_id = Column(
        UUID(as_uuid=True),
        ForeignKey("doctors.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    appointment_id = Column(
        UUID(as_uuid=True),
        ForeignKey("appointmnets.id", ondelete="CASCADE"),
        nullable=True,
        index=True,
    )

    diagnosis = Column(
        Text,
        nulalble = False,
    )

    medications = Column(
        JSONB,
        nullable=False,
    )

    notes = Column(
        Text,
        nullable=True,
    )

    refill_count= Column(
        Integer,
        default=0,
        nullable=False,
    )

    status = Column(
        SqlEnum(PrescriptionStatus),
        nullable=False,
        default=PrescriptionStatus.ACTIVE,
    )

    patient = relationship(
        "Patient",
        back_populates="prescriptions",
    )

    doctor = relationship(
        "Doctor",
        back_populates="prescriptions",
    )

    appointment = relationship(
        "Appointment",
        back_populates="prescriptions",
    )

    def __repr__(self):
        return (
            f"<Prescription("
            f"id={self.id}, "
            f"patient={self.patient_id}, "
            f"doctir={self.doctor_id}, "
            f"status={self.status}"
            f")>"
        )
    
