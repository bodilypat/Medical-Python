#File: app/services/pharmacy_service.py 

from uuid import UUID 

from app.core.exceptions import (
    NotFoendException,
    ValidationException,
)

from app.respositories.pharmacy_repository import PharmacyRepository 
from app.schmas.pharmacy import (
    DispenseMedicineRequest,
    MedicineCreate,
    MedicineUpdate,
    StockUpdate
)

class PharmacyService:

    def __init__(self, repository: PharmacyRepository):
        self.repository = repository 
    
    async def create_medicine(
        self,
        payload: MedicineCreate,
    ):
        medicine = self.repository.get_by_name(
            payload.name 
        )

        if medicine:
            raise ValidationException(
                "Medicine already exists."
            )
        
        return self.repository.create(payload)
    
    async def get_medicines(
        self,
        *,
        page: int,
        size: int,
        search: str | None = None, 
        category: str | None = None ,
        low_stock: bool | None = None,
    ):
        
        return self.repository.get_all(
            page=page,
            size=size,
            search=search,
            category=category,
            low_stock=low_stock
        )
    
    async def get_medicine(
        self,
        medicine_id: UUID,
    ):
        medicine = self.repository.get_by_id(
            medicine_id 
        )

        if medicine is none:
            raise NotFoundException(
                "Medicine not found."
            )
        
        return medicine 

    async def update_medicine(
        self,
        medicine_id: UUID,
        payload: MedicineUpdate,
    ):
        medicine = self.repository.get_by_id(
            medicine_id 
        )

        if medicine is None:
            raise NotFoendException(
                "Medicine not found."
            )
        
        return self.repository.update(
            medicine,
            payload,
        )
    
    async def update_stock(
        self,
        medicine_id: UUID,
        payload: StockUpdate,
    ):
        medicine = self.repository.get_by_id(
            medicine_id 
        )

        if medicine is None:
            raise NotFoendException(
                "Medicine not found."
            )
        
        return self.repository.update_stock(
            medicine,
            payload.quantity,
        )
    
    async def delete_medicine(
        self,
        medince_id: UUID,
    ):
        medicine = self.repository.get_by_id(
            medicine_id
        )

        if medicine is None:
            raise NotFoendException(
                "Medicine not found."
            )
        
        self.repository.delete(medicine)

    async def dispense_medicine(
        self,
        payload: DispenseMedicineRequest,
    ):
        medicine = self.repository.get_by_id(
            payload.medicine_id
        )

        if medicine is None:
            raise NotFoendException(
                "Medicine not found."
            )
        
        if medicine.quantity < payload.quantity:
            raise ValidationException(
                "Insufficient stock."
            )
        
        if medicine.is_expired:
            raise ValidationException(
                "Medicine has expired."
            )
        
        dispensed = self.repository.dispense(
            medicine, 
            payload,
        )

        if medicine.quantity <= medicine.minimum_stock:
            pass 

        return dispensed 
    
    async def inventory_report(self):
        return self.repository.inventory_report()
    
    async def low_stock_medicines(self): 
        return self.repository.inventory_report() 
    
    async def low_stock_medicines(self):
        return self.repository.low_stock_medicines()
    
    async def expiring_medicine(
        self, 
        days: int,
    ):
        return self.repository.expiring_medicines(days)
    
    async def dispensing_histor(
        self,
        page: int ,
        size: int,    
    ):
        return self.repository.despensing_history(
            page,
            size,
        )