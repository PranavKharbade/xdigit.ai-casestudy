import React from 'react';
import {
  Grid,
  TextField,
  MenuItem,
  Typography,
  Box,
  InputAdornment,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useForm } from '../../contexts/FormContext';

const FamilyFinancialStep = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useForm();

  const handleInputChange = (field, value) => {
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: { [field]: value },
    });
  };

  const validateNumber = (value, min = 0, max = 999999999) => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= min && num <= max;
  };

  const getFieldError = (field, value) => {
    if (!value && value !== 0) {
      return t('required');
    }

    switch (field) {
      case 'dependents':
        return !validateNumber(value, 0, 20) ? t('invalidFormat') : '';
      case 'monthlyIncome':
        return !validateNumber(value, 0, 999999999) ? t('invalidFormat') : '';
      default:
        return '';
    }
  };

  const fields = [
    {
      name: 'maritalStatus',
      label: t('maritalStatus'),
      type: 'select',
      required: true,
      options: [
        { value: 'single', label: t('single') },
        { value: 'married', label: t('married') },
        { value: 'divorced', label: t('divorced') },
        { value: 'widowed', label: t('widowed') },
      ],
      gridSize: { xs: 12, md: 6 },
    },
    {
      name: 'dependents',
      label: t('dependents'),
      type: 'number',
      required: true,
      gridSize: { xs: 12, md: 6 },
      inputProps: {
        min: 0,
        max: 20,
      },
    },
    {
      name: 'employmentStatus',
      label: t('employmentStatus'),
      type: 'select',
      required: true,
      options: [
        { value: 'employed', label: t('employed') },
        { value: 'unemployed', label: t('unemployed') },
        { value: 'selfEmployed', label: t('selfEmployed') },
        { value: 'retired', label: t('retired') },
        { value: 'student', label: t('student') },
      ],
      gridSize: { xs: 12, md: 6 },
    },
    {
      name: 'monthlyIncome',
      label: t('monthlyIncome'),
      type: 'number',
      required: true,
      gridSize: { xs: 12, md: 6 },
      inputProps: {
        min: 0,
        step: 0.01,
      },
      startAdornment: '$',
    },
    {
      name: 'housingStatus',
      label: t('housingStatus'),
      type: 'select',
      required: true,
      options: [
        { value: 'owned', label: t('owned') },
        { value: 'rented', label: t('rented') },
        { value: 'livingWithFamily', label: t('livingWithFamily') },
        { value: 'homeless', label: t('homeless') },
      ],
      gridSize: { xs: 12 },
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
        {t('familyFinancialInfo')}
      </Typography>

      <Grid container spacing={3}>
        {fields.map((field) => {
          const value = state.formData[field.name] || '';
          const error = getFieldError(field.name, value);

          return (
            <Grid item {...field.gridSize} key={field.name}>
              {field.type === 'select' ? (
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
                    ...field.inputProps,
                    'aria-label': field.label,
                    'aria-required': field.required,
                  }}
                  InputProps={{
                    startAdornment: field.startAdornment ? (
                      <InputAdornment position="start">
                        {field.startAdornment}
                      </InputAdornment>
                    ) : undefined,
                  }}
                />
              )}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default FamilyFinancialStep;
