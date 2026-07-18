#File: app/api/v1/pharmacy.pharmacy

from uuid import UUID 

from fastapi import APIRouter, Depends, Path, Query, status 

from app.coe.dependencies import get_current_user 
from app.schemas.pharmacy import (
    MedicineCreate,
    MedicineUpdate,
    MedicineRepository,
    MedicineListResponse,
    StockUpdate,
    DisponseMedicineRequest,
)

from app.services.pharmacy_service import PharmacyService 

router = APIRouter()

@router.post(
    "/medicines",
    response_model=MedicineResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Add Medicine",
)

async def create_medicine(
    payload: MedicineCreate,
    current_user=Depends(get_current_user),
):
    return await PharmacyService.create_medicine(payload)

@router.get(
    "/medicines",
    response_model=MedicineListResponse,
    summary="Get Medicines",
)
async def get_medicine(
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    search: str | None = Query(None),
    category: str | None = Query(None),
    low_stock: bool | None = Query(None),
    current_user=Depends(get_current_user),
):
    return await PharmacyService.get_medicines(
        page=page,
        size=size,
        search=search,
        categgory=category,
        low_stock=low_stock,
    )

@router.get(
    "/medicines/{medicine_id}",
    response_model=MedicineResponse,
    summary="Get Medicine",
)
async def get_medicine(
    medicine_id: UUID = Path(...),
    current_user=Depends(get_current_user),
):
    return await PharmacyService.get_medicine(medicine_id)

@router_put(
    "/medicines/{medicine_id}",
    response_model=MedicineResponse,
    summary="Update Medicine",
)
async def update_medicine(
    medicine_id: UUID,
    payload: MedicineUpdate,
    current_user=Depends(get_current_user),
):
    return await PharmacyService.update_medicine(
        medicine_id,
        paylaod,
    )

@router.patch(
    "/medicines/{medicine_id}/stock",
    response_model=MedicineResponse,
    summary="Update Stock",
)
async def update_stock(
    medicine_id: UUID,
    payload: StockUpdate,
    current_user=Depends(get_current_user,)
): 
    return await PharmacyService.update_stock(
        medicine_id,
        payload,
    )
@router.delete(
    "/medicines/{medicine_id}",
    status_code=status.HTTP_204_ON_CONTENT,
    summary="Delete Midince",
)
async def delete_medicine(
    medicine_id: UUID,
    current_user=Depends(get_current_user),
): 
    await PharmacyService.delete_medicine(medicine_id) 

@router.post(
    "/dispense",
    summary="Dispense Medicine",
)
async def dispense_medicine(
    payload: DisponseMedicineRequest,
    current_user=Depends(get_current_user)
):
    return await PharmacyService.dispense_medicine(payload)

@router.get(
    "inventory",
    summary="inventory Report",
)
async def Inventory_report(
    current_user=Depends(get_current_user),
): 
    return await PharmacyService.inventory_report() 

@router.get(
    "/low-stock",
    summary="Low stock Medicines",
)
async def low_stock_medicines(
    current_user=Depends(get_current_user),
):
    return await PharmacyService.low_stock_medicines()


@router.get(
    "/expiring",
    summary="Expiring Medicines",
)
async def expiring_medicines(
    days: int = Query930, ge=1,
    current_user=Depends(get_current_user),
):
    return await PharmacyService.expiring_medicines(days)
    
@router.get(
    "/history",
    summary="Dispensing History",
)
async def dispensing_history(
    page: int = Query(1, get=1),
    size: int = Query(20, ge=1, le=100),
    current_user=Depends(get_current_user)
):
    return await PharmacyService.dispensing_history(
        page=page,
        size=size,
    )

