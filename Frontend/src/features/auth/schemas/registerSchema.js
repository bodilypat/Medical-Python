export const registerSchema = (values) => {
  const errors = {};
  const formValues = values ?? {};
  const firstName = typeof formValues.firstName === 'string'
    ? formValues.firstName.trim()
    : '';
  const lastName = typeof formValues.lastName === 'string'
    ? formValues.lastName.trim()
    : '';
  const email = typeof formValues.email === 'string'
    ? formValues.email.trim()
    : '';
  const password = typeof formValues.password === 'string'
    ? formValues.password
    : '';
  const confirmPassword = typeof formValues.confirmPassword === 'string'
    ? formValues.confirmPassword
    : '';

  if (!firstName) {
    errors.firstName = 'First name is required.';
  }

  if (!lastName) {
    errors.lastName = 'Last name is required.';
  }

  if (!email) {
    errors.email = 'Email is required.';
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    errors.email = 'Enter a valid email address.';
  }

  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < 8) {
    errors.password =
      'Password must contain at least 8 characters.';
  }

  if (!confirmPassword) {
    errors.confirmPassword =
      'Please confirm your password.';
  } else if (password !== confirmPassword) {
    errors.confirmPassword =
      'Passwords do not match.';
  }

  return errors;
};

export default registerSchema;