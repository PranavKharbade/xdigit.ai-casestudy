import React from 'react';
import {
  Grid,
  TextField,
  MenuItem,
  Typography,
  Box,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useTranslation } from 'react-i18next';
import { useForm } from '../../contexts/FormContext';

const PersonalInfoStep = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useForm();

  const handleInputChange = (field, value) => {
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: { [field]: value },
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-()]/g, ''));
  };

  const validateNationalId = (id) => {
    // Basic validation - adjust based on your country's ID format
    return id.length >= 5 && id.length <= 20 && /^[0-9]+$/.test(id);
  };

  const getFieldError = (field, value) => {
    if (!value) {
      return t('required');
    }

    switch (field) {
      case 'email':
        return !validateEmail(value) ? t('emailInvalid') : '';
      case 'phone':
        return !validatePhone(value) ? t('invalidFormat') : '';
      case 'nationalId':
        return !validateNationalId(value) ? t('invalidFormat') : '';
      default:
        return '';
    }
  };

  const fields = [
    {
      name: 'name',
      label: t('name'),
      type: 'text',
      required: true,
      gridSize: { xs: 12, md: 6 },
    },
    {
      name: 'nationalId',
      label: t('nationalId'),
      type: 'text',
      required: true,
      gridSize: { xs: 12, md: 6 },
    },
    {
      name: 'dateOfBirth',
      label: t('dateOfBirth'),
      type: 'date',
      required: true,
      gridSize: { xs: 12, md: 6 },
    },
    {
      name: 'gender',
      label: t('gender'),
      type: 'select',
      required: true,
      options: [
        { value: 'male', label: t('male') },
        { value: 'female', label: t('female') },
        { value: 'other', label: t('other') },
      ],
      gridSize: { xs: 12, md: 6 },
    },
    {
      name: 'address',
      label: t('address'),
      type: 'text',
      required: true,
      gridSize: { xs: 12 },
    },
    {
      name: 'city',
      label: t('city'),
      type: 'text',
      required: true,
      gridSize: { xs: 12, md: 4 },
    },
    {
      name: 'state',
      label: t('state'),
      type: 'text',
      required: true,
      gridSize: { xs: 12, md: 4 },
    },
    {
      name: 'country',
      label: t('country'),
      type: 'text',
      required: true,
      gridSize: { xs: 12, md: 4 },
    },
    {
      name: 'phone',
      label: t('phone'),
      type: 'tel',
      required: true,
      gridSize: { xs: 12, md: 6 },
    },
    {
      name: 'email',
      label: t('email'),
      type: 'email',
      required: true,
      gridSize: { xs: 12, md: 6 },
    },
  ];

  return (
    <Box>
      <Typography 
        variant="h5" 
        component="h3" 
        gutterBottom 
        align="center"
        sx={{ mb: 3 }}
      >
        {t('personalInfo')}
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={3}>
          {fields.map((field) => {
            const value = state.formData[field.name] || '';
            const error = getFieldError(field.name, value);

            return (
              <Grid item {...field.gridSize} key={field.name}>
                {field.type === 'date' ? (
                  <DatePicker
                    label={field.label}
                    value={value ? new Date(value) : null}
                    onChange={(newValue) => {
                      handleInputChange(field.name, newValue ? newValue.toISOString().split('T')[0] : '');
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        required={field.required}
                        error={!!error}
                        helperText={error}
                        inputProps={{
                          ...params.inputProps,
                          'aria-label': field.label,
                          'aria-required': field.required,
                        }}
                      />
                    )}
                  />
                ) : field.type === 'select' ? (
                  <TextField
                    select
                    fullWidth
                    label={field.label}
                    value={value}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    required={field.required}
                    error={!!error}
                    helperText={error}
                    inputProps={{
                      'aria-label': field.label,
                      'aria-required': field.required,
                    }}
                  >
                    <MenuItem value="">
                      <em>{t('selectOption')}</em>
                    </MenuItem>
                    {field.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    fullWidth
                    label={field.label}
                    type={field.type}
                    value={value}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    required={field.required}
                    error={!!error}
                    helperText={error}
                    inputProps={{
                      'aria-label': field.label,
                      'aria-required': field.required,
                    }}
                  />
                )}
              </Grid>
            );
          })}
        </Grid>
      </LocalizationProvider>
    </Box>
  );
};

export default PersonalInfoStep;
