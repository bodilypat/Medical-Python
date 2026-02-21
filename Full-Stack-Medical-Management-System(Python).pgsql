Full-Stack-Medical-Management System-Directory-Structure
backend/
├── app/
│   ├── main.py    
│   ├── core/                        # Core system configuration
│   │   ├── config.py
│   │   ├── security.py
│   │   ├── database.py
│   │   ├── redis.py
│   │   ├── logging.py
│   │   ├── middleware.py
│   │   └── exceptions.py
│   ├── api/
│   │   ├── deps.py
│   │   └── v1/
│   │       ├── api.py
│   │       └── endpoints/
│   │           ├── auth.py
│   │           ├── users.py
│   │           ├── patients.py
│   │           ├── doctors.py
│   │           ├── appointments.py
│   │           ├── medical_records.py
│   │           ├── billing.py
│   │           ├── pharmacy.py
│   │           ├── labTest.py
│   │           └── reports.py
│   │     
│   ├── models/
│   │   ├── base.py
│   │   ├── user.py
│   │   ├── role.py
│   │   ├── permission.py
│   │   ├── audit_log.py
│   │   ├── patient.py
│   │   ├── doctor.py
│   │   ├── appointment.py
│   │   ├── medical_record.py
│   │   ├── billing.py
│   │   ├── insurance.py
│   │   └── inventory.py
│   ├── schemas/
│   │   ├── base.py
│   │   ├── user.py
│   │   ├── role.py
│   │   ├── permission.py
│   │   ├── audit_log.py
│   │   ├── patient.py
│   │   ├── doctor.py
│   │   ├── appointment.py
│   │   ├── medical_record.py
│   │   ├── billing.py
│   │   ├── insurance.py
│   │   └── inventory.py
│   ├── services/
│   │   ├── auth_service.py
│   │   ├── patient_service.py
│   │   ├── appointment_service.py
│   │   ├── billing_service.py
│   │   ├── inventory_service.py
│   │   └── audit_service.py
│   ├── workers/                                  # Background tasks
│   │   ├── celery_app.py
│   │   ├── email_tasks.py
│   │   └── reminder_tasks.py
│   │
│   └── utils/
│       ├── encryption.py
│       ├── validators.py
│       └── helpers.py
├── alembic/
├── tests/
├── docker-compose.yml
├── Dockerfile
├── nginx/
│   └── nginx.conf                                                          
│
├── frontend(medical-management-system)    
│   │ 
│   ├── public 
│   │   ├── index.html
│   │   ├── login.html
│   │   ├── dashboard.html
│   │   ├── patient.html
│   │   ├── doctors.html
│   │   └── appointment.html                # Main HTML Template
│   ├── src/                        
│   │   ├── components/                
│   │   │   ├── Header.js          
│   │   │   ├── Sidebar.js   
│   │   │   ├── Footer.js      
│   │   │   ├── Notification.js 
│   │   │   ├── card/
│   │   │   │   ├── Card.js
│   │   │   │   ├── Card.css
│   │   │   │   └── index.js
│   │   │   ├── table/
│   │   │   │   ├── Table.js
│   │   │   │   ├── Table.css
│   │   │   │   └── index.js
│   │   │   ├── modal/
│   │   │   │   ├── Modal.js
│   │   │   │   ├── Modal.css
│   │   │   │   └── index.js
│   │   │   └── Loader.js
│   │   ├── pages/      
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── auth.css
│   │   │   │   └── index.js          
│   │   │   ├── dashbord/
│   │   │   │   ├── Dashbord.jsx
│   │   │   │   ├── Dashboard.css
│   │   │   │   └── index.js
│   │   │   ├── patients/
│   │   │   │   ├── Patients.jsx
│   │   │   │   ├── Patients.css
│   │   │   │   └── index.js  
│   │   │   ├── doctors/   
│   │   │   │   ├── Doctors.jsx
│   │   │   │   ├── Doctor.css
│   │   │   │   └── index.js 
│   │   │   ├── appointment/
│   │   │   │   ├── Appointment.jsx
│   │   │   │   ├── Appointment.css
│   │   │   │   └── index.js
│   │   │   ├── billing/   
│   │   │   │   ├── Billing.js
│   │   │   │   ├── billing.css
│   │   │   │   └── index.js    
│   │   │   └── pharmacy/
│   │   │       ├── Pharmarcy.jsx
│   │   │       ├── Pharmarcy.css
│   │   │       └── index.js
│   │   ├── services/                
│   │   │   ├── api.js         
│   │   │   ├── patientsService.js   
│   │   │   ├── doctorsService.js
│   │   │   ├── appointmentsService.js
│   │   │   ├── billingService.js
│   │   │   └── pharmacyService.js
│   │   ├── context/                
│   │   │   ├── AuthContext.jsx        
│   │   │   ├── 
│   │   │   ├── 
│   │   │   └── 
│   │   ├── App.js     
│   │   ├── index.js
│   │   └── styles/
│   │       ├── main.css
│   │       └── components.css
│   │ 
│   ├── utils/                                # Utility scripts/helpers
│   │   ├── form-validation.js
│   │   └── date-utils.js 
│   └── store/                                # (optional) Shared data/state (local/session/user)
│       └── session.js 
│    
├── README.md 
└── LICENSE                    

