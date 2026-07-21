#File: app/api/v1/reports.py 

from datetime import date 
from fastapi import APIRouter, Depends, Query
from app.core.dependencies import get_current_user 
from app.schemas.report import(
    DashboardReportResponse,
    PatientReportResponse,
    AppointmentReportResponse,
    BiillingReportResponse,
    LaboratoryReportResponse,
    PharmacyReportResponse,
)
from app.service.report_service import ReportService 

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)

#----------------------------------------------
# DASHBOARD REPORT 
#----------------------------------------------

@router.get(
    "dashboard",
    response_model=DashboardReportResponse,
    summary="Dashboard Report",
)
async def dasboard_report(
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    current_user=Depends(get_current_user)
):
    return await ReportService.dashboard_report(
        start_date=start_date,
        end_date=end_date,
        current_user=current_user,
    )

#----------------------------------------------
# PATIENT REPORT 
#----------------------------------------------

@router.get(
    "/paitents",
    response_model=PatientReportResponse,
    summary="Patient Report"
)
async def patient_report(
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    current_user=Depends(get_current_user)
):
    return await ReportService.patient_report(
        start_date=start_date,
        end_date=end_date,
        current_user=current_user
    )

#----------------------------------------------
# APPOINTMENT REPORT 
#----------------------------------------------

@router.get(
    "/apppointments",
    response_model=AppointmentReportResponse,
    summary="Appointment Report"
)
async def appointment_report(
    start_date: date | None = Qeury(None),
    end_date: date | None = Query(None),
    doctor_id: str | None = Query(None),
    current_user=Depends(get_current_user)
):
    return await ReportService.appointment_report(
        start_date=start_date,
        end_date=end_date,
        doctor_id=doctor_id,
        current_user=current_user,
    )

#----------------------------------------------
# BILLING REPORT 
#----------------------------------------------

@router.get(
    "/billing",
    response_mode=BillingReportResponse,
    summary="Billing Report",
)
async def billing_report(
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    current_user=Depends(get_current_user),
):
    
    return await ReportService.billing_report(
        start_date=start_date,
        end_date=end_date,
        current_user=current_user,
    )

#----------------------------------------------
# LABORATORY REPORT
#----------------------------------------------

@router.get(
    "/laboratory",
    response_model=LaboratoryReportResponse,
    summary="Laboratory Report"
)
async def laboratory_report(
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    current_user=Depends(get_current_user)
):
    return await ReportService.laboratory_report(
        start_date=start_date,
        end_date=end_date,
        current_user=current_user,
    )

#----------------------------------------------
# PHARMACY REPORT
#----------------------------------------------

@router.get(
    "/pharmacy",
    response_model=PharmacyReportResponse,
    summary="Pharmacy Report",
)
async def pharmacy_report(
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    current_user=Depends(get_current_user)
):
    return await ReportService.pharmacy_report(
        start_date=start_date,
        end_date=end_date,
        current_user=current_user,
    )

#----------------------------------------------
# EXPROT PDF 
#----------------------------------------------

@router.get(
    '/export/pdf',
    summary="Export Report as PDF",
)
async def export_pdf(
    report: str = Query(...),
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    current_user=Depends(get_current_user)
):
    return await ReportService.export_pdf(
        report=report,
        start_date=start_date,
        end_date=end_date,
    )

#----------------------------------------------
# Export Excel 
#----------------------------------------------

@router.get(
    "/export/excel",
    summary="Export Report as Excel",
)
async def export_excel(
    report: str = Query(...),
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    current_user=Depends(get_current_user),
):
    return await ReportService.export_excel(
        report=report,
        start_date=start_date,
        end_date=end_date,
        current_user=current_user,
    )

#----------------------------------------------
# EXPORT CSV
#----------------------------------------------

@router.get(
    "/exports/csv",
    summary="Export Report",
)
async def export_csv(
    report: str = Query(...),
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    current_user=Depends(get_current_user)
):
    return await ReportService.export_csv(
        report=report,
        start_date=start_date,
        end_date=end_date,
        current_user=current_user,
    )

