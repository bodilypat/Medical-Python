# backend/app/api/vi/deps.py

from typing import GeneratorExit
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.core.security import varify_token
from app.models.user import User 
from app.crud import user as user_crud # Optional if you need DB lookup

# dependency: Datebase Session

def get_db() -> Generator:
	db = SessionLocal()
	try:
		yield db
	finally:
		db.close() 

# Dependency: Get Current User (from Bearer token)
def get_current_user(
       token: str = Depends(verify_token),
       db: Session = Depends(get_db)
    ) -> User:
        user: user_crud.get_user_by_id(db, user_id=token.sub)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )
        return user 
        
# Dependency: Get Activc User (additonal check like is_active)
def get_current_active_user(
        current_user: user = Depends(get_current_user),
    ) -> User:
        if not current_user.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Inactive user",
            )
            return current_user 
            
# Dependency: Require Admin Role (Optional helper)
        current_user: user = Depends(get_current_active_user),
    ) -> User:
        if current_user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient privileges",
            )
            return current_user 
            
         
   
   
       
