#File: app/services/dashboard_service.py
from app.repositories.patient_repository import PatientRepository
from app.repositories.doctor_repository import DoctorRepository 
from app.repositories.appointment_repository import AppointmentRepository
from app.repositories.prescription_repository import PrescriptionRepository 
from app.repositories.billing_repository import billingRepository 
from app.repositories.laboratory.repository import LaboratoryRepository
from app.repositories.notification_repository import NotificationRepository 

class DashboardService:
    """
    Business login for dashboard operation.
    """

    @staticmethod
    async def get_summary(db):
        """
        Dashboard summay cards.
        """

        return {
            "total_patients":
                await PatientRepository.count(db),

            "total_doctors":
                await DoctorRepository.count(db),

            "total_appointments":
                await AppointmentRepository.count(db),

            "total_prescriptions":
                await PrescriptionRepository.count(db),

            "total_revenue":
                await billingRepository.count(db),

            "total_lab_tests":
                await LaboratoryRepository.count(db),

            "total_notifications":
                await NotificationRepository.count(db),
        }
    
    @staticmethod
    async def get_statistics(db):
        """
        Dashboard statisties.
        """

        return {
            "today_patients":
            await PatientRepository.today_count(db),

            "today_appointments":
                await AppointmentRepository.today_count(db),

            "completed_appointments":
                await AppointmentRepository.completed_count(db),

            "pending_appointments":
                await AppointmentRepository.pending_count(db),

            "cancelled_appointments":
                await AppointmentRepository.cancelled_count(db),

            "active_doctors":
                await DoctorRepository.active_count(db),

            "pending_lab_tests":
                await LaboratoryRepository.pending_count(db),

            "completed_lab_tests":
                await LaboratoryRepository.completed_count(db),

            "unpaid_bills":
                await billingRepository.unpaid_count(db),

            "monthly_revenue":
                await billingRepository.monthly_revenue(db),
        }
    
    @staticmethod
    async def get_chart_data(
        db,
        period: str,
    ):
        """
        Dashbaord chart data.
        """

        return {
            "period": period,

            "appointments":
                await AppointmentRepository.chart_data(
                    db,
                    period,
                ),

            "patients":
                await PatientRepository.chart.data(
                    db,
                    period,
                ),

            "revenue":
                await billingRepository.chart_data(
                    db,
                    period,
                ),
        }
    
    @staticmethod
    async def get_recent_activities(
        db,
        limit: int,
    ):
        """
        Recent system activities.
        """

        activities = await NotificationRepository.recent_activities(
            db,
            limit,
        )

        return {
            "total": len(activities),
            "activities": activities,
        }
    
    @staticmethod
    async def get_admin_dashboard(db):
        """
        Admistrator dashboardd.
        """

        return {
            "summary":
                await DashboardService.get_summary(db),

            "statistics":
                await DashboardService.get_statistics(db),
            
            "recent_activities":
                (
                    await DashboardService.get_recent_activities(
                        db,
                        10,
                    )["ativities"],
                )
        }
    
    @staticmethod
    async def get_doctor_dashboard(
        db,
        doctor_id: int,
    ):
        """
        Doctor dashboard.
        """

        return {
            "today_appointments":
                await AppointmentRepository.today_by_doctor(
                    db,
                    doctor_id,
                ),

            "upcomming_appointments":
                await AppointmentRepository.upcomming_by_doctor(
                    db,
                    doctor_id,
                ),

            "completed_appointments":
                await AppointmentRepository.completed_by_doctor(
                    db,
                    doctor_id,
                ),

            "today_patients":
                await PatientRepository.total_by_doctor(
                    db,
                    doctor_id,
                ),

            "pending_prescriptions":
                await PrescriptionRepository.pending_by_doctor(
                    db,
                    doctor_id,
                ),

            "pending_lab_results":
                await LaboratoryRepository.pending_by_doctor(
                    db,
                    doctor_id,
                ),
        }
    
    @staticmethod
    async def get_patient_dashboard(
        db,
        patient_id: int,
    ):
        """
        Patient dashboard.
        """

        return {

            "next_appointment_date":
                await AppointmentRepository.next_for_patient(
                    db,
                    patient_id,
                ),
            
            "total_appointments":
                await AppointmentRepository.total_for_patient(
                    db,
                    patient_id,
                ),

            "total_prescriptions":
                await PrescriptionRepository.total_for_patient(
                    db,
                    patient_id,
                ),

            "pending_lab_results":
                await LaboratoryRepository.pending_for_patient(
                    db,
                    patient_id,
                ),

            "unpaid_bills":
                await billingRepository.unpaid_for_patient(
                    db, 
                    patient_id,
                ),

            "notifications":
                await NotificationRepository.unread_count(
                    db,
                    patient_id,
                ),
        }
    
    