export const resetPasswordSchema = (values = {}) => {
  const errors = {};
  const password = typeof values.password === 'string' ? values.password : '';
  const confirmPassword =
    typeof values.confirmPassword === 'string'
      ? values.confirmPassword
      : '';

  if (!password.trim()) {
    errors.password = 'New password is required.';
  } else if (password.length < 8) {
    errors.password = 'Password must contain at least 8 characters.';
  }

  if (!confirmPassword.trim()) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
};

export default resetPasswordSchema;