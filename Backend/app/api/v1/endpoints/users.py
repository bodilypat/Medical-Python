#app/api/v1/endpoints/user.py 

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from app.schemas.user import UserCreate, UserResponse, UserUpdate
from app.models.user import User
from app.core.database import get_db
from app.core.security import hash_password
from app.api.deps import require_role

router = APIRouter()

@router.post("/", response_model=UserResponse, dependencies=[Depends(require_role("admin"))])
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if username already exists
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    # Hash the password before storing
    hashed_password = hash_password(user.password)
    
    # Create new user instance
    db_user = User(
        username=user.username,
        password_hash=hashed_password,
        role=user.role
    )
    
    # Add to database and commit
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user

@router.get("/", response_model=List[UserResponse], dependencies=[Depends(require_role("admin"))])
def list_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

@router.get("/{user_id}", response_model=UserResponse, dependencies=[Depends(require_role("admin"))])
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/{user_id}", response_model=UserResponse, dependencies=[Depends(require_role("admin"))])
def update_user(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Update fields if provided
    if user_update.username:
        user.username = user_update.username
    if user_update.password:
        user.password_hash = hash_password(user_update.password)
    if user_update.role:
        user.role = user_update.role
    
    db.commit()
    db.refresh(user)
    
    return user 

@router.delete("/{user_id}", dependencies=[Depends(require_role("admin"))])
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(user)
    db.commit()
    
    return {"message": "User deleted successfully"}



