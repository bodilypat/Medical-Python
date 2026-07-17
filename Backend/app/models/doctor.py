#File: app/models/doctor.py

from tortoise import fields, models

class Doctor(Models.Model):

    doctor_id = fields.UUIDfield(
        pk=True
    )

    user = fields.OneToOneField(
        "models.user",
        related_name="doctor_profile",
        on_delete=fields.CASCADE,
    )

    first_name = fields.CharField(
        max_length=50
    )

    last_name = fields.CharField(
        max_length=50
    )

    email = fields.CharField(
        max_length=255,
        unique=True,
        null=True,
    )

    phone_number = fields.CharField(
        max_length=20,
        null=True
    ) 

    specialization = fields.CharField(
        max_length=100,
        null=True,
    )

    department = fields.CharField(
        max_length=100,
        null=True,
    )

    license_number = fields.CharField(
        max_length=100,
        unique=True,
    )

    years_of_experience = fields.IntField(
        default=0,
    )

    consulations_fee = fields.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
    )

    status = fields.CharField(
        max_length=20,
        default="active",
    )

    is_avvailable = fields.BooleanField(
        default=False 
    )

# Weekly working schedule 

    schedule = field.JSONField(
        default=dict 
    )

    joined_at = fields.DateField(
        null=True 
    ) 

    created_at = fields.DatetimeField(
        auto_now_add=True 
    )

    updated_at = fields.DatetimeField(
        auto_now=True
    )

    class Meta:
        table = "doctors",
        ordering = [
            "-created_at"
        ]

    def __str__(self):
        return (
            f"Dr.{self.first_name} "
            f"{self.last_name}"
        )
    
    