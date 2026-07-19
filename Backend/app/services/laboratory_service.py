#File: app/services/laboratory_service/py

from uuid import UUDI 
from datetime import datetime 

from fastapi import UploadFile 

from app.schemas.laboratory import(
    LaboratoryTestCreate,
    LaboratoryTestUpdate,
    LaboratoryResultCreate,
)
from app.repositories.laboratory_repository import (
    LaboratoryRepository
)
from app.core.exceptions import (
    NotFoundException,
    ValidationExceptions,
)
from app.services.upload_service import UploadService 

class LaboratoryService:

    #------------------------------------------
    # CREATE LAB TEST
    #------------------------------------------
    @staticmethod
    async def create_test(
        payload
    ):
        return await LaboratoryRespository.create_test(
            payload 
        )
    
    #------------------------------------------
    # GET TESTS
    #------------------------------------------

    @staticmethod
    async def get_tests(
        page: int,
        size: int,
        patient_id: UUID | None = None,
        doctor_id: UUID | None = None ,
        status: str | None = None,
    ):
        
        skip = (
            page - 1
        ) * size

        tests, total = await LaboratoryRepository.get_tests(
            skip=skip,
            limit=size,
            patient_id=patient_id,
            doctor_id=doctor_id,
            status=status,
        )
        
        return {
            "items": tests,
            "total": total,
            "page": page,
            "size": size,
        }
    
    #----------------------------------------------
    #  GET SINGLE TEST 
    #----------------------------------------------

    @staticmethod
    async def get_test(
        test_id: UUID
    ):
        
        test = await LaboratoryReposity.get_test_by_id(
            test_id 
        )

        if not test:
            raise NotFoundException(
                "Laboratory test not found"
            )

        return test 
    
    #----------------------------------------------
    # UPDATE TEST 
    #----------------------------------------------

    @staticmethod
    async def update_test(
        test_id: UUID,
        payload: LaboratoryTestUpdate,
    ):
        
        test = await LaboratoryRepository.get_test_by_id(
            test_id
        )

        if not test:
            raise NotFoundException(
                "Laboratory test not found"
            )
        
        return await LaboratoryRepository.update_test(
            test_id,
            payload,
        )
    
    #------------------------------------------
    # UPDATE STATUS 
    #------------------------------------------

    @staticmethod
    async def update_status(
        test_id: UUID,
        status: str,
    ):
        
        test = await LaboratoryRepository.get_test_by_id(
            test_id
        )

        if not test:
            raise NotFoundException(
                "Laboratory test not found"
            )
        
        valid_status = [
            "pending",
            "processing",
            "completed",
            "cancelled",
        ]

        if status not in valid_status:
            raise ValidationExceptions(
                "Invalid laboratory status"
            )
        
        return await LaboratoryRepository.update_status(
            test_id,
            status,
        )
    
    #------------------------------------------
    # DELETE  TEST 
    #------------------------------------------

    @staticmethod
    async def delete_test(
        test_id: UUID
    ):
        
        test = await LaboratoryRepository.get_test_by_id(
            test_id,
        )

        if not test:
            raise NotFoundException(
                "Laboratory test not found"
            )
        
        return await LaboratoryRepository.delete_test(
            test_id
        )
    
    #------------------------------------------
    # CREATE RESULT 
    #------------------------------------------

    @staticmethod
    async def create_result(
        test_id: UUID,
        payload: LaboratoryResultCreate,
    ):
        
        test = await LaboratoryRepository.get_test_by_id(
            test_id
        )

        if not test:
            raise NotFoundException(
                "Loratory test not found"
            )
        
        if test.status == "cancelled":
            raise ValidationException(
                "Cannot add result to cancelled test"
            )
        
        return await LaboratoryRepository.create_result(
            test_id,
            payload,
        )
    
    #------------------------------------------
    # GET RESULT 
    #------------------------------------------

    @staticmethod 
    async def get_result(
        test_id: UUID
    ):
        
        result = await LaboratoryRepository.get_result(
            test_id
        )

        if not result:
            raise NotFoundException(
                "Laboratory result not found"
            )
        
        return result 
    
    #------------------------------------------
    # UPLOAD REPORT 
    #------------------------------------------

    @staticmethod
    async def upload_report(
        test_id: UUID,
        file: UploadFile,
    ):
        
        test = await LaboratoryRepository.get_test_by_id(
            test_id
        )

        if not test:
            raise NotFoundException(
                "Laboratory test not found"
            )
        
        file_path = await UploadService.upload_file(
            file=file,
            folder="laboratory11,"
        )

        return await LaboratoryRepository.update_report(
            test_id=test_id,
            file_path=file_path,
        )
    
    #------------------------------------------
    # DOWNLOAD REPORT 
    #------------------------------------------

    @staticmethod
    async def download_report(
        test_id: UUID
    ):
        
        test = await LaboratoryRepository.get_test_by_id(
            test_id
        )

        if not test:
            raise NotFoundException(
                "Laboratory test noto found"
            )
        
        if not test.report_file:
            raise NotFoundException(
                "Laboratory report not uploaded"
            )
        
        return {
            "file": test.report_file
        }
    
    #------------------------------------------
    # PATIENT TEST HISTORY
    #------------------------------------------

    @staticmethod
    async def get_patient_tests(
        patient_id: UUID,
        page: int,
        size: int,
    ):
        
        skip = (
            page -1
        ) * size 

        tests, total = await LaboratoryRepository.get_patient_tests(
            patient_id,
            skip,
            size,
        )

        return {
            "items": tests,
            "total": total,
            "page": page,
            "size": size,
        }
    
    #------------------------------------------
    # PENDING TESTS 
    #------------------------------------------
    
    @staticmethod
    async def get_pending_tests(
        page: int,
        size: int,
    ):
        skip = (
            page -1 
        ) * size

        tests, total = await LaboratoryRepository.get_patient_tests(
            skip,
            size,
        )

        return {
            "items": tests,
            "total": total,
            "page": page,
            "size": size,
        }