#app/models/base.py

from tortoise import fields, models 
from tortorise.models import Model
from enum import Enum

class RoleEnum(str, Enum):
    ADMIN = "admin"
    USER = "user"
    DOCTOR = "doctor"
    PATIENT = "patient"
    NURSE = "nurse"

    
    