#==============================================
# File: app/services/settings_service.py 
#==============================================

from uuid import UUID 
from fastapi import HTTPException, status 
from app.core.security import (
    verify_password,
    get_password_hash,
)

from app.schemas.settings import (
    UserSettingsUpdate,
    NotificationSettingUpdate,
    SystemSettingsUpdate,
    ChangePasswordRequest,
    RolePermissionUpdate,
)

from app.respositories.setting_repository import SettingsRepositoty 

class SettingsService:

    #------------------------------------------
    # USER SETTINGS 
    #------------------------------------------

    @staticmethod
    async def get_user_settings(
        user_id: UUID
    ):
        user = await SettingsRepositoty.get_user(
            user_id 
        )

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found."
            )
        
        return user 
    
    @staticmethod
    async def update_user_settings(
        user_id: UUID,
        payload: UserSettingsUpdate,
    ):
        user = await SettingsRepositoty.get_user(
            user_id
        )

        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found",
            )
        return await SettingsRepositoty.update_user(
            user_id,
            payload.model_dump(
                exclude_unset=True
            ),
        )
    
    #------------------------------------------
    # PASSWORD 
    #------------------------------------------

    @staticmethod
    async def change_password(
        user_id: UUID,
        payload: ChangePasswordRequest,
    ):
        
        if payload.new_password != payload.confirm_password:

            raise HTTPException(
                status_code=400,
                detail="Password do not match",
            )
        
        user = await SettingsRepositoty.get_user(
            user_id 
        )

        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found.",
            )
        
        if not verify_password(
            payload.old_password,
            user.password_hash,
        ):

            raise HTTPException(
                status_code=400,
                detail="Invalid old password",
            )

        new_hash = get_password_hash(
            payload.new_password
        )

        await SettingsRepositoty.update_password(
            user_id,
            new_hash
        )

        return None 
    
    #------------------------------------------
    # NOTIFICATION SETTINGS 
    #------------------------------------------

    @staticmethod
    async def get_notification_settings(
        user_id: UUID
    ):
        
        settings = await SettingsRepositoty.get_notifiication_setings(
            user_id
        )

        if not settings:

            return await SettingsRepositoty.create_notification_settings(
                user_id
            )
        
        return settings 
    
    @staticmethod
    async def update_notification_settings(
        user_id: UUID,
        payload: NotificationSettingUpdate,
    ):
        
        return await SettingsRepositoty.update_notification_settings(
            user_id,
            payload.model_dump(),
        )
    
    #------------------------------------------
    # SYSTEM SETTINGS 
    #------------------------------------------

    @staticmethod
    async def get_system_settings():
        settings = await SettingsRepositoty.get_system_settings() 

        if not settings:

            raise HTTPException(
                status_code=404,
                detail="System setting not configured",
            )
        
        return settings 
    
    @staticmethod
    async def update_system_settings(
        payload: SystemSettingsUpdate,
    ):
        
        return await SettingsRepositoty.update_system_settings(
            payload.model_dump()
        )
    

    #------------------------------------------
    # ROLE & PERMISSIONS 
    #------------------------------------------

    @staticmethod
    async def get_role_permissions(
        role_id: UUID
    ):
        
        role =  await SettingsRepositoty.get_role_permissions(
            role_id
        )

        if not role:

            raise HTTPException(
                status_code=404,
                detail="Role not found",
            )
        
        return role 
    
    @staticmethod
    async def update_role_permissions(
        role_id: UUID,
        permissions: RolePermissionUpdate,
    ):
        
        return await SettingsRepositoty.update_role_permissions(
            role_id,
            permissions.permission_ids,
        )
    
    #------------------------------------------
    # AUDIT LOGS 
    #------------------------------------------

    @staticmethod
    async def get_audit_logs(
        page: int = 1,
        size: int = 20,
    ):
        
        skip = (
            page -1 
        ) * size 

        return  await SettingsRepositoty.get_audit_logs(
            skip=skip,
            limit=size,
        )
