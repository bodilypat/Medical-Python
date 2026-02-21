# app/models/appointment.py

from tortoise import fields, models
from .base import RoleEnum 

class Appointment(models.Model):
    id = fields.IntField(pk=True)
    doctor = fields.ForeignKeyField('models.User', related_name='appointments_as_doctor')
    patient = fields.ForeignKeyField('models.User', related_name='appointments_as_patient')
    date = fields.DatetimeField()
    reason = fields.TextField()
    status = fields.CharEnumField(RoleEnum, default=RoleEnum.PENDING)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "appointments"

    def __str__(self):
        return f"Appointment {self.id} between Dr. {self.doctor} and {self.patient} on {self.date}"
    
        