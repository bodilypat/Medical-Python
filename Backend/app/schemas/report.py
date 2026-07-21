#File: app/schema/report.py

from datetime import date, datetime
from uuid import UUID 

from pydantic import BaseModel, ConfigDict 

#----------------------------------------------
# COMMON REPORT META 
#----------------------------------------------

class ReportPeriod(BaseModel):
    start_date: date | None = None 
    end_date: date | None = None 

#----------------------------------------------
# DASHBOARD REPORT 
#----------------------------------------------

class DashboardReportResponse(BaseModel):
    total_patients: int 
    total_doctors: int 
    total_appointments: int 
    completed_appointment: int 
    cancelled_appointments: int 
    total_prescriptions: int 
    total_revenue: float
    pending_lab_tests: int 
    low_stock_medicines: int 
    period: ReportPeriod

#----------------------------------------------
# PATIENT REPORT 
#----------------------------------------------

class PatientReportItem(BaseModel):
    patient_id: UUID
    patient_name: str
    gender_name: str | None = None 
    age: int | None = None 
    total_visits: int 
    total_prescriptions: int 
    total_lab_tests: int 

class PatientReportResponse(BaseModel):
    total: int 
    patients: list[PatientReportItem]
    period: ReportPeriod

#----------------------------------------------
# APPOINTMENT REPORT 
#----------------------------------------------

class AppointmentReportItem(BaseModel):
    doctor_id: UUID 
    doctor_name: str 
    total_appointment: int 
    completed: int 
    cancelled: int 
    pending: int 

class AppointmentReportResponse(BaseModel):
    total_appointments: int 
    appointments: list[AppointmentReportItem]
    period: ReportPeriod

#----------------------------------------------
# BILLING REPORT 
#----------------------------------------------

class BillingReportItem(BaseModel):
    invoice_id: UUID
    patient_id: UUID 
    patient_name: str 
    amount: float
    payment_status: str 
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )

class BillingReportResponse(BaseModel):
    total_invoice: int
    total_amount: float 
    paid_amount: float 
    unpaid_amount: float 
    invoices: list[BillingReportItem]
    period: ReportPeriod 

#----------------------------------------------
# LABORATORY REPORT 
#----------------------------------------------

class LaboratoryReportItem(BaseModel):
    test_id: UUID
    patient_id: UUID 
    patient_name: str 
    test_name: str 
    status: str 
    created_at: datetime 

    model_config = ConfigDict(
        from_attributes=True 
    )

class LaboratoryReportResponse(BaseModel):
    total_tests: int 
    completed_tests: int 
    pending_tests: int 
    tests: list[LaboratoryReportItem]
    period: ReportPeriod 

#----------------------------------------------
# PHARMACY REPORT 
#---------------------------------------------- 
 
class PhamacyReportItem(BaseModel):
    medicine_id: UUID 
    medicine_name: str 
    category: str | None = None 
    quantity_sold: int 
    remaining_stock: int 

class PharmacyReportResponse(BaseModel):
    total_medicine: int 
    total_dispensed: int 
    low_stock_count: int 
    expiring_count: int 
    medicines: list[PharmacyReportItem]
    period: ReportPeriod 

#----------------------------------------------
# EXPORT RESPONSE 
#----------------------------------------------

class ReportExportResponse(BaseModel):
    file_name: str 
    file_type: str 
    download_url: str 
    generated_at: datetime

    