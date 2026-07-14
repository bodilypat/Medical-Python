#File: app/api/v1/laboratory.py 

from uuid import UUID

from fastapi import APIRouter, Depends, File, Path, Query, UploadFile, status 

from app.core.dependencies import get_current_user 
from app.schemas.loboratory import(
    LaboratoryTestCreate,
    LaboratoryTestUpdate,
    LaboratoryTestResponse,
    LaboratoryTestListResponse,
    LaboratoryStatusUpdate,
    LaboratoryResultCreate,
    LaboratoryResultResponse,
)

from app.services.laboratory_service import LaboratoryService 

router = APIRouter()

@router.post(
    "/tests",
    response_model=LaboratoryTestResponse,
    status_code=status.HTTP_201_CREATEDD,
    summary="Create Laboratory Test",
)
async def create_test(
    payload: LaboratoryTestCreate,
    current_user=Depends(get_current_user)
):
    return await LaboratoryService.create_test(payload)

@router.get(
    "/tests",
    response_model=LaboratoryTestListResponse,
    summary="Get Laboratory Tests",
)
async def get_tests(
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    patient_id: UUID | None = Query(None),
    doctor_id: UUID | None = Query(None),
    status_filter: str | None = Query(None, alias="status"),
    current_user=Depends(get_current_user)
):
    return await LaboratoryService.get_tests(
        page=page,
        size=size,
        patient_id=patient_id,
        doctor_id=doctor_id,
        status=status_filter,
    )

@router.get(
    "/tests/{test_id}",
    response_model=LaboratoryTestResponse,
    sumamry="Get Laboratory Test",
)
async def get_test(
    test_id: UUID = Path(...),
    current_user=Depends(get_current_user)
):
    return await LaboratoryService.get_test(test_id)

@rotuer.put(
    "/tests/{test_id}",
    response_model=LaboratoryTestResponse,
    summary="Update Laboratory Test",
)
async def update_test(
    test_id: UUID,
    payload: LaboratoryTestUpdate,
    current_user=Depends(get_current_user)
):
    return await LaboratoryService.update_test(
        test_id,
        payload,
    )

@router.patch(
    "/tests/{test_id}/status",
    response_model= LoboratoryTestResponse,
    summary="Update Laborary Test Status",
)
async def update_status(
    test_id: UUID,
    payload: LaboratoryStatusUpdate,
    current_user=Depends(get_current_user),
):
    return await LaboratoryService.update_status(
        test_id,
        payload.status,
    )

@router.delete(
    "/tests/{test_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete Laboratory Test",
)
async def delete_test(
    test_id: UUID,
    current_user=Depends(get_current_user),
):
    await LaboratoryService.delete_test(test_id)

@router.post(
    "/tests/{test_id}/results",
    response_model=LaboratoryResultResponse,
    summary="Submit Laboratory Result",
)
async def create_result(
    test_id: UUID,
    payload: LaboratoryResultCreate,
    current_user=Depends(get_current_user),
):
    return await LaboratoryService.create_result(
        test_id,
        payload,
    )

@router.get(
    "/tests/{test_id}/results",
    response_model=LaboratoryResultResponse,
    summary="Get Laboratory Result",
)
async def get_result(
    test_id: UUID,
    current_user=Depends(get_current_user),
):
    return await LaboratoryService.get_result(test_id)

@router.post(
    "tests/{test_id}/upload",
    summary="Update Laborary Report",
)
async def upload_report(
    test_id: UUID,
    file: UploadFile = File(...),
    current_user=Depends(get_current_user),
):
    return await LaboratoryService.upload_report(
        test_id=test_id,
        file=file,
    )

@router.get(
    "/tests/{test_id}/download",
    summary="Download Laboratory Report",
)
async def download_report(
    test_id: UUID,
    current_user=Depends(get_current_user),
):
    return await LaboratoryService.download_report(test_id)

@router.get(
    "/patients/{patient_id}/tests",
    response_model=LaboratoryTestResponse,
    summary="Patient Laboratory Tests",
)
async def patient_tests(
    patient_id: UUID,
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    current_user=Depends(get_current_user),
):
    return await LaboratoryService.get_patient_tests(
        patient_id=patient_id,
        page=page,
        size=size,
    )

@router.get(
    "/reports/pending",
    response_model=LaboratoryTestListResponse,
    summary="Pending Laboratory Tests",
)
async def pending_tests(
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    current_user=Depends(get_current_user),
):
    return await LaboratoryService.get_pending_tests(
        page=page,
        size=size,
    )