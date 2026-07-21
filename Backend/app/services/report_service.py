#File: app/services/report_service.py 

from datetime import date, datetime 
from fastapi import HTTPException, status 

from app.repositories.report_repository import ReportRepository 
from app.core.exceptions import NotFoundException 

class ReportService:

    #------------------------------------------
    # DASHBOARD REPORT 
    #------------------------------------------
    @staticmethod 
    async def dashboard_report(
        start_date: date | None = None,
        end_date: date | None = None,
    ):
        
        return await ReportRepository.get_dashboard_report(
            start_date=start_date,
            end_date=end_date,
        )
    
    #------------------------------------------
    # PATIENT REPORT 
    #------------------------------------------

    @staticmethod
    async def patient_report(
        start_date: date | None =  None,
        end_date: date | None = None,
    ):
        
        return await ReportRepository.get_patient_report(
            start_date=start_date,
            end_date=end_date,
        )
        
    #------------------------------------------
    # APPOINTMENT REPORT
    #------------------------------------------

    @staticmethod
    async def appointment_report(
        start_date: date | None = None,
        end_date: date | None = None,
        doctor_id: str | None = None,
    ):
        
        return await ReportRepository.get_appointment_report(
            start_date=start_date,
            end_date=end_date,
            doctor_id=doctpr_id
        )
    
    #------------------------------------------
    # BILLING REPORT 
    #------------------------------------------

    @staticmethod 
    async def billing_report(
        start_date: date | None = None,
        end_date: date | None = None,
    ):
        
        return await ReportRepository.get_billing_report(
            start_date=start_date,
            end_date=end_date,
        )
    
    #------------------------------------------
    # LABORATORY REPORT 
    #------------------------------------------

    @staticmethod
    async def laboratory_report(
        start_date: date | None = None,
        end_date: date | None = None,
    ):
        
        return await ReportRepository.get_laboratory_report(
            start_date=start_date,
            end_date=end_date,
        )
    
    #------------------------------------------
    # PHARMACY REPORT 
    #------------------------------------------

    @staticmethod
    async def pharmacy_report(
        start_date: date | None = None,
        end_date: date | None = None ,
    ):
        
        return await ReportRepository.get_pharmacy_report(
            start_date=start_date,
            end_date=end_date,
        )
    
    #------------------------------------------
    # EXPORT PDF 
    #------------------------------------------

    @staticmethod 
    async def pharmacy_report(
        start_date: date | None = None,
        end_date: date | None = None,
    ):
        
        return await ReportRepository.get_pharmacy_report(
            start_date=start_date,
            end_date=end_date,
        )
    
    #------------------------------------------
    # EXPORT PDF 
    #------------------------------------------

    @staticmethod
    async def export_pdf(
        report: str,
        start_date: date | None = None ,
        end_date: date | None = None,
    ):
        
        allowed_reports = [
            "dashbord",
            "patients",
            "appointments",
            "billing",
            "laboratory",
            "pharmacy"
        ]

        if report not in allowed_reports:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid report type.",
            )
        
        file_path = await ReportRepository.generate_pdf(
            report=report,
            start_date=start_date,
            end_date=end_date,
        )

        return {
            "file_name": f"{report}_reprot.pdf",
            "file_type": "pdf",
            "donwload_url": file_path,
            "generated_at": datetime.utcnow(),
        }
    
    #------------------------------------------
    # EXPORT EXCEL 
    #------------------------------------------

    @staticmethod 
    async def export_excel(
        report: str,
        start_date: date | None = None,
        end_date: date | None = None,
    ):
        
        file_path = await ReportRepository.generate_excel(
            report=report,
            start_date=start_date,
            end_date=end_date,
        )

        return {
            "file_name": f"{report}_report.elsx",
            "file_type": "excel",
            "download_url": file_path,
            "generated_at": datetime.utcnow(),
        }
    
    #------------------------------------------
    # EXPORT CSV 
    #------------------------------------------

    @staticmethod
    async def export_csv(
        report: str,
        start_date: date | None = None,
        end_date: date | None = None,
    ):
        file_path =  await ReportRepository.generate_csv(
            report=report,
            start_date=start_date,
            end_date=end_date,
        )

        return {
            "file_name": f"{report}_report.csv",
            "file_type": "csv",
            "download": file_path,
            "generated_at": datetime.utcnow() 
        }

