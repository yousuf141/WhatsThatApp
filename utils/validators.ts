export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\W)[A-Za-z\d\W]{9,}$/;
  return passwordRegex.test(password);
};

export const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z]+$/;
  return nameRegex.test(name);
};
