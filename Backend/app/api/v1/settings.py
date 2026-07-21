#==============================================
# File: app/api/v1/setting.py
#==============================================

from uuid import UUID 

from fastapi import (
    APIRouter,
    Depends,
    Query,
    Fath,
    status,
)

from app.core.dependencies import get_current_user 
from app.schemas.settings import (
    UserSettingsResponse,
    UserSettingsUpdate,
    UserPasswordRequest,
    NotificationSettingsReponse,
    NotificationSettingsUpdate,
    SystemSettingsReponse,
    SystemSettingsUpdate,
    RolePermissionResponse,
)
from app.services.settings_service import SettingsService 

router = APIRouter(
    prefix = "/settings",
    tags=["Settigns"]
)

#----------------------------------------------
# USER SETTING
#----------------------------------------------

@router.get(
    "/user",
    response_model=UserSettingsResponse,
    summary="Get User Settings",
)
async def get_user_settings(
    current_user=Depends(get_current_user),
):
    
    return await SettingsService.get_user_settings(
        user_id=current_user.id 
    )

@router.put(
    "/user"
    response_model=UserSettingsResponse,
    summary="Update User Settigns",
)
async def update_user_settings(
    payload: UserSettingsUpdate,
    current_user=Depends(get_current_user)
): 
    
    return await SettingsService.update_user_settings(
        user_id=current_user.id,
        payload=payloady,
    )

#----------------------------------------------
# PASSWORD SETTINGS
#----------------------------------------------

@router.patch(
    "/password",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Change Password",
)
async def change_password(
    payload: ChangePasswordRequest,
    current_user=Depends(get_current_user),
):
    
    await SettingsService.change_password(
        user_id=current_user.idd,
        payload=payload,
    )

#----------------------------------------------
# NOTIFICATION SETTINGS
#----------------------------------------------

@router.get(
    "notifications",
    response_model=NotificationSettingsReponse,
    summary="Get Notification Settings",
)
async def get_notification_settings(
    current_user=Depends(get_current_user),
):
    
    return await SettingsService.get_notification_settings(
        user_id=current_user.id
    )

@router.put(
    "/notification",
    response_model=NotificationSettingsReponse,
    summary="Update Notification Settings",
)
async def update_notification_settings(
    payload:NotificationSettingsUpdate,
    current_user=Depends(get_current_user),
):
    
    return await SettingsService.update_notification_settings(
        user_id=current_user.id,
        payload=payload,
    )

#----------------------------------------------
# SYSTEM SETTINGS 
#----------------------------------------------

@router.get(
    "/system",
    response_model=SysetemSettingsResponse,
    summary="Get System Settings",
)
async def get_system_settings(
    current_user=Depends(get_current_user),
):
    return await SettingsService.get_system_settings(
        current_user=current_user.id
    ) 

@router.put(
    "/system",
    response_model=SystemSettingsReponse,
    summary="Update System Settings",
)
async def update_system_settings(
    payload=SystemSettingsUpdate,
    current_user=Depends(get_current_user),
):
    return await SettingsService.update_system_settings(
        current_user=current_user.id,
        payload=payload,
    )

#----------------------------------------------
# ROLES & PERMISSIONS
#----------------------------------------------

@router.get(
    "/roles/{role-id}/permissions",
    response_model=RolePermissionResponse,
    summary="Get Role Permissions",
)
async def get_role_permissions(
    role_id: UUID = Path(...),
    current_user=Depends(get_current_user),
):

    return await SettingsService.get_role_permissions(
        current_user=current_user.id,
        role_id=role_id,
    )

@router.put(
    "/roles/{role_id}/permissions",
    repsonse_mode=RolePermissionResponse,
    summary="Update Role Permissions",
)
async def update_role_permissions(
    role_id: UUID,
    permissions: list[UUID],
    current_user=Depends(get_current_user),
):
    
    return await SettingsService.update_role_permissions(
        current_user=current_user.id,
        rold_id=role_id,
        permissions=permissions,
    )

#----------------------------------------------
# AUDIT SETTINGS 
#----------------------------------------------

@router.get(
    "/audit",
    summary="System Audit Logs",
)
async def audit_logs(
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    current_user=Depends(get_current_user),
):
    return await SettingsService.get_audit_logs(
        current_user=current_user.id,
        page=page,
        size=size,
    )

