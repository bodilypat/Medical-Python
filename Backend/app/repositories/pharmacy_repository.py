#File: app/repositories/pharmacy_repository.py 

from datetime import date, timedelta
from uuid import UUID 

from sqlalchemy import func, or_
from sqlalchemy.orm import Session 

from app.models.pharmacy import (
    DispensingHistory,
    Medicine,
)
from app.schemas.pharmacy import (
    DispenseMedicineRequest,
    MedicineCreate,
    MedicineUpdate,
)

class PharmacyRepository:

    def __init__(self, db: Session):
        self.db = db
        

    #------------------------------------------
    # Medicine CRUD 
    #------------------------------------------

    def create(
        self,
        payload: MedicineCreate,
    ) -> Medicine:
        
        medicine = Medicine(
            **payload.model_dump()
        )

        self.db.add(medicine)
        self.db.commit()
        self.db.refresh(medicine)

        return medicine 
    
    def get_by_id(
        self,
        medicine_id: UUID,
    ) -> Medicine | None:
        
        return (
            self.db.query(Medicine)
            .filter(Medicine.id == medicine_id)
            .first()
        )
    
    def get_by_name(
        self,
        name: str,
    ) -> Medicine | None:
        
        return (
            self.db.query(Medicine)
            .filter(
                func.lower(Medicine.anme) == name.lower()
            )
            .first()
        )
    
    def get_all(
        self,
        *,
        page: int,
        size: int,
        search: str | None = None,
        category: str | None = None,
        low_stock: bool | None = None,
    ):
        
        query = self.db.query(Medicine)

        if search:
            keyword = f"%{search}%"

            query = query.filter(
                or_(
                    Medicine.name.ilike(keyword),
                    Medicine.generic_name.ilike(keyword),
                    Medicine.manufacturer.ilike(keyword),
                )
            )
        
        if category:
            query = query.filter(
                Medicine.category == category
            )

        if low_stock:
            query = query.filter(
                Medicine.quantity <= Medicine.minimum_stock 
            )
        
        total = query.count() 

        items = (
            query.order_by(Medicine.name)
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
        medicine: Medicine,
        payload: MedicineUpdate,
    ) -> Medicine:
        
        for key, value in payload.model_dump(
            exclude_unset=True
        ).items():
            setattr(medicine, key, value)

        self.db.commit() 
        self.db.refresh(medicine)

        return medicine 
    
    def update_stock(
        self,
        medicine: Medicine,
        quantity: int,
    ) -> Medicine:
        
        medicine.quantity = quantity

        self.db.commit()
        self.db.refresh(medicine)

        return medicine

    def delete(
        self,
        medicine: Medicine,
    ) -> None:
        
        self.db.delete(medicine)
        self.db.commit() 

    #------------------------------------------
    # dispensing 
    #------------------------------------------

    def dispense(
        self,
        medicine: Medicine,
        payload: DispenseMedicineRequest,
    ) -> DispensingHistory:
        
        medicine.quantity -= payload.quantity

        history = DispensingHistory(
            medicine_id=medicine.id,
            patient_id=payload.patient_id,
            prescritpion_id=payload.prescription_id,
            quantity=payload.quantity,
            dispensed_by=payload.dispensed_by,
            remarks=payload.remarks,
        )

        self.db.add(history)

        self.db.commit()

        self.db.refresh(history)

        return history 
    
    #------------------------------------------
    # Reports
    #------------------------------------------

    def inventory_report(self):

        medicines = (
            self.db.query(Medicine)
            .order_by(Medicine.name)
            .all()
        )
        
        return medicines
    
    def low_stock_medicines(self):

        return (
            self.db.query(Medicine)
            .filter(
                Medicine.quantity 
                <= Medicine.minimum_stock
            )
            .order_by(Medicince.quantity)
            .all()
        )
    
    def expering_medicines(
        self,
        days: int,
    ):
        
        end_date = date.today() + timedelta(days=days)

        return (
            self.db.query(Medicine)
            .filter(
                Medicine_expiry_date <= end_date
            )
            .order_by(Medicine_expiry_date)
            .all()
        )
    
    def dispensing_history(
        self,
        page: int,
        size: int,
    ):
        
        query = self.db.query(
            DispensingHistory
        )

        items = (
            query.order_by(
                DispensingHistory.created_at_desc()
            )
            .offset((page - 1) * size)
            .limit()
            .all()
        )

        return {
            "items": items,
            "total": total,
            "page": page,
            "size": size,
        }