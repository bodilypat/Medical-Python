#app/api/v1/endpoints/auth.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas import UserLogin, Token
from app.models.user import User
from app.code.database import get_db
from app.core.security import verify_password, create_access_token

router = APIRouter()

@router.post("/login", response_model=Token)
def login(user_login: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == user_login.username).first()
    if not user or not verify_password(user_login.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.username, "role": user.role})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/register", response_model=Token)
def register(user_login: UserLogin, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == user_login.username).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already registered")
    
    new_user = User(
        username=user_login.username,
        password_hash=verify_password(user_login.password),
        role="staff"  # Default role, can be changed by admin later
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token = create_access_token(data={"sub": new_user.username, "role": new_user.role})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/change-password")
def change_password(current_user: User = Depends(get_current_user), new_password: str = None, db: Session = Depends(get_db)):
    if not new_password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="New password is required")
    
    current_user.password_hash = verify_password(new_password)
    db.commit()
    return {"message": "Password changed successfully"}

@router.post("/logout")
def logout():
    # In a real application, you would handle token revocation here
    return {"message": "Successfully logged out"}


