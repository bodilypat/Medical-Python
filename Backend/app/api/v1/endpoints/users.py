# app/api/v1/routes/users.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.dependencies import get_current_user, require_roles
from app.core.constants import UserRole

router = APIRouter()

@router.get("/admin-only-endpoint")
def admin_only_endpoint(
    current_user = Depends(require_roles([UserRole.ADMIN])),
    db: Session = Depends(get_db)
):
    return {"message": "Welcome, Admin!"}

@router.get("/doctor-or-admin-endpoint")
def doctor_or_admin_endpoint(
    current_user = Depends(require_roles([UserRole.DOCTOR, UserRole.ADMIN])),
    db: Session = Depends(get_db)
):
    return {"message": "Welcome, Doctor or Admin!"}

@router.get("/all-roles-endpoint")
def all_roles_endpoint(
    current_user = Depends(require_roles([UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT])),
    db: Session = Depends(get_db)
):
    return {"message": "Welcome, User!"}
