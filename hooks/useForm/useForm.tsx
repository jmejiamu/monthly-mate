import React, { useState } from "react";
import isEqual from "lodash.isequal";

export const useForm = <T extends Record<string, any>>(
  initialState: T,
  schema?: any
) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (name: keyof T, value: any) => {
    setFormData({ ...formData, [name]: value });
  };
  const resetForm = () => {
    setFormData(initialState);
  };

  const isFormChanged = !isEqual(formData, initialState);

  const validate = (customFormData?: T) => {
    const dataToValidate = customFormData || formData;
    if (!dataToValidate) return false;
    const result = schema?.safeParse(dataToValidate);
    if (!result.success) {
      // Map errors to fields
      const fieldErrors: { [key: string]: string } = {};
      result.error.issues.forEach((err: any) => {
        if (err.path.length === 1) {
          fieldErrors[String(err.path[0])] = err.message;
        } else if (err.path.length === 2) {
          fieldErrors[`${String(err.path[0])}.${String(err.path[1])}`] =
            err.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  return {
    formData,
    handleChange,
    resetForm,
    setFormData,
    validate,
    errors,
    isFormChanged,
  };
};
