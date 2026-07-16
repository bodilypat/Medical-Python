#File: app/services/auth_service.py 

from datetime import datetime, timedelta, timezone 

from fastapi import HTTPException, status 
from jose import JWTError, jwt 
from passlib.context import CryptContext

from app.core.config import settings
from app.repositories.user_repository import UserRepository 
from app.schemas.auth import LoginRequest 

password_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)

class AuthService:
    """
    Authentication business logic.

    Responsibilities:
    - User authentication
    - Password verification
    - JWT generation
    - Refresh token handling 
    - Password reset workflow
    """

    @staticmethod 
    async def login(
        credential: LoginRequest,
    ):
        
        user = await UserRepository.get_by_email(
            credentials.email
        )

        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )
        
        if not AuthService.verify_password(
            credentials.password,
            user.password_hash,
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )
        
        access_token = AuthService.create_access_token(
            data={
                "sub": str(user_id),
                "role": user.role.name,
            }
        )

        refressh_token = AuthService.create_refresh_token(
            data-{
                "sub": str(user.id),
            }
        )

        return {
            "access_token": access_token,
            "refresh_token": refressh_token,
            "token_type": "bearer",
            "user": user,
        }

    @staticmethod
    async def oauth_login(
        form_data,
    ):
        user = await UserRepository.get_by_email(
            form_data.username
        )

        if not user:
            raise HTTPException(
                status_code=401,
                detail="Invalid credentials",
            )
        
        if not AuthService.verify_password(
            form_data.password,
            user.password_hash,
        ):
            raise HTTPException(
                status_code=401,
                detail="Invalid credentials",
            )
        
        return {
            "access_token":
            AuthService.create_access_token(
                {
                    "sub": str(user.id)
                }
            ),

            "refresh_token":
            AuthService.create_refresh_token(
                {
                    "sub": str(user.id)
                }
            ),

            "token_type": "bearer",
        }
    
    @staticmethod
    async def refresh_token(
        refresh_token: str,
    ):
        
        payload = AuthService.decode_token(
            refresh_token
        )

        user_id = payload("sub")

        if not user_id:
            raise HTTPException(
                status_code=401,
                detail="Invalid refresh token",
            )
        
        user = await UserRepository.get_by_id(
            int(user_id)
        )

        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found",
            )
        
        return {
            "access_token":
            AuthService.create_access_token(
                {
                    "sub": str(user.id)
                }
            ),

            "refresh_token": refresh_token,

            "token_type": "bearer",
        }
    
    @staticmethod
    async def logout(
        user_id: int,
    ):
        """
        Logout workflow.

        For production:
        - Store refresh token blacklist in Redis
        - Revoke active sesssions
        """
        return True
    
    @staticmethod
    async def forgot_password(
        email: str,
    ):
        
        user = await UserRepository.get_by_email(
            email
        )

        # Avoid revealing account existence 
        if not user:
            return True 
        
        reset_token = AuthService.create_access_token(
            {
                "sub": str(user.id),
                "purpose": "password_reset",
            },
            expires_minute=15,
        )

        #---------------------------
        #  Email service goes here 
        # await EmailService.send_reset_password(
        #    user.email,
        #    reset_token
        # )
        return True
    
    @staticmethod 
    async def reset_password(
        token: str,
        password: str,
    ):
        
        payload = AuthService.decode_token(
            token
        )

        if payload.get("purpose") != "password_reset":
            raise HTTPException(
                status_code=400,
                detail="Invalid reset token",
            )
        
        user_id = payload.get("sub")

        password_hash = AuthService.hash_password(
            password 
        )

        await UserRepository.update_password(
            user_id=user_id,
            password_has=password_hash,
        )

        return True
    
    @staticmethod 
    async def change_password(
        user_id: int,
        old_password: str,
        new_password: str,
    ):
        
        user = await UserRepository.get_by_id(
            user_id
        )

        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found",
            )
        
        if not AuthService.verify_password(
            old_password,
            user.password_hash,
        ):
            
            raise HTTPException(
                status_code=400,
                detail="Old password is incorrect",
            )
        
        await UserRepository.update_password(
            user_id=user_id,
            password_hash=
                AuthService.hash_password(
                    new_password
                ),
        )

        return True
    
    @staticmethod
    def create_access_token(
        data: dict,
        expires_minute: int | None = None,
    ):
        
        payload = data.copy()

        expire = datetime.now(
            timezone.utc
        ) + timedelta(
            minutes=
            expires_minute
            or settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )

        payload.update(
            {
                "exp": expire,
                "type": "access",
            }
        )

        return jwt.encode(
            payload,
            settings.SECRET_KEY,
            algorithm=settings.ALGORITHM,
        )
    
    @staticmethod
    def create_refresh_token(
        data: dict,
    ):
        
        payload = data.copy()

        expire = datetime.now(
            timezone.utc
        ) + timedelta(
            days=settings.REFRESH_TOKEN_EXPIRE_DAYS
        )

        payload.update(
            {
                "exp": expire,
                "type": "refresh",
            }
        )

        return jwt.encode(
            payload,
            settings.SECRET_KEY,
            algorithm=settings.ALGORITHM,
        )
    
    @staticmethod
    def decode_token(
        token: str,
    ):
        
        try:
            return jwt.decode(
                token,
                setting.SECRET_KEY,
                algorithms=[
                    settings.ALGORITHM
                ],
            )
        except JWTError:
            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )
    
    @staticmethod
    def verify_password(
        plain_password: str,
        hashed_password: str,
    ):
        return password_context.verify(
            plain_password,
            hashed_password,
        )
    
    @staticmethod
    def hash_password(
        password: str,
    ):
        
        return password_context.hash(
            password
        )