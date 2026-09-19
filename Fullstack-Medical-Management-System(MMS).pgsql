Fullstack-Medical-Management System(MMS)  React => Features => Service(Axios) => FastAPI API => Service Layer => SQLAlchemy => PostgreSQL/ MySQL
│
├── frontend/ (React • JavaScript • HTML • CSS) components -> pages -> hooks -> services -> routes -> utils -> App.jsx
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── logo.png
│   │   ├── manifest.json
│   │   └── index.html
│   ├── src/
│   │   ├── app/  
│   │   │   ├── App.jsx
│   │   │   ├── main.jsx 
│   │   │   ├── providers/
│   │   │   │   ├── AuthProvider.jsx
│   │   │   │   ├── QueryProvider.jsx 
│   │   │   │   ├── ThemeProvider.jsx
│   │   │   │   └── NotificationProvider.jsx 
│   │   │   ├── router/
│   │   │   │   ├── AppRouter.jsx
│   │   │   │   ├── ProtectedRoute.jsx 
│   │   │   │   ├── PublicRoute.jsx
│   │   │   │   ├── RoleRoute.jsx 
│   │   │   │   └── route.js
│   │   │   └── config/
│   │   │       ├── env.js
│   │   │       ├── app.config.js 
│   │   │       └── api.config.js 
│   │   │
│   │   ├── assets/  
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   ├── fonts/
│   │   │   └── styles/
│   │   │       ├── global.css  
│   │   │       ├── variables.css 
│   │   │       ├── theme.css 
│   │   │       ├── utilities.css 
│   │   │       └── animations.css 
│   │   │
│   │   ├── components/  
│   │   │   ├── ui/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx 
│   │   │   │   ├── Select.jsx 
│   │   │   │   ├── Table.jsx 
│   │   │   │   ├── Card.jsx  
│   │   │   │   ├── Badge.jsx 
│   │   │   │   ├── Spinner.jsx 
│   │   │   │   └── EmptyState.jsx 
│   │   │   ├── layout/
│   │   │   │   ├── AppLayout.jsx
│   │   │   │   ├── AuthLayout.jsx 
│   │   │   │   ├── DashboardLayout.jsx 
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Header.jsx 
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Breadcrumbs.jsx 
│   │   │   │   └── pageContainer.jsx 
│   │   │   ├── forms/
│   │   │   │   ├── FormField.jsx
│   │   │   │   ├── FormError.jsx 
│   │   │   │   └── FormActions.jsx
│   │   │   ├── feedback/
│   │   │   │   ├── ErrorBoundary.jsx
│   │   │   │   ├── ErrorMessage.jsx 
│   │   │   │   ├── LoadingState.jsx 
│   │   │   │   ├── EmptyState.jsx 
│   │   │   │   └── confirmationdialog.jsx
│   │   │   └── data-display/
│   │   │       ├── DataTable.jsx
│   │   │       ├── DataCard.jsx 
│   │   │       ├── StatusBadge.jsx 
│   │   │       └── Timeline.jsx
│   │   │
│   │   ├── features/                        
│   │   │   ├── auth/     => Login.jsx -> LogingForm.jsx -> useLogin.js -> auth.store.js -> auth.service.js -> Axios(api.js)         
│   │   │   │   ├── components/
│   │	│   │   │   ├── LoginForm.jsx
│   │	│   │   │   ├── RegisterForm.jsx
│   │	│   │   │   ├── ForgotPasswordForm.jsx 
│   │	│   │   │   ├── ResetPasswordForm.jsx
│   │	│   │   │   ├── PasswordInput.jsx 
│   │   │   │   │   └── ProtectedRoute.jsx 
│   │   │   │   ├── pages/  
│   │	│   │   │   ├── Login.jsx          
│   │	│   │   │   ├── Register.jsx 
│   │	│   │   │   ├── ForgotPassword.jsx 
│   │	│   │   │   ├── ResetPassword.jsx
│   │	│   │   │   ├── VerifyEmail.jsx 
│   │   │   │   │   └── 
│   │   │   │   ├── hooks/
│   │	│   │   │   ├── useAuth.js
│   │	│   │   │   ├── useLogin.js 
│   │	│   │   │   ├── useRegister.js 
│   │	│   │   │   ├── useForgotPassword.js 
│   │	│   │   │   ├── useResetPassword.js 
│   │   │   │   │   └── 
│   │   │   │   ├── services/
│   │   │   │   │   └── authservice.js
│   │   │   │   ├── store/
│   │   │   │   │   └── auth.store.js
│   │   │   │   ├── utils/
│   │	│   │   │   ├── validation.js 
│   │	│   │   │   ├── helpers.js 
│   │	│   │   │   ├── formatter.js 
│   │   │   │   │   └── 
│   │   │   │   ├── constants/
│   │	│   │   │   ├── roles.js 
│   │	│   │   │   ├── permission.js
│   │	│   │   │   ├── auth.js
│   │   │   │   │   └──  
│   │   │   │   ├── router/
│   │   │   │   │   └── auth.routes.jsx
│   │   │   │   ├── tests/ 
│   │	│   │   │   ├── Login.test.jsx 
│   │	│   │   │   ├── Register.test.jsx 
│   │   │   │   │   └── useLogin.js
│   │   │   │   ├── styles/
│   │	│   │   │   ├── auth.css 
│   │	│   │   │   ├── form.css  
│   │   │   │   │   └── layout.css
│   │   │   │   └── index.js   
│   │   │   ├── dashboard/
│   │   │   │   ├── pages/
│   │	│   │   │   ├── Dashboard.jsx                                # Main dashboard router/container
│   │	│   │   │   ├── AdminDashboard.jsx                           # Admin view 
│   │	│   │   │   ├── DoctorDashboard.jsx                          # Doctor view 
│   │	│   │   │   ├── PatientDashboard.jsx                         # Patient partal view 
│   │   │   │   │   └── index.js
│   │   │   │   ├── components/
│   │	│   │   │   ├── DashboardHeader.jsx 
│   │	│   │   │   ├── DashboardStats.jsx 
│   │	│   │   │   ├── StatisticCard.jsx
│   │	│   │   │   ├── SummaryCard.jsx
│   │	│   │   │   ├── appointments/
│   │	│   │   │   │   ├── AppointmentSummary.jsx
│   │	│   │   │   │   ├── RecentAppointment.jsx
│   │   │   │   │   │   └── index.js
│   │	│   │   │   ├── Patients/
│   │	│   │   │   │   ├── RecentPatients.jsx
│   │   │   │   │   │   └── index.js
│   │	│   │   │   ├── prescriptions/
│   │	│   │   │   │   ├── RecentPrescriptions.jsx
│   │   │   │   │   │   └── index.js
│   │	│   │   │   ├── charts/
│   │	│   │   │   │   ├── RevenueChart.jsx
│   │	│   │   │   │   ├── PatientChart.jsx
│   │	│   │   │   │   ├── AppointmentChart.jsx
│   │   │   │   │   │   └── index.js
│   │	│   │   │   ├── NotificationPanel.jsx 
│   │	│   │   │   ├── QuickActions.jsx
│   │	│   │   │   ├── ActivityTimeLine.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── hooks/
│   │	│   │   │   ├── useDashboard.js 
│   │	│   │   │   ├── useDashboardStats.js 
│   │	│   │   │   ├── useDashboardCharts.js  
│   │	│   │   │   ├── useRecentPatients.js 
│   │	│   │   │   ├── useRecentAppointments.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── services/
│   │   │   │   │   └── dashboard.services.js 
│   │   │   │   ├── store/
│   │   │   │   │   └── dashboard.store.js 
│   │   │   │   ├── constants/
│   │	│   │   │   ├── dashboardCards.js 
│   │	│   │   │   ├── dashboardWidgets.js
│   │	│   │   │   ├── dashboardRoles.js
│   │   │   │   │   └── index.js 
│   │   │   │   ├── utils/
│   │	│   │   │   ├── dashboardHelpers.js 
│   │	│   │   │   ├── dashboardFormatter.js
│   │   │   │   │   └── index.js 
│   │   │   │   ├── router/
│   │   │   │   │   └── dashboard.routes.js 
│   │   │   │   ├── styles/
│   │	│   │   │   ├── dashboard.css 
│   │	│   │   │   ├── dashboardcards.css
│   │	│   │   │   ├── dashboarChart.css
│   │   │   │   │   └── dashboardWidgets.css 
│   │   │   │   └── index.js
│   │   │   ├── patients/
│   │	│   │   ├── components/
│   │	│   │   │   ├── PatientForm.jsx
│   │	│   │   │   ├── PatientTable.jsx
│   │	│   │   │   ├── PatientCard.jsx                              
│   │	│   │   │   ├── PatientSearch.jsx
│   │	│   │   │   ├── PatientFilters.jsx
│   │	│   │   │   ├── PatientDetails.jsx
│   │	│   │   │   ├── MedicalHistory.jsx
│   │   │   │   │   └── EmergencyContact.jsx 
│   │	│   │   ├── pages/
│   │	│   │   │   ├── Patients.jsx                             
│   │	│   │   │   ├── AddPatient.jsx                       
│   │	│   │   │   ├── EditPatient.jsx                                                  
│   │   │   │   │   └── PatientDetails.jsx
│   │	│   │   ├── hooks/                                       
│   │	│   │   │   ├── usePatients.js 
│   │   │   │   │   └── usePatient.js
│   │	│   │   ├── services/                                    
│   │   │   │   │   └── patientService.js 
│   │	│   │   ├── validation/                                       
│   │   │   │   │   └── patientSchema.js
│   │   │   │   └── index.js                                    
│   │   │   ├── doctors/
│   │	│   │   ├── components/
│   │	│   │   │   ├── DoctorTable.jsx                          
│   │	│   │   │   ├── DoctortModal.jsx                         
│   │	│   │   │   ├── DoctorForm.jsx                          
│   │	│   │   │   ├── DoctorCard.jsx                           
│   │	│   │   │   ├── DoctorProfile.jsx                        
│   │	│   │   │   ├── DoctorSearch.jsx                         
│   │	│   │   │   ├── DoctorFilters                       
│   │	│   │   │   ├── DoctorDetails.jsx                  
│   │	│   │   │   ├── DoctorSchedule.jsx                    
│   │   │   │   │   └── DoctorAvailbility.jsx
│   │	│   │   ├── pages/
│   │	│   │   │   ├── Doctors.jsx                                                    
│   │	│   │   │   ├── AddDoctor.jsx                        
│   │	│   │   │   ├── EditDoctor.jsx                           
│   │   │   │   │   └── DoctorDetails.jsx
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── useDoctors.js 
│   │	│   │   │   ├── useDoctor.js 
│   │   │   │   │   └── useDoctorSchedule.js
│   │	│   │   ├── services/
│   │   │   │   │   └── doctorService.js 
│   │	│   │   ├── validation/                    
│   │   │   │   │   └── doctorSchema.js 
│   │	│   │   ├── types/
│   │   │   │   │   └── doctorTypes.js
│   │   │   │   └── index.js
│   │   │   ├── appointments/
│   │	│   │   ├── components/
│   │	│   │   │   ├── AppointmentForm.jsx 
│   │	│   │   │   ├── AppointmentTable.jsx                      
│   │	│   │   │   ├── AppointmentCard.jsx                     
│   │	│   │   │   ├── AppointmentCalendar.jsx  
│   │	│   │   │   ├── AppointmentDetails.jsx 
│   │	│   │   │   ├── AppointmentStatus.jsx                  
│   │	│   │   │   ├── AppointmentFilters.jsx
│   │	│   │   │   ├── AppointmentSearch.jsx
│   │	│   │   │   ├── AppointmentAvailability.jsx
│   │   │   │   │   └── TimeSlotPicker.jsx
│   │	│   │   ├── pages/
│   │	│   │   │   ├── Appointments.jsx                         
│   │	│   │   │   ├── BookingAppointment.jsx                      
│   │	│   │   │   ├── EditAppointment.jsx                   
│   │   │   │   │   └── AppointmentDetails.jsx 
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── useAppointments.js 
│   │	│   │   │   ├── useAppointment.js                      
│   │	│   │   │   ├── useAvailability.js
│   │   │   │   │   └── useAppointmentCalendar.js 
│   │	│   │   ├── services/
│   │   │   │   │   └── appointmentService.js
│   │   │   │   ├── validation/
│   │   │   │   │   └── appointmentSchema.js 
│   │   │   │   ├── types/
│   │   │   │   │   └── appointmentTypes.js 
│   │   │   │   └── index.js
│   │   │   │   
│   │   │   ├── medical-records/
│   │	│   │   ├── components/
│   │	│   │   │   ├── MedicalRecordForm.jsx 
│   │	│   │   │   ├── MedicalRecordTable.jsx                      
│   │	│   │   │   ├── MedicalRecordCard.jsx                     
│   │	│   │   │   ├── MedicalRecordDetails.jsx  
│   │	│   │   │   ├── MedicalHistory.jsx 
│   │	│   │   │   ├── VitalSigns.jsx                  
│   │	│   │   │   ├── DiagnosisList.jsx
│   │	│   │   │   ├── TreatmentPlan.jsx
│   │	│   │   │   ├── FollowUp.jsx
│   │	│   │   │   ├── RecordSearch.jsx
│   │   │   │   │   └── RecordFilters.jsx 
│   │	│   │   ├── pages/
│   │	│   │   │   ├── MedicalRecords.jsx                         
│   │	│   │   │   ├── AddMedicalRecord.jsx                      
│   │	│   │   │   ├── EditMedicalRecord.jsx                   
│   │   │   │   │   └── MedicalRecordDetails.jsx 
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── useMedicalRecords.js                      
│   │	│   │   │   ├── useMedicalRecord.js
│   │   │   │   │   └── usePatientHistory.js 
│   │	│   │   ├── services/
│   │   │   │   │   └── medicalRecordService.js
│   │   │   │   ├── validation/
│   │   │   │   │   └── medicalRecordSchema.js 
│   │   │   │   ├── types/
│   │   │   │   │   └── medicalRecordTypes.js 
│   │   │   │   └── index.js
│   │   │   │   
│   │   │   ├── prescriptions/
│   │	│   │   ├── components/
│   │	│   │   │   ├── PrescriptionForm.jsx 
│   │	│   │   │   ├── PrescriptionTable.jsx                      
│   │	│   │   │   ├── PrescriptionCard.jsx                     
│   │	│   │   │   ├── PrescriptionDetails.jsx  
│   │	│   │   │   ├── MedicineSelector.jsx 
│   │	│   │   │   ├── MedicineRow.jsx                  
│   │	│   │   │   ├── PrescriptionPreview.jsx
│   │	│   │   │   ├── PrescriptionPrint.jsx
│   │	│   │   │   ├── PrescriptionSearch.jsx
│   │   │   │   │   └── PrescriptionFilters.jsx 
│   │	│   │   ├── pages/
│   │	│   │   │   ├── Prescriptions.jsx                         
│   │	│   │   │   ├── CreatePrescription.jsx                      
│   │	│   │   │   ├── EditPrescription.jsx                   
│   │   │   │   │   └── PrescriptionDetails.jsx 
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── usePrescriptions.js                      
│   │	│   │   │   ├── usePrescription.js
│   │   │   │   │   └── useMedicines.js 
│   │	│   │   ├── services/
│   │   │   │   │   └── prescriptionService.js
│   │   │   │   ├── validation/
│   │   │   │   │   └── prescriptionSchema.js 
│   │   │   │   ├── types/
│   │   │   │   │   └── prescriptionTypes.js 
│   │   │   │   └── index.js
│   │   │   │   
│   │   │   ├── laboratory/
│   │	│   │   ├── components/
│   │	│   │   │   ├── LabOrderForm.jsx 
│   │	│   │   │   ├── LabOrderTable.jsx                      
│   │	│   │   │   ├── LabOrderCard.jsx                     
│   │	│   │   │   ├── LabOrderDetails.jsx  
│   │	│   │   │   ├── LabTestSelector.jsx 
│   │	│   │   │   ├── LabTestRow.jsx                  
│   │	│   │   │   ├── SampleCollection.jsx
│   │	│   │   │   ├── ResultForm.jsx
│   │	│   │   │   ├── ResultTable.jsx
│   │	│   │   │   ├── LabReportPreview.jsx 
│   │	│   │   │   ├── LabSearch.jsx 
│   │   │   │   │   └── LabFilters.jsx 
│   │	│   │   ├── pages/
│   │	│   │   │   ├── LaboratoryPage.jsx                         
│   │	│   │   │   ├── CreateLabOrderPage.jsx                      
│   │	│   │   │   ├── LabOrderDetailsPage.jsx                   
│   │	│   │   │   ├── LabResultPage.jsx 
│   │   │   │   │   └── LabReportpage.jsx 
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── useLabOrders.js                      
│   │	│   │   │   ├── useLabOrder.js
│   │	│   │   │   ├── useLabTests.js 
│   │   │   │   │   └── useLabResults.js 
│   │	│   │   ├── services/
│   │   │   │   │   └── laboratoryService.js
│   │   │   │   ├── validation/
│   │	│   │   │   ├── labOrderSchema.js
│   │   │   │   │   └── labResultSchema.js 
│   │   │   │   ├── types/
│   │   │   │   │   └── laboratoryTypes.js 
│   │   │   │   └── index.js
│   │   │   │      
│   │   │   ├── billings/
│   │	│   │   ├── components/
│   │	│   │   │   ├── BillingForm.jsx 
│   │	│   │   │   ├── BillingTable.jsx                      
│   │	│   │   │   ├── BillingCard.jsx                     
│   │	│   │   │   ├── BillingDetails.jsx  
│   │	│   │   │   ├── InvoiceForm.jsx 
│   │	│   │   │   ├── InvoicePreview.jsx                  
│   │	│   │   │   ├── PaymentForm.jsx
│   │	│   │   │   ├── PaymentHistory.jsx
│   │	│   │   │   ├── PaymentStatus.jsx
│   │	│   │   │   ├── RefundForm.jsx 
│   │	│   │   │   ├── BillingSearch.jsx 
│   │   │   │   │   └── BilingFilters.jsx 
│   │	│   │   ├── pages/
│   │	│   │   │   ├── BillingsPage.jsx                         
│   │	│   │   │   ├── CreateInvoicePage.jsx                      
│   │	│   │   │   ├── InvoiceDetailsPage.jsx                   
│   │	│   │   │   ├── PaymentPage.jsx 
│   │	│   │   │   ├── PaymentHistoryPage.jsx 
│   │   │   │   │   └── RefundPage.jsx 
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── useBillings.js                       
│   │	│   │   │   ├── useBilling.js 
│   │	│   │   │   ├── useInvoices.js  
│   │   │   │   │   └── usePayments.js  
│   │	│   │   ├── services/
│   │   │   │   │   └── billingService.js
│   │   │   │   ├── validation/
│   │	│   │   │   ├── billingSchema.js
│   │	│   │   │   ├── invoiceSchema.js 
│   │   │   │   │   └── paymentSchema.js 
│   │   │   │   ├── types/
│   │   │   │   │   └── billingTypes.js 
│   │   │   │   └── index.js
│   │   │   │      
│   │   │   ├── notifications/
│   │	│   │   ├── components/
│   │	│   │   │   ├── NotificationBell.jsx 
│   │	│   │   │   ├── NotificationBadge.jsx                      
│   │	│   │   │   ├── NotificationDropDown.jsx                     
│   │	│   │   │   ├── NotificationItem.jsx  
│   │	│   │   │   ├── NotificationList.jsx 
│   │	│   │   │   ├── NotificationCard.jsx                  
│   │	│   │   │   ├── NotificationFilters.jsx
│   │   │   │   │   └── NoticationPreferences.jsx 
│   │	│   │   ├── pages/ 
│   │	│   │   │   ├── NotificationsPage.jsx 
│   │   │   │   │   └── NotificationsPage.jsx 
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── useNotifications.js                       
│   │	│   │   │   ├── useUnreadNotifications.js 
│   │   │   │   │   └── useNotificationPreference.js  
│   │	│   │   ├── services/
│   │   │   │   │   └── notificationService.js
│   │   │   │   ├── validation/
│   │   │   │   │   └── notificationSchema.js 
│   │   │   │   ├── types/
│   │   │   │   │   └── notificationTypes.js 
│   │   │   │   └── index.js
│   │   │   │      
│   │   │   ├── settings/
│   │	│   │   ├── components/
│   │	│   │   │   ├── SettingsLayout.jsx 
│   │	│   │   │   ├── SettingsSidebar.jsx                      
│   │	│   │   │   ├── SettingsHeader.jsx                     
│   │	│   │   │   ├── SettingsSection.jsx  
│   │	│   │   │   │
│   │	│   │   │   ├── ProfileSettings.jsx 
│   │	│   │   │   ├── AccountSettings.jsx                  
│   │	│   │   │   ├── SecuritySettings.jsx
│   │	│   │   │   ├── NotificationSettings.jsx 
│   │	│   │   │   ├── AppearanceSettings.jsx 
│   │	│   │   │   ├── LanguageSettings.jsx 
│   │	│   │   │   ├── TimezoneSettings.jsx
│   │	│   │   │   │
│   │	│   │   │   ├── ClinicSettings.jsx 
│   │	│   │   │   ├── AppointmentSettings.jsx 
│   │	│   │   │   ├── BillingSettings.jsx 
│   │	│   │   │   ├── LaboratorySettings.jsx 
│   │	│   │   │   ├── UserRoleSettings.jsx
│   │	│   │   │   │
│   │	│   │   │   ├── PasswordChangeForm.jsx 
│   │	│   │   │   ├── TwoFactorSettings.jsx 
│   │   │   │   │   └── DangerZonze.jsx
│   │	│   │   ├── pages/ 
│   │	│   │   │   ├── SettingsPage.jsx 
│   │	│   │   │   ├── ProfileSettingsPage.jsx
│   │	│   │   │   ├── SecuritySettingsPage.jsx
│   │	│   │   │   ├── NotificationSettingsPage.jsx
│   │	│   │   │   ├── AppearanceSettingsPage.jsx 
│   │	│   │   │   ├── ClinicSettingsPage.jsx 
│   │   │   │   │   └── SystemSettingsPage.jsx 
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── useSettings.js                       
│   │	│   │   │   ├── useProfileSettings.js 
│   │   │   │   │   └── useSystemSettings.js  
│   │	│   │   ├── services/
│   │   │   │   │   └── settingsService.js
│   │   │   │   ├── validation/
│   │	│   │   │   ├── profileSchema.js 
│   │	│   │   │   ├── passwordSchema.js 
│   │   │   │   │   └── settingsSchema.js 
│   │   │   │   ├── types/
│   │   │   │   │   └── setingsTypes.js 
│   │   │   │   ├── types/
│   │   │   │   │   └── setingsConstants.js 
│   │   │   │   └── index.js
│   │   │   │      
│   │   │   └── errors/
│   │   ├── hooks/
│   │   │   ├── useAuth.js  
│   │   │   ├── useApi.js   
│   │   │   └── usePermission.js
│   │   ├── services/                                         # API Layer 
│   │   │       └── 
│   │   ├── App.jsx
│   │   └── main.jsx
│   │     
│   └── package.json
│   
├── Backend(Python + FastAPI)  API(FastAPI Router) -> Service Layer -> Repository Layer -> SQLAlchemy ORM -> Database 
│   │ 
│   ├── app/
│   │   ├── main.py
│   │   │
│   │   ├── core/
│   │   │   ├── config.py                      # Application settings
│   │   │   ├── database.py                    # SQLAlchemy
│   │   │   ├── security.py                    # JWT, password hashing
│   │   │   ├── dependencies.py                # Shared FastAPI dependencies
│   │   │   ├── logging.py                     # Logging configuration
│   │   │   ├── exceptions.py                  # Custom exception classes
│   │   │   ├── permissions.py
│   │   │   └── cache.py
│   │   │
│   │   ├── api/                               # FastAPI
│   │   │   ├── router.py                      # Register API versions
│   │   │   └── v1/                            # API Router
│   │	│       ├── auth.py                    
│   │	│       ├── dashboard.py
│   │	│       ├── patients.py
│   │	│       ├── doctors.py
│   │	│       ├── appointments.py
│   │	│       ├── prescriptions.py
│   │	│       ├── pharmacy.py
│   │	│       ├── medicines.py 
│   │	│       ├── inventory.py
│   │	│       ├── suppliers.py 
│   │	│       ├── dispensing.py
│   │	│       ├── laboratory.py
│   │	│       ├── lab_tests.py
│   │	│       ├── lab_orders.py
│   │	│       ├── lab_result.py
│   │	│       ├── lab_reports.py
│   │	│       ├── billing.py
│   │	│       ├── invoices.py 
│   │	│       ├── payments.py 
│   │	│       ├── refunds.py 
│   │	│       ├── insurance.py
│   │	│       ├── notifications.py 
│   │	│       ├── reports.py 
│   │   │       └── settings.py
│   │   │
│   │   ├── schemas/                           # Pydantic schemas
│   │   │   ├── __init__.py
│   │   │   ├── auth.py
│   │   │   ├── dashboard.py
│   │   │   ├── patient.py
│   │   │   ├── doctor.py
│   │   │   ├── appointment.py
│   │   │   ├── prescription.py
│   │   │   ├── pharmarcy.py
│   │   │   ├── laboratory.py
│   │   │   ├── billing.py
│   │   │   ├── notification.py
│   │   │   ├── report.py
│   │   │   └── settings.py
│   │   │ 
│   │   ├── services/                          # Business Logic 
│   │   │   ├── __init__.py
│   │   │   ├── auth_service.py
│   │   │   ├── dashboard_service.py
│   │   │   ├── patient_service.py
│   │   │   ├── doctor_service.py 
│   │   │   ├── appointment_service.py 
│   │   │   ├── prescription_service.py 
│   │   │   ├── pharmacy_service.py
│   │   │   ├── medicine_service.py
│   │   │   ├── inventory_service.py
│   │   │   ├── supplier_service.py
│   │   │   ├── despensing_service.py
│   │   │   ├── laboratory_service.py
│   │   │   ├── lab_test_service.py 
│   │   │   ├── lab_order_service.py 
│   │   │   ├── lab_result_service.py 
│   │   │   ├── lab_report_service.py
│   │   │   ├── billing_service.py
│   │   │   ├── invoice_service.py 
│   │   │   ├── payment_service.py 
│   │   │   ├── refund_service.py 
│   │   │   ├── insurance_service.py
│   │   │   ├── notification_service.py 
│   │   │   ├── report_service.py
│   │   │   ├── email_service.py
│   │   │   ├── sms_service.py
│   │   │   ├── upload_service.py
│   │   │   └── file_export_service.py
│   │   │
│   │   ├── repositories/                      # Database Operations
│   │   │   ├── __init__.py
│   │   │   ├── base_repository.py 
│   │   │   ├── auth_repository.py
│   │   │   ├── user_repository.py
│   │   │   ├── patient_repository.py 
│   │   │   ├── doctor_repository.py
│   │   │   ├── appointment_repository.py
│   │   │   ├── prescription_repository.py
│   │   │   ├── medicine_repository.py
│   │   │   ├── inventory_repository.py
│   │   │   ├── supplier_repository.py
│   │   │   ├── stock_repository.py
│   │   │   ├── lab_test_repository.py
│   │   │   ├── lab_order_repository.py
│   │   │   ├── lab_result_repository.py
│   │   │   ├── lab_report_repository.py
│   │   │   ├── invoice_repository.py
│   │   │   ├── payment_repository.py 
│   │   │   ├── refund_repository.py
│   │   │   ├── insurance_repository.py
│   │   │   ├── notification_repository.py
│   │   │   └── report_repository.py 
│   │   │
│   │   ├── models/                            # SQLAlchemy Model
│   │   │   ├── __init__.py
│   │   │   ├── base.py
│   │   │   ├── user.py
│   │   │   ├── role.py
│   │   │   ├── permission.py
│   │   │   ├── refresh_token.py
│   │   │   ├── login_history.py
│   │   │   ├── patient.py
│   │   │   ├── doctor.py
│   │   │   ├── appointment.py
│   │   │   ├── Prescription.py
│   │   │   ├── PrescriptionItem.py
│   │   │   ├── medicine.py 
│   │   │   ├── medicineCategory.py 
│   │   │   ├── Inventory.py 
│   │   │   ├── StockMovement.py 
│   │   │   ├── supplier.py 
│   │   │   ├── LabTest.py
│   │   │   ├── LabOrder.py 
│   │   │   ├── LabOrderItem.py
│   │   │   ├── Sample.py
│   │   │   ├── LabResult.py 
│   │   │   ├── LabReport.py
│   │   │   ├── Invoice.py 
│   │   │   ├── InvoiceItem.py 
│   │   │   ├── Payment.py 
│   │   │   ├── Transaction.py
│   │   │   ├── Refund.py 
│   │   │   ├── InsuranceClaim.py
│   │   │   └── notification.py
│   │   │  
│   │   ├── middleware/
│   │   │   ├── auth.py
│   │   │   ├── permissions.py 
│   │   │   ├── cors.py 
│   │   │   ├── request_logger.py
│   │   │   └── exception_handler.py
│   │   │
│   │   ├── workers/                                     # Background tasks
│   │   │   ├── email_worker.py
│   │   │   ├── reminder_worker.py
│   │   │   ├── report_worker.py
│   │   │   └── notification_worker.py
│   │   │
│   │   ├── templates/                               
│   │   │   ├── email/
│   │   │   └── reports/
│   │   │
│   │   ├── uploads/
│   │   │   ├── patients/
│   │   │   ├── doctors/
│   │   │   ├── prescriptions/
│   │   │   └── laboratory/
│   │   │
│   │   └── utils/
│   │       ├── constants.py
│   │       ├── helpers.py
│   │       ├── validators.py
│   │       ├── formatter.py  
│   │       └── pagination.py
│   │   
│   ├── tests/
│   │   ├── utils/
│   │   ├── integration/
│   │   └── conftest.py
│   │
│   ├── alembic/
│   │   ├── versions/
│   │   └── env.py
│   │
│   ├── docs/
│   ├── scripts/
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── .env 
│   ├── .env.example
│   ├── .gitignore
│   └── README.md
│
└── LICENSE
Frontend
    pages -> components-> hooks -> services -> Axios -> FastAPI

Patient Page => Patient Hook => Patient Store => Patient Service => Axios => 

Backend 
    Router -> Dependencies -> Service Layer -> Repository layer-> SQLAlchemy ORM -> Database

FastAPI Router => Patient Service => Patient Repository => SQLAlchemy => PostgreSQL
  
    app/api/v1/auth.py => app/services/auth_service.py => app/repositories/user_repository.py/ => app/models/user.py => PostgreSQL 

Authentication flow:

Login.jsx -> LoginForm.jsx -> useLogin.js -> auth.store.js -> auth.service.js -> Axios(api.js) -> POST/api/v1/auth/login 

FastAPI Router -> auth Service -> User Reposity -> SQLAlchemy -> PostgreSQL
Login -> Auth Hook -> authStore-> auth Service -> Axios 
    => POST / Login
        => FastAPI Auth Router 
            => Auth Service 
                => User Repository 
                    => User Model 
                        => Database 
                            => JWT Token 
                                => Axios Interceptor 
                                    => Protected Pages



    








