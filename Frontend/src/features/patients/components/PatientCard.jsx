/* ******************************************************** */
/* File: src/features/patients/components/PatientCard.jsx   */
/* ******************************************************** */

import PatientAvatar from "./PatientAvatar";
import { formatDate } from "../../../utils/date";

const EMPTY_VALUE = "-";

const PatientCard = ({
    patient,
    onView,
    onEdit,
    onDelete,
}) => {
    if (!patient) return null;

    const {
        id,
        first_name,
        last_name,
        gender,
        date_of_birth,
        blood_group,
        phone,
        email,
    } = patient;

    return (
        <article className="patient-card">
            <header className="patient-card__header">
                <PatientAvatar patient={patient} size="lg" />

                <div className="patient-card__title">
                    <h3>
                        {first_name} {last_name}
                    </h3>

                    <span className="patient-card__id">
                        Patient ID: {id}
                    </span>
                </div>
            </header>

            <div className="patient-card__body">
                <div className="patient-card__item">
                    <span className="label">Gender</span>
                    <span>{gender || EMPTY_VALUE}</span>
                </div>

                <div className="patient-card__item">
                    <span className="label">Date of Birth</span>
                    <span>
                        {date_of_birth
                            ? formatDate(date_of_birth)
                            : EMPTY_VALUE}
                    </span>
                </div>

                <div className="patient-card__item">
                    <span className="label">Blood Group</span>
                    <span>{blood_group || EMPTY_VALUE}</span>
                </div>

                <div className="patient-card__item">
                    <span className="label">Phone</span>
                    <span>{phone || EMPTY_VALUE}</span>
                </div>

                <div className="patient-card__item">
                    <span className="label">Email</span>
                    <span>{email || EMPTY_VALUE}</span>
                </div>
            </div>

            {(onView || onEdit || onDelete) && (
                <footer className="patient-card__actions">
                    {onView && (
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => onView(patient)}
                        >
                            View
                        </button>
                    )}

                    {onEdit && (
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => onEdit(patient)}
                        >
                            Edit
                        </button>
                    )}

                    {onDelete && (
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => onDelete(patient)}
                        >
                            Delete
                        </button>
                    )}
                </footer>
            )}
        </article>
    );
};

export default PatientCard;
