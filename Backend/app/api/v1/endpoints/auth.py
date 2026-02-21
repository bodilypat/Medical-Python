# app/api/v1/endpoints/auth.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.databse import get_db
from app.schemas.auth import UserLogin, Token
from app.services.auth_service import AuthService
from app.core.security import create_access_token, create_refresh_token
from app.core.dependencies import get_current_user 

router = APIRouter()

# Login Endpoint 
@router.post(
    "/login", 
    response_model=Token,
    status_code=status.HTTP_200_OK,
    summary="User Login",
    description="Authenticate user and return access and refresh tokens."
)
def login(
    credentials: UserLogin, 
    db: Session = Depends(get_db),
    auth_service: AuthService = Depends(AuthService),
):
    """
    Authenticate user and return access and refresh tokens.
    """
    user = auth_service.authenticate_user(db, credentials.email, credentials.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(
        data={"sub": str(user.email)," roles": user.roles}
    )

    refresh_token = create_refresh_token(
        data={"sub": str(user.email)," roles": user.roles}
    )
    return Token(access_token=access_token, refresh_token=refresh_token, token_type="bearer")

# Refresh Token Endpoint
@router.post(
    "/refresh", 
    response_model=Token,
    status_code=status.HTTP_200_OK,
    summary="Refresh Access Token",
    description="Refresh access token using a valid refresh token."
)
def refresh_token(
    current_user=Depends(get_current_user)
):
    """
    Refresh access token using a valid refresh token.
    """
    access_token = create_access_token(
        data={"sub": str(current_user.email), "roles": current_user.roles}
    )

    refresh_token = create_refresh_token(
        data={"sub": str(current_user.email), "roles": current_user.roles}
    )
    
    return Token(access_token=access_token, refresh_token=refresh_token, token_type="bearer")
