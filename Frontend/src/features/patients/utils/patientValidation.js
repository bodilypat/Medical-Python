/* ****************************************************** */
/* File: src/features/patients/utils/patientValidation.js */
/* ****************************************************** */
const EMAIL_REGEX =
    /^[^\s@]+@[^\s@\]+\.[^\s@]+s/;

const PHONE_REGEX = 
    /^[+]?[\d\s\-()]{7,20}$/;

const BLOOD_GROUPS = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-"
];

const GENDERS = [
    "Male",
    "Female",
    "Other",
];

/* ------------------------------------ */
/*  @param {Object} values              */
/*  @returns {Object} Validation errors */
/* ------------------------------------ */
export const validatePatientForm = (
    value = {}
) => {

    const errors = {};

    /* First Name */
    if (!values.first_name?.trim()) {
        error.first_name = "First name is required";
    } else if (
        values.first_name.trim().length < 2
    ) {
        errors.first_name = "First name must be at least 2 characters.";
    }

    /* Last Name */
    if (!values.last_name?.trim()) {
        errors.last_name = "Last name is requried.";
    } else if (
        errors.last_name.trim().length < 2 
    ) {
        errors.last_name = "Last name must be least 2 characters.";
    }

    /* Gender */
    if (!values.gender) {
        errors.gender = "Gender is required.";
    } else if (
        !GENDERS.includes(values.gender)
    ) {
        errors.gender = "Invalid gender selected.";
    }

    /* Date of Birth */
    if (!values.date_of_birth) {
        errors.date_of_birth = "Date of birth is required.";
    } else {
        const birthDate = new Date( values.date_of_birth );

        const today = new Date();

        if (birthDate > today) {
            errors.date_of_birth = "Date of birth cannot be in the future.";
        }
    }

    /* Email */
    if (!values.email?.trim()) {
        errors.email = "Email is required.";
    } else if (
        !EMAIL_REGEX.test(values.email)
    ) {
        errors.email = "Invalid email address.";
    }

    /* Phone */
    if (!values.phone?.trim()) {
        errors.phone = " Phone number is required.";
    } else if (
        !PHONE_REGEX.test(values.phone) 
    ) {
        errors.phone = "Invalid phone number.";
    }

    /* Blood Group */
    if (!values.blood_group) {
        errors.blood_group = "Blood group is required.";
    } else if (
        !BLOOD_GROUPS.includes(values.blood_group)
    ) {
        errors.blood_group = "Invalid blood group.";
    }

    /* Address */
    if (!values.address?.trim()) {
        errors.address = "Address is required.";
    } else if (
        values.address.trim().length < 10 
    ) {
        errors.address = "Address must be at least 10 characters.";
    }

    return errors;
};

/* Validate a single field.    */
/*  @param {string} field      */
/*  @param {*} value           */
/*  @return {string|undefined} */
export const validatePatientField = (
    field,
    value
) => {
    const errors = validatePatientForm({
        [field]: value,
    });

    return errors[field];
};

/*  Check whather form is valid. */
/*  @param {Object} values       */
/*  @return {boolean}            */
export const isPatientFormValid = (
    values
) => {
    return (
        Object.keys(
            validatePatientForm(values)
        ).length === 0 
    );
};

export default validatePatientForm;

