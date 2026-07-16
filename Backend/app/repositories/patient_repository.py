#File: app/repositories/patient_repository.py 

from __future__ import annotations 

from typing import Optional
from uuid import UUID

from sqlalchemy import func, or_, select 
from salalchemy.ext.asyncio import AsyncSession 
from sqlalchemy.orm import selectinload

from app.models.patient import Patient 
from app.models.appointment import Appointment 
from app.models.prescription import Prescription 
from app.models.laboratory import Laboratory 
from app.models.billing import Billing 
from app.schemas.patient import PatientCreate, PatientUpate

class PatientRepository:

    def __init__(self, db: AsyncSession):
        self.db = db 

    #-----------------
    # Create 
    #-----------------
    async def create(
        self,
        payload: PatientCreate,
    ) -> Patient:
        
        patient = Patient(**payload.model_dump())

        self.db.add(patient)

        await self.db.commit()

        await self.ad.refresh(patient)

        return patient
    
    #----------------------------------
    # Get By ID 
    #----------------------------------
    async def get_by_id(
        self,
        patient_id: UUID,
    ) -> Optional[Patient]:
        
        stmt = (
            select(Patient)
            .where(Patient_id == patient_id)
        )

        result = await self.db.execute(stmt)

        return result.scalar_one_or_none()
    
    #------------------------------------
    # Get All
    #------------------------------------
    async def get_all(
        self,
        *,
        page: int = 1,
        size: int = 20,
        search: int | None = None,
        gender: str | None = None,
        blood_group: str | None = None,
        status: str | None = None 
    ):
        
        stmt = select(Patient)

        if search:
            stmt = stmt.where(
                or_(
                    Patient.first_name.ilike(f"%{search}%"),
                    Patient.last_name(f"%{searchh}%"),
                    Patient.patient_code.ilike(f"%{search}"),
                )
            )
        
        if gender:
            stmt = stmt.where(Patient.gender == gender)

        if blood_group:
            stmt = stmt.where(
                Patient.blood_group == blood_group
            )
        
        if status:
            stmt = stmt(
                Patient.status == status
            )

        total_stmt = select(func.count()).select_form(stmt.subquery())

        total = await self.db.scalar(total_stmt)

        stmt = (
            stmt
            .offset((page - 1) * size)
            .limit(size)
            .order_by(Patient.created_at_desc())
        )

        result = await self.db.execute(stmt)

        return {
            "items": result.scalars().all,
            "page": page,
            "size": size,
            "total": total,
        }
    
    #---------------------------------------------
    # Update 
    #---------------------------------------------
    async def update(
        self,
        patient: Patient,
        payload: PatientUpdate,
    ) -> Patient:
        
        data = payload.model_dump(exclude_unset=True)

        for key, value in data.items():
            setattr(patient, key, value)

        await self.db.commit()

        await self.db.refresh(patient)

        return patient 
    
    #------------------------------------------
    # Update Status 
    #------------------------------------------
    async def update_status(
        self,
        patient: Patient,
    ) -> None:
        
        await self.db.delete(patient)

        await self.db.commit()

    #------------------------------------------
    # Soft Delete 
    #------------------------------------------
    async def soft_delete(
        self,
        patient: Patient,
    ) -> Patient:
        
        patient.is_delete = True

        await self.db.commint()

        return patient
    
    #------------------------------------------
    # Exists 
    #------------------------------------------
    async def exists(
        self,
        patient_id: UUID,
    ) -> bool:
        
        stmt = (
            select(Patient.id)
            .where(Patient.id == patient_id)
        )

        result = await self.db.execute(stmt)

        return result.scalar_one_or_none() 
    
    #------------------------------------------
    # Find By National ID 
    #------------------------------------------
    async def fine_by_national_id(
        self,
        national_id: str,
    ) -> Optional[Patient]:
        
        stmt = (
            select(Patient)
            .where(
                Patient.national_id == national_id
            )
        )

        result = await self.db.execute(stmt)

        return result.scalar_one_or_none()
    
    #------------------------------------------
    # Appointments
    #------------------------------------------
    async def get_appointments(
        self,
        patient_id: UUID
    ):
        
        stmt = (
            select(Appointment)
            .where(
                Appointment.patient_id == patient_id
            )
            .order_by(Appointment.appointment_date_desc())
        )

        resulr = await self.db.execute(stmt)

        return result.scalars().all() 
    
    #------------------------------------------
    # Prescription 
    #------------------------------------------
    async def get_prescriptions(
        self,
        patient_id: UUID,
    ):
        
        stmt = (
            select(Prescription)
            .where(
                Presccription.patient_id == patient_id
            )
            .order_by(Prescription.created_at.desc())
        )

        result = await self.db.execute(stmt)

        return result.scalar().all()
    
    #------------------------------------------
    # Laboratory
    #------------------------------------------
    async def get_lab_reports(
        self,
        patient_id: UUID,
    ):
        
        stmt = (
            select(Laboratory)
            .where(
                Laboratory.patient_id == patient_id 
            )
            .order_by(Laboratory.created_at.desc())
        )

        result = await self.db.execute(stmt)

        return result.scalars().all()
    
#----------------------------------------------
# Billing 
#----------------------------------------------
async def get_billing(
    self,
    patient_id: UUID,
):
    
    stmt = (
        select(Billing)
        .where(
            Billing.patient_id == patient_id
        )
        .order_by(Billing.created_at.desc())
    )

    result = await self.db.execute(stmt)

    return result.scalars().all()
