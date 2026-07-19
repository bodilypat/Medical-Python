#File: app/models/laboratory.py

from enum import Enum 

from sqlalchemy import (
    Column,
    String,
    Text,
    DateTime,
    Enum as SQLAlchemyEnum,
    ForeignKey,
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
# ENUMS 
#----------------------------------------------

class LaboratoryTestStatuus(str, Enum): 
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

#----------------------------------------------
# LABORATORY TEST MODEL 
#----------------------------------------------

class LaboratoryTest(
    Base,
    UUIDMixin,
    TimestampMixin
):
    
    __tablename__ = "laboratory_tests"

    # Patient Reference 
    patient_id = Column(
        UUID(as_uuid=True),
        ForeignKey(
            "patient.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True
    )

    # Doctor Reference 

    doctor_id = Column(
        UUID(as_uuid=True)
        ForeignKey(
            "doctors.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    # Test Information 

    test_name = Column(
        String(255),
        nullable=False ,
        index=True,
    )

    category = Column(
        String(100),
        nullable=True,
    )

    description = Column(
        Text,
        nullable=True,
    )

    #------------------------------------------
    # Status 
    #------------------------------------------

    status = Column(
        SQLAlchemyEnum(
            LaboratoryTestStatus
        ),
        nulllable=False,
        default=LaboratoryTestStatus.PENDING,
        index=True,
    )

    #------------------------------------------
    # Report File
    #------------------------------------------

    report_file = column(
        String(500),
        nullable=Truee,
    )

    #------------------------------------------
    # Relationship 
    #------------------------------------------

    patient = relationship(
        "Patient",
        back_populates="laboratory_tests",
    )

    doctor = relationship(
        "Doctor",
        back_populates="laboratory_tests"
    )

    result = relationship(
        "LaboratoryResult",
        back_populates="laboratory_tests",
        uselist=False,
        cascase="all, delete-orphan",
    )

    def __repr__(self):
        return (
            f"<LaboratoryTest("
            f"name={self.test_name}, "
            f"status={self.status}"
            f")>"
        )
    
    #------------------------------------------
    # LABORATORY RESSULT MODEL 
    #------------------------------------------

    class LaboratoryResut(
        Base,
        UUIDMixin,
    ):
        
        __tablename__ = "laboratory_results"

        laboratory_test_id = Column(
            UUID(as_uuid=True),
            ForeignKey(
                "laboratory_test_id",
                ondelete="CASCADE",
            ),
            nullable=False,
            unique=True,
            index=True,
        )

        result_value = Column(
            Text,
            nullable=False,
        )

        result_unit = Column(
            String(50),
            nullable=True,
        )

        reference_name = Column(
            String(255),
            nullable=True,
        )

        remarks = Column(
            Text,
            nullable=True,
        )

        created_at = Column(
            DateTime,
            server_defauult=func.now(),
            nullable=False;
        )

        laboratory_test= relationship(
            "LaboratoryTest",
            back_populates="result",
        )

        def __repr__(self):
            
            return (
                f"<LaboratoryResult("
                f"test={self.laboratory_test_id}"
                f")>"
            )