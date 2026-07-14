#File: app/api/v1/notification.py

from uuid import UUID
from fastapi import APIRouter, Depends, Path, Query, status 

from appp.core.dedpendencies import get_current_user 
from app.schemas.notification import (
    NotificationCreate,
    NotificationResponse,
    NotificationListResponse,
    NotificationPreferenceUpdate,
)

from app.services.notification_service import NotificationService 

router = APIRouter() 

@router.post(
    "/",
    response_model=NotificationResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create Notification",
)
async def create_notification(
    payload: NotificationCreate,
    current_user=Depends(get_current_user)
):
    """
    Create a notification.
    """
    return await NotificationService.create_notification(payload)

@router.get(
    "/",
    response_model=NotificationListResponse,
    summary="Get Notifications",
)
async def get_notifications(
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    unread_only: bool = Query(False),
    current_user=Depends(get_current_user),
):
    """
    Get notications for the authenticated user.
    """
    return await NotificationService.get_notifications(
        user_id=current_user.id,
        page=page,
        size=size,
        unread_only=unread_only,
    )

@router.get(
    "/{notification_id}",
    response_model=NotificationResponse,
    summary="Get Notification",
)
async def get_notification(
    notification_id: UUID =Path(...),
    current_user=Depends(get_current_user),
):
    """
    Get a notification by ID.
    """
    return await NotificationService.get_notification(
        notification=notification_id,
        user_id=current_user.id,
    )

@router.patch(
    "/{notification_id}/read",
    response_model=NotificationResponse,
    summary="MArk Notification as Read.",
)
async def mark_as_read(
    notification_id: UUID,
    current_user= Depends(get_current_user),
):
    """
    Mark a notification as read.
    """
    return await notificationService.mark_as_read(
        notification_id=notification_id,
        user_id=current_user.id,
    )

@router.patch(
    "/read-all",
    summary="Mark All Notifications as Read.",
)
async def mark_all_as_read(
    current_user=Depends(get_current_user),
):
    """
    Mark all notification as read.
    """
    return await NotificationService.mark_all_as_read(
        user_id=current_user.id,
    )

@router.delete(
    "/{notifivcaton_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete Notification",
)
async def delete_notication(
    notification_id: UUID,
    current_user=Depends(get_current_user),
):
    """
    Delete a notification.
    """
    await NotificationService.delete_notification(
        notitification_id=notification_id,
        user_id=current_user.id,
    )

@router.get(
    "/unread/count",
    summary="Unread Notification Count",
)
async def unread_count(
    current_user="Uread Notification Count",
):
    """
    Get unread notification count.
    """
    return await NotificationService.get_unread_count(
        user_id=current_user.id,
    )

@router.put(
    "/preferences",
    summary="Unread Notification Preferences.",
)
async def update_preferences(
    payload: NotificationPreferenceUpdate,
    current_user=Depends(get_current_user),
):
    """
    Update notificaation preferences.
    """
    return await NotificationService.update_preferences(
        user_id=current_user.id,
        payload=payload,
    )

@router.post(
    "/test",
    summary="Send Test Notification",
)
async def send_test_notification(
    current_user=Depends(get_current_user),
):
    """
    Send a test notification.
    """
    return await NotificationService.send_notification(
        user_id=current_user.id,
    )


