#File: app/api/v1/dashboard.py

from fastapi import APIRouter, Depends, Query 

from app.core.dependencies import (
    get_current_user,
    require_admin,
)
from app.schema.dashboard import (
    DashboardSummaryResponse,
    DashboardStatisticsResponse,
    DashboardChartResponse,
    RecentActivityReponse,
)

from app.services.dashboard_service import DashboardService

router = APIRouter()

@router.get(
    "/summary",
    response_model=DashboardSummaryResponse,
    summary="Dashboard Summary"
)
async def get_dashboard_summary(
    current_user=Depends(get_current_user),
):
    """
    Return dashboard summary.

    Includes;
        - Total Patients
        - Total Doctors 
        - Total's Appointments 
        - Revenue
    """
    return await DashboardService.get_summary()

@router.get(
    "/statistics",
    response_model=DashboardStatisticsResponse,
    summary="Dashboard Statistics"
)
async def get_dashboard_statistics(
    current_user=Depends(get_current_user)
):
    """
    Return dashboard statistics.
    """
    return await DashboardService.get_statistics() 

@router.get(
    "/charts",
    response_model=DashboardChartResponse,
    summary="Dashboard Charts"
)
async def get_dashboard_charts(
    period: str = Query(
        default="monthy",
        regex="^(daily|weekly|monthly|yearly)$"
    ),
    current_user=Depends(get_current_user),
):
    """
    Return deshboard chart data.

    Supported periods: 
        - daly
        - weekly 
        - monthly
        - yearly
    """
    return await DashboardService.get_chart_data(period)

@router.get(
    "/recent-activities",
    response_model=RecentActivityReponse,
    summary="Recent Activities"
)
async def get_recent_activities(
    limit: int = Query(defaul=10, ge=1, le=100),
    current_user=Depends(get_current_user),
):
    """
    Return recent system activities.
    """
    return await DashboardService.get_recent_activities(limit)

@router.get(
    "/admin",
    summay="Admin Dashboard"
)
async def admin_dashboard(
    current_user=Depends(require_admin),
):
    """
    Return administrator dashboard data.
    """
    return await DashboardService.get_admin_dashboard()

@router.get(
    "/doctor/",
    summary="Doctor Dashboard"
)
async def doctor_dashboard(
    current_user=Depends(require_admin),
):
    """
    Return doctor specific dashboard.
    """
    return await DashboardService.get_doctor_dashboard(
        current_user.id
    )

@router.get(
    "/patient",
    summary="Patient Dashboard"
)
async def patient_dashboard(
    current_user=Depends(get_current_user),
):
    """
    Return patient-specific dashboard.
    """
    return await DashboardService.get_patient_dashboard(
        current_user.id
    )