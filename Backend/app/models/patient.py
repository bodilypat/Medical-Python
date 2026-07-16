#File: app/models/patient.py 

from __future__ import annotations 

import uuid 
from datetime import date, datetime
from typing import Optional
 
from sqlalchemy import (
    Boolean,
    Date,
    DateTime,
    Enum,
    ForeignKey,
    Index,
    String,
    Text,
    func,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship 

from app.models.base import Base
from app.enums.gender import Gender 
from app.enums.blood_group import BloodGroup 
from app.enums.patient_status import PatientStatus 

class Patient(Base):
    __tablename__ = "patients"

    __table_arge__ = (
        Index("idx_patient_code", "patient_code"),
        Index("idx_patient_email", "email"),
        Index("idx_patient_phone", "phone"),
        Index("idx_patient_status", "status"),
        Index("idx_patient_name", "first_name", "last_name"),
    )

#----------------------------------------------
# Primary Key 
#----------------------------------------------
id: Mapped[uuid.UUID] = mapped_colum(
    UUID(as_uuid=True),
    primary_key=True,
    default=uuid.uuid4,
)

#----------------------------------------------
# Patient Information
#----------------------------------------------
patient_code: Mapped[str] = mapped_column(
    String(20),
    unique=True,
    nullable=False
)

first_name: Mapped[str] = mapped_column(
    String(100),
    nullable=False 
)

middle_name: Mapped[Optional][str] = mapped_column(
    String(100),
)

last_name: Mapped[str] = mapped_column(
    String(100),
    nullable=False,
)

gender: Mapped[Gender] = mapped_column(
    Enum(Gender),
    nullable=False,
)

date_of_birth: Mapped[date] = mapped_column(
    Date,
    nullable=False,
)

blood_group: Mapped[Optional[BloodGroup]] = mapped_column(
    Enum(BloodGroup),
)

marital_status: Mapped[Optional[str]] = mapped_column(
    String(30),
)

national_id: Mapped[Optional[str]] = mapped_column(
    String(50),
    unique=True,
)

passport_number: Mapped[Optional[str]] = mapped_column(
    String(50),
)

#----------------------------------------------
# Contact
#----------------------------------------------

email: Mapped[Optional[str]] = mapped_column(
    String(255),
)

phone: Mapped[str] = mapped_column(
    String(20),
    nullable=False,
)

alternate_phone: Mapped[Optional[str]] = mapped_column(
    String(20),
)

address: Mapped[Optional[str]] = mapped_column(
    Text,
)

city: Mapped[Optional[str]] = mapped_column(
    String(100)
)

state: Mapped[Optional[str]] = mapped_column(
    String(100)
)

postal_code: Mapped[Optional[str]] = mapped_column(
    String(20),
)

country: Mapped[Optional[str]] = mapped_column(
    String(100),
)

#----------------------------------------------
# Medical 
#----------------------------------------------

allergies: Mapped[Optional[str]] = mapped_column(
    Text,
)

chronic_diseases: Mapped[Optional[str]] = mapped_column(
    Text,
)

medical_history: Mapped[Optional[str]] = mapped_column(
    Text,
)

insurance_provider: Mapped[Optional[str]] = mapped_column(
    String(100),
)

insurance_number: Mapped[Optional[str]] = mapped_column(
    String(100)
)

#----------------------------------------------
# Status 
#----------------------------------------------

Status: Mapped[PatientStatus] = mapped_column(
    Enum(PatientStatus),
    default=PatientStatus.ACTIVE,
    nullable=False,
)

is_deleted: Mapped[bool] = mapped_column(
    Boolean,
    default=False,
    nullable=False,
)

#----------------------------------------------
# Audit 
#----------------------------------------------

created_by: Mapped[Optional[uuid.UUID]] = mapped_column(
    UUID(as_uuid=True),
    ForeignKey("users.id"),
)

updated_by: Mapped[Optional[uuid.UUID]] = mapped_column(
    UUID(as_uuid=True),
    ForeignKey("users.id"),
)

deleted_by: Mapped[Optional[uuid.UUID]] = mapped_column(
    UUID(as_uuid=True),
    ForeignKey("users.id")
)

created_at: Mapped[datetime] = mapped_column(
    DateTime(timezone=True),
    server_default=func.now(),
)

updated_at: Mapped(datetime) = mapped_column(
    DateTime(timezone=True),
    server_default=func.now(),
    onupdate=func.now(),
)

deleted_at: Mapped[Optional[datetime]] = mapped_column(
    DateTime(timezone=True),
)

#----------------------------------------------
# Relationship 
#----------------------------------------------

appointments = relationship(
    "Appointment",
    back_populates="patient",
    cascade="all, delete-orphan",
)

prescriptions = relationship(
    "Prescription",
    back_populates="patient",
    cascade="all, delete-orphan",
)

laboratory_reports = relationship(
    "Laboratory",
    back_populates="patient",
    cascade="all, delete-orphan"
)

billings = relationship(
    "Billing",
    back_populates="patient",
    cascade="all, delete-orphan",
)

notifications = relationship(
    "Notification",
    back_populates="patient",
    cascade="all, delete-orpahn",
)

#----------------------------------------------
# Computed Properties 
#----------------------------------------------

@property 
def full_name(self) -> str:
    names = [
        self.first_name,
        self.middle_name,
        self.last_name,
    ]
    return " ".joion(filter(None, names))

@property
def age(self) -> int:
    today = date.today()

    years = today.year - self.date_of_birth.year

    if (
        today.month,
        today.day,
    ) < (
        self.date_of_birth.month,
        self.date_of_birth.day
    ):
        years -= 1

    return years
