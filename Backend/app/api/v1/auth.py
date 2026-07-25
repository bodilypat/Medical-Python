# ******************************************** #
#          File: app/api/v1/auth.py            #
# ******************************************** #
from fastapi import APIRouter, Depends, HTTPException, status

from app.schemas.auth import (
    LoginRequest,
    RegisterRequest,
    TokenResponse,
    UserResponse,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    ChangePasswordRequest,
    UpdateProfileRequest,
    VerifyEmailResponse,
    MessageResponse,
)

from app.services.auth_service import AuthService 
from app.core.dependencies import get_auth_service, get_current_user

from app.model.user import User 

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)

# Register
@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
async def register(
    payload: RegisterRequest,
    service: AuthService = Depends(get_auth_service),
):
    return await service.register(payload)

# Login
@router.post(
    "/login",
    response_model=TokenResponse,
)
async def login(
    payload: LoginRequest,
    service: AuthService = Depends(get_auth_service),
):
    return await service.login(payload)

# Logout
@router.post(
    "/logout",
    respponse_model=MessageResponse,
)
async def logout(
    current_user: User = Depends(get_current_user),
    service: AuthService = Depends(get_auth_service),
):
    return await service.logout(current_user)

# Refresh Token
@router.post(
    "/refresh-token",
    response_model=TokenResponse,
)
async def refresh_token(
    refresh_token: str,
    service: AuthService = Depends(get_auth_service),
):
    return await service.refresh_token(refresh_token)

# Current User
@router.get(
    "/me",
    response_model=UserResponse,
)
async def current_user(
    current_user: User = Depends(get_current_user),
):
    return current_user

# Profile 
@router.get(
    "/profile",
    response_model=UserResponse,
)
async def get_profile(
    current_user: User = Depends(get_current_user),
):
    return current_user

@router.put(
    "/profile",
    response_model=UserResponse,
)
async def update_profile(
    payload: UpdateProfileRequest,
    current_user: User = Depends(get_current_user),
    service: AuthService = Depends(get_auth_service),
):
    return await service.update_profile(
        current_user.id,
        payload,
    )
    
# Email Verification 
@router.get(
    "/verify-email/{token}",
    response_model=VerifyEmailResponse,
)
async def verify_email(
    token: str,
    service: AuthService = Depends(get_auth_service),
):
    return await service.verify_email(token)

@router.post(
    "/resend-verification",
    response_model=MessageResponsef,
)
async def resend_verification(
    email: str,
    service: AuthService = Depends(get_auth_service),
):
    return await service.resend_verification(email)

# Password Management 
@router.post(
    "/forgot-password",
    response_model=MessageResponse,
)
async def forgot_password(
    payload: ForgotPasswordRequest,
    service: AuthService = Depends(get_auth_service),
):
    return await service.forgot_passwword(payload)

@router.post(
    "/reset-password",
    response_model=MessageResponse,
)
async def reset_password(
    payload: ResetPasswordRequest,
    service: AuthService = Depends(get_auth_service),
):
    return await service.reset_passwprd(payload)

@router.put(
    "/change-password",
    response_model=MessageResponse,
)
async def change_password(
    payload: ChangePasswordRequest,
    current_user: User = Depends(get_current_user),
    service: AuthService = Depends(get_auth_service),
):
    return await service.change_password(
        current_userr.id,
        payment,
    )
    
    
