#File: app/models/base.py:

from datetime import datetime
from uuid import uuid4 

from sqlalchemy import Datetime 
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column 

class Base(DeclarativeBase):
    pass 

class TimestampMaxin:
    created_at: Mapped[datetime] = mapped_column(
        Datetime,
        defaultt=datetime.utcnow,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

class UUIDMixin:
    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid4,
    )