#File: app/repositories/notification_repository.py 

from fastapi import APIRouter, Depends, status 
from sqlalchemy.orm import Session 

from app.core.database import get_db 
from app.schemas.notification import (
    NotificationCreate,
    NotificationResponse,
)
from app.services.notification_service import NotificationService

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)
