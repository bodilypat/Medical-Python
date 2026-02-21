#app/schemas/user.py

from pydantic import BaseModel, EmailStr, constr
from typing import Optional
from datetime import datetime

#------------------------------------
# Base user schema (common fields)
#------------------------------------

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[constr(min_length=1, max_length=100)] = None
    phone_number: Optional[constr(min_length=10, max_length=15)] = None
    role: Optional[constr(min_length=1, max_length=50)] = "user"
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    is_active: bool = True
    is_verified: bool = False

#------------------------------------
# User creation schema
#------------------------------------
class UserCreate(UserBase):
    password: constr(min_length=8)
    confirm_password: constr(min_length=8)

#------------------------------------
# Schma for updating user information
#------------------------------------   
class UserUpdate(BaseModel):
    full_name: Optional[constr(min_length=1, max_length=100)] = None
    phone_number: Optional[constr(min_length=10, max_length=15)] = None
    role: Optional[constr(min_length=1, max_length=50)] = None
    is_active: Optional[bool] = None
    is_verified: Optional[bool] = None

#------------------------------------
# Schema for returning user information
#------------------------------------
class UserOut(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime

#------------------------------------
# Schema for user login
#------------------------------------
class UserLogin(BaseModel):
    email: EmailStr
    password: constr(min_length=8)

#------------------------------------
# Schema for login response with token
#------------------------------------
class UserLoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    
    class Config:
        orm_mode = True