Fullstack-Medical-Management System(MMS)  React => Features => Service(Axios) => FastAPI API => Service Layer => SQLAlchemy => PostgreSQL/ MySQL
│
├── medical-management-frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── app/                                                     # application setup & routing 
│   │   │   ├── App.jsx 
│   │   │   ├── AppRouter.jsx 
│   │   │   ├── routes/
│   │   │   │   ├── publicRoutes.jsx 
│   │   │   │   ├── ProtectedRoutes.jsx
│   │   │   │   ├── adminRoutes.jsx
│   │   │   │   ├── doctorRoutes.jsx 
│   │   │   │   └── patientRoutes.jsx 
│   │   │   ├── guards/
│   │   │   │   ├── ProtectedRoute.jsx 
│   │   │   │   ├── RoleRoute.jsx 
│   │   │   │   └── PermissionRoute.jsx 
│   │   │   └── providers/
│   │   │       ├── AppProviders.jsx  
│   │   │       ├── AuthProvider.jsx 
│   │   │       └── QueryProvider.jsx 
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/ 
│   │   │   └── styles/
│   │   │       ├── variables.css 
│   │   │       ├── theme.css 
│   │   │       ├── utitities.css 
│   │   │       └── index.css
│   │   ├── components/                                              # reusable global UI
│   │   │   ├── ui/                                                   
│   │   │   │   ├── Button.jsx 
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Select.jsx 
│   │   │   │   ├── Modal.jsx 
│   │   │   │   ├── Table.jsx 
│   │   │   │   ├── Badge.jsx 
│   │   │   │   ├── Card.jsx 
│   │   │   │   ├── Spinner.jsx 
│   │   │   │   ├── Skeleton.jsx 
│   │   │   │   ├── EmptyState.jsx 
│   │   │   │   └── ErrorState.jsx
│   │   │   │
│   │   │   ├── navigation/
│   │   │   │   ├── Navbar.jsx 
│   │   │   │   ├── Sidebar.jsx 
│   │   │   │   ├── Breadcrumbs.jsx 
│   │   │   │   └── MobileBoundary.jsx
│   │   │   │
│   │   │   └── feedback/
│   │   │       ├── Toast.jsx 
│   │   │       ├── ConfirmDialog.jsx 
│   │   │       └── ErrorBoundary.jsx
│   │   │
│   │   ├── layouts/                                                 # Admin/Doctor/Patient layouts 
│   │   │   ├── AuthLayout.jsx
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── DoctorLayout.jsx
│   │   │   ├── PatientLayout.jsx 
│   │   │   └── components/
│   │   │       ├── Header.jsx 
│   │   │       ├── Sidebar.jsx 
│   │   │       └── LayoutContent.jsx
│   │   │
│   │   ├── features/                                                # business domains
│   │   │   ├── auth/
│   │   │   │   ├── api/
│   │   │   │   │   └── authApi.js
│   │   │   │   ├── components/
│   │   │	│   │   ├── LoginForm.jsx 
│   │   │	│   │   ├── RegisterForm.jsx  
│   │   │   │   │   └── ForgotPasswordForm.jsx 
│   │   │   │   │
│   │   │   │   ├── hooks/
│   │   │	│   │   ├── useAuth.js 
│   │   │   │   │   └── useLogin.js 
│   │   │   │   │
│   │   │   │   ├── pages/
│   │   │	│   │   ├── Login.jsx 
│   │   │	│   │   ├── Register.jsx 
│   │   │   │   │   └── ForgotPassword.jsx 
│   │   │   │   │
│   │   │   │   ├── schemas/
│   │   │   │   │   └── authSchema.js 
│   │   │   │   │
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── admin/
│   │   │   │   ├── components/
│   │   │	│   │   ├── dashboard/
│   │   │	│   │   │   ├── StatsCards.jsx 
│   │   │	│   │   │   ├── AppointmentOverview.jsx 
│   │   │	│   │   │   ├── PatientOverview.jsx 
│   │   │	│   │   │   ├── RevenueOverview.jsx 
│   │   │   │   │   │   └── RecentAppointments.jsx 
│   │   │   │   │   │
│   │   │	│   │   ├── doctors/ 
│   │   │	│   │   │   ├── DoctorTable.jsx 
│   │   │	│   │   │   ├── DoctorForm.jsx 
│   │   │	│   │   │   ├── DoctorDetails.jsx 
│   │   │   │   │   │   └── DoctorFilters.jsx 
│   │   │   │   │   │
│   │   │	│   │   ├── appointments/
│   │   │	│   │   │   ├── AppointmentTable.jsx 
│   │   │	│   │   │   ├── AppointmentDetails.jsx 
│   │   │	│   │   │   ├── AppointmentFilters.jsx 
│   │   │   │   │   │   └── AppointmetStatus.jsx 
│   │   │   │   │   │
│   │   │   │   │   └── reports/ 
│   │   │	│   │       ├── ReportFilters.jsx 
│   │   │	│   │       ├── ReportCard.jsx 
│   │   │	│   │       ├── ReportTable.jsx 
│   │   │   │   │       └── ReportChart.jsx 
│   │   │   │   │
│   │   │   │   ├── hooks/
│   │   │	│   │   ├── useDashboard.js 
│   │   │	│   │   ├── useStats.js  
│   │   │	│   │   ├── useDoctors.js 
│   │   │	│   │   ├── useAppointments.js  
│   │   │   │   │   └── useReports.js 
│   │   │   │   │
│   │   │   │   ├── pages/
│   │   │	│   │   ├── Dashboard.jsx
│   │   │	│   │   ├── Doctors.jsx
│   │   │	│   │   ├── Appointments.jsx
│   │   │   │   │   └── Reports.jsx
│   │   │   │   │
│   │   │   │   ├── services/
│   │   │	│   │   ├── dashboardService.js 
│   │   │	│   │   ├── doctorService.js 
│   │   │	│   │   ├── appointmentService.js 
│   │   │   │   │   └── reportService.js 
│   │   │   │   │
│   │   │   │   ├── schemas/
│   │   │	│   │   ├── doctorSchema.js 
│   │   │   │   │   └── appointmentSchema.js
│   │   │   │   │
│   │   │   │   ├── constants/
│   │   │   │   │   └── adminConstants.js
│   │   │   │   │
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── patients/
│   │   │   │   ├── api/
│   │   │   │   │   └── patientApi.js
│   │   │   │   ├── components/
│   │   │	│   │   ├── PatientTable.jsx
│   │   │	│   │   ├── PatientCard.jsx
│   │   │	│   │   ├── PatientForm.jsx
│   │   │	│   │   ├── PatientProfile.jsx 
│   │   │	│   │   ├── PatientFilters.jsx 
│   │   │	│   │   ├── PatientStats.jsx 
│   │   │   │   │   └── PatientActions.jsx 
│   │   │   │   ├── hooks/
│   │   │	│   │   ├── usePatients.js 
│   │   │	│   │   ├── usePatient.js
│   │   │	│   │   ├── useCreatePatient.js 
│   │   │   │   │   └── usePatientActions.js 
│   │   │   │   ├── pages/
│   │   │	│   │   ├── Patients.jsx 
│   │   │   │   │   └── PatientDetails.jsx
│   │   │   │   ├── schemas/
│   │   │   │   │   └── patientSchema.js
│   │   │   │   ├── constants/
│   │   │   │   │   └── patientConstants.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── doctors/
│   │   │   │   ├── components/
│   │   │	│   │   ├── dashboard/
│   │   │	│   │   │   ├── DoctorStats.jsx 
│   │   │	│   │   │   ├── TodayAppointments.jsx  
│   │   │	│   │   │   ├── UpcomingAppointments.jsx 
│   │   │   │   │   │   └── RecentPatients.jsx 
│   │   │   │   │   │
│   │   │	│   │   ├── appointments/ 
│   │   │	│   │   │   ├── AppointmentTable.jsx 
│   │   │	│   │   │   ├── AppointmentCard.jsx 
│   │   │	│   │   │   ├── AppointmentFilters.jsx 
│   │   │   │   │   │   └── AppointmentStatus.jsx 
│   │   │   │   │   │
│   │   │	│   │   ├── patients/
│   │   │	│   │   │   ├── PatientTable.jsx 
│   │   │	│   │   │   ├── PatientCard.jsx 
│   │   │   │   │   │   └── PatientSearch.jsx 
│   │   │   │   │   │
│   │   │	│   │   ├── medical-records/
│   │   │	│   │   │   ├── MedicalRecordForm.jsx 
│   │   │	│   │   │   ├── MedicalRecordTable.jsx 
│   │   │	│   │   │   ├── MedicalRecordDetails.jsx 
│   │   │   │   │   │   └── DiagnosistForm.jsx 
│   │   │   │   │   │
│   │   │   │   │   └── prescriptions/ 
│   │   │	│   │       ├── PrescriptionForm.jsx 
│   │   │	│   │       ├── PrescriptionTable.jsx 
│   │   │	│   │       ├── MedicineRecords.jsx 
│   │   │   │   │       └── PrescriptionDetails.jsx 
│   │   │   │   │
│   │   │   │   ├── hooks/
│   │   │	│   │   ├── useDoctorDashboard.js 
│   │   │	│   │   ├── useMyAppointments.js 
│   │   │	│   │   ├── useDoctorPatients.js 
│   │   │	│   │   ├── useMedicalRecords.js 
│   │   │   │   │   └── usePrescriptions.js 
│   │   │   │   │
│   │   │   │   ├── pages/ 
│   │   │	│   │   ├── Dashboard.jsx
│   │   │	│   │   ├── MyAppointments.jsx
│   │   │	│   │   ├── Patients.jsx
│   │   │	│   │   ├── MedicalRecords.jsx
│   │   │   │   │   └── Prescriptions.jsx
│   │   │   │   │
│   │   │   │   ├── schemas/
│   │   │	│   │   ├── medicalRecordSchema.js
│   │   │   │   │   └── prescriptionSchema.js 
│   │   │   │   ├── constants/
│   │   │   │   │   └── doctorConstants.js 
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── appointments/
│   │   │   │   ├── api/ 
│   │   │   │   │   └── appointmentApi.js
│   │   │   │   ├── components/
│   │   │	│   │   ├── AppointmentTable.jsx 
│   │   │	│   │   ├── AppointmentCard.jsx  
│   │   │	│   │   ├── AppointmentForm.jsx 
│   │   │	│   │   ├── AppointmentDetails.jsx
│   │   │	│   │   ├── AppointmentFilters.jsx  
│   │   │	│   │   ├── AppointmentStatus.jsx 
│   │   │	│   │   ├── AppointmentCalendar.jsx 
│   │   │	│   │   ├── AppointmentSummary.jsx
│   │   │   │   │   └── AppointmentActions.jsx 
│   │   │   │   │
│   │   │   │   ├── hooks/
│   │   │	│   │   ├── useAppointments.js 
│   │   │	│   │   ├── useAppointment.js 
│   │   │	│   │   ├── useCreateAppointment.js 
│   │   │   │   │   └── useAppointmentActions.js 
│   │   │   │   │
│   │   │   │   ├── pages/ 
│   │   │	│   │   ├── Appointments.jsx  
│   │   │	│   │   ├── AppointmentDetails.jsx  
│   │   │   │   │   └── BookingAppointment.jsx  
│   │   │   │   ├── schemas/ 
│   │   │   │   │   └── appointmentSchema.js
│   │   │   │   ├── constants/ 
│   │   │   │   │   └── appointmentConstants.js 
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── medical-records/
│   │   │   │   ├── services/ 
│   │   │   │   │   └── medicalRecordApi.js 
│   │   │   │   ├── components/
│   │   │	│   │   ├── MedicalRecordTable.jsx 
│   │   │	│   │   ├── MedicalRecordCard.jsx 
│   │   │	│   │   ├── MedicalRecordForm.jsx 
│   │   │	│   │   ├── MedicalRecordDetails.jsx 
│   │   │	│   │   ├── MedicalRecordFilters.jsx 
│   │   │	│   │   ├── DiagnosisForm.jsx 
│   │   │	│   │   ├── ClinicalNotes.jsx  
│   │   │	│   │   ├── TreatmentPlan.jsx 
│   │   │   │   │   └── RecordTimeline.jsx 
│   │   │   │   │
│   │   │   │   ├── hooks/
│   │   │	│   │   ├── useMedicalRecords.js 
│   │   │	│   │   ├── useMedicalRecord.js 
│   │   │	│   │   ├── useCreateMedicalRecord.js 
│   │   │   │   │   └── useMedicalRecordActions.js
│   │   │   │   │
│   │   │   │   ├── pages/ 
│   │   │	│   │   ├── MedicalRecords.jsx 
│   │   │	│   │   ├── MedicalRecordDetails.jsx
│   │   │   │   │   └── CreateMedicalRecord.jsx 
│   │   │   │   │
│   │   │   │   ├── schemas/ 
│   │   │   │   │   └── medicalRecordSchema.js 
│   │   │   │   ├── constants/ 
│   │   │   │   │   └── medicalRecordConstants.js 
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── prescriptions/
│   │   │   │   ├── api/ 
│   │   │   │   │   └── prescriptionApi.js 
│   │   │   │   ├── components/
│   │   │	│   │   ├── PrescriptionTable.jsx 
│   │   │	│   │   ├── PrescriptionCard.jsx 
│   │   │	│   │   ├── PrescriptionForm.jsx  
│   │   │	│   │   ├── PrescriptionDetails.jsx 
│   │   │	│   │   ├── PrescriptionSearch.jsx
│   │   │	│   │   ├── PrescriptionFilters.jsx  
│   │   │	│   │   ├── PrescriptionStatus.jsx 
│   │   │	│   │   ├── MedicineSelector.jsx 
│   │   │	│   │   ├── MedicineRow.jsx 
│   │   │   │   │   └── PrintPrescription.jsx  
│   │   │   │   │
│   │   │   │   ├── hooks/
│   │   │	│   │   ├── usePrescriptions.js 
│   │   │	│   │   ├── usePrescription.js 
│   │   │	│   │   ├── useCreatePrescription.js 
│   │   │   │   │   └── usePrescrptionActions.js 
│   │   │   │   │
│   │   │   │   ├── pages/ 
│   │   │	│   │   ├── Prescriptions.jsx  
│   │   │	│   │   ├── CreatePrescription.jsx  
│   │   │	│   │   ├── EditPrescription.jsx
│   │   │   │   │   └── PrescriptionDetails.jsx  
│   │   │   │   │
│   │   │   │   ├── schemas/ 
│   │   │   │   │   └── prescriptionSchema.js
│   │   │   │   ├── constants/ 
│   │   │   │   │   └── prescriptionConstants.js 
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── laboratory/
│   │   │   │   ├── api/ 
│   │   │   │   │   └── LaboratoryApi.js
│   │   │   │   ├── components/
│   │   │	│   │   ├── tests/
│   │   │	│   │   │   ├── LabTestTable.jsx 
│   │   │	│   │   │   ├── LabTestCard.jsx 
│   │   │	│   │   │   ├── LabTestForm.jsx
│   │   │	│   │   │   ├── LabTestDetails.jsx 
│   │   │	│   │   │   ├── LabTestFilters.jsx
│   │   │   │   │   │   └── LabTestStatus.jsx 
│   │   │   │   │   │
│   │   │	│   │   ├── orders/
│   │   │	│   │   │   ├── LabOrderForm.jsx 
│   │   │   │   │   │   └── LabOrderDetails.jsx
│   │   │   │   │   │
│   │   │	│   │   ├── results/
│   │   │	│   │   │   ├── TestResultForm.jsx 
│   │   │   │   │   │   └── TestResultDetails.jsx  
│   │   │   │   │   │
│   │   │   │   │   └── reports/
│   │   │	│   │       ├── LabReport.jsx 
│   │   │   │   │       └── PrintLabReport.jsx 
│   │   │   │   │
│   │   │   │   ├── hooks/
│   │   │	│   │   ├── useLabTests.js 
│   │   │	│   │   ├── useLabTest.js
│   │   │	│   │   ├── useLabOrders.js 
│   │   │	│   │   ├── useLabResults.js
│   │   │   │   │   └── useLabActions.js
│   │   │   │   │
│   │   │   │   ├── pages/ 
│   │   │	│   │   ├── Laboratory.jsx 
│   │   │	│   │   ├── LabTestDetails.jsx 
│   │   │	│   │   ├── LabOrders.jsx 
│   │   │	│   │   ├── LabResults.jsx 
│   │   │   │   │   └── CreateLabOrder.jsx 
│   │   │   │   │
│   │   │   │   ├── schemas/ 
│   │   │	│   │   ├── labTestSchema.js 
│   │   │	│   │   ├── labOrderSchema.js 
│   │   │   │   │   └── labResultSchema.js
│   │   │   │   ├── constants/ 
│   │   │   │   │   └── laboratoryConstants.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── pharmacy/
│   │   │   │   ├── api/ 
│   │   │   │   │   └── pharmacyApi.js 
│   │   │   │   │
│   │   │   │   ├── components/
│   │   │	│   │   ├── medicines/
│   │   │	│   │   │   ├── MedicineTable.jsx 
│   │   │	│   │   │   ├── MedicineCard.jsx 
│   │   │	│   │   │   ├── MedicineForm.jsx 
│   │   │	│   │   │   ├── MedicineDetails.jsx  
│   │   │   │   │   │   └── MedicineFilters.jsx 
│   │   │   │   │   │
│   │   │	│   │   ├── inventory/
│   │   │	│   │   │   ├── InventoryTable.jsx 
│   │   │	│   │   │   ├── InventoryForm.jsx 
│   │   │	│   │   │   ├── StockStatus.jsx 
│   │   │   │   │   │   └── StockAdjustmentForm.jsx  
│   │   │   │   │   │
│   │   │	│   │   ├── dispensing/
│   │   │	│   │   │   ├── PrescriptionQueue.jsx 
│   │   │	│   │   │   ├── PrescriptionCard.jsx 
│   │   │	│   │   │   ├── DispenseForm.jsx 
│   │   │   │   │   │   └── DispensingDetails.jsx 
│   │   │   │   │   │
│   │   │   │   │   └── orders/
│   │   │	│   │       ├── PharmacyOrderTable.jsx 
│   │   │	│   │       ├── PharmacyOrderDetails.jsx
│   │   │   │   │       └── PharmacySummary.jsx 
│   │   │   │   │
│   │   │   │   ├── hooks/
│   │   │	│   │   ├── useMedicines.js 
│   │   │	│   │   ├── useMedicine.js   
│   │   │	│   │   ├── useInventory.js 
│   │   │	│   │   ├── usePrescriptionQueue.js 
│   │   │	│   │   ├── useDispensing.js 
│   │   │   │   │   └── usePharmacyOrders.js
│   │   │   │   │
│   │   │   │   ├── pages/ 
│   │   │	│   │   ├── Dashboard.jsx    
│   │   │	│   │   ├── Medicines.jsx 
│   │   │	│   │   ├── MedicineDetails.jsx   
│   │   │	│   │   ├── Inventory.jsx  
│   │   │	│   │   ├── Prescriptions.jsx 
│   │   │	│   │   ├── DispensePrescription.jsx 
│   │   │   │   │   └── PharmacyOrders.jsx 
│   │   │   │   │
│   │   │   │   ├── schemas/ 
│   │   │	│   │   ├── medicineSchema.js 
│   │   │	│   │   ├── inventorySchema.js
│   │   │   │   │   └── dispensingSchema.js
│   │   │   │   │
│   │   │   │   ├── constants/ 
│   │   │   │   │   └── PharmacyConstants.js
│   │   │   │   │
│   │   │   │   └── index.js
│   │   │   │
│   │   │   └── billing/
│   │   │       ├── api/ 
│   │   │       │   └── billingApi.js 
│   │   │       ├── components/
│   │   │	    │   ├── InvoiceTable.jsx  
│   │   │	    │   ├── InvoiceCard.jsx
│   │   │	    │   ├── InvoiceForm.jsx  
│   │   │	    │   ├── InvoiceDetails.jsx  
│   │   │	    │   ├── InvoiceFilters.jsx 
│   │   │	    │   ├── InvoiceStatus.jsx 
│   │   │	    │   │   
│   │   │	    │   ├── BillingSummary.jsx  
│   │   │	    │   ├── BillingTable.jsx
│   │   │	    │   ├── BillingForm.jsx 
│   │   │	    │   │   
│   │   │	    │   ├── PaymentForm.jsx 
│   │   │	    │   ├── PaymentTable.jsx    
│   │   │	    │   ├── PaymentDetails.jsx 
│   │   │	    │   ├── PaymentStatus.jsx  
│   │   │	    │   │   
│   │   │	    │   ├── RefundForm.jsx 
│   │   │	    │   ├── RefundDetails.jsx    
│   │   │	    │   │   
│   │   │	    │   ├── PatientBilling.jsx 
│   │   │	    │   ├── OutstandingBalance.jsx 
│   │   │       │   └── PrintInvoice.jsx 
│   │   │       │
│   │   │       ├── hooks/
│   │   │	    │   ├── useInvoices.js 
│   │   │	    │   ├── useInvoice.js   
│   │   │	    │   ├── useBilling.js  
│   │   │	    │   ├── usePayments.js 
│   │   │	    │   ├── usePayment.js 
│   │   │	    │   ├── useRefunds.js 
│   │   │       │   └── useBillingActions.js
│   │   │       │
│   │   │       ├── pages/ 
│   │   │	    │   ├── Dashboard.jsx 
│   │   │	    │   ├── Invoices.jsx     
│   │   │	    │   ├── CreateInvoice.jsx 
│   │   │	    │   ├── Payments.jsx 
│   │   │       │   └── refunds.jsx 
│   │   │       │
│   │   │       ├── schemas/ 
│   │   │	    │   ├── invoiceSchema.js 
│   │   │	    │   ├── paymentSchema.js  
│   │   │       │   └── refundSchema.js  
│   │   │       │
│   │   │       ├── constants/ 
│   │   │       │   └── billingConstants.js
│   │   │       │
│   │   │       └── index.js
│   │   │
│   │   ├── services/                                                # Axios/API infrastructure 
│   │   │   ├── httpClient.js
│   │   │   ├── apiClient.js
│   │   │   ├── interceptors.js
│   │   │   └── errorHandler.js
│   │   │
│   │   ├── hooks/                                                   # global hooks 
│   │   │   ├── useDebounce.js
│   │   │   ├── usePagination.js 
│   │   │   ├── useModal.js 
│   │   │   └── usePermissions.js 
│   │   │
│   │   ├── context/                                                 # global React context 
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── utils/                                                   # shared utitities 
│   │   │   ├── formatCurrency.js 
│   │   │   ├── formatDate.js 
│   │   │   ├── formatPhone.js
│   │   │   ├── validation.js  
│   │   │   └── helpers.js 
│   │   │
│   │   ├── constants/                                               # shared constants
│   │   │   ├── routes.js 
│   │   │   ├── status.js 
│   │   │   └── config.js 
│   │   │
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── .env.example 
│   ├── .gitignore 
│   ├── .eslint.config.js 
│   ├── packabe.json 
│   ├── vite.config.js 
│   └── README.md
│
├── medical-management-backend/
│   │
│   ├── app/
│   │   │
│   │   ├── main.py                         # FastAPI application entry
│   │   │
│   │   ├── core/                           # application-wide configuration
│   │   │   ├── config.py                   # environment/settings
│   │   │   ├── security.py                 # JWT/password/security helpers
│   │   │   ├── database.py                 # database connection
│   │   │   ├── logging.py
│   │   │   └── exceptions.py
│   │   │
│   │   ├── api/
│   │   │   ├── router.py                   # main API router
│   │   │   │
│   │   │   └── v1/
│   │   │       ├── router.py
│   │   │       │
│   │   │       ├── auth.py
│   │   │       ├── users.py
│   │   │       ├── patients.py
│   │   │       ├── doctors.py
│   │   │       ├── appointments.py
│   │   │       ├── medical_records.py
│   │   │       ├── prescriptions.py
│   │   │       ├── laboratory.py
│   │   │       ├── pharmacy.py
│   │   │       ├── billing.py
│   │   │       ├── reports.py
│   │   │       └── notifications.py
│   │   │
│   │   ├── models/                         # SQLAlchemy ORM models
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── patient.py
│   │   │   ├── doctor.py
│   │   │   ├── appointment.py
│   │   │   ├── medical_record.py
│   │   │   ├── prescription.py
│   │   │   ├── medicine.py
│   │   │   ├── inventory.py
│   │   │   ├── laboratory.py
│   │   │   ├── invoice.py
│   │   │   ├── payment.py
│   │   │   ├── refund.py
│   │   │   ├── notification.py
│   │   │   └── audit_log.py
│   │   │
│   │   ├── schemas/                        # Pydantic request/response schemas
│   │   │   ├── auth.py
│   │   │   ├── user.py
│   │   │   ├── patient.py
│   │   │   ├── doctor.py
│   │   │   ├── appointment.py
│   │   │   ├── medical_record.py
│   │   │   ├── prescription.py
│   │   │   ├── laboratory.py
│   │   │   ├── pharmacy.py
│   │   │   ├── billing.py
│   │   │   └── common.py
│   │   │
│   │   ├── services/                       # business logic
│   │   │   ├── auth_service.py
│   │   │   ├── user_service.py
│   │   │   ├── patient_service.py
│   │   │   ├── doctor_service.py
│   │   │   ├── appointment_service.py
│   │   │   ├── medical_record_service.py
│   │   │   ├── prescription_service.py
│   │   │   ├── laboratory_service.py
│   │   │   ├── pharmacy_service.py
│   │   │   ├── billing_service.py
│   │   │   ├── report_service.py
│   │   │   └── notification_service.py
│   │   │
│   │   ├── repositories/                   # database access
│   │   │   ├── user_repository.py
│   │   │   ├── patient_repository.py
│   │   │   ├── doctor_repository.py
│   │   │   ├── appointment_repository.py
│   │   │   ├── medical_record_repository.py
│   │   │   ├── prescription_repository.py
│   │   │   ├── laboratory_repository.py
│   │   │   ├── pharmacy_repository.py
│   │   │   └── billing_repository.py
│   │   │
│   │   ├── dependencies/                   # FastAPI dependencies
│   │   │   ├── auth.py
│   │   │   ├── database.py
│   │   │   └── permissions.py
│   │   │
│   │   ├── middleware/
│   │   │   ├── error_handler.py
│   │   │   ├── request_logging.py
│   │   │   └── audit_logging.py
│   │   │
│   │   ├── permissions/
│   │   │   ├── roles.py
│   │   │   ├── permissions.py
│   │   │   └── role_permissions.py
│   │   │
│   │   ├── utils/
│   │   │   ├── pagination.py
│   │   │   ├── datetime.py
│   │   │   ├── response.py
│   │   │   └── validators.py
│   │   │
│   │   ├── tasks/
│   │   │   ├── appointment_reminders.py
│   │   │   ├── billing_reminders.py
│   │   │   └── prescription_expiry.py
│   │   │
│   │   └── tests/
│   │       ├── unit/
│   │       ├── integration/
│   │       └── api/
│   │
│   ├── alembic/
│   │   ├── versions/
│   │   └── env.py
│   │
│   ├── scripts/
│   │   ├── seed.py
│   │   └── create_admin.py
│   │
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── alembic.ini
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── pyproject.toml
│   ├── requirements.txt
│   └── README.md
