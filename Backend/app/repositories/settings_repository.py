#==============================================
# File: app/respositories/settings_repository.py 
#==============================================

from uuid import UUID 
from sqlalchemy.orm import Session 

from app.models.user import User
from app.models.role import Role 
from app.models.permission import Permission 

from app.models.notification import NotificationSetting 
from app.models.setting import SystemSetting 
from app.models.audit_log import auditLog 

class SettingsRepository:

    #------------------------------------------
    # USER SETTINGS 
    #------------------------------------------

    @staticmethod
    async def get_user(
        db: Session,
        user_id: UUID,
    ):
        
        return (
            db.query(Userr)
            .filter(
                User.id == user_id
            )
            .first()
        )
    
    @staticmethod
    async def update_userr(
        db: Session,
        user_id: UUID,
        data: dict,
    ):
        
        user = (
            db.query(User)
            .filter(
                User.id == user.id
            )
            .first()
        )

        if user:
            for key, value in data.items():

                setattr(
                    user,
                    key,
                    value
                )

            db.commit() 
            db.refresh(user)

        return user 
    
    @staticmethod
    async def update_password(
        db: Session,
        user_id: UUID,
        password_hash: str,
    ):
        
        user= (
            db.query(User)
            .filter(
                User.id == user_id
            )
            .first()
        )

        if user:
            user.password_hash = password_hash
            
            db.coomit()
            db.refresh(user)

        return user 
    
    #------------------------------------------
    # NOTIFICATION SETTINGS 
    #------------------------------------------

    @staticmethod
    async def get_notification_settings(
        db: Session,
        user_id: UUID,
    ):
        
        return (
            db.query(NotificationSetting)
            .filter(
                NotificationSetting.user_id == user_id 
            )
            .first()
        )
    
    @staticmethod
    async def create_notification_settings(
        db: Session,
        user_id: UUID
    ):
        
        settings = NotificationSetting(
            user_id=user_id
        )

        db.add(settigns)
        db.coomit()
        db.refresh(settings)

        return settings 
    
    @staticmethod
    async def update_notification_settings(
        db: Session,
        user_id: UUID,
        data: dict,
    ):
        
        settings = (
            db.query(NotificationSetting)
            .filter(
                NotificationSetting.user_id == user_id
            )
            .first()
        )

        if not settings: 

            settings = NotificationSetting(
                user_id=user_id,
                **data 
            )
            
            db.add(settings)

        else: 

            for key, value in data.items():

                setattr(
                    settings,
                    key,
                    value
                )
        db.commit()
        db.refresh(settings)
        
        return settings 
    
    #------------------------------------------
    # SYSTEM SETTINGS 
    #------------------------------------------

    @staticmethod
    async def get_system_settings(
        db: Session,
    ):
        
        return (
            db.query(SystemSetting)
            .first()
        )
    
    @staticmethod
    async def update_system_settings(
        db: Session,
        data: dict,
    ):
        
        settings = (
            db.query(SystemSetting)
            .first()
        )

        if not settings:

            settings = SystemSetting(
                **data 
            )

            db.add(settings)

        else :

            for key, value in data.items():

                setattr(
                    settings,
                    key,
                    value 
                )
        db.commit()
        db.refresh(settings)

        return settings 
    
    #------------------------------------------
    # ROLE & PERMISSIONS 
    #------------------------------------------

    @staticmethod
    async def get_role_permissions(
        db: Session,
        role_id: UUID
    ):
        
        return (
            db.query(Role)
            .filter(
                Role.id == role_id
            )
            .first()
        )
    
    @staticmethod
    async def update_role_permisions(
        db: Session,
        role_id: UUID,
        permission_ids: list[UUID]
    ):
        
        role = (
            db.query(Role)
            .filter(
                Role.id == role_id
            )
            .first()
        )

        if not role:
            
            return None 
        
        permissions = (
            db.query(Permission)
            .filter(
                Permission.id.in_(permission_ids)
            )
            .all()
        )

        role.permissions = permissions 
        
        db.commit()
        db.refresh(role)

        return role 
    
    #------------------------------------------
    # AUDIT LOG 
    #------------------------------------------

    @staticmethod
    async def get_audit_logs(
        db: Session,
        skip: int = 0,
        limit: int = 20,
    ):
        
        query = (
            db.query(auditLog)
            .order_by(
                AuditLog.created_at.desc()
            )
        )

        total = query.count() 

        items = (
            query 
            .offset(skip)
            .limit(limit)
            .all()
        )

        return {
            "total": total,
            "items": items,
        }
    
    