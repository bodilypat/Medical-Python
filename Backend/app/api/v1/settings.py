#File: app/api/v1/settings.py 

from fastapi import APIRouter, Depends, status 

from app.core.dedpendencies import (
    get_current_user,
    require_admin,
)
from app.schemas.settings import(
    HospitalSettingsUpdate,
    HospitalSettingsReponse,
    SystemSettingsUpdate,
    SystemSetingsResponse,
    UserPreferenceUpdate,
    UserPreferenceResponse,
    NotificationSettingsUpdate,
    NotificationSettingsResponse,
    SecuritySettingsUpdate,
    SecuritySettingsResponse,
)

from app.services.settings_service import SettingsService 

router = APIRouter()

#----------------------------------------------
# Hospital Settings
#----------------------------------------------
@router.get(
    "/hospital",
    response_model=HospitalSettingsReponse,
    summary="Get Hospital Settings",
)
async def get_hospital_settings(
    current_user=Depends(get_current_user),
):
    return await SettiingService.get_hospital_settings()

@router.put(
    "/hospital",
    response_model=HospitalSettingsReponse,
    summary="Update Hospital Settings",
)
async def update_hospital_settings(
    payload: HospitalSettingsUpdate,
    current_user=Depends(require_admin),
):
    return await SettingsService.update_hospital_settings(payload)

#----------------------------------------------
# System Setting 
#----------------------------------------------
@router.get(
    "/system",
    response_model=SystemSetingsResponse,
    summary="Get System Settings",
)
async def get_system_settings(
    current_user=Depends(require_admin),
):
    return await SettingsService.get_system_settings()

@router.put(
    "/system",
    response_model=SystemSettingsUpdate,
    summary="Update System Settings",
)
async def update_system_settings(
    payload: SystemSettingsUpdate,
    current_user=Depends(require_admin),
):
    return await SettingsService.update_system_settings(paylaod)

#----------------------------------------------
# User Preferences 
#----------------------------------------------
@router.get(
    "/preferences",
    response_model=UserPreferenceResponse,
    summary="Get User Preferences",
)
async def get_user_preferences(
    current_user=Depends(get_current_user),
):
    return await SettingsService.get_user_preference(
        current_user.id
    )

@router.put(
    "/preferences",
    response_model=UserPreferenceResponse,
    summary="Update User Preferences"
)
async def update_user_prefences(
    payload: UserPreferenceUpdate,
    current_user=Depends(get_current_user)
):
    return await SettingsService.update_user_preferences(
        current_user.id,
        payload,
    )

#----------------------------------------------
# Notification Settings
#----------------------------------------------
@router.get(
    "/notifications",
    response_model=NotificationSettingsResponse,
    summary="Update User Preferences",
)
async def update_user_preferences(
    payload: UserPreferenceUpdate,
    current_user=Depends(get_current_user),
):
    return await SettingsService.update_user_preferences(
        current_user.id,
        payload,
    )

#----------------------------------------------
# Notification Setting 
#----------------------------------------------
@router.put(
    "/notifications",
    response_model=NotificationSettingsResponse,
    summary="Update Notification Settings",
)
async def update_notification_settings(
    payload: NotificationSettingsUpdate,
    current_user=Depends(get_current_user),
):
    return await SettingsService.update_notification_settings(
        current_user.id,
        payload
    )

#----------------------------------------------
# Security Settings
#----------------------------------------------
@router.get(
    "/security",
    response_model=SecuritySettingsResponse,
    summary="Get Security Settings",
)
async def get_security_settings(
    current_user=Depends(get_current_user),
):
    return await SettingsService.get_security_settings(
        current_user.id
    )

@router.put(
    "/security",
    reponse_model=SecuritySettingsResponse,
    summary="Update Security Settings",
)
async def update_security_settings(
    payload: SecuritySettingsUpdate,
    current_user=Depends(get_current_user),
):
    return await SettingsService.update_security_settings(
        current_user.id,
        payload,
    )

#----------------------------------------------
# Cache 
#----------------------------------------------
@router.post(
    "/cache/clear",
    status_code=status.HTTP_200_OK,
)
async def clear_cache(
    current_user=Depends(require_admin),
): 
    return await SettingsService.clear_cache()

#----------------------------------------------
# System Health
#----------------------------------------------
@router.get(
    "/health",
    summary="System Health",
)
async def system_health(
    current_user=Depends(require_admin),
):
    return await SettingsService.system_health()


