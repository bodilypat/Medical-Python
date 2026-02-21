#app/models/doctor.py

from tortoise import fields, models 
from .base import RoleEnum

class Doctor(models.Model):
    id = fields.IntField(pk=True)
    user = fields.ForeignKeyField('models.User', related_name='doctor_profile')
    specialty = fields.CharField(max_length=100)
    license_number = fields.CharField(max_length=50, unique=True)
    years_of_experience = fields.IntField()
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "doctors"

    def __str__(self):
        return f"Dr. {self.user.username} - {self.specialty}"
    
    