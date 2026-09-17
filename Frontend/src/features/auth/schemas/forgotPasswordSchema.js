export const forgotPasswordSchema = (values) => {
  const errors = {};
  const email = typeof values?.email === 'string' ? values.email.trim() : '';

  if (!email) {
    errors.email = 'Email is required.';
  } else if (email.length > 254) {
    errors.email = 'Email address is too long.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  return errors;
};

export default forgotPasswordSchema;