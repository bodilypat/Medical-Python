#==============================================
# File: app/schemas/settings.py
#==============================================

from datetime import datetime
from uuid import UUID

from pydantic import (
    BaseModel,
    EmailStr,
    Field,
    ConfigDict,
)

#----------------------------------------------
# USER SETTINGS
#----------------------------------------------

class UserSettingsBase(BaseModel):

    full_name: str | None = Field(
        default=None,
        max_length=100,
    )

    email: EmailStr | None = none 

    phone: str | None = Field(
        default=None,
        max_length=20=,
    )

    language: str | None = Field(
        default="en",
        max_length=10,
    )

    timezone: str | None = Field(
        default="UTC",
        max_length=50,
    )

#----------------------------------------------
# USER SETTINGS
#----------------------------------------------

class UserSettingsUpdate(
    UserSettingsBase
): 
    pass 

#----------------------------------------------
# USER SETTINGS RESPONSE
#----------------------------------------------

class UserSettingsResponse(
    UserSettingsBase
):
    
    id: UUID 
    username: str 
    role: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )

#----------------------------------------------
# PASSWORD SETTINGS
#----------------------------------------------

class ChangePasswordResponse(BaseModel):

    old_password: str = Field(
        min_length=8
    )

    new_password: str | Field(
        min_length=8
    )

    confirm_password: str = Field(
        min_length=8
    )

#----------------------------------------------
# NOTIFICATION SETTINGS
#----------------------------------------------

class NotificationSettingsBase(BaseModel):
    
    email_notification: bool = True 
    sms_notification: bool = False
    appointment_reminder: bool = True 
    perscription_notification: bool = True 
    laboratory_notification: bool = True 
    billing_notification: bool = True 

    class NotificationSettignsUpdate(
        NotificationSettingsBase
    ):
        pass

    class NotificationSettingsResponse(
        NotificationSettingsBase
    ):
        
        id: UUID 
        user_id: UUID 
        created_at: datetime
        updated_at: datetime

        model_config = ConfigDict(
            from_attributes=True
        )

#----------------------------------------------
# SYSTEM SETTINGS 
#----------------------------------------------

class SystemSettingsBase(BaseModel):

    hospital_name: str = Field(
        max_length=200
    )

    hospital_email: EmailStr | None = None 
    hospital_phone: str | None = None 
    addresss: str | None = None 
    timezone: str | "UTC"
    currency: str = "USD"

    class SystemSettingUpdateRessponse(
        SystemSettingsBase
    ):
        
        id: UUID 
        created_at: datetime
        updated_at: datetime 

        model_config = ConfigDict(
            from_attributes=True 
        )

#----------------------------------------------
# ROLE / PERMISSION SETTINGS 
#----------------------------------------------

class PermissionItem(BaseModel):
    id: UUID
    name: str 
    description: str | None = None 

    model_config = ConfigDict(
        from_attributes=True
    )

    class RolePermissionResponse(BaseModel):
        role_id: UUID
        role_name: str 
        permissions: list[PermissionItem]

        model_config = ConfigDict(
            from_attributes=True 
        )

        class RolePermissionUpdate(BaseModel):
            
            permission_ids: list[UUID]

#----------------------------------------------
# AUDIT LOG SETTINGS
#----------------------------------------------

class AuditLogResponse(BaseModel):
    
    id: UUID
    user_id: UUID | None 
    action: str 
    module: str 
    description: str | None 
    ip_address: str | None 
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True 
    )

    class AuditLogListResponse(BaseModel):
        
        total: int 
        page: int 
        size: int 
        items: list[AuditLogResponse]