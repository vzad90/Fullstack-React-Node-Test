import { useState, useCallback } from 'react';
import type { ValidationError, ValidationResult } from '../utils/validation';
import { getFieldError } from '../utils/validation';

export interface UseFormValidationReturn {
  errors: ValidationError[];
  setErrors: (errors: ValidationError[]) => void;
  clearErrors: () => void;
  getFieldError: (field: string) => string | null;
  hasErrors: boolean;
  validateField: (field: string, value: string, validator: (value: string) => string | null) => void;
  validateForm: (formData: Record<string, string>, validator: (formData: Record<string, string>) => ValidationResult) => boolean;
}

export function useFormValidation(): UseFormValidationReturn {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const getFieldErrorValue = useCallback((field: string): string | null => {
    return getFieldError(errors, field);
  }, [errors]);

  const validateField = useCallback((field: string, value: string, validator: (value: string) => string | null) => {
    const error = validator(value);
    
    setErrors(prevErrors => {
      const filteredErrors = prevErrors.filter(err => err.field !== field);
      
      if (error) {
        return [...filteredErrors, { field, message: error }];
      }
      
      return filteredErrors;
    });
  }, []);

  const validateForm = useCallback((formData: Record<string, string>, validator: (formData: Record<string, string>) => ValidationResult): boolean => {
    const result = validator(formData);
    setErrors(result.errors);
    return result.isValid;
  }, []);

  return {
    errors,
    setErrors,
    clearErrors,
    getFieldError: getFieldErrorValue,
    hasErrors: errors.length > 0,
    validateField,
    validateForm,
  };
} 