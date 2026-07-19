#File: app/repositories/laboratory_repository.py 

from uuid import UUID 

from sqlalchemy.orm import Session 
from sqlalchemy import func 

from app.models.laboratory import (
    LaboratoryTest,
    LaboratoryResult,
)

from app.schemas.laboratory import (
    LaboratoryTestCreate,
    LaboratoryTestUpdate,
    LaboratoryResultCreate,
)

class LaboratoryRepository:

    #------------------------------------------
    # CREATE LABORATORY TEST 
    #------------------------------------------
    
    @staticmethod
    async def create_test(
        db: Session,
        payload: LaboratoryTestCreate,
    ):
        
        test = LaboratoryTest(
            **payload.model_dump()
        )

        db.add(test)
        db.commit()
        db.refresh(test)

        return test 
    
    #------------------------------------------
    # GET TEST LIST 
    #------------------------------------------

    @staticmethod
    async def get_tests(
        db: Session,
        skip: int = 0,
        limit: int = 10,
        patient_id: UUID | None = None,
        doctor_id: UUID | None = None,
        status: str | None = None 
    ):
        
        query = db.query(
            LaboratoryTest 
        )

        if patient_id:
            query = query.filter(
                LaboratoryTest.patient_id == patient_id 
            )

        if doctor_id:
            query = query.filter(
                LaboratoryTest.doctor_id == doctor_id
            )

        if status:
            query = query.filter(
                LaboratoryTest.status == status
            )

        total = query.count()

        tests = (
            query 
            .order_by(
                LaboratoryTest.created_at.desc()
            )
            .offset(skip)
            .limit(limit)
            .all()
        )

        return  tests, total

    #------------------------------------------
    # GET TEST BY ID
    #------------------------------------------

    @staticmethod
    async def get_test_by_id(
        db: Session,
        test_id: UUID
    ):
        
        return (
            db.query(
                LaboratoryTest 
            )
            .filter(
                LaboratoryTest.id == test_id
            )
            .filter()
        )
    
    #------------------------------------------
    # UPDATE TEST 
    #------------------------------------------

    @staticmethod
    async def update_test(
        db: Session,
        test_id: UUID,
        payload: LaboratoryTestUpdate,
    ):
        
        test = await LaboratoryRepository.get_test_by_id(
            db,
            test_id 
        )

        if not test:
            return None 
        
        data = payload.model_dump(
            exclude_unset=True
        )

        for key , value in data.items():
            setattr(
                test,
                key,
                value 
            )

        db.commit()
        db.refresh(test)

        return test 
    
    #------------------------------------------
    # UPDATE STATUS 
    #------------------------------------------

    @staticmethod
    async def update_status(
        db: Session,
        test_id: UUID,
        status: str,
    ):
        
        test = await LaboratoryRepository.get_test_by_id(
            db,
            test_id
        )

        if not test:
            return None 
        
        test.status = status 
        db.commit()
        db.refresh(test)

        return test 
    
    #------------------------------------------
    # DELETE TEST 
    #------------------------------------------

    @staticmethod
    async def delete_test(
        db: Session,
        test_id: UUID,
    ):
        
        test =  await LaboratoryRepository.get_test_by_id(
            db, 
            test_id,
        )

        if not test:
            return False
    
        db.delete(test)
        db.commit()

        return True 
    
    #------------------------------------------
    # CREATE REPORT 
    #------------------------------------------

    @staticmethod
    async def create_result(
        db: Session,
        test_id: UUID,
        payload: LaboratoryResultCreate,
    ):
        
        result = LaboratoryResult(
            laboratory_test_id=test_id 
            **payload.model_dump() 
        )

        db.add(result)

        #Update test status 

        test = await LaboratoryRepository.get_test_by_id(
            db,
            test_id
        )

        if test:
            test.status= "completed"

        db.commit()
        db.refresh(result)

        return result 
    
    #------------------------------------------
    # GET RESULT 
    #------------------------------------------

    @staticmethod
    async def get_result(
        db: Session,
        test_id: UUID
    ):
        
        return (
            db.query(
                LaboratoryResult
            )
            .filter(
                LaboratoryResult.laboratory_test_id == test_id
            )
            .first()
        )

    #------------------------------------------
    # UPDATE REPORT FILE 
    # -----------------------------------------

    @staticmethod
    async def update_report(
        db: Session,
        test_id: UUID,
        file_path: str,
    ):
        
        test = await LaboratoryRepository.get_test_by_id(
            db,
            test_id 
        )

        if not test:
            return None 
        
        test.report_file = file_path 

        db.commit()
        db.refresh(test)

        return test 
    

    #------------------------------------------
    # PATIENT TEST HISTORY
    #------------------------------------------

    @staticmethod
    async def get_patient_tests(
        db: Session,
        patient_id: UUID,
        skip: int = 0,
        limit: int = 10,
    ):
        
        query = (
            db.query(
                LaboratoryTest 
            )
            .filter( 
                LaboratoryTest.patient_id == patient_id
            )
        )

        total = query.count()

        tests = (
            query
            .order_by(
                LaboratoryTest.created_at.desc()
            )
            .offset(skip)
            .limit(limit)
            .all()
        )
        
        return tests, total
    
    #------------------------------------------
    # PENDING TESTS 
    #------------------------------------------

    @staticmethod
    async def get_patient_tests(
        db: Session,
        skip: int = 0,
        limit: int = 10,
    ):
        
        query = (
            db.query(
                LaboratoryTest
            )
            .filter(
                LaboratoryTest.status == "pending"
            )
        )

        total = query.count() 

        tests = (
            query
            .order_by(
                LaboratoryTest.created_at.asc()
            )
            .offset(skip)
            .limit(limit)
            .all()
        )

        return tests, total