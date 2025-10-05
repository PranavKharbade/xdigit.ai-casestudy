import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FormProvider } from './contexts/FormContext';
import ApplicationForm from './components/ApplicationForm';
import Header from './components/Header';
import { useTranslation } from 'react-i18next';
import './App.css';

function App() {
  const { i18n } = useTranslation();

  // Handle language change and RTL direction
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    document.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  };

  return (
    <Router>
      <FormProvider>
        <div className="App">
          <Header onLanguageChange={handleLanguageChange} />
          <main id="main-content">
            <Routes>
              <Route path="/" element={<ApplicationForm />} />
              <Route path="/application" element={<ApplicationForm />} />
            </Routes>
          </main>
        </div>
      </FormProvider>
    </Router>
  );
}

export default App;
