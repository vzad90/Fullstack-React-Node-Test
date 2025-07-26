import { useState } from "react";
import { useFormValidation } from "./useFormValidation";
import type { ValidationResult } from "../utils/validation";

export function useGenericForm<T extends Record<string, string>>({
  initialData,
  fieldValidators,
  formValidator,
  onSubmit,
}: {
  initialData: T;
  fieldValidators: Record<string, (value: string) => string | null>;
  formValidator: (data: Record<string, string>) => ValidationResult;
  onSubmit: (data: T, e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  const [formData, setFormData] = useState<T>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { errors, getFieldError, validateField, validateForm, clearErrors } = useFormValidation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors.find(err => err.field === name)) clearErrors();
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (fieldValidators[name]) validateField(name, value, fieldValidators[name]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm(formData, formValidator);
    if (!isValid) return;
    setIsSubmitting(true);
    try {
      await onSubmit(formData, e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    isSubmitting,
    errors,
    getFieldError,
    handleInputChange,
    handleBlur,
    handleSubmit,
    clearErrors,
  };
} 