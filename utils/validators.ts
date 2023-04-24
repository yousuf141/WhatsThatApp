import * as EmailValidator from "email-validator";

export const validateEmail = (email: string): boolean => {
  return EmailValidator.validate(email);
};

export const validatePassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  return passwordRegex.test(password);
};

export const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z]+$/;
  return nameRegex.test(name);
};
