/* ********************************************************** */
/* File: src/features/patients/components/PatientProfile.jsx  */
/* ********************************************************** */

/* patient object
    id,
    first_name,
    last_name,
    gender,
    date_of_birth,
    email,
    phone,
    blood_group,
    allergies
    medical_history,
    emergency_contact,
    avator
 */
import { formatDate } from "../../../utils/date";

const EMPTY_VALUE = "-";

const sections = [
    {
        title: "Personal Information",
        fields: [
            { label: "First Name", key: "first_name" },
            { label: "Last Name", key: "last_name" },
            { label: "Gender", key: "gender" },
            {
                label: "Date of Birth",
                key: "date_of_birth",
                formatter: formatDate,
            },
            { label: "Blood Group", key: "blood_group" },
        ],
    },
    {
        title: "Contact Information",
        fields: [
            { label: "Email", key: "email" },
            { label: "Phone", key: "phone" },
            {
                label: "Address",
                key: "address",
                fullWidth: true,
            },
        ],
    },
    {
        title: "Medical Information",
        fields: [
            { label: "Allergies", key: "allergies" },
            { label: "Medical History", key: "medical_history" },
            { label: "Emergency Contact", key: "emergency_contact" },
        ],
    },
    {
        title: "System Information",
        fields: [
            {
                label: "Created At",
                key: "created_at",
                formatter: formatDate,
            },
            {
                label: "Updated At",
                key: "updated_at",
                formatter: formatDate,
            },
        ],
    },
];

const PatientProfile = ({ patient }) => {
    if (!patient) return null;

    return (
        <div className="patient-profile">
            <header className="profile-header">
                <h2>
                    {patient.first_name} {patient.last_name}
                </h2>

                <span className="patient-id">
                    Patient ID: {patient.id}
                </span>
            </header>

            {sections.map(({ title, fields }) => (
                <section
                    key={title}
                    className="profile-section"
                >
                    <h3>{title}</h3>

                    <dl className="profile-grid">
                        {fields.map(
                            ({
                                label,
                                key,
                                formatter,
                                fullWidth,
                            }) => {
                                const value = patient[key];

                                return (
                                    <div
                                        key={key}
                                        className={`profile-item ${
                                            fullWidth
                                                ? "profile-item-full"
                                                : ""
                                        }`}
                                    >
                                        <dt>{label}</dt>

                                        <dd>
                                            {formatter
                                                ? formatter(value)
                                                : value || EMPTY_VALUE}
                                        </dd>
                                    </div>
                                );
                            }
                        )}
                    </dl>
                </section>
            ))}
        </div>
    );
};

export default PatientProfile;
