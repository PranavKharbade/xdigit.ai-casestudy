import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  AutoFixHigh as AIIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useForm } from '../../contexts/FormContext';
import { generateAIText } from '../../services/aiService';

const SituationDescriptionsStep = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useForm();
  const [aiDialog, setAiDialog] = useState({ open: false, field: null, loading: false, suggestion: '', error: null });

  const handleInputChange = (field, value) => {
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: { [field]: value },
    });
  };

  const getFieldError = (field, value) => {
    if (!value) {
      return t('required');
    }
    return '';
  };

  const handleAIHelp = async (field) => {
    setAiDialog({ open: true, field, loading: true, suggestion: '', error: null });

    try {
      const prompt = getPromptForField(field);
      const suggestion = await generateAIText(prompt);
      setAiDialog({ open: true, field, loading: false, suggestion, error: null });
    } catch (error) {
      console.error('AI generation error:', error);
      setAiDialog({ 
        open: true, 
        field, 
        loading: false, 
        suggestion: '', 
        error: error.message || t('aiError') 
      });
    }
  };

  const getPromptForField = (field) => {
    const formData = state.formData;
    const baseInfo = `I am applying for financial assistance. My situation: Employment status: ${formData.employmentStatus}, Monthly income: $${formData.monthlyIncome}, Marital status: ${formData.maritalStatus}, Dependents: ${formData.dependents}.`;

    switch (field) {
      case 'currentFinancialSituation':
        return `${baseInfo} Help me describe my current financial situation and challenges.`;
      case 'employmentCircumstances':
        return `${baseInfo} Help me describe my employment circumstances and work situation.`;
      case 'reasonForApplying':
        return `${baseInfo} Help me explain my reason for applying for financial assistance.`;
      default:
        return `${baseInfo} Help me write a description for my application.`;
    }
  };

  const handleAcceptSuggestion = () => {
    if (aiDialog.field && aiDialog.suggestion) {
      handleInputChange(aiDialog.field, aiDialog.suggestion);
    }
    setAiDialog({ open: false, field: null, loading: false, suggestion: '', error: null });
  };

  const handleEditSuggestion = () => {
    if (aiDialog.field && aiDialog.suggestion) {
      handleInputChange(aiDialog.field, aiDialog.suggestion);
    }
    setAiDialog({ open: false, field: null, loading: false, suggestion: '', error: null });
  };

  const handleDiscardSuggestion = () => {
    setAiDialog({ open: false, field: null, loading: false, suggestion: '', error: null });
  };

  const fields = [
    {
      name: 'currentFinancialSituation',
      label: t('currentFinancialSituation'),
      required: true,
      gridSize: { xs: 12 },
      aiAssistance: true,
    },
    {
      name: 'employmentCircumstances',
      label: t('employmentCircumstances'),
      required: true,
      gridSize: { xs: 12 },
      aiAssistance: true,
    },
    {
      name: 'reasonForApplying',
      label: t('reasonForApplying'),
      required: true,
      gridSize: { xs: 12 },
      aiAssistance: true,
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
        {t('situationDescriptions')}
      </Typography>

      <Grid container spacing={3}>
        {fields.map((field) => {
          const value = state.formData[field.name] || '';
          const error = getFieldError(field.name, value);

          return (
            <Grid item {...field.gridSize} key={field.name}>
              <TextField
                fullWidth
                multiline
                rows={6}
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
              />
              
              {field.aiAssistance && (
                <Box sx={{ 
                  mt: 1, 
                  display: 'flex', 
                  justifyContent: 'flex-end',
                  width: '100%'
                }}>
                  <Button
                    variant="outlined"
                    startIcon={<AIIcon />}
                    onClick={() => handleAIHelp(field.name)}
                    aria-label={`${t('helpMeWrite')} for ${field.label}`}
                  >
                    {t('helpMeWrite')}
                  </Button>
                </Box>
              )}
            </Grid>
          );
        })}
      </Grid>

      {/* AI Assistance Dialog */}
      <Dialog
        open={aiDialog.open}
        onClose={handleDiscardSuggestion}
        maxWidth="md"
        fullWidth
        aria-labelledby="ai-dialog-title"
        aria-describedby="ai-dialog-description"
      >
        <DialogTitle id="ai-dialog-title">
          {t('aiAssistance')}
        </DialogTitle>
        
        <DialogContent>
          {aiDialog.loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
              <CircularProgress />
              <Typography variant="body1" sx={{ ml: 2 }}>
                {t('aiGenerating')}
              </Typography>
            </Box>
          )}

          {aiDialog.error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {aiDialog.error}
            </Alert>
          )}

          {aiDialog.suggestion && (
            <TextField
              fullWidth
              multiline
              rows={8}
              value={aiDialog.suggestion}
              onChange={(e) => setAiDialog(prev => ({ ...prev, suggestion: e.target.value }))}
              variant="outlined"
              label={t('aiAssistance')}
              inputProps={{
                'aria-label': t('aiAssistance'),
              }}
            />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDiscardSuggestion} color="secondary">
            {t('discard')}
          </Button>
          <Button 
            onClick={handleEditSuggestion} 
            variant="outlined"
            disabled={!aiDialog.suggestion}
          >
            {t('edit')}
          </Button>
          <Button 
            onClick={handleAcceptSuggestion} 
            variant="contained"
            disabled={!aiDialog.suggestion}
          >
            {t('accept')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SituationDescriptionsStep;
