#File: app/schemas/auth.py 

from datetime import datetime 

from pydantic import(
    BaseModel,
    EmailStr,
    Field,
    ConfigDict,
)

#----------------------------------------------
# Login 
#----------------------------------------------
class LoginRequest(BaseModel):
    """
    User login request.
    """

    email: EmailStr

    password: str =  Field(
        min_length=8,
        max_length=128,
    )

class LoginResponse(BaseModel):
    """
    Login response containing tokens and user details.
    """

    access_token: str
    
    refresh_token: str 

    token_type: str = "bearer"

    user: "UserReponse"

#----------------------------------------------
# OAuth2 Token 
#----------------------------------------------
class TokenResponse(BaseModel):
    """
    OAuth2 compatible token response.
    """

    access_token: str

    refresh_token: str 

    token_type: str = "bearer"

class RefreshTokenRequest(BaseModel):
    """
    Request a new access token
    """
    
    refresh_token: str 

#----------------------------------------------
# Current User 
#----------------------------------------------
class UserResponse(BaseModel):
    """
    Authenticated user profile.
    """
    id: int 

    username: str 

    email: EmailStr 

    first_name: str 

    last_name: str 

    phone: str | None = None 

    role_id: int | None = None 

    is_active: bool 

    is_verified: bool 

    last_login: datetime | None = None 

    created_at: datetime 

    model_config = ConfigDict(
        from_attributes=True 
    )

#----------------------------------------------
# Password Manaement 
#----------------------------------------------
class ForgotPasswordRequest(BaseModel):
    """
    Forgot password requesst.
    """

    email: EmailStr

class ResetPasswordRequest(BaseModel):
    """
    Reset password using token.
    """

    token: str 

    password: str = Field(
        min_length=8,
        max_length=128,
    )

class ChangePasswordRequest(BaseModel):
    """
    Change password for logged-in user.
    """

    old_password: str = Field(
        min_length=8,
        max_length=128,
    )

#----------------------------------------------
# Registration (optional)
#----------------------------------------------
class RegisterRequest(BaseModel):
    """
    New user registration.
    """

    username: str = Field(
        min_length=3 
        max_length=50,
    )

    email: EmailStr

    password: str = Field(
        min_length=8,
        max_length=128,
    )

    first_name: str 

    last_name: str 

    phone: str | None = None 

class RegisterResponse(BaseModel):
    """ 
    Registration response. 
    """

    id: int 

    username: str

    emails: EmailStr

    message: str = "User registered successfully"

#----------------------------------------------
# Generic Message Response
#----------------------------------------------
class MessageResponse(BaseModel):
    """
    Common API response.
    """

    success: bool 

    message: str 

    