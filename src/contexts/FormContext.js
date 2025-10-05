import React, { createContext, useContext, useReducer, useEffect } from 'react';

const FormContext = createContext();

// Initial form state
const initialState = {
  currentStep: 1,
  totalSteps: 3,
  formData: {
    // Step 1 - Personal Information
    name: '',
    nationalId: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    email: '',
    
    // Step 2 - Family & Financial Info
    maritalStatus: '',
    dependents: '',
    employmentStatus: '',
    monthlyIncome: '',
    housingStatus: '',
    
    // Step 3 - Situation Descriptions
    currentFinancialSituation: '',
    employmentCircumstances: '',
    reasonForApplying: '',
  },
  errors: {},
  isSubmitting: false,
  submitStatus: null,
  language: 'en',
  savedProgress: false,
};

// Action types
const ACTIONS = {
  SET_STEP: 'SET_STEP',
  UPDATE_FORM_DATA: 'UPDATE_FORM_DATA',
  SET_ERRORS: 'SET_ERRORS',
  CLEAR_ERRORS: 'CLEAR_ERRORS',
  SET_SUBMITTING: 'SET_SUBMITTING',
  SET_SUBMIT_STATUS: 'SET_SUBMIT_STATUS',
  SET_LANGUAGE: 'SET_LANGUAGE',
  LOAD_SAVED_DATA: 'LOAD_SAVED_DATA',
  CLEAR_FORM: 'CLEAR_FORM',
  SAVE_PROGRESS: 'SAVE_PROGRESS',
};

// Reducer function
const formReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_STEP:
      return {
        ...state,
        currentStep: action.payload,
      };
    
    case ACTIONS.UPDATE_FORM_DATA:
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload,
        },
      };
    
    case ACTIONS.SET_ERRORS:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.payload,
        },
      };
    
    case ACTIONS.CLEAR_ERRORS:
      return {
        ...state,
        errors: {},
      };
    
    case ACTIONS.SET_SUBMITTING:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    
    case ACTIONS.SET_SUBMIT_STATUS:
      return {
        ...state,
        submitStatus: action.payload,
      };
    
    case ACTIONS.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    
    case ACTIONS.LOAD_SAVED_DATA:
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload.formData,
        },
        currentStep: action.payload.currentStep || 1,
        language: action.payload.language || 'en',
      };
    
    case ACTIONS.CLEAR_FORM:
      return {
        ...initialState,
        language: state.language,
      };
    
    case ACTIONS.SAVE_PROGRESS:
      return {
        ...state,
        savedProgress: true,
      };
    
    default:
      return state;
  }
};

// Provider component
export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('socialSupportFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({
          type: ACTIONS.LOAD_SAVED_DATA,
          payload: parsedData,
        });
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(state.formData).length > 0) {
      const dataToSave = {
        formData: state.formData,
        currentStep: state.currentStep,
        language: state.language,
      };
      localStorage.setItem('socialSupportFormData', JSON.stringify(dataToSave));
    }
  }, [state.formData, state.currentStep, state.language]);

  // Context value
  const value = {
    state,
    dispatch,
    actions: ACTIONS,
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use the form context
export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};

export default FormContext;
