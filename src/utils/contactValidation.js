// frontend/src/utils/contactValidation.js

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (supports various formats)
const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;

export const validateContactForm = (formData) => {
  const errors = {};

  // First Name validation
  if (!formData.first_name || !formData.first_name.trim()) {
    errors.first_name = 'First name is required';
  } else if (formData.first_name.trim().length < 2) {
    errors.first_name = 'First name must be at least 2 characters';
  } else if (formData.first_name.trim().length > 50) {
    errors.first_name = 'First name cannot exceed 50 characters';
  }

  // Last Name validation
  if (!formData.last_name || !formData.last_name.trim()) {
    errors.last_name = 'Last name is required';
  } else if (formData.last_name.trim().length < 2) {
    errors.last_name = 'Last name must be at least 2 characters';
  } else if (formData.last_name.trim().length > 50) {
    errors.last_name = 'Last name cannot exceed 50 characters';
  }

  // Email validation
  if (!formData.email || !formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = 'Please provide a valid email address';
  }

  // Company Name validation (optional)
  if (formData.company_name && formData.company_name.length > 100) {
    errors.company_name = 'Company name cannot exceed 100 characters';
  }

  // Job Title validation (optional)
  if (formData.job_title && formData.job_title.length > 100) {
    errors.job_title = 'Job title cannot exceed 100 characters';
  }

  // Phone Number validation (optional but must be valid if provided)
  if (formData.phone_number && formData.phone_number.trim()) {
    if (!phoneRegex.test(formData.phone_number.trim())) {
      errors.phone_number = 'Please provide a valid phone number';
    }
  }

  // Contact Method validation
  if (!formData.contact_method) {
    errors.contact_method = 'Contact method is required';
  } else if (!['Email', 'Phone'].includes(formData.contact_method)) {
    errors.contact_method = 'Please select a valid contact method';
  }

  // Area of Interest validation (optional)
  if (formData.area_of_interest && formData.area_of_interest.length > 200) {
    errors.area_of_interest = 'Area of interest cannot exceed 200 characters';
  }

  // Additional Comments validation (optional)
  if (formData.additional_comments && formData.additional_comments.length > 1000) {
    errors.additional_comments = 'Additional comments cannot exceed 1000 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Individual field validators for real-time validation
export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case 'first_name':
    case 'last_name':
      if (!value || !value.trim()) return `${fieldName.replace('_', ' ')} is required`;
      if (value.trim().length < 2) return `Must be at least 2 characters`;
      if (value.trim().length > 50) return `Cannot exceed 50 characters`;
      return '';

    case 'email':
      if (!value || !value.trim()) return 'Email is required';
      if (!emailRegex.test(value.trim())) return 'Invalid email address';
      return '';

    case 'phone_number':
      if (value && value.trim() && !phoneRegex.test(value.trim())) {
        return 'Invalid phone number';
      }
      return '';

    case 'contact_method':
      if (!value) return 'Contact method is required';
      return '';

    case 'company_name':
    case 'job_title':
      if (value && value.length > 100) return 'Cannot exceed 100 characters';
      return '';

    case 'area_of_interest':
      if (value && value.length > 200) return 'Cannot exceed 200 characters';
      return '';

    case 'additional_comments':
      if (value && value.length > 1000) return 'Cannot exceed 1000 characters';
      return '';

    default:
      return '';
  }
};
