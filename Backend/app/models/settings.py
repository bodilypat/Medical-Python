#==============================================
# File: app/models/settings.py
#==============================================

from datetime import datetime

from sqlalchemy import (
    Column,
    String,
    Boolean,
    Text,
    DateTime,
    ForeignKey,
    JSON,
    func,
)

from sqlalchemy.dialects.postgreslq import UUID 
from sqlalchemy.orm import relationship 
from app.models.base import Base, UUIDMixin

#----------------------------------------------
# USER SETTINGS
#----------------------------------------------
class UserSetting(
    Base,
    UUIDMixin,
):

    __tablename__ = "user_settings"

    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey(
            "users.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        unique=True,
        index=True,
    )

    #------------------------------------------
    # Profile preference
    #------------------------------------------

    language = Column(
        String(10),
        default="en",
        nullable=False
    )

    timezone = Column(
        String(50),
        default="UTC",
        nullable=False,
    )

    theme = Column(
        String(20),
        default="light",
    )

    date_format = Column(
        String(30),
        default="YYYY-MM-DD",
    )

    #------------------------------------------
    # Extra user preferences 
    #------------------------------------------

    preferences = Column(
        JSON,
        nullable=True,
    )

    created_at = Column(
        DateTime,
        server_defaul=func.now(),
        onupdate=func.now()
    )

    user = relationship(
        "User",
        back_populates="settings"
    )

    #------------------------------------------
    # NOTIFICATION SETTINGS 
    #------------------------------------------

    class NotificationSetting(
        Base,
        UUIDMixin,
    ):

        __tablename__ = "notification_settings"

        user_id = Column(
            UUID(as_uuid=True),
            ForeignKey(
                "users.id",
                ondelete="CASCADE",
            ),
            nullable=False,
            unique=True,
            index=True,
        )

        email_notification = Column(
            Boolean,
            default=True,
        )

        sms_notification = Column(
            Boolean,
            default=False,
        )

        push_notification = Column(
            Boolean,
            default=True,
        )

        appointment_reminder = Column(
            Boolean,
            default=True,
        )

        laboratory_notification = Column(
            Boolean,
            default=True 
        )

        billing_notification = Column(
            Boolean,
            default=True,
        )

        created_at = Column(
            DateTime,
            server_default=func.now(),
        )

        updated_at = Column(
            DateTime,
            server_default=func.now(),
            onupdate=func.now(),
        )

        user = relationship(
            "User",
            back_populates="notification_settings",
        )

    #------------------------------------------
    # SYSTEM SETTINGS 
    #------------------------------------------

    class SystemSetting(
        Base,
        UUIDMixin
    ):

        __tablename__ = "system_settings"

        # Hospital Information 
        hospital_name =  Column(
            String(255),
            nullable=False,
        )

        hospital_email = Column(
            String(255),
            nullable=True,
        )

        hospital_phone = Column(
            String(30),
            nullable=True,
        )

        address = Column(
            Text,
            nullable=True,
        )

        # System Configuration 
        timezone = Column(
            String(50),
            default="UTC",
        )

        currency = Column(
            String(10),
            default="USD",
        )

        logo_url = Column(
            String(500),
            nullable=True,
        )

        # Feature Flags 
        features = Column(
            JSON,
            nullable=True,
        )

        # Security 
        password_expiry_days = Column(
            Integer,
            default=90,
        )

        max_login_attempts = Column(
            Integer,
            default=5,
        )

        created_at = Column(
            DateTime,
            server_default=func.now(),
        )

        updated_at = Column(
            DateTime,
            server_default=func.now(),
            ondelete=func.now(),
        )

