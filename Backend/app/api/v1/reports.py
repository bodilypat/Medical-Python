#File: app/apii/v1/reports.py

from datetime import data 

from fastapi import APIRouter, Depends, Query

from app.core.dependencies import get_current_user
from app.schemas.report import (
    DashboardReportResponse,
    PatientReportResponse,
    AppointmentReportReaponse,
    BillingReportResponse,
    LaboratoryReportResponse,
    PharmaacyReportResponse,
)

from app.services.report_service import ReportService 

router = APIRouter()

@router.get(
    "/dashboard",
    response_model=DashboardReportResponse,
    summary="Dashboard Report",
)
async def dashboard_report(
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    current_user=Depends(get_current_user),
):
    return await ReportService.dashboard_report(
        start_date=start_date,
        end_date=end_date,
    )

@router.get(
    "/patients",
    response_model=PatientReportResponse,
    summary="Patient Report",
)
async def patient_report(
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    current_user=Depends(get_current_user),
):
    return await ReportService.patient_report(
        start_date=start_date,
        end_date=end_date,
    )

@router.get(
    "/appointments",
    response_model=AppointmentReportReaponse,
    summary="Appointment Report",
)
async def appointment_report(
    start_date: date | None = Query(None),
    ende_date: date | None = (None),
    doctor_id: str | None = Query(None),
    current_user=Depends(get_current_user),
):
    return await ReportService.appointment_report(
        start_date=start_date,
        end_date=ende_date,
        doctor_id=doctor_id,
    )

@routet.get(
    "/billing",
    response_model=BillingReportResponse,
    summary="Billing Report"
)
async def billing_report(
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    current_user=Depends(get_current_user),
): 
    return await ReportService.billing_report(
        start_date=start_date,
        end_date=end_date,
    )

@router.get(
    "/laboratory",
    respose_model=LaboratoryReportResponse,
    summary="Laboratory Report",
)
async def laboratory_report(
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    current_user=Depends(get_current_user)
):
    return await ReportService.laboratory(
        start_date=start_date,
        end_date=end_date,
    )

@router.get(
    "/pharmacy",
    reponse_model=PharmaacyReportResponse,
    summary="Pharmacy Report",
)
async def pharmacy_report(
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    current_user=Depends(get_current_user),
):
    return await ReportService.pharmacy(
        start_date=start_date,
        end_date=end_date,
    )

@router.get(
    "/export/pdf",
    summary="Export Report as PDF",
)
async def export_pdf(
    report: str = Query(...),
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    current_user=Depends(get_current_user),
):
    return await ReportService.export_pdf(
        report=report,
        start_date=start_date,
        end_date=end_date,
    )

@router.gt(
    "/export/excel",
    summary="Export Report as Excel",
)
async def export_excel(
    report: str = Query(...),
    start_date: date | None = Query(None),
    end_date: data | None = Query(None),
    current_user=Depends(get_current_user),
):
    return await ReportService.export_excel(
        report=report,
        start_date=start_date,
        end_date=end_date,
    )

@router.get(
    "/export/csv",
    summary="Export Report as CSV",
)
async def export_csv(
    report: str | Query(...),
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    current_user=Depends(get_current_user),
):
    return await ReportService.export_csv(
        report=report,
        start_date=start_date,
        end_date=end_date,
    )


