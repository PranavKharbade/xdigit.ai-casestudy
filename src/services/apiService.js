import axios from 'axios';

// Mock API endpoint - replace with your actual API endpoint
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens, etc.
apiClient.interceptors.request.use(
  (config) => {
    // Add any auth tokens or other headers here
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Submit application data
export const submitApplication = async (formData) => {
  try {
    // Validate required fields
    const requiredFields = [
      'name', 'nationalId', 'dateOfBirth', 'gender', 'address', 'city', 'state', 'country', 'phone', 'email',
      'maritalStatus', 'dependents', 'employmentStatus', 'monthlyIncome', 'housingStatus',
      'currentFinancialSituation', 'employmentCircumstances', 'reasonForApplying'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Prepare submission data
    const submissionData = {
      ...formData,
      submittedAt: new Date().toISOString(),
      applicationId: generateApplicationId(),
    };

    // For development/demo purposes, we'll simulate an API call
    // In production, replace this with actual API call
    if (process.env.NODE_ENV === 'development') {
      return await simulateApiCall(submissionData);
    }

    // Actual API call
    const response = await apiClient.post('/applications', submissionData);
    
    return {
      success: true,
      data: response.data,
      message: 'Application submitted successfully',
    };
  } catch (error) {
    console.error('Submission error:', error);
    
    return {
      success: false,
      error: error.message || 'Failed to submit application',
    };
  }
};

// Simulate API call for development
const simulateApiCall = async (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate random success/failure for demo
      const success = Math.random() > 0.1; // 90% success rate
      
      if (success) {
        resolve({
          success: true,
          data: {
            applicationId: data.applicationId,
            status: 'submitted',
            submittedAt: data.submittedAt,
          },
          message: 'Application submitted successfully',
        });
      } else {
        reject(new Error('Simulated API error for demonstration'));
      }
    }, 2000); // 2 second delay to simulate network request
  });
};

// Generate unique application ID
const generateApplicationId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `APP-${timestamp}-${random}`.toUpperCase();
};

// Get application status (for future use)
export const getApplicationStatus = async (applicationId) => {
  try {
    const response = await apiClient.get(`/applications/${applicationId}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to get application status',
    };
  }
};

// Update application (for future use)
export const updateApplication = async (applicationId, updateData) => {
  try {
    const response = await apiClient.put(`/applications/${applicationId}`, updateData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to update application',
    };
  }
};

const apiService = {
  submitApplication,
  getApplicationStatus,
  updateApplication,
};

export default apiService;
