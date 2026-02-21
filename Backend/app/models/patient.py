# app/models/patient.py 

from tortoise import fields, models 
from .base import RoleEnum

class Patient(models.Model):
    id = fields.IntField(pk=True)
    user = fields.ForeignKeyField('models.User', related_name='patient_profile')
    date_of_birth = fields.DateField()
    gender = fields.CharField(max_length=10)
    address = fields.TextField()
    phone_number = fields.CharField(max_length=15)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "patients"

    def __str__(self):
        return f"Patient {self.user.username} - {self.phone_number}"
    
    