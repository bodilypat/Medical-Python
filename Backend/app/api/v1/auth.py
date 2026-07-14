#File: app/api/v1/auth.py 

from fastapi import APIRouter, Depends, HTTPException, status 
from fastapi import OAuth2PasswordRequestForm 

from app.schema.auth import (
    LoginRequest,
    LoginResponse,
    RefreshTokenRequest,
    TokenResponse,
    UserResponse,
)

from app.services.auth_service import AuthService 
from app.core.dependencies import get_current_user 

router = APIRouter()

@router.post(
    "/login",
    response_model=LoginResponse,
    summary="User Login"
)

async def login(
    credentials: LoginRequest,
): 
    """
    Authenticate a user and return access & refresh tokens.
    """
    return await AuthService.login(credentials)


@router.post(
    "/token",
    response_model = TokenResponse,
    summary="OAuth2 Login"
)
async def oauth_login(
    form_data: OAuth2PasswordRequestForm = Depends(),
):
    """
    OAuth2 compatible login endpoint.
    """
    return await AuthService.oauth_login(form_data)

@router.post(
    "/refresh",
    response_model=TokenResponse,
    summary="Refresh Access Token"
)
async def refresh_token(
    request: RefreshTokenRequest,
):
    """
    Generate a new access token using a refresh token.
    """
    return await AuthService.refresh_token(request.refresh_token)

@router.get(
    "/me",
    response_model=UserResponse,
    summary="Current Userr"
)
async def current_user(
    user=Depends(get_current_user),
):
    """
    Return authenticated user's profile.
    """
    return user 

@router.post(
    "/logout",
    summary="Logout"
)
async def logout(
    user=Depends(get_current_user),
):
    """
    Logout the current user.
    """
    await AuthService.logout(user.id)

    return {
        "success": True,
        "message": "Logged out successfully."
    }

@router.post(
    "/forgot-password",
    summary="Forgot Password"
)
async def forgot_password(
    email: str,
):
    """
    Send password reset email.
    """
    await AuthService.forgot_password(email)

    return {
        "success": True,
        "message": "Password reset email sent."
    }

@router.post(
    "/reset-password",
    summary="Reset Password"
)
async def reset_password(
    token: str,
    password: str,
):
    """
    Reset account password.
    """
    await AuthService.reset_password(
        token=token,
        password=password,
    )

    return {
        "success": True,
        "message": "Password reset successfully."
    }

@router.post(
    "/change-password",
    summary="Change Password"
)
async def change_password(
      old_password: str,
      new_password: str,
      user=Depend(get_current_user)  ,
):
    """
    Change logged-in user's password.
    """
    await AuthService.change_password(
        user_id=user.id,
        old_password=old_password,
        new_password=new_password,
    )
    return {
        "success": True,
        "message": "Password changed successfully."
    }