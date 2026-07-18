#File: app/repositories/prescription_repository.py

from uuid import UUID 

from sqlalchemy.orm import Session 

from app.models.prescription import Prescription 
from app.schemas.prescription import(
    PrescriptionCreate,
    PrescriptionUpdate,
    PrescriptionStatus,
)

class PrescriptionRepository:

    def __init__(self, db: Session):
        self.db = db 

    def create(
        self,
        payload: PrescriptionCreate,
    ) -> Prescription:
        
        prescription = Prescription(
            **payload.model_dump()
        )

        self.db.add(prescription)
        self.db.commit()
        self.db.refresh(prescription)

        return prescription 
    
    def get_by_id(
        self,
        prescription_id: UUID,
    ) -> Prescription | None:
        
        return (
            self.db.query(Prescription)
            .filter(
                Prescription.id == prescription_id
            )
            .first()
        )
    
    def get_all(
        self,
        *,
        page: int = 1,
        size: int = 10,
        patient_id: UUID | None = None,
        doctor_id: UUID | None = None,
        status: PrescriptionStatus | None = None,
    ):
        
        query = self.db.query(Prescription)

        if patient_id:
            query = query.filter(
                Prescription.patient_id == patient_id
            )

        if doctor_id:
            query = query.filter(
                Prescription.doctor_id == doctor_id
            )

        if status:
            query = query.filter(
                Prescription.status == status
            )

        total = query.count()

        items = (
            query.order_by(
                Prescription.created_at.desc()
            )
            .offset((page - 1) * size)
            .limit(size)
            .all()
        )

        return {
            "items": items,
            "total": total,
            "page": page,
            "size": size,
        }
    
    def update(
        self,
        prescription: Prescription,
        payload: PrescriptionUpdate,
    ) -> Prescription:
        
        for key, value in payload.model_dump(
            exclude_unset=True
        ).items():
            setattr(
                prescription,
                key,
                value,
            )

        self.db.commit()
        self.db.refresh(prescription)

        return prescription
    
    def update_status(
        self,
        prescription: Prescription,
        status: PrescriptionStatus,
    ) -> Prescription:
        
        prescription.status = status 

        self.db.commit()
        self.db.refresh(prescription)

        return prescription
    
    def delete(
        self,
        prescription: Prescription,
    ) -> None:
        
        self.db.delete(prescription)
        self.db.commit()

    def get_by_patient(
        self,
        patient_id: UUID,
        page: int,
        size: int,
    ): 
        
        return (
            self.db.query(Prescription)
            .filter(
                Prescription.patient_id == patient_id
            )
            .order_by(
                Prescription.created_at.desc()
            )
            .offset((page - 1) * size)
            .limit(size)
            .all()
        )
    
    def get_by_doctor(
        self,
        doctor_id: UUID,
        page: int,
        size: int,
    ):
        
        return (
            self.db.query(Prescription)
            .filter(
                Prescription.doctor_id == doctor_id
            )
            .offset((page - 1) * size)
            .limit(size)
            .all()
        )
    
    def find_active_prescription(
        self,
        *,
        patient_id: UUID,
        medication_name : str,
    ) -> Prescription | None:
        
        return (
            self.db.query(Prescription)
            .filter(
                Prescription.patient_id == patient_id,
                Prescription.medication_name == medication_name,
                prescription.status == PrescriptionStatus.ACTIVE,
            )
            .first() 
        )













