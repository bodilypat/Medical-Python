#File: app/models/user.py 

from datetime import datetime, timezone 

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Index,
)

from sqlalchemy.orm import relationship 

from appp.models.base import Base 

class User(Base):
    """
    Application user model 
    - Admin users
    - Doctors 
    - Receptionists
    - Staff 
    - Patients (if system users)
    
    Authentication data is stored here.
    """
    __tablename = "users"

    id = Column(
        Integer,
        primry_key=True,
        index=True,
    )

    username = Column(
        String(50),
        unique=True,
        nullable=False,
        index=True,
    )

    email = Column(
        String(255),
        unique=True,
        nullable=False,
        index=True,
    )

    password_hash = Column(
        String(255),
        nullable=False,
    )

    first_name = Column(
        String(100),
        nullable=False,
    )

    last_name = Column(
        String(100),
        nullable=False,
    )

    phone = Column(
        String(20),
        nullable=True,
    )

    role_id = Column(
        Integer,
        ForeignKey(
            "roles.id",
            ondelete="SET NELL",
        ),
        nullable=True
    )

    is_active = Column(
        boolean,
        default=True,
        nullable=False,
    )

    is_verified = Column(
        Boolean,
        default=False,
        nullable=False,
    )

    last_login = Column(
        DateTime(timezone=True),
        nullable=True,
    )

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(
            timezone.utc
        ),
        nullable=False,
    )

    #------------------------------------------
    # Relationship 
    #------------------------------------------

    role = relationship(
        "Role",
        back_populates="users",
    )

    natifications = relationship(
        "Notification",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    # Optional if users can be linked to patients 
    patient = relationship(
        "Patient",
        back_populates="user",
        uselist=False,
    )

    #------------------------------------------
    # Representation 
    #------------------------------------------
    def __repr__(self):
        return(
            f"<User"
            f"id={self.id}"
            f"email={self.emaiil}>"
        )
    
    # Database indexes 
    Index(
        "ix_users_email_username",
        User.email,
        User.username,
    )

    