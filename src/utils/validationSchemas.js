import * as yup from "yup";

/**
 * Login validation schema
 */
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

/**
 * Signup validation schema
 */
export const signupSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

/**
 * Email validation regex
 */
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

/**
 * Password strength validation
 */
export const validatePasswordStrength = (password) => {
  const strength = {
    weak: password.length >= 6 && password.length < 8,
    medium: password.length >= 8 && /(?=.*[0-9])/.test(password),
    strong:
      password.length >= 8 &&
      /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/.test(password),
  };

  if (strength.strong) return "strong";
  if (strength.medium) return "medium";
  if (strength.weak) return "weak";
  return "invalid";
};
