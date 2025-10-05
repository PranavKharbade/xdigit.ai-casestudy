import React, { useState } from 'react';
import {
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useForm } from '../contexts/FormContext';
import PersonalInfoStep from './steps/PersonalInfoStep';
import FamilyFinancialStep from './steps/FamilyFinancialStep';
import SituationDescriptionsStep from './steps/SituationDescriptionsStep';
import { submitApplication } from '../services/apiService';

const ApplicationForm = () => {
  const { t } = useTranslation();
  const { state, dispatch, actions } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const steps = [
    t('step1'),
    t('step2'),
    t('step3'),
  ];

  const handleNext = () => {
    if (state.currentStep < state.totalSteps) {
      dispatch({
        type: actions.SET_STEP,
        payload: state.currentStep + 1,
      });
    }
  };

  const handleBack = () => {
    if (state.currentStep > 1) {
      dispatch({
        type: actions.SET_STEP,
        payload: state.currentStep - 1,
      });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Clear any existing errors
      dispatch({ type: actions.CLEAR_ERRORS });

      // Submit the application
      const response = await submitApplication(state.formData);
      
      if (response.success) {
        setSubmitStatus('success');
        // Clear form data after successful submission
        dispatch({ type: actions.CLEAR_FORM });
        // Clear localStorage
        localStorage.removeItem('socialSupportFormData');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return <PersonalInfoStep />;
      case 2:
        return <FamilyFinancialStep />;
      case 3:
        return <SituationDescriptionsStep />;
      default:
        return null;
    }
  };

  const isStepValid = (step) => {
    const { formData } = state;
    
    switch (step) {
      case 1:
        return formData.name && 
               formData.nationalId && 
               formData.dateOfBirth && 
               formData.gender && 
               formData.address && 
               formData.city && 
               formData.state && 
               formData.country && 
               formData.phone && 
               formData.email;
      
      case 2:
        return formData.maritalStatus && 
               formData.dependents !== '' && 
               formData.employmentStatus && 
               formData.monthlyIncome !== '' && 
               formData.housingStatus;
      
      case 3:
        return formData.currentFinancialSituation && 
               formData.employmentCircumstances && 
               formData.reasonForApplying;
      
      default:
        return false;
    }
  };

  const canProceed = isStepValid(state.currentStep);
  const isLastStep = state.currentStep === state.totalSteps;

  return (
    <Container maxWidth="lg" className="form-container">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-link">
        {t('skipToContent')}
      </a>

      {/* Progress Bar */}
      <Box className="progress-container" role="progressbar" aria-label={t('progressBar')}>
        <Stepper activeStep={state.currentStep - 1} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Step Content */}
      <Paper elevation={3} className="step-content">
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          align="center"
          sx={{ mb: 4 }}
        >
          {t('subtitle')}
        </Typography>

        {renderStepContent(state.currentStep)}

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {t('submitSuccess')}
          </Alert>
        )}

        {submitStatus === 'error' && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {t('submitError')}
          </Alert>
        )}

        {/* Navigation Buttons */}
        <Box className="button-container">
          <Button
            disabled={state.currentStep === 1 || isSubmitting}
            onClick={handleBack}
            variant="outlined"
            size="large"
            aria-label={t('previous')}
          >
            {t('previous')}
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isSubmitting && (
              <CircularProgress size={24} />
            )}
            
            {isLastStep ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!canProceed || isSubmitting}
                size="large"
                aria-label={t('submit')}
              >
                {isSubmitting ? t('submitting') : t('submit')}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!canProceed}
                size="large"
                aria-label={t('next')}
              >
                {t('next')}
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ApplicationForm;
