#File: app/repositories/report_repository.py

from datetime import date, datetime

from sqlalchemy import func, and_ 
from sqlalchemy.orm import Session 

from app.core.database import get_db 

from app.models.patient import Patient 
from app.models.doctor import Doctor 
from app.models.appointment import Appointment 
from app.models.prescription import Prescription 
from app.models.billing import invoice, Payment 
from app.models.laboratory import LaboratoryTest
from app.models.pharmacy import Medicine, Dispensing 

class ReportRespository:

    #------------------------------------------ 
    # DASHBOARD REPORT 
    #------------------------------------------

    @staticmethod
    async def get_dashboard_report(
        db: Session,
        start_date: date | None = None,
        end_date: date | None = None,
    ):
        
        appointment_query = db.query(Appointment)

        if start_date:
            appointment_query = appointment_query.filter(
                Appointment.created_at >= start_date
            )
        
        if end_date:
            appointment_query = appointment_query.filter(
                Appointment.created_at <= end_date 
            )

        return {
            "total_patients": db.query(Patient).count(),
            
            "total_doctors": db.query(Doctor).count(),
            
            "total_appointments": appointment_query.filter(
                Appointment.status == "completed"
            ).count(),
            
            "cancelled_appointments": appointment_query.filter(
                Appointment.status == "cancellled"
            ).count(),

            "total_revenue": (
                db.query(func.sum(Invoice.total_amount))
                .scalar()
                or 0
            ),

            "total_lab_tests": db.query(LaboratoryTest).filter(
                LaboratoryTest.status == "pending"
            ).count(),

            "low_stock_mediciens": db.query(Medicine).filter(
                Medicine.stock_quantity <= Medicine.minimum_stock 
            ).count(),

            "period": {
                "start_date": start_date,
                "end_date": end_date,
            }
        }
    
    #------------------------------------------
    # PATIENT REPORT 
    #------------------------------------------

    @staticmethod
    async def get_patient_report(
        db: Session,
        start_date: date | None = None,
        end_date: date | None = None,
    ):
        
        patients = db.query(Patient).all() 

        result = [] 

        for patient in patients:
            visits = db.query(Appointment).filter(
                Appointment.patient_id == paitent_id
            ).count()

            prescriptions = db.query(Prescription).filter(
                Prescription.patient_id ==  patient_id
            ).count()

            test = db.query(LaboratoryTest).filter(
                LaboratoryTest.patient_id == patient_id
            ).count() 
            
            result.append(
                {
                    "patient_id": patient.id,
                    "patient_name": patient.full_name,
                    "genger": patient.gender,
                    "age": patient.age,
                    "total_visits": visits,
                    "total_prescriptions": prescriptions,
                    "total_lab_tests": tests,
                }
            )

            return {
                "total": len(result),
                "patients": result,
                "period": {
                    "start_date": start_date,
                    "end_date": end_date,
                }
            }
        
    #------------------------------------------
    # APPOINTMENT REPORT 
    #------------------------------------------

    @staticmethod
    async def get_appointment_report(
        db: Session,
        start_date: date | None = None,
        end_date: date | None = None,
        doctor_id=None,
    ):
        
        query = db.query(
            Doctor.id,
            Doctor.full_name,
            func.count(Appointment.id)
        ).join(
            Appointment,
            Appointment.doctor_id == Doctor.id 
        )

        if doctor_id:
            query = query.filter(
                Doctor.id == doctor_id
            )

        data = query.group_by(
            Doctor.id 
        ).all() 

        appointment = []

        for row in data:
            appointments.append(
                {
                    "doctor_id": row[0],
                    "doctor_nae": row[1],
                    "total_appointments": row[2],
                    "completed": db.query(Appointment).filter(
                        Appointment.doctor_id == row[0],
                        Appointment.status == "cancelled"
                    ).count(),

                    "cancelled": db.query(Appointment).filter(
                        Appointment.doctor_id == row[0],
                        Appointment.status == "cancelled"
                    ).count(),

                    "pending": db.query(Appointment).filter(
                        Appointment.doctor_id == row[0],
                        Appointment.status == "pending"
                    ).count(),
                }
            )

            return {
                "total_appointments": sum(
                    x["total_appointments"]
                    for x in appointments 
                ),

                "appointments": appointments,
                "period": {
                    "status_date": start_date,
                    "end_date": end_date,
                }
            }
        
    #------------------------------------------
    # BILLING REPORT 
    #------------------------------------------

    @staticmethod
    async def get_billing_report(
        db: Session ,
        start_date=None,
        end_date=None,
    ):
        
        invoices = db.query(Invoice).all() 

        items = [] 
        
        for invoice in invoices:

            items.append(
                {
                    "invoice_d": invoice.id,
                    "patient_id": invoice.patient_id,
                    "patient_name": invoice.patient.full_name,
                    "amount": invoice.total_amount,
                    "payment_status": invoice.status,
                    "created_at": invoice.created_at

                }
            )

        return {
            "total_invoice": len(items),

            "total_amount": sum(
                item["amount"]
                for item in items
            ),

            "paid_amount": sum(
                item["amount"]
                for item in items 
                if item["payment_status"] == "paid"
            ),

            "unpaid_amount": sum(
                item["amount"]
                for item in items 
                if item["payment_status"] != "paid"
            ),

            "invoice": items,

            "peroid": {
                "start_date": start_date,
                "end_date": end_date
            }
        }
    
    #------------------------------------------
    # LABORATORY REPORT 
    #------------------------------------------
     
    @staticmethod
    async def get_laboratory_report(
        db: Session,
        start_date= None ,
        end_date=None,
    ):
        tests = db.query(
            LaborarotoryTest
        ).all() 

        return {
            "total_tests": len(tests),

            "completed_tests": len(
                [
                    t for t in tests 
                    if t.status == "completed"
                ]
            ),

            "pending_tests": len(
                [
                    t for t in tests 
                    if t.status == "pending"
                ]
            ),

            "tests": [
                {
                    "test_id": t.id,
                    "patient_id": t.patient_id,
                    "patient_name": t.patient.full_name,
                    "test_name": t.test_name,
                    "status": t.status,
                    "created_at": t.created_at,
                }
                for t in tests 
            ],

            "period": {
                "start_date": start_date,
                "end_date": end_date,
            }
        }

    #------------------------------------------
    # PHARMACY REPORT
    #------------------------------------------

    @staticmethod
    async def get_pharmacy_report(
        db: Session,
        start_date= none,
        end_date=None,
    ):
        mediciines = db.query(Medicine).all()

        return {
            "total_medicine": len(mediciines),

            "total_dispensed": (
                db.query(func.sum(Dispensing.quentity))
                .scalar()
                or 0
            ),

            "low_stock_count": len(
                [
                    m for m in mediciines
                    if m.stock_quantity <= m.minimum.stock
                ]
            ),

            "expiring_count": len(
                [
                    m for m in mediciines 
                    if m.expiry_date
                ]
            ),

            "medicines": [
                {
                    "medicine_id": m.id,
                    "medicine_name": m.name,
                    "category_sole": m.category,
                    "quantity_sold": 0,
                    "remaining_stock": m.stock_quantity,
                }
                for m in mediciines
            ],

            "period": {
                "start_date": start_date,
                "end_date": end_date,
            }
        }
    
    #------------------------------------------
    # EXPORT FUNCTIONS 
    #------------------------------------------

    @staticmethod
    async def generate_pdf(
        report,
        start_date=None,
        end_date=None,
    ):
        return f"/uploads/reports/{report}.pdf"
    
    @staticmethod
    async def generate_excel(
        report,
        start_date=None,
        end_date=None,
    ):
        return f"/uploads/reports/{report}.xlsx"
    
    @staticmethod
    async def generate_csv(
        report,
        start_date=None,
        end_date=None,
    ): 
        return f"/uploads/reports/{report}.csv"
    
    