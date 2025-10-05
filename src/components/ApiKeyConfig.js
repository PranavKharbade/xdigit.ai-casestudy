import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { setApiKey, testApiKey } from '../services/aiService';

const ApiKeyConfig = ({ open, onClose }) => {
  const [apiKey, setApiKeyValue] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSave = async () => {
    if (!apiKey.trim()) {
      setError('API key is required');
      return;
    }

    setTesting(true);
    setError('');
    setSuccess('');

    try {
      const isValid = await testApiKey(apiKey.trim());
      if (isValid) {
        setApiKey(apiKey.trim());
        setSuccess('API key saved successfully!');
        setTimeout(() => {
          onClose();
          setApiKeyValue('');
          setSuccess('');
        }, 1500);
      } else {
        setError('Invalid API key. Please check and try again.');
      }
    } catch (error) {
      setError('Failed to test API key. Please try again.');
    } finally {
      setTesting(false);
    }
  };

  const handleClose = () => {
    setApiKeyValue('');
    setError('');
    setSuccess('');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="api-key-dialog-title"
    >
      <DialogTitle id="api-key-dialog-title">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SettingsIcon />
          <Typography variant="h6">OpenAI API Configuration</Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          To use the AI writing assistance feature, you need to provide your OpenAI API key.
          Your API key is stored locally in your browser and is never sent to our servers.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <TextField
          fullWidth
          label="OpenAI API Key"
          type={showApiKey ? 'text' : 'password'}
          value={apiKey}
          onChange={(e) => setApiKeyValue(e.target.value)}
          placeholder="sk-..."
          helperText="Enter your OpenAI API key to enable AI writing assistance"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowApiKey(!showApiKey)}
                  edge="end"
                >
                  {showApiKey ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputProps={{
            'aria-label': 'OpenAI API Key',
          }}
        />

        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>How to get your API key:</strong>
            <br />
            1. Visit <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">OpenAI Platform</a>
            <br />
            2. Sign in to your account
            <br />
            3. Create a new API key
            <br />
            4. Copy and paste it here
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!apiKey.trim() || testing}
        >
          {testing ? 'Testing...' : 'Save & Test'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApiKeyConfig;
