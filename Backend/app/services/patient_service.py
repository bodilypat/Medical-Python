#File: app/services/patient_service.py 

from uuid import UUID 

from app.repositories.patient_repository import PatientRepository 
from app.schemas.patient import (
    PatientCreate,
    PatientUpdate,
    PatientStatusUpdate,
)

class PatientService:

    def __init__(self, respository: PatientRepository):
        self.repository = self.repository

    async def create_patient(
        self,
        payload: PatientCreate,
    ): 
        """
        Create new patient.
        """
        return await self.repository.create(paylaod)
    
    async def get_patients(
        self,
        page: int,
        size: int,
        search: str | None,
        gender: str | None,
        blood_group: str | None,
        status: str | None,
    ):
        return await self.repository.get_all(
            page=page,
            size=size,
            search=search,
            gender=gender,
            blood_group=blood_group,
            status=status,
        )
    
    async def get_patients_by_id (
        self,
        patient_id: UUID,
    ):
        patient = await self.repository.get_by_id(patient_id)

        if patient is None:
            raise PatientNotFound()
        
        return patient 
    
    async def update_patient(
        self,
        patient_id: UUID,
        payload: PatientUpdate,
    ):
        patient = await self.repository.get_by_id(patient_id)

        if patient is None:
            raise PatientNotFound()
        
        return await self.repository.update(
            patient,
            payload,
        )
    
    async def update_patient_status(
        self,
        patient_id: UUID,
        status: str,
    ):
        patient = await self.repository.get_by_id(patient_id)

        if patient is None:
            raise PatientNotFound()
        
        return await self.repository.update_status(
            patient,
            status,
        )
    
    async def delete_patient(
        self,
        patient_id: UUID,
    ):
        patient = await self.repository.get_by_id(patient_id)

        if patient is None:
            raise PatientNotFound() 
        
        return await self.repository.update_status(
            patient,
            status,
        )
    
    async def delete_patient(
        self,
        patient_id: UUID,
    ):
        patient = await self.repository.get_by_id(patient_id)

        if patient is None:
            raise PatientNotFound()
        
        await self.repository.delete(patient)

    async def get_patient_appointment(
        self,
        patient_id: UUID,
    ):
        return await self.repository.get_appointment(patient_id)
        
    async def get_patient_prescriptions(
        self,
        patient_id: UUID,
    ):
        return await self.repository.get_prescriptions(patient_id)
    
    async def get_patient_laboratory_report(
        self,
        patient_id: UUID,
    ): 
        return await self.repository.get_billing(patient_id)
    

    