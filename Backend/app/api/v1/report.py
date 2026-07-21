#File: app/models/report.py 

from enum import Enum
from sqlalchemy import (
    Column,
    String,
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
)

#----------------------------------------------
# ENUMS
#----------------------------------------------

class ReportType(str, Enum):
    DASHBOARD = "dashbaord"
    PATIENT = "patients"
    APPOINTMENT = "appointments"
    BILLING = "billing"
    LABORATORY = "laboratory"
    PHARMACY = "pharnacy"

class ReportFormart(str, Enum):
    PDF = "pdf"
    EXCEL = "excel"
    CSV = "csv"

class ReportStatus(str, Enum):
    GENERATED = "generated"
    PROCESSING = "processing"
    FAILED = "failed"

#----------------------------------------------
# REPORT MODEL 
#----------------------------------------------

class Report(
    Base,
    UUIDMixin
):
    
    __tablename__ = "reports"

    #------------------------------------------
    # User who generated report 
    #==========================================

    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey(
            "users.id",
            ondeelte="SET NULL",
        ),
        nullable=True,
        index=True,
    )

    #------------------------------------------
    # Report Information 
    #==========================================

    report_typpe = Column(
        SQLAlchemyEnum(
            ReportType
        ),
        nullable=False,
        index=True,
    )

    report_format = Column(
        SQLAlchemyEnum(
            ReportFormat 
        ),
        nullable=False,
    )

    status = Column(
        SQLAlchemyEnum(
            ReportStatus 
        ),
        nullable=False,
        default=ReportStatus.PROCESSING,
    )

    title = Column(
        String(255),
        nullable=False,
    )

    description = Column(
        Text,
        nullable=True,
    )

    #------------------------------------------
    # Data Filters 
    #==========================================

    start_date = Column(
        DateTime,
        nullable=True,
    )

    end_date = Column(
        DateTime,
        nullable=True,
    )

    #------------------------------------------
    # File Information 
    #==========================================

    file_name = Column(
        String(255),
        nullable=True,
    )

    file_path = Column(
        String(500),
        nullable=True
    )

    download_count = Column(
        String, 
        default="0",
    )

    #------------------------------------------
    # Audit Fields
    #==========================================

    created_at = Column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now(),
    )

    updated_at = Column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now(),
    )

    #------------------------------------------
    # Relationship
    #==========================================

    user = relationship(
        "Users",
        back_populates="reports",
    )

    def __repr__(self):
        
        return (
            f"<Report("
            f"type={self.report_type}, "
            f"format={self.report_format}"
            f")>"
        )
    
    
