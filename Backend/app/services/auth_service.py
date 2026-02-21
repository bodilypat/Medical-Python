#app/services/auth_service.py

from datetime import datetime, timedelta
from typing import Optional

from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import JWTError, jwt

from app.models.user import User
from app.schemas.user import get_user_by_email, UserInDB, UserCreate
from app.core.security import verify_password
from app.core.config import settings

# Authentication Service
def authenticate_user(
        db: Session, 
        email: str, 
        password: str
    ):
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user
#-------------------------------------------
# Password Hashing
#-------------------------------------------
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

#--------------------------------------------
# JWT Token Utilities
#--------------------------------------------
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

#--------------------------------------------
# Decode JWT Token
#--------------------------------------------
def decode_access_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            return None
        return user_id
    except JWTError:
        return None
#--------------------------------------------
# User Authentication Service
#--------------------------------------------
def get_user_by_email(db: Session, email: str) -> Optional[UserInDB]:
    user = db.query(User).filter(User.email == email).first()
    if user:
        return UserInDB.from_orm(user)
    return None
    
class AuthService:
    def __init__(self, db: Session):
        self.db = db

    def authenticate_user(self, username: str, password: str) -> Optional[UserInDB]:
        user = self.db.query(User).filter(User.username == username).first()
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return UserInDB.from_orm(user)

    def register_user(self, user_create: UserCreate) -> UserInDB:
        hashed_password = pwd_context.hash(user_create.password)
        db_user = User(
            username=user_create.username,
            email=user_create.email,
            hashed_password=hashed_password
        )
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return UserInDB.from_orm(db_user)
    
