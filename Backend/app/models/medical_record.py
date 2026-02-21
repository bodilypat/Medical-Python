#app/models/medical_record.py

from tortoise import fields, models 
from .base_model import BaseModel

class MedicalRecord(BaseModel):
    id = fields.IntField(pk=True)
    patient = fields.ForeignKeyField('models.Patient', related_name='medical_records')
    doctor = fields.ForeignKeyField('models.Doctor', related_name='medical_records')
    diagnosis = fields.TextField()
    treatment = fields.TextField()
    notes = fields.TextField(null=True)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "medical_records"

    def __str__(self):
        return f"MedicalRecord {self.id} for Patient {self.patient_id} by Doctor {self.doctor_id}"
    
    