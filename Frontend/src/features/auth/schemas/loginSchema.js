export const loginSchema = (values) => {
  const errors = {};
  const email = values?.email?.trim() ?? '';
  const password = values?.password ?? '';

  if (!email) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!password) {
    errors.password = 'Password is required.';
  }

  return errors;
};

export default loginSchema;