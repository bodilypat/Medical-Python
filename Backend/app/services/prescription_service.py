#File: app/services/prescription_service.py 

from uuid import UUID 

from app.core.exceptions import (
    NotFoundException,
    ValidationException,
)

from app.repositories.prescription_repository import (
    PrescriptionRepository,
)

from app.schemas.prescription import (
    PrescriptionCreate,
    PrescriptionUpdate,
    PrescriptionStatus,
)

class PrescriptionService:

    def __init__(
        self,
        repository: PrescriptionRepository,
    ):
        self.repository = repository

    async def create_prescription(
        self,
        payload: PrescriptionCreate,
    ):
        duplicate = self.repository.find_active_prescription(
            patient_id=payload.patient_id,
            medication_name=payload.medication_name,
        )
        
        if duplicate:
            raise ValidationException(
                "An active prescription already exists."
            )
        
        return self.repository.create(payload)
    
    async def get_prescriptions(
        self, 
        *,
        page: int =1,
        size: int = 10,
        patient_id: UUID | None = None,
        doctor_id: UUID | None = None,
    ):
        
        return self.repository.get_all(
            page=page,
            size=size,
            patiemt_id=patient_id,
            doctor_id=doctor_id,
        )
    
    async def get_perscription(
        self,
        presctiption_id: UUID,
    ):
        prescription = self.repository.get_by_id(
            prescription_id
        )

        if prescription is None:
            raise NotFoundException(
                "Prescriptionk not found."
            )
        
        return prescription 
    
    async def update_prescription(
        self,
        prescription_id: UUID,
        payload: PrescriptionUpdate,
    ):
        prescription = self.repository.get_by_id(
            prescription_id
        )

        if prescription is None:
            raise NotFoundException(
                "Prescription not found."
            )
        return self.repository.update(
            prescription,
            payload,
        )
    
    async def update_status(
        self,
        prescription_id: UUID,
        status: PrescriptionStatus,
    ):
        prescription = self.repository.get_by_id(
            prescription_id
        )

        if prescription is None:
            raise NotFoundException(
                "Prescription not found."
            )
        
        return self.repository.update_status(
            prescription,
            status,
        )
    
    async def delete_prescription(
        self,
        prescription_id: UUID,
    ):
        prescription = self.repository.get_by_id(
            prescription_id
        )

        if prescription is None:
            raise NotFoundException(
                "Prescription not found."
            )
        
        self.repository.delete(prescription)

    async def get_patient_perscriptions(
        self,
        patient_id: UUID,
        page: int,
        size: int,
    ):
        return self.repository.get_by_patient(
            patient_id,
            page,
            size,
        )
    
    async def get_doctor_prescriptions(
        self,
        doctor_id: UUID,
        page: int,
        size: int,
    ):
        return self.repository.get_by_doctor(
            doctor_id,
            page,
            size,
        )
    
    async def download_prescription(
        self,
        prescription_id: UUID,
    ):
        prescription = self.repository.get_by_id(
            prescription_id
        )

        if prescription is None:
            raise NotFoundException(
                "Prescription not found."
            )
        
        return prescription 
    
    async def print_prescription(
        self,
        prescription_id: UUID,
    ):
        prescription = self.repository.get_by_id(
            prescription_id 
        )

        if prescription is None:
            raise NotFoundException(
                "Prescription not found."
            )
        return prescription
        