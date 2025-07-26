export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export const validateEmail = (email: string): string | null => {
  if (!email) {
    return 'Email is required';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  
  if (email.length > 254) {
    return 'Email is too long';
  }
  
  return null;
};

export const validatePassword = (password: string, isLogin: boolean = false): string | null => {
  if (!password) {
    return 'Password is required';
  }
  
  if (!isLogin) {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    
    if (password.length > 128) {
      return 'Password is too long';
    }
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    
    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
  }
  
  return null;
};

export const validateName = (name: string): string | null => {
  if (!name) {
    return 'Name is required';
  }
  
  if (name.length < 2) {
    return 'Name must be at least 2 characters long';
  }
  
  if (name.length > 50) {
    return 'Name is too long';
  }
  
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  if (!nameRegex.test(name)) {
    return 'Name can only contain letters, spaces, hyphens, and apostrophes';
  }
  
  return null;
};

export const validateTaskTitle = (title: string): string | null => {
  if (!title) {
    return 'Task title is required';
  }
  
  if (title.length < 3) {
    return 'Task title must be at least 3 characters long';
  }
  
  if (title.length > 100) {
    return 'Task title is too long (maximum 100 characters)';
  }
  
  if (title.trim().length < 3) {
    return 'Task title must contain meaningful content';
  }
  
  return null;
};

export const validateTaskDescription = (description: string): string | null => {
  if (!description) {
    return 'Task description is required';
  }
  
  if (description.length < 5) {
    return 'Task description must be at least 5 characters long';
  }
  
  if (description.length > 500) {
    return 'Task description is too long (maximum 500 characters)';
  }
  
  if (description.trim().length < 5) {
    return 'Task description must contain meaningful content';
  }
  
  return null;
};

export const validateRegisterForm = (formData: Record<string, string>): ValidationResult => {
  const errors: ValidationError[] = [];
  
  const nameError = validateName(formData.name);
  if (nameError) {
    errors.push({ field: 'name', message: nameError });
  }
  
  const emailError = validateEmail(formData.email);
  if (emailError) {
    errors.push({ field: 'email', message: emailError });
  }
  
  const passwordError = validatePassword(formData.password, false);
  if (passwordError) {
    errors.push({ field: 'password', message: passwordError });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateLoginForm = (formData: Record<string, string>): ValidationResult => {
  const errors: ValidationError[] = [];
  
  const emailError = validateEmail(formData.email);
  if (emailError) {
    errors.push({ field: 'email', message: emailError });
  }
  
  const passwordError = validatePassword(formData.password, true);
  if (passwordError) {
    errors.push({ field: 'password', message: passwordError });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateTaskForm = (formData: Record<string, string>): ValidationResult => {
  const errors: ValidationError[] = [];
  
  const titleError = validateTaskTitle(formData.title);
  if (titleError) {
    errors.push({ field: 'title', message: titleError });
  }
  
  const descriptionError = validateTaskDescription(formData.description);
  if (descriptionError) {
    errors.push({ field: 'description', message: descriptionError });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const getFieldError = (errors: ValidationError[], field: string): string | null => {
  const error = errors.find(err => err.field === field);
  return error ? error.message : null;
}; 