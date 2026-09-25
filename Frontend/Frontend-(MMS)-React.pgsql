medical-management-frontend/
├── public/
│
├── src/
│   ├── app/                                                     # application setup & routing 
│   │   ├── AppRouter.jsx 
│   │   ├── ProtectedRoute.jsx 
│   │   └── RoleRoute.jsx
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/ 
│   │   └── styles/
│   │       ├── variables.css 
│   │       └── theme.css 
│   ├── components/                                              # reusable global UI
│   │   ├── ui/                                                   
│   │   │   ├── Button.jsx 
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx 
│   │   │   ├── Modal.jsx 
│   │   │   ├── Table.jsx 
│   │   │   ├── Badge.jsx 
│   │   │   ├── Card.jsx 
│   │   │   ├── Spinner.jsx 
│   │   │   ├── Skeleton.jsx 
│   │   │   ├── EmptyState.jsx 
│   │   │   └── ErrorState.jsx
│   │   │
│   │   ├── navigation/
│   │   │   ├── Navbar.jsx 
│   │   │   ├── Sidebar.jsx 
│   │   │   ├── Breadcrumbs.jsx 
│   │   │   └── MobileBoundary.jsx
│   │   │
│   │   └── feedback/
│   │       ├── Toast.jsx 
│   │       ├── ConfirmDialog.jsx 
│   │       └── ErrorBoundary.jsx
│   │
│   ├── layouts/                                                 # Admin/Doctor/Patient layouts 
│   │   ├── AuthLayout.jsx
│   │   ├── AdminLayout.jsx
│   │   ├── DoctorLayout.jsx
│   │   └── PatientLayout.jsx
│   │
│   ├── features/                                                # business domains
│   │   ├── auth/
│   │   │   ├── components/
│   │	│   │   ├── LoginFprm.jsx 
│   │	│   │   ├── RegisterForm.jsx  
│   │   │   │   └── ForgotPasswordForm.jsx 
│   │   │   │
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.js 
│   │   │   │
│   │   │   ├── pages/
│   │	│   │   ├── Login.jsx 
│   │	│   │   ├── Register.jsx 
│   │   │   │   └── ForgotPassword.jsx 
│   │   │   │
│   │   │   ├── services/
│   │   │   │   └── authService.js 
│   │   │   │
│   │   │   ├── schemas/
│   │   │   │   └── authSchema.js 
│   │   │   │
│   │   │   └── index.js
│   │   │
│   │   ├── admin/
│   │   │   ├── components/
│   │	│   │   ├── dashboard/
│   │	│   │   │   ├── StatsCards.jsx 
│   │	│   │   │   ├── AppointmentOverview.jsx 
│   │	│   │   │   ├── PatientOverview.jsx 
│   │	│   │   │   ├── RevenueOverview.jsx 
│   │   │   │   │   └── RecentAppointments.jsx 
│   │   │   │   │
│   │	│   │   ├── doctors/ 
│   │	│   │   │   ├── DoctorTable.jsx 
│   │	│   │   │   ├── DoctorForm.jsx 
│   │	│   │   │   ├── DoctorDetails.jsx 
│   │   │   │   │   └── DoctorFilters.jsx 
│   │   │   │   │
│   │	│   │   ├── appointments/
│   │	│   │   │   ├── AppointmentTable.jsx 
│   │	│   │   │   ├── AppointmentDetails.jsx 
│   │	│   │   │   ├── AppointmentFilters.jsx 
│   │   │   │   │   └── AppointmetStatus.jsx 
│   │   │   │   │
│   │   │   │   └── reports/ 
│   │	│   │       ├── ReportFilters.jsx 
│   │	│   │       ├── ReportCard.jsx 
│   │	│   │       ├── ReportTable.jsx 
│   │   │   │       └── ReportChart.jsx 
│   │   │   │
│   │   │   ├── hooks/
│   │	│   │   ├── useDashboard.js 
│   │	│   │   ├── useStats.js  
│   │	│   │   ├── useDoctors.js 
│   │	│   │   ├── useAppointments.js  
│   │   │   │   └── useReports.js 
│   │   │   │
│   │   │   ├── pages/
│   │	│   │   ├── Dashboard.jsx
│   │	│   │   ├── Doctors.jsx
│   │	│   │   ├── Appointments.jsx
│   │   │   │   └── Reports.jsx
│   │   │   │
│   │   │   ├── services/
│   │	│   │   ├── dashboardService.js 
│   │	│   │   ├── doctorService.js 
│   │	│   │   ├── appointmentService.js 
│   │   │   │   └── reportService.js 
│   │   │   │
│   │   │   ├── schemas/
│   │	│   │   ├── doctorSchema.js 
│   │   │   │   └── appointmentSchema.js
│   │   │   │
│   │   │   ├── constants/
│   │   │   │   └── adminConstants.js
│   │   │   │
│   │   │   └── index.js
│   │   │
│   │   ├── patients/
│   │   │   ├── components/
│   │	│   │   ├── PatientTable.jsx
│   │	│   │   ├── PatientForm.jsx
│   │	│   │   ├── PatientProfile.jsx 
│   │	│   │   ├── MedicalHistory.jsx
│   │	│   │   ├── PatientFilters.jsx 
│   │	│   │   ├── PatientStats.jsx 
│   │   │   │   └── PatientActions.jsx 
│   │   │   ├── hooks/
│   │	│   │   ├── usePatients.js 
│   │   │   │   └── usePatient.js 
│   │   │   ├── pages/
│   │	│   │   ├── Patients.jsx 
│   │   │   │   └── PatientDetails.jsx
│   │   │   ├── services/
│   │   │   │   └── patientService.js
│   │   │   ├── schemas/
│   │   │   │   └── patientSchema.js
│   │   │   ├── constants/
│   │   │   │   └── patientConstants.js
│   │   │   └── index.js
│   │   │
│   │   ├── doctors/
│   │   │   ├── components/
│   │	│   │   ├── dashboard/
│   │	│   │   │   ├── DoctorStats.jsx 
│   │	│   │   │   ├── TodayAppointments.jsx  
│   │	│   │   │   ├── UpcomingAppointments.jsx 
│   │   │   │   │   └── RecentPatients.jsx 
│   │   │   │   │
│   │	│   │   ├── appointments/ 
│   │	│   │   │   ├── AppointmentTable.jsx 
│   │	│   │   │   ├── AppointmentCard.jsx 
│   │	│   │   │   ├── AppointmentFilters.jsx 
│   │   │   │   │   └── AppointmentStatus.jsx 
│   │   │   │   │
│   │	│   │   ├── patients/
│   │	│   │   │   ├── PatientTable.jsx 
│   │	│   │   │   ├── PatientCard.jsx 
│   │   │   │   │   └── PatientSearch.jsx 
│   │   │   │   │
│   │	│   │   ├── medical-records/
│   │	│   │   │   ├── MedicalRecordForm.jsx 
│   │	│   │   │   ├── MedicalRecordTable.jsx 
│   │	│   │   │   ├── MedicalRecordDetails.jsx 
│   │   │   │   │   └── DiagnosistForm.jsx 
│   │   │   │   │
│   │   │   │   └── prescriptions/ 
│   │	│   │       ├── PrescriptionForm.jsx 
│   │	│   │       ├── PrescriptionTable.jsx 
│   │	│   │       ├── MedicineRecords.jsx 
│   │   │   │       └── PrescriptionDetails.jsx 
│   │   │   │
│   │   │   ├── hooks/
│   │	│   │   ├── useDoctorDashboard.js 
│   │	│   │   ├── useMyAppointments.js 
│   │	│   │   ├── useDoctorPatients.js 
│   │	│   │   ├── useMedicalRecords.js 
│   │   │   │   └── usePrescriptions.js 
│   │   │   │
│   │   │   ├── pages/ 
│   │	│   │   ├── Dashboard.jsx
│   │	│   │   ├── MyAppointments.jsx
│   │	│   │   ├── Patients.jsx
│   │	│   │   ├── MedicalRecords.jsx
│   │   │   │   └── Prescriptions.jsx
│   │   │   │
│   │   │   ├── services/ 
│   │	│   │   ├── dashboardService.js 
│   │	│   │   ├── appointmentService.js 
│   │	│   │   ├── patientService.js 
│   │	│   │   ├── medicalRecordService.js 
│   │   │   │   └── prescriptionService.js 
│   │   │   ├── schemas/
│   │	│   │   ├── medicalRecordSchema.js
│   │   │   │   └── prescriptionSchema.js 
│   │   │   ├── constants/
│   │   │   │   └── doctorConstants.js 
│   │   │   └── index.js
│   │   │
│   │   ├── appointments/
│   │   │   ├── components/
│   │	│   │   ├── AppointmentTable.jsx 
│   │	│   │   ├── AppointmentCard.jsx  
│   │	│   │   ├── AppointmentForm.jsx 
│   │	│   │   ├── AppointmentDetails.jsx
│   │	│   │   ├── AppointmentFilters.jsx  
│   │	│   │   ├── AppointmentStatus.jsx 
│   │	│   │   ├── AppointmentCalendar.jsx 
│   │	│   │   ├── AppointmentActions.jsx
│   │   │   │   └── AppointmentSummary.jsx 
│   │   │   │
│   │   │   ├── hooks/
│   │	│   │   ├── useAppointments.js 
│   │	│   │   ├── useAppointment.js 
│   │	│   │   ├── useCreateAppointment.js 
│   │   │   │   └── useAppointmentActions.js 
│   │   │   │
│   │   │   ├── pages/ 
│   │	│   │   ├── Appointments.jsx  
│   │	│   │   ├── AppointmentDetails.jsx  
│   │   │   │   └── BookingAppointment.jsx 
│   │   │   ├── services/ 
│   │   │   │   └── appointmentService.js 
│   │   │   ├── schemas/ 
│   │   │   │   └── appointmentSchema.js
│   │   │   ├── constants/ 
│   │   │   │   └── appointmentConstants.js 
│   │   │   └── index.js
│   │   │
│   │   ├── medical-records/
│   │   │   ├── components/
│   │	│   │   ├── MedicalRecordTable.jsx 
│   │	│   │   ├── MedicalRecordCard.jsx 
│   │	│   │   ├── MedicalRecordForm.jsx 
│   │	│   │   ├── MedicalRecordDetails.jsx 
│   │	│   │   ├── MedicalRecordFilters.jsx 
│   │	│   │   ├── DiagnosisForm.jsx 
│   │	│   │   ├── ClinicalNotes.jsx  
│   │	│   │   ├── TreatmentPlan.jsx 
│   │   │   │   └── RecordTimeline.jsx 
│   │   │   │
│   │   │   ├── hooks/
│   │	│   │   ├── useMedicalRecords.js 
│   │	│   │   ├── useMedicalRecord.js 
│   │	│   │   ├── useCreateMedicalRecord.js 
│   │   │   │   └── useMedicalRecordActions.js
│   │   │   │
│   │   │   ├── pages/ 
│   │	│   │   ├── MedicalRecords.jsx 
│   │	│   │   ├── MedicalRecordDetails.jsx
│   │   │   │   └── CreateMedicalRecord.jsx 
│   │   │   │
│   │   │   ├── services/ 
│   │   │   │   └── medicalRecordService.js 
│   │   │   ├── schemas/ 
│   │   │   │   └── medicalRecordSchema.js 
│   │   │   ├── constants/ 
│   │   │   │   └── medicalRecordConstants.js 
│   │   │   └── index.js
│   │   │
│   │   ├── prescriptions/
│   │   │   ├── components/
│   │	│   │   ├── PrescriptionTable.jsx 
│   │	│   │   ├── PrescriptionCard.jsx 
│   │	│   │   ├── PrescriptionForm.jsx  
│   │	│   │   ├── PrescriptionDetails.jsx 
│   │	│   │   ├── PrescriptionFilters.jsx  
│   │	│   │   ├── PrescriptionStatus.jsx 
│   │	│   │   ├── MedicineSelector.jsx 
│   │	│   │   ├── MedicineRow.jsx 
│   │	│   │   ├── PrescriptionSummary.jsx
│   │   │   │   └── PrintPrescription.jsx 
│   │   │   │
│   │   │   ├── hooks/
│   │	│   │   ├── usePrescriptions.js 
│   │	│   │   ├── usePrescription.js 
│   │	│   │   ├── useCreatePRescription.js 
│   │   │   │   └── usePrescrptionActions.js 
│   │   │   │
│   │   │   ├── pages/ 
│   │	│   │   ├── Prescriptions.jsx  
│   │	│   │   ├── PrescriptionDetails.jsx  
│   │   │   │   └── CreatePrescription.jsx  
│   │   │   │
│   │   │   ├── services/ 
│   │   │   │   └── prescriptionService.js 
│   │   │   ├── schemas/ 
│   │   │   │   └── prescriptionSchema.js
│   │   │   ├── constants/ 
│   │   │   │   └── prescriptionConstants.js 
│   │   │   └── index.js
│   │   │
│   │   ├── laboratory/
│   │   │   ├── components/
│   │	│   │   ├── LabTestTable.jsx 
│   │	│   │   ├── LabTestCard.jsx 
│   │	│   │   ├── LabTestForm.jsx   
│   │	│   │   ├── LabTestDetails.jsx  
│   │	│   │   ├── LabTestFilters.jsx   
│   │	│   │   ├── LabTestStatus.jsx  
│   │	│   │   ├── TestOrderForm.jsx  
│   │	│   │   ├── TestResultForm.jsx 
│   │	│   │   ├── TestResultDetails.jsx 
│   │	│   │   ├── LabReport.jsx 
│   │   │   │   └── PrintLabReport.jsx
│   │   │   │
│   │   │   ├── hooks/
│   │	│   │   ├── useLabTests.js 
│   │	│   │   ├── useLabTest.js
│   │	│   │   ├── useLabOrders.js 
│   │	│   │   ├── useResults.js
│   │   │   │   └── useLabActions.js
│   │   │   │
│   │   │   ├── pages/ 
│   │	│   │   ├── Laboratory.jsx 
│   │	│   │   ├── LabTestDetails.jsx 
│   │	│   │   ├── LabOrders.jsx 
│   │	│   │   ├── LabResults.jsx 
│   │   │   │   └── CreateLabOrder.jsx 
│   │   │   │
│   │   │   ├── services/ 
│   │   │   │   └── LaboratoryService.js
│   │   │   ├── schemas/ 
│   │	│   │   ├── labTestSchema.js 
│   │	│   │   ├── labOrderSchema.js 
│   │   │   │   └── labResultSchema.js
│   │   │   ├── constants/ 
│   │   │   │   └── laboratoryConstants.js
│   │   │   └── index.js
│   │   │
│   │   ├── pharmacy/
│   │   │   ├── components/
│   │	│   │   ├── MedicineTable.jsx 
│   │	│   │   ├── MedicineCard.jsx 
│   │	│   │   ├── MedicineForm.jsx 
│   │	│   │   ├── MedicineDetails.jsx 
│   │	│   │   ├── MedicineFilters.jsx
│   │	│   │   │   
│   │	│   │   ├── InventoryTable.jsx 
│   │	│   │   ├── InventoryForm.jsx 
│   │	│   │   ├── StockStatus.jsx 
│   │	│   │   ├── StockAdjustmentForm.jsx 
│   │	│   │   │   
│   │	│   │   ├── PrescriptionQueue.jsx 
│   │	│   │   ├── PrescriptionCard.jsx   
│   │	│   │   ├── DispenseForm.jsx 
│   │	│   │   ├── DispensingDetails.jsx 
│   │	│   │   │   
│   │	│   │   ├── PharmacyOrderTable.jsx 
│   │	│   │   ├── PharmacyOrderDetails.jsx 
│   │   │   │   └── PharmacySummary.jsx
│   │   │   │
│   │   │   ├── hooks/
│   │	│   │   ├── useMedicines.js 
│   │	│   │   ├── useMedicine.js   
│   │	│   │   ├── useInventory.js 
│   │	│   │   ├── usePrescriptionQueue.js 
│   │	│   │   ├── useDispensing.js 
│   │   │   │   └── usePharmacyOrders.js
│   │   │   │
│   │   │   ├── pages/ 
│   │	│   │   ├── Dashboard.jsx    
│   │	│   │   ├── Medicines.jsx 
│   │	│   │   ├── MedicineDetails.jsx   
│   │	│   │   ├── Inventory.jsx  
│   │	│   │   ├── Prescriptions.jsx 
│   │	│   │   ├── DispensePrescription.jsx 
│   │   │   │   └── PharmacyOrders.jsx 
│   │   │   │
│   │   │   ├── services/ 
│   │   │   │   └── pharmacyService.js 
│   │   │   ├── schemas/ 
│   │	│   │   ├── medicineSchema.js 
│   │	│   │   ├── inventorySchema.js
│   │   │   │   └── dispensingSchema.js
│   │   │   ├── constants/ 
│   │   │   │   └── PharmacyConstants.js
│   │   │   └── index.js
│   │   │
│   │   └── billing/
│   │       ├── components/
│   │	    │   ├── InvoiceTable.jsx  
│   │	    │   ├── InvoiceCard.jsx
│   │	    │   ├── InvoiceForm.jsx  
│   │	    │   ├── InvoiceDetails.jsx  
│   │	    │   ├── InvoiceFilters.jsx 
│   │	    │   ├── InvoiceStatus.jsx 
│   │	    │   │   
│   │	    │   ├── BillingSummary.jsx  
│   │	    │   ├── BillingItemTable.jsx
│   │	    │   ├── BillingItemForm.jsx 
│   │	    │   │   
│   │	    │   ├── PaymentForm.jsx 
│   │	    │   ├── PaymentTable.jsx    
│   │	    │   ├── PaymentDetails.jsx 
│   │	    │   ├── PaymentStatus.jsx  
│   │	    │   │   
│   │	    │   ├── RefundForm.jsx 
│   │	    │   ├── RefundDetails.jsx    
│   │	    │   │   
│   │	    │   ├── PatientBilling.jsx 
│   │	    │   ├── OutstandingBalance.jsx 
│   │       │   └── PrintInvoice.jsx 
│   │       │
│   │       ├── hooks/
│   │	    │   ├── useInvoices.js 
│   │	    │   ├── useInvoice.js   
│   │	    │   ├── useBilling.js  
│   │	    │   ├── usePayments.js 
│   │	    │   ├── usePayment.js 
│   │	    │   ├── useRefunds.js 
│   │       │   └── useBillingActionss.js
│   │       │
│   │       ├── pages/ 
│   │	    │   ├── Dashboard.jsx 
│   │	    │   ├── Invoices.jsx   
│   │	    │   ├── InvoiceDetails.jsx   
│   │	    │   ├── CreateInvoice.jsx 
│   │	    │   ├── Payments.jsx 
│   │	    │   ├── PaymentDetails.jsx 
│   │	    │   ├── PatientBilling.jsx 
│   │       │   └── refunds.jsx 
│   │       │
│   │       ├── services/ 
│   │       │   └── billingService.js 
│   │       ├── schemas/ 
│   │	    │   ├── invoiceSchema.js 
│   │	    │   ├── paymentSchema.js  
│   │       │   └── refundSchema.js  
│   │       ├── constants/ 
│   │       │   └── billingConstants.js
│   │       └── index.js
│   │
│   ├── services/                                                # Axios/API infrastructure 
│   │   ├── api.js
│   │   ├── axios.js
│   │   └── interceptors.js
│   │
│   ├── hooks/                                                   # global hooks 
│   │   ├── useDebounce.js
│   │   ├── usePagination.js
│   │   └── useModal.js
│   │
│   ├── context/                                                 # global React context 
│   │   └── AuthContext.jsx
│   │
│   ├── utils/                                                   # shared utitities 
│   │   ├── formatCurrency.js 
│   │   ├── formatDate.js 
│   │   ├── permissions.js 
│   │   └── helpers.js
│   │
│   ├── constants/                                               # shared constants
│   │   ├── roles.js 
│   │   ├── routes.js 
│   │   └── status.js 
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── .env.example 
├── .gitignore 
├── .eslint.config.js 
├── packabe.json 
├── vite.config.js 
└── README.md
