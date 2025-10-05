import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Language as LanguageIcon,
  Menu as MenuIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { hasApiKey } from '../services/aiService';
import ApiKeyConfig from './ApiKeyConfig';

const Header = ({ onLanguageChange }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [languageAnchor, setLanguageAnchor] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);

  const handleLanguageMenuOpen = (event) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageAnchor(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleLanguageSelect = (language) => {
    onLanguageChange(language);
    handleLanguageMenuClose();
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuOpen}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant={isMobile ? "h6" : "h5"}
            component="h1"
            sx={{ 
              flexGrow: 1,
              fontWeight: 'bold',
              textAlign: isMobile ? 'center' : 'left'
            }}
          >
            {t('title')}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
              {t('language')}:
            </Typography>
            
            <Button
              color="inherit"
              startIcon={<LanguageIcon />}
              onClick={handleLanguageMenuOpen}
              aria-label={t('language')}
              aria-haspopup="true"
            >
              {t('language')}
            </Button>

            <IconButton
              color="inherit"
              onClick={() => setApiKeyDialogOpen(true)}
              aria-label="API Settings"
              title={hasApiKey() ? "API Key Configured" : "Configure API Key"}
            >
              <SettingsIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Language Selection Menu */}
      <Menu
        anchorEl={languageAnchor}
        open={Boolean(languageAnchor)}
        onClose={handleLanguageMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem 
          onClick={() => handleLanguageSelect('en')}
          aria-label={t('english')}
        >
          {t('english')}
        </MenuItem>
        <MenuItem 
          onClick={() => handleLanguageSelect('ar')}
          aria-label={t('arabic')}
        >
          {t('arabic')}
        </MenuItem>
      </Menu>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleMobileMenuClose}>
          <Typography variant="h6">{t('title')}</Typography>
        </MenuItem>
        <MenuItem onClick={() => {
          handleLanguageSelect('en');
          handleMobileMenuClose();
        }}>
          {t('english')}
        </MenuItem>
        <MenuItem onClick={() => {
          handleLanguageSelect('ar');
          handleMobileMenuClose();
        }}>
          {t('arabic')}
        </MenuItem>
      </Menu>

      {/* API Key Configuration Dialog */}
      <ApiKeyConfig
        open={apiKeyDialogOpen}
        onClose={() => setApiKeyDialogOpen(false)}
      />
    </>
  );
};

export default Header;
