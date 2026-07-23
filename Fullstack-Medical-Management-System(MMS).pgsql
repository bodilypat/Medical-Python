Fullstack-Medical-Management System(MMS)  React => Features => Service(Axios) => FastAPI API => Service Layer => SQLAlchemy => PostgreSQL/ MySQL
│
├── frontend/ (React • JavaScript • HTML • CSS) components -> pages -> hooks -> services -> routes -> utils -> App.jsx
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── logo.png
│   │   └── index.html
│   ├── src/
│   │   ├── assets/  
│   │   │   ├── image/
│   │   │   │   └── ...
│   │   │   ├── icons/
│   │   │   │   └── ...
│   │   │   ├── fonts/
│   │   │   └── styles/
│   │   │       ├── globals.css
│   │   │       ├── variables.css
│   │   │       ├── theme.css
│   │   │       └── animations.css
│   │   │
│   │   ├── components/  
│   │   │   ├── common/
│   │   │   ├── forms/
│   │   │   │   └── 
│   │   │   ├── tables/ 
│   │   │   │   └── 
│   │   │   ├── charts/
│   │   │   │   └── 
│   │   │   ├── cards/
│   │   │   ├── layout/
│   │   │   └── modals/
│   │   │       └── 
│   │   │
│   │   ├── features/                        
│   │   │   ├── auth/     => Login.jsx -> LogingForm.jsx -> useLogin.js -> auth.store.js -> auth.service.js -> Axios(api.js)         
│   │   │   │   ├── pages/  
│   │	│   │   │   ├── Login.jsx          
│   │	│   │   │   ├── Register.jsx 
│   │	│   │   │   ├── ForgotPassword.jsx 
│   │	│   │   │   ├── ResetPassword.jsx
│   │	│   │   │   ├── VerifyEmail.jsx 
│   │   │   │   │   └── index.js
│   │   │   │   ├── components/
│   │	│   │   │   ├── LoginForm.jsx
│   │	│   │   │   ├── RegisterForm.jsx
│   │	│   │   │   ├── ForgotPasswordForm.jsx 
│   │	│   │   │   ├── ResetPasswordForm.jsx
│   │	│   │   │   ├── PasswordInput.jsx 
│   │	│   │   │   ├── AuthLayout.jsx 
│   │	│   │   │   ├── AuthBanner.jsx 
│   │   │   │   │   └── index.js
│   │   │   │   ├── hooks/
│   │	│   │   │   ├── useAuth.js
│   │	│   │   │   ├── useLogin.js 
│   │	│   │   │   ├── useRegister.js 
│   │	│   │   │   ├── useForgotPassword.js 
│   │	│   │   │   ├── useResetPassword.js 
│   │   │   │   │   └── index.js
│   │   │   │   ├── services/
│   │   │   │   │   └── auth.service.js
│   │   │   │   ├── store/
│   │   │   │   │   └── auth.store.js
│   │   │   │   ├── utils/
│   │	│   │   │   ├── authValidation.js 
│   │	│   │   │   ├── authHelpers.js 
│   │	│   │   │   ├── authFormatter.js 
│   │   │   │   │   └── index.js
│   │   │   │   ├── constants/
│   │	│   │   │   ├── authRoles.js 
│   │	│   │   │   ├── authPermission.js 
│   │	│   │   │   ├── authConstants.js 
│   │   │   │   │   └── index.js 
│   │   │   │   ├── router/
│   │   │   │   │   └── auth.store.js
│   │   │   │   ├── styles/
│   │	│   │   │   ├── Login.css 
│   │	│   │   │   ├── Register.css 
│   │	│   │   │   ├── AuthLayout.css 
│   │   │   │   │   └── AuthForm.css
│   │   │   │   └── index.js   
│   │   │   ├── dashboard/
│   │   │   │   ├── pages/
│   │	│   │   │   ├── Dashboard.jsx 
│   │	│   │   │   ├── AdminDashboard.jsx 
│   │	│   │   │   ├── DoctorDashboard.jsx
│   │	│   │   │   ├── PatientDashboard.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── components/
│   │	│   │   │   ├── DashboardHeader.jsx 
│   │	│   │   │   ├── DashboardStats.jsx 
│   │	│   │   │   ├── StatisticCard.jsx
│   │	│   │   │   ├── SummaryCard.jsx
│   │	│   │   │   ├── AppointmentSummary.jsx 
│   │	│   │   │   ├── RecentPatients.jsx 
│   │	│   │   │   ├── RecentAppointments.jsx 
│   │	│   │   │   ├── RecentPresctiption.jsx
│   │	│   │   │   ├── RevenueChart.jsx 
│   │	│   │   │   ├── PatientChart.jsx 
│   │	│   │   │   ├── AppointmentChart.jsx
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
│   │	│   │   ├── pages/
│   │	│   │   │   ├── Patients.jsx                             # Coordinates the pages
│   │	│   │   │   ├── PatientDetails.jsx                       # Patient profile/details
│   │	│   │   │   ├── CreatePatient.jsx                        # Optional
│   │	│   │   │   ├── EditPatient.jsx                          # Optional
│   │   │   │   │   └── index.js
│   │	│   │   ├── components/
│   │	│   │   │   ├── PatientTable.jsx
│   │	│   │   │   ├── PatientModal.jsx
│   │	│   │   │   ├── PatientForm.jsx                              
│   │	│   │   │   ├── PatientCard.jsx
│   │	│   │   │   ├── PatientSearch.jsx
│   │	│   │   │   ├── PatientFilter.jsx
│   │	│   │   │   ├── PatientProfile.jsx
│   │	│   │   │   ├── PatientAvator.jsx
│   │   │   │   │   └── index.js
│   │	│   │   ├── hooks/                                       # Handles business logic and state management and data fetching
│   │	│   │   │   ├── usePatients.js
│   │	│   │   │   ├── usePatient.js 
│   │	│   │   │   ├── usePatientSearch.js
│   │	│   │   │   ├── usePatientForm.js
│   │   │   │   │   └── index.js
│   │	│   │   ├── services/                                    # Handles HTTP Requests using the shared Axios instance
│   │   │   │   │   └── patient.service.js
│   │	│   │   ├── store/                                       # Feature-specific global state
│   │   │   │   │   └── patient.store.js
│   │	│   │   ├── utils/
│   │	│   │   │   ├── patientColumns.js
│   │	│   │   │   ├── patientFormatter.js
│   │	│   │   │   ├── patientHelper.js 
│   │	│   │   │   ├── patientValidation.js
│   │   │   │   │   └── index.js
│   │	│   │   ├── router/                                      # Route definitions for the Patients feature
│   │   │   │   │   └── patient.routes.js
│   │	│   │   ├── styles/             
│   │	│   │   │   ├── Patient.css 
│   │	│   │   │   ├── PatientTable.css 
│   │	│   │   │   ├── PatientForm.css                       
│   │   │   │   │   └── PatientModal.css
│   │   │   │   └── index.js                                     # Barrel file that exports the feature's public API.
│   │   │   ├── doctors/
│   │	│   │   ├── pages/
│   │	│   │   │   ├── Doctors.jsx                              # Doctor list & management
│   │	│   │   │   ├── DoctorDetails.jsx                        # Doctor Profile/details
│   │	│   │   │   ├── CreateDoctor.jsx                         # Create doctor 
│   │	│   │   │   ├── EditDoctor.jsx                           # Update doctor
│   │   │   │   │   └── index.js
│   │	│   │   ├── components/
│   │	│   │   │   ├── DoctorTable.jsx                          # Doctors listing table 
│   │	│   │   │   ├── DoctortModal.jsx                         # Modal wrapper
│   │	│   │   │   ├── DoctorForm.jsx                           # Add/Edit doctor form
│   │	│   │   │   ├── DoctorCard.jsx                           # Doctor profile view 
│   │	│   │   │   ├── DoctorProfile.jsx                        # Dashboard/card dusplay
│   │	│   │   │   ├── DoctorSearch.jsx                         # Search component 
│   │	│   │   │   ├── DoctorFilter.jsx                         # Filter component
│   │	│   │   │   ├── DoctorSchedule.jsx                       # Availability/schedule 
│   │	│   │   │   ├── DoctorSpecialBadge.jsx                   # Specialty display 
│   │   │   │   │   └── index.js
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── useDoctors.js                            # Doctor list & management
│   │	│   │   │   ├── useDoctor.js                             # Single doctor logic
│   │	│   │   │   ├── useDoctorForm.js                         # Form state handling
│   │	│   │   │   ├── useDoctorSearch.js                       # Search logic
│   │   │   │   │   └── index.js
│   │	│   │   ├── services/
│   │	│   │   │   ├── doctor.service.js                        # HTTP requests
│   │   │   │   │   └── index.js
│   │	│   │   ├── store/
│   │	│   │   │   ├── doctor.store.js                          # Optional features state
│   │   │   │   │   └── index.js
│   │	│   │   ├── utils/
│   │	│   │   │   ├── doctorColumns.js                         # Table configuration 
│   │	│   │   │   ├── doctorConstants.js                       # Constants
│   │	│   │   │   ├── doctorValidation.js                      # Form validation
│   │	│   │   │   ├── doctorFormatter.js                       # Data Information
│   │	│   │   │   ├── doctorHelper.js                          # Helper functions
│   │   │   │   │   └── index.js
│   │	│   │   ├── routes/
│   │   │   │   │   └── doctor.routes.js
│   │	│   │   ├── styles/
│   │	│   │   │   ├── Doctor.css 
│   │	│   │   │   ├── DoctorForm.css 
│   │	│   │   │   ├── DoctorTable.css 
│   │   │   │   │   └── DoctorProfile.css 
│   │   │   │   └── index.js
│   │   │   ├── appointments/
│   │	│   │   ├── index.js                                    # Public exports
│   │	│   │   ├── pages/
│   │	│   │   │   ├── Appointment.jsx                         # Appointment list & management 
│   │	│   │   │   ├── AppointmentDetails.jsx                  # Appointment profile/details 
│   │	│   │   │   ├── CreateAppointment.jsx                   # Schedule appointment
│   │	│   │   │   ├── EditAppointment.jsx                     # Update appointment
│   │	│   │   │   ├── Calendar.jsx                            # Calendar scheduling view
│   │   │   │   │   └── index.js
│   │	│   │   ├── components/
│   │	│   │   │   ├── AppointmentTable                        # Appointment list table
│   │	│   │   │   ├── AppointmentForm.jsx                     # Create/Edit form 
│   │	│   │   │   ├── AppointmentModal.jsx                    # Modal wrapper 
│   │	│   │   │   ├── AppointmentProfile.jsx                  # Appointment details display 
│   │	│   │   │   ├── AppointmentCard.jsx                     # Dashboard Card view 
│   │	│   │   │   ├── AppointmentCalendar.jsx                 # Calendar UI 
│   │	│   │   │   ├── AppointmentStatus.jsx                   # Status badge 
│   │	│   │   │   ├── DoctorSelector.jsx                      # Select doctor 
│   │	│   │   │   ├── PatientSelector.jsx                     # Select patient
│   │	│   │   │   ├── TimeSlotSelector.jsx                    # Select availability slot 
│   │	│   │   │   ├── AppointmentFilter.jsx                   # Filter appointments
│   │   │   │   │   └── index.js
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── useAppointment.jsx                      # Appointment list CRUD logic
│   │	│   │   │   ├── useAppointment.js                       # Single appointment logic 
│   │	│   │   │   ├── useAppointmnetForm.jsx                  # Form state handling 
│   │	│   │   │   ├── useAppointmentCalendar.jsx              # Calendar logic 
│   │	│   │   │   ├── useAvailableSlots.jsx                   # Doctor availability logic
│   │   │   │   │   └── index.js
│   │	│   │   ├── services/
│   │	│   │   │   ├── appointment.service.js                  # API requests
│   │   │   │   │   └── index.js
│   │   │   │   ├── utils/
│   │	│   │   │   ├── appointmentColumn.js                    # Table column 
│   │	│   │   │   ├── appointmentConstants.js                 # Status constants
│   │	│   │   │   ├── appointmentValidation.js                # Form validation 
│   │	│   │   │   ├── appointmentFormatter.js                 # Date/time formatting 
│   │	│   │   │   ├── appointmentHelper.js                    # Helper functions
│   │   │   │   │   └── index.js
│   │   │   │   ├── store/
│   │   │   │   │   └── appointment.store.js 
│   │   │   │   └── styles/
│   │	│   │       ├── Appointment.css
│   │	│   │       ├── Appointment.css 
│   │	│   │       ├── AppointmentTable.css
│   │   │   │       └── Calendar.css
│   │   │   │   
│   │   │   ├── prescriptions/
│   │	│   │   ├── index.js                                    # Public exports
│   │	│   │   ├── pages/
│   │	│   │   │   ├── Prescriptions.jsx                        # Prescription list & management 
│   │	│   │   │   ├── PrescriptionDetails.jsx                  # Prescription details/profile 
│   │	│   │   │   ├── CreatePrescription.jsx                   # Create prescription
│   │	│   │   │   ├── EditPrescription.jsx                     # Update prescription
│   │	│   │   │   ├── PrescriptionHistory.jsx                  # Patient prescription history
│   │   │   │   │   └── index.js
│   │	│   │   ├── components/
│   │	│   │   │   ├── PrescriptionTable.jsx                    # Prescription list table 
│   │	│   │   │   ├── PrescriptionForm.jsx                     # Create/Edit form 
│   │	│   │   │   ├── PrescriptionModal.jsx                    # Modal wrapper 
│   │	│   │   │   ├── PrescriptionProfile.jsx                  # Prescription details view 
│   │	│   │   │   ├── PrescriptionCard.jsx                     # Summary card 
│   │	│   │   │   ├── MedicineSelector.jsx                     # Select medicines
│   │	│   │   │   ├── MedicineList.jsx                         # Select Medicine List
│   │	│   │   │   ├── DosageInput.jsx                          # Dosage configuration
│   │	│   │   │   ├── FrequencySelector.jsx                    # Medicine frequency 
│   │	│   │   │   ├── DurationInput.jsx                        # Treament duration 
│   │	│   │   │   ├── PrescriptionPrint.jsx                    # Printable prescription 
│   │	│   │   │   ├── PrescriptionStatus.jsx                   # Status badge 
│   │	│   │   │   ├── PrescriptionFilter.jsx                   # Search/filter
│   │   │   │   │   └── index.js
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── usePrescriptions.js                      # Prescription list CRUD logic 
│   │	│   │   │   ├── usePrescription.js                       # Single prescription logic 
│   │	│   │   │   ├── usePrescriptionForm.js                   # Form state management
│   │	│   │   │   ├── usePrescriptionMedicine.js               # Medicine items management
│   │	│   │   │   ├── usePrescriptionPrint                     # Print/export logic
│   │   │   │   │   └── index.js
│   │	│   │   ├── services/
│   │	│   │   │   ├── prescription.service.js                  # API requests
│   │   │   │   │   └── index.js
│   │   │   │   ├── utils/
│   │	│   │   │   ├── prescriptionColumns.js                   # Table configuration 
│   │	│   │   │   ├── prescriptConstants.js                    # Status constants 
│   │	│   │   │   ├── prescriptionValidation.js                # Form validation 
│   │	│   │   │   ├── prescriptionFormatter.js                 # Medicine items manaement 
│   │	│   │   │   ├── usePrescriptionHelper.js                 # Utility functions
│   │   │   │   │   └── index.js
│   │   │   │   ├── store/
│   │   │   │   │   └── prescription.store.js
│   │   │   │   └── styles/
│   │	│   │       ├── Prescription.css 
│   │	│   │       ├── PrescriptionForm.css 
│   │	│   │       ├── PrescriptionTable.css 
│   │   │   │       └── PrescriptionPrint.css
│   │   │   │   
│   │   │   ├── pharmacy/
│   │	│   │   ├── index.js                                     # Public exports
│   │	│   │   ├── pages/
│   │	│   │   │   ├── Pharmacy.jsx                             # Pharmacy dashboard 
│   │	│   │   │   ├── Medicines.jsx                            # Medicine inventory management 
│   │	│   │   │   ├── MedicineDetails.jsx                      # Medicine details 
│   │	│   │   │   ├── CreateMedicine.jsx                       # Add medicine 
│   │	│   │   │   ├── EditMedicine.jsx                         # Update medicine 
│   │	│   │   │   ├── Inventory.jsx                            # Stock management 
│   │	│   │   │   ├── StockMovement.jsx                        # Dispense prescription medicines 
│   │	│   │   │   ├── Suppliers.jsx                            # Supplier management 
│   │	│   │   │   ├── SupplierDetails.jsx                      # Supplier profile   
│   │   │   │   │   └── index.js
│   │	│   │   ├── components/
│   │	│   │   │   ├── MedicineTable.jsx                        # Medicine listing table 
│   │	│   │   │   ├── MedicineForm.jsx                         # Add/Edit medicine form 
│   │	│   │   │   ├── MedicineModal.jsx                        # Medicine modal wrapper  
│   │	│   │   │   ├── MedicineProfile.jsx                      # Medicine details view
│   │	│   │   │   ├── MedicineCard.jsx                         # Medicine summary card 
│   │	│   │   │   ├── InventoryTable.jsx                       # Stock table 
│   │	│   │   │   ├── StockAdjustmentForm.jsx                  # Increase/decrease stock 
│   │	│   │   │   ├── StockStatus.jsx                          # Stock status badge
│   │	│   │   │   ├── ExpiryAlert.jsx                          # Expiry warning 
│   │	│   │   │   ├── CategorySelector.jsx                     # Medicine category selector 
│   │	│   │   │   ├── SupplierSelector.jsx                     # Supplier selector 
│   │	│   │   │   ├── PrescriptionDispense.jsx                 # Dispensing components
│   │	│   │   │   ├── DispenseTable.jsx                        # Dispensing list 
│   │	│   │   │   ├── PharmacyDashboardCard.jsx                # Dashboard widgets 
│   │	│   │   │   ├── PharmacyFilter.jsx                       # Search/filter 
│   │   │   │   │   └── index.js
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── usePharmacy.js                           # Pharmacy dashboard logic 
│   │	│   │   │   ├── useMedicines.js                          # Medicine list CRUD logic 
│   │	│   │   │   ├── useMedicine.jsx                          # Single medicine logic 
│   │	│   │   │   ├── useInventory.js                          # Stock management logic
│   │	│   │   │   ├── useStockMovement.jsx                     # Stock history logic 
│   │	│   │   │   ├── useSuppliers.js                          # Supplier CRUD logic 
│   │	│   │   │   ├── useSupplier.js                           # Single supplier logic 
│   │	│   │   │   ├── useDispensing.js                         # Prescription dispensing logic 
│   │   │   │   │   └── index.js
│   │	│   │   ├── services/
│   │	│   │   │   ├── pharmacy.service.js                      # API requests 
│   │	│   │   │   ├── medicine.service.js                      # Medicine API requests
│   │	│   │   │   ├── inventory.service.js                     # Inventory API requests 
│   │	│   │   │   ├── supplier.service.js                      # Supplier API requests 
│   │   │   │   │   └── index.js
│   │   │   │   ├── utils/
│   │	│   │   │   ├── medicineColumns.js                       # Medicine table columns 
│   │	│   │   │   ├── inventoryColumns.js                      # Inventory table columns
│   │	│   │   │   ├── pharmacyConstants.js                     # Status constants 
│   │	│   │   │   ├── medicineValidation.js                    # Medicine validation 
│   │	│   │   │   ├── inventoryValidation.js                   # Stock validation 
│   │	│   │   │   ├── pharmacyFormatter.js                     # Date/currency formatter 
│   │	│   │   │   ├── pharmacyHelper.js                        # Helper functions
│   │   │   │   │   └── index.js
│   │   │   │   ├── store/
│   │   │   │   │   └── pharmacy.store.js 
│   │   │   │   └── styles/
│   │	│   │       ├── Pharmacy.css
│   │	│   │       ├── Medicine.css 
│   │	│   │       ├── Inventory.css 
│   │   │   │       └── Dispensing.css 
│   │   │   │   
│   │   │   ├── laboratory/
│   │	│   │   ├── index.js                                     # Public exports
│   │	│   │   ├── pages/
│   │	│   │   │   ├── Laboratory.jsx                           # Laboratory dashboard 
│   │	│   │   │   ├── LabTests.jsx                             # Test catalog management
│   │	│   │   │   ├── LabTestDetails.jsx                       # Test information
│   │	│   │   │   ├── CreateLabTest.jsx                        # Add new test type
│   │	│   │   │   ├── EditLabTest.jsx                          # Update test information
│   │	│   │   │   ├── LabOrders.jsx                            # Lab order management
│   │	│   │   │   ├── LabOrderDetails.jsx                      # Order details
│   │	│   │   │   ├── CreateLabOrder.jsx                       # Create lab request
│   │	│   │   │   ├── EditLabOrder.jsx                         # Update lab order
│   │	│   │   │   ├── SampleCollection.jsx                     # Sample tracking
│   │	│   │   │   ├── ResultEntry.jsx                          # Enter test results
│   │	│   │   │   ├── LabReports.jsx                           # Generated reports
│   │	│   │   │   ├── PatientLabHistory.jsx                    # Patient test history
│   │   │   │   │   └── index.js
│   │	│   │   ├── components/
│   │	│   │   │   ├── LabTestTable.jsx                         # Test catalog table
│   │	│   │   │   ├── LabTestForm.jsx                          # Create/edit test form
│   │	│   │   │   ├── LabTestModal.jsx                         # Modal wrapper
│   │	│   │   │   ├── LabTestProfile.jsx                       # Test details
│   │	│   │   │   │
│   │	│   │   │   ├── LabOrderTable.jsx                        # Lab order list
│   │	│   │   │   ├── LabOrderForm.jsx                         # Create/edit order
│   │	│   │   │   ├── LabOrderModal.jsx                        # Order modal
│   │	│   │   │   ├── LabOrderProfile.jsx                      # Order details
│   │	│   │   │   │
│   │	│   │   │   ├── TestSelector.jsx                         # Select laboratory tests
│   │	│   │   │   ├── PatientSelector.jsx                      # Select patient
│   │	│   │   │   ├── DoctorSelector.jsx                       # Select requesting doctor
│   │	│   │   │   ├── SampleStatus.jsx                         # Sample status badge
│   │	│   │   │   ├── ResultForm.jsx                           # Enter results
│   │	│   │   │   ├── ResultTable.jsx                          # Results display
│   │	│   │   │   ├── ReportViewer.jsx                         # View lab reports
│   │	│   │   │   ├── ReportPrint.jsx                          # Print/export report
│   │	│   │   │   ├── LabDashboardCard.jsx                     # Dashboard widgets
│   │	│   │   │   ├── LabFilter.jsx                            # Search/filter
│   │   │   │   │   └── index.js
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── useLaboratory.js                         # Laboratory dashboard logic
│   │	│   │   │   ├── useLabTests.js                           # Lab test CRUD logic
│   │	│   │   │   ├── useLabTest.js                            # Single test logic
│   │	│   │   │   ├── useLabOrders.js                          # Lab order list logic
│   │	│   │   │   ├── useLabOrder.js                           # Single order logic
│   │	│   │   │   ├── useLabResult.js                          # Result entry/update logic
│   │	│   │   │   ├── useSampleCollection.js                   # Sample tracking logic
│   │	│   │   │   ├── useLabReports.js                         # Report generation logic
│   │   │   │   │   └── index.js
│   │	│   │   ├── services/
│   │	│   │   │   ├── laboratory.service.js                    # Laboratory API requests
│   │	│   │   │   ├── labTest.service.js                       # Test API requests
│   │	│   │   │   ├── labOrder.service.js                      # Order API requests
│   │	│   │   │   ├── labResult.service.js                     # Results API requests
│   │	│   │   │   ├── labReport.service.js                     # Report API requests
│   │   │   │   │   └── index.js
│   │   │   │   ├── utils/
│   │	│   │   │   ├── labTestColumns.js                        # Test table columns
│   │	│   │   │   ├── labOrderColumns.js                       # Order table columns
│   │	│   │   │   ├── laboratoryConstants.js                   # Status constants
│   │	│   │   │   ├── laboratoryValidation.js                  # Form validation
│   │	│   │   │   ├── laboratoryFormatter.js                   # Date formatting
│   │	│   │   │   ├── resultFormatter.js                       # Result formatting
│   │	│   │   │   ├── laboratoryHelper.js                      # Helper functions
│   │   │   │   │   └── index.js
│   │   │   │   ├── store/
│   │   │   │   │   └── laboratory.store.js
│   │   │   │   └── styles/
│   │	│   │       ├── Laboratory.css
│   │	│   │       ├── LabOrder.css
│   │	│   │       ├── LabResult.css
│   │   │   │       └── LabReport.css
│   │   │   │   
│   │   │   ├── billing/
│   │	│   │   ├── index.js                              # Public exports
│   │	│   │   ├── pages/
│   │	│   │   │   ├── Billing.jsx                       # Billing dashboard
│   │	│   │   │   ├── Invoices.jsx                      # Invoice management
│   │	│   │   │   ├── InvoiceDetails.jsx                # Invoice details/profile
│   │	│   │   │   ├── CreateInvoice.jsx                 # Generate invoice
│   │	│   │   │   ├── EditInvoice.jsx                   # Update invoice
│   │	│   │   │   ├── Payments.jsx                      # Payment management
│   │	│   │   │   ├── PaymentDetails.jsx                # Payment details
│   │	│   │   │   ├── Transactions.jsx                  # Transaction history
│   │	│   │   │   ├── Refunds.jsx                       # Refund management
│   │	│   │   │   ├── InsuranceClaims.jsx               # Insurance claim handling
│   │	│   │   │   ├── BillingReports.jsx                # Revenue reports
│   │   │   │   │   └── index.js
│   │	│   │   ├── components/
│   │	│   │   │   ├── InvoiceTable.jsx                  # Invoice listing table
│   │	│   │   │   ├── InvoiceForm.jsx                   # Create/edit invoice form
│   │	│   │   │   ├── InvoiceModal.jsx                  # Invoice modal wrapper
│   │	│   │   │   ├── InvoiceProfile.jsx                # Invoice details display
│   │	│   │   │   ├── InvoiceCard.jsx                   # Invoice summary card
│   │	│   │   │   │
│   │	│   │   │   ├── PaymentTable.jsx                  # Payment list table
│   │	│   │   │   ├── PaymentForm.jsx                   # Payment entry form
│   │	│   │   │   ├── PaymentModal.jsx                  # Payment modal
│   │	│   │   │   ├── PaymentStatus.jsx                 # Payment status badge
│   │	│   │   │   │
│   │	│   │   │   ├── BillingSummary.jsx                # Billing dashboard summary
│   │	│   │   │   ├── BillingChart.jsx                  # Revenue charts
│   │	│   │   │   ├── ServiceItemTable.jsx              # Invoice line items
│   │	│   │   │   ├── DiscountInput.jsx                 # Discount handling
│   │	│   │   │   ├── TaxCalculator.jsx                 # Tax calculation
│   │	│   │   │   ├── InsuranceSelector.jsx             # Insurance selection
│   │	│   │   │   ├── PaymentMethodSelector.jsx         # Payment method selector
│   │	│   │   │   ├── ReceiptPrint.jsx                  # Receipt printing
│   │	│   │   │   ├── InvoicePrint.jsx                  # Invoice printing
│   │	│   │   │   ├── BillingFilter.jsx                 # Search/filter
│   │   │   │   │   └── index.js
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── useBilling.js                     # Billing dashboard logic
│   │	│   │   │   ├── useInvoices.js                    # Invoice list CRUD logic
│   │	│   │   │   ├── useInvoice.js                     # Single invoice logic
│   │	│   │   │   ├── usePayments.js                    # Payment management logic
│   │	│   │   │   ├── usePayment.js                     # Single payment logic
│   │	│   │   │   ├── useTransactions.js                # Transaction history logic
│   │	│   │   │   ├── useRefunds.js                     # Refund processing logic
│   │	│   │   │   ├── useInsuranceClaims.js             # Insurance logic
│   │   │   │   │   └── index.js
│   │	│   │   ├── services/
│   │	│   │   │   ├── billing.service.js                # Billing API requests
│   │	│   │   │   ├── invoice.service.js                # Invoice API requests
│   │	│   │   │   ├── payment.service.js                # Payment API requests
│   │	│   │   │   ├── transaction.service.js            # Transaction API requests
│   │	│   │   │   ├── refund.service.js                 # Refund API requests
│   │	│   │   │   ├── insurance.service.js              # Insurance API requests
│   │   │   │   │   └── index.js
│   │   │   │   ├── utils/
│   │	│   │   │   ├── invoiceColumns.js                 # Invoice table columns
│   │	│   │   │   ├── paymentColumns.js                 # Payment table columns
│   │	│   │   │   ├── billingConstants.js               # Billing constants/status
│   │	│   │   │   ├── billingValidation.js              # Form validation
│   │	│   │   │   ├── billingFormatter.js               # Currency/date formatting
│   │	│   │   │   ├── invoiceCalculator.js              # Amount calculations
│   │	│   │   │   ├── receiptFormatter.js               # Receipt formatting
│   │	│   │   │   ├── billingHelper.js                  # Helper functions
│   │   │   │   │   └── index.js
│   │   │   │   ├── store/
│   │   │   │   │   └── billing.store.js
│   │   │   │   └── styles/
│   │	│   │       ├── Billing.css
│   │	│   │       ├── Invoice.css
│   │	│   │       ├── Payment.css
│   │   │   │       └── Receipt.css
│   │   │   │   
│   │   │   ├── notifications/
│   │	│   │   ├── index.js                              # Public exports
│   │	│   │   ├── pages/
│   │	│   │   │   ├── Notifications.jsx               # Notification dashboard
│   │	│   │   │   ├── NotificationDetails.jsx         # Notification details
│   │	│   │   │   ├── CreateNotification.jsx          # Create notification
│   │	│   │   │   ├── EditNotification.jsx            # Edit notification
│   │	│   │   │   ├── NotificationTemplates.jsx       # Template management
│   │	│   │   │   ├── NotificationHistory.jsx         # Delivery history
│   │	│   │   │   ├── NotificationSettings.jsx        # User preferences
│   │   │   │   │   └── index.js
│   │	│   │   ├── components/
│   │	│   │   │   ├── NotificationTable.jsx
│   │	│   │   │   ├── NotificationForm.jsx
│   │	│   │   │   ├── NotificationModal.jsx
│   │	│   │   │   ├── NotificationProfile.jsx
│   │	│   │   │   ├── NotificationCard.jsx
│   │	│   │   │   ├── NotificationBadge.jsx
│   │	│   │   │   ├── NotificationFilter.jsx
│   │	│   │   │   ├── NotificationTemplateForm.jsx
│   │	│   │   │   ├── NotificationTemplateTable.jsx
│   │	│   │   │   ├── NotificationSettingsForm.jsx
│   │	│   │   │   ├── NotificationHistoryTable.jsx
│   │	│   │   │   ├── EmailPreview.jsx
│   │	│   │   │   ├── SmsPreview.jsx
│   │	│   │   │   ├── PushPreview.jsx
│   │   │   │   │   └── index.js
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── useNotifications.js             # Notification list CRUD
│   │	│   │   │   ├── useNotification.js              # Single notification
│   │	│   │   │   ├── useNotificationTemplates.js
│   │	│   │   │   ├── useNotificationHistory.js
│   │	│   │   │   ├── useNotificationSettings.js
│   │	│   │   │   ├── useUnreadNotifications.js
│   │   │   │   │   └── index.js
│   │	│   │   ├── services/
│   │	│   │   │   ├── notification.service.js
│   │	│   │   │   ├── template.service.js
│   │	│   │   │   ├── email.service.js
│   │	│   │   │   ├── sms.service.js
│   │	│   │   │   ├── push.service.js
│   │   │   │   │   └── index.js
│   │	│   │   ├── utils/
│   │	│   │   │   ├── notificationColumns.js
│   │	│   │   │   ├── notificationConstants.js
│   │	│   │   │   ├── notificationValidation.js
│   │	│   │   │   ├── notificationFormatter.js
│   │	│   │   │   ├── notificationHelper.js
│   │   │   │   │   └── index.js
│   │   │   │   └── styles/
│   │	│   │       ├── Notification.css
│   │	│   │       ├── NotificationTable.css
│   │	│   │       ├── NotificationForm.css
│   │   │   │       └── NotificationSettings.css
│   │   │   ├── reports/
│   │	│   │   ├── index.js                              # Public exports
│   │	│   │   ├── pages/
│   │	│   │   │   ├── Reports.jsx                    # Reports dashboard
│   │	│   │   │   ├── DashboardReports.jsx           # Executive dashboard
│   │	│   │   │   ├── PatientReports.jsx             # Patient analytics
│   │	│   │   │   ├── DoctorReports.jsx              # Doctor analytics
│   │	│   │   │   ├── AppointmentReports.jsx         # Appointment reports
│   │	│   │   │   ├── PrescriptionReports.jsx        # Prescription reports
│   │	│   │   │   ├── PharmacyReports.jsx            # Pharmacy reports
│   │	│   │   │   ├── LaboratoryReports.jsx          # Laboratory reports
│   │	│   │   │   ├── BillingReports.jsx             # Financial reports
│   │	│   │   │   ├── RevenueReports.jsx             # Revenue analytics
│   │	│   │   │   ├── AuditReports.jsx               # System audit reports
│   │   │   │   │   └── index.js
│   │	│   │   ├── components/
│   │	│   │   │   ├── ReportTable.jsx
│   │	│   │   │   ├── ReportCard.jsx
│   │	│   │   │   ├── ReportChart.jsx
│   │	│   │   │   ├── ReportFilter.jsx
│   │	│   │   │   ├── ReportSummary.jsx
│   │	│   │   │   ├── ReportStatistics.jsx
│   │	│   │   │   ├── DateRangePicker.jsx
│   │	│   │   │   ├── ExportButton.jsx
│   │	│   │   │   ├── ReportToolbar.jsx
│   │	│   │   │   ├── KPIWidget.jsx
│   │	│   │   │   ├── RevenueChart.jsx
│   │	│   │   │   ├── PatientChart.jsx
│   │	│   │   │   ├── AppointmentChart.jsx
│   │	│   │   │   ├── DoctorChart.jsx
│   │	│   │   │   ├── BillingChart.jsx
│   │	│   │   │   ├── LaboratoryChart.jsx
│   │	│   │   │   ├── PharmacyChart.jsx
│   │	│   │   │   ├── DashboardCards.jsx
│   │   │   │   │   └── index.js
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── useReports.js                  # Reports dashboard
│   │	│   │   │   ├── usePatientReports.js
│   │	│   │   │   ├── useDoctorReports.js
│   │	│   │   │   ├── useAppointmentReports.js
│   │	│   │   │   ├── usePrescriptionReports.js
│   │	│   │   │   ├── usePharmacyReports.js
│   │	│   │   │   ├── useLaboratoryReports.js
│   │	│   │   │   ├── useBillingReports.js
│   │	│   │   │   ├── useRevenueReports.js
│   │	│   │   │   ├── useExportReport.js
│   │   │   │   │   └── index.js
│   │	│   │   ├── services/
│   │	│   │   │   ├── report.service.js
│   │	│   │   │   ├── dashboard.service.js
│   │	│   │   │   ├── analytics.service.js
│   │	│   │   │   ├── export.service.js
│   │   │   │   │   └── index.js
│   │	│   │   ├── utils/
│   │	│   │   │   ├── reportConstants.js
│   │	│   │   │   ├── reportFormatter.js
│   │	│   │   │   ├── reportHelper.js
│   │	│   │   │   ├── chartOptions.js
│   │	│   │   │   ├── exportHelper.js
│   │	│   │   │   ├── reportValidation.js
│   │   │   │   │   └── index.js
│   │   │   │   └── styles/
│   │	│   │       ├── Reports.css
│   │	│   │       ├── Dashboard.css
│   │	│   │       ├── Charts.css
│   │   │   │       └── Export.css
│   │   │   ├── settings/
│   │	│   │   ├── index.js                              # Public exports
│   │	│   │   ├── pages/
│   │	│   │   │   ├── Settings.jsx                     # Settings dashboard
│   │	│   │   │   ├── ProfileSettings.jsx              # User profile
│   │	│   │   │   ├── AccountSettings.jsx              # Account settings
│   │	│   │   │   ├── SecuritySettings.jsx             # Password, 2FA
│   │	│   │   │   ├── RoleManagement.jsx               # Roles
│   │	│   │   │   ├── PermissionManagement.jsx         # Permissions
│   │	│   │   │   ├── UserManagement.jsx               # Users
│   │	│   │   │   ├── DepartmentManagement.jsx         # Departments
│   │	│   │   │   ├── NotificationSettings.jsx         # Notification preferences
│   │	│   │   │   ├── SystemSettings.jsx               # Global system settings
│   │	│   │   │   ├── IntegrationSettings.jsx          # Email, SMS, APIs
│   │	│   │   │   ├── DatabaseSettings.jsx             # Database configuration
│   │	│   │   │   ├── BackupRestore.jsx                # Backup & restore
│   │	│   │   │   ├── AuditLogs.jsx                    # Audit logs
│   │	│   │   │   ├── AppearanceSettings.jsx           # Theme, language
│   │   │   │   │   └── index.js
│   │	│   │   ├── components/
│   │	│   │   │   ├── SettingsCard.jsx
│   │	│   │   │   ├── SettingsMenu.jsx
│   │	│   │   │   ├── SettingsSection.jsx
│   │	│   │   │   ├── ProfileForm.jsx
│   │	│   │   │   ├── AccountForm.jsx
│   │	│   │   │   ├── PasswordForm.jsx
│   │	│   │   │   ├── SecurityForm.jsx
│   │	│   │   │   ├── UserTable.jsx
│   │	│   │   │   ├── UserForm.jsx
│   │	│   │   │   ├── RoleTable.jsx
│   │	│   │   │   ├── RoleForm.jsx
│   │	│   │   │   ├── PermissionTable.jsx
│   │	│   │   │   ├── PermissionForm.jsx
│   │	│   │   │   ├── DepartmentTable.jsx
│   │	│   │   │   ├── DepartmentForm.jsx
│   │	│   │   │   ├── NotificationSettingsForm.jsx
│   │	│   │   │   ├── SystemSettingsForm.jsx
│   │	│   │   │   ├── IntegrationForm.jsx
│   │	│   │   │   ├── BackupTable.jsx
│   │	│   │   │   ├── BackupForm.jsx
│   │	│   │   │   ├── AuditLogTable.jsx
│   │	│   │   │   ├── ThemeSelector.jsx
│   │	│   │   │   ├── LanguageSelector.jsx 
│   │   │   │   │   └── index.js
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── useSettings.js
│   │	│   │   │   ├── useProfileSettings.js
│   │	│   │   │   ├── useAccountSettings.js
│   │	│   │   │   ├── useSecuritySettings.js
│   │	│   │   │   ├── useUsers.js
│   │	│   │   │   ├── useRoles.js
│   │	│   │   │   ├── usePermissions.js
│   │	│   │   │   ├── useDepartments.js
│   │	│   │   │   ├── useSystemSettings.js
│   │	│   │   │   ├── useNotificationSettings.js
│   │	│   │   │   ├── useAuditLogs.js
│   │	│   │   │   ├── useBackups.js
│   │   │   │   │   └── index.js
│   │	│   │   ├── services/
│   │	│   │   │   ├── settings.service.js
│   │	│   │   │   ├── profile.service.js
│   │	│   │   │   ├── user.service.js
│   │	│   │   │   ├── role.service.js
│   │	│   │   │   ├── permission.service.js
│   │	│   │   │   ├── department.service.js
│   │	│   │   │   ├── security.service.js
│   │	│   │   │   ├── notification.service.js
│   │	│   │   │   ├── backup.service.js
│   │	│   │   │   ├── audit.service.js
│   │	│   │   │   ├── integration.service.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── utils/
│   │	│   │   │   ├── settingsConstants.js
│   │	│   │   │   ├── settingsValidation.js
│   │	│   │   │   ├── settingsFormatter.js
│   │	│   │   │   ├── permissionHelper.js
│   │	│   │   │   ├── roleHelper.js
│   │	│   │   │   ├── themeHelper.js
│   │	│   │   │   ├── languageHelper.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── store/
│   │   │   │   │   └── 
│   │   │   │   └── styles/
│   │	│   │       ├── Settings.css
│   │	│   │       ├── Profile.css
│   │	│   │       ├── Security.css
│   │	│   │       ├── Roles.css
│   │	│   │       ├── Users.css
│   │   │   │       └── System.css
│   │   │   └── errors/
│   │	│       ├── 401.html
│   │	│       ├── 403.html
│   │	│       ├── 404.html
│   │   │       └── 500.html
│   │   ├── services/                                         # API Layer 
│   │   │   ├── api.js   
│   │   │   ├── axios.js 
│   │   │   ├── interceptors.js           
│   │   │   └── modules/
│   │	│       ├── auth.service.js
│   │	│       ├── patient.service.js
│   │	│       ├── doctor.service.js
│   │	│       ├── appointment.service.js
│   │	│       ├── prescription.service.js
│   │	│       ├── pharmacy.service.js
│   │	│       ├── laboratory.service.js
│   │	│       ├── billing.service.js
│   │	│       ├── report.service.js 
│   │   │       └── notification.service.js
│   │   ├── state/
│   │   │   ├── auth.store.js   
│   │   │   ├── dashboard.store.js  
│   │   │   ├── patient.store.js
│   │   │   ├── doctor.store.js   
│   │   │   ├── appointment.store.js 
│   │   │   ├── billing.store.js 
│   │   │   └── laboratory.store.js
│   │   ├── hooks/
│   │   │   ├── useAuth.js  
│   │   │   ├── useApi.js   
│   │   │   └── usePermission.js
│   │   ├── guards/
│   │   │   ├── auth.guard.js   
│   │   │   └── role.guard.js
│   │   ├── router/
│   │   ├── utils/    
│   │   │   ├── constants.js              
│   │   │   ├── validations.js   
│   │   │   ├── helpers.js  
│   │   │   ├── storage.js   
│   │   │   ├── date.js
│   │   │   ├── formatter.js
│   │   │   └── permission.js
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
│   │   ├── api/
│   │   │   ├── router.py                      # Register API versions
│   │   │   └── v1/                            # API Router
│   │	│       ├── auth.py                    
│   │	│       ├── dashboard.py
│   │	│       ├── patients.py
│   │	│       ├── doctors.py
│   │	│       ├── appointments.py
│   │	│       ├── prescriptions.py
│   │	│       ├── pharmacy.py
│   │	│       ├── laboratory.py
│   │	│       ├── billing.py
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
│   │   │   ├── laboratory_service.py
│   │   │   ├── billing_service.py
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
│   │   │   ├── user_repository.py
│   │   │   ├── patient_repository.py 
│   │   │   ├── doctor_repository.py
│   │   │   ├── appointment_repository.py
│   │   │   ├── prescription_repository.py
│   │   │   ├── pharmacy_repository.py
│   │   │   ├── laboratory_repository.py
│   │   │   ├── billing_repository.py
│   │   │   ├── notification_repository.py
│   │   │   └── report_repository.py 
│   │   │
│   │   ├── models/                            # SQLAlchemy Model
│   │   │   ├── __init__.py
│   │   │   ├── base.py
│   │   │   ├── user.py
│   │   │   ├── role.py
│   │   │   ├── permission.py
│   │   │   ├── patient.py
│   │   │   ├── doctor.py
│   │   │   ├── appointment.py
│   │   │   ├── prescription.py
│   │   │   ├── pharmacy.py
│   │   │   ├── laboratory.py
│   │   │   ├── billing.py 
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



    








