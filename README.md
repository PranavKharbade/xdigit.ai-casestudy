# Social Support Portal

A modern React application for government social support portal with AI-powered writing assistance. This application allows citizens to apply for financial assistance through a multi-step form wizard with intelligent text generation capabilities.

## Features

### Core Functionality
- **3-Step Application Form Wizard**: Personal Information → Family & Financial Info → Situation Descriptions
- **Progress Tracking**: Visual progress bar showing current step and completion status
- **Form Validation**: Comprehensive client-side validation with real-time feedback
- **Local Storage**: Automatic saving of form progress to prevent data loss
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices

### AI Integration
- **OpenAI GPT Integration**: Smart text generation for situation descriptions
- **"Help Me Write" Feature**: AI assistance for writing financial hardship descriptions
- **Context-Aware Prompts**: AI suggestions based on user's form data
- **Error Handling**: Graceful handling of API errors and timeouts

### Internationalization
- **English & Arabic Support**: Full RTL (Right-to-Left) support for Arabic
- **Language Switching**: Dynamic language switching with proper text direction
- **Comprehensive Translations**: All UI elements translated in both languages

### Accessibility
- **ARIA Labels**: Proper accessibility labels for screen readers
- **Keyboard Navigation**: Full keyboard navigation support
- **Focus Management**: Proper focus handling and visual indicators
- **Skip Links**: Skip to content functionality for screen readers

## Tech Stack

- **Frontend**: React 18.2.0
- **UI Framework**: Material-UI (MUI) 5.11.10
- **Form Handling**: React Hook Form 7.43.5
- **State Management**: React Context API
- **Routing**: React Router DOM 6.8.1
- **Internationalization**: React-i18next 12.1.5
- **HTTP Client**: Axios 1.3.4
- **Date Handling**: MUI X Date Pickers with date-fns
- **AI Integration**: OpenAI GPT-3.5-turbo API

## Prerequisites

Before running this application, make sure you have:

- **Node.js**: Version 16.0 or higher
- **npm**: Version 7.0 or higher (comes with Node.js)
- **OpenAI API Key**: For AI writing assistance (optional but recommended)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd social-support-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
   REACT_APP_API_BASE_URL=http://localhost:3001/api
   ```

## OpenAI API Key Setup

### Method 1: Environment Variable (Recommended)
Add your OpenAI API key to the `.env` file:
```env
REACT_APP_OPENAI_API_KEY=sk-your-api-key-here
```

### Method 2: Application Settings
1. Start the application
2. Click the settings icon (⚙️) in the header
3. Enter your OpenAI API key in the configuration dialog
4. Click "Save & Test" to verify the key

### Getting an OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in to your account
3. Create a new API key
4. Copy the key (starts with `sk-`)

## Running the Application

### Development Mode
```bash
npm start
```
The application will open at [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
```
This creates an optimized production build in the `build` folder.

### Running Tests
```bash
npm test
```

## Project Structure

```
src/
├── components/
│   ├── steps/
│   │   ├── PersonalInfoStep.js      # Step 1: Personal information
│   │   ├── FamilyFinancialStep.js   # Step 2: Family & financial info
│   │   └── SituationDescriptionsStep.js # Step 3: Situation descriptions
│   ├── Header.js                    # Application header with language switcher
│   ├── ApplicationForm.js           # Main form component with wizard logic
│   └── ApiKeyConfig.js              # OpenAI API key configuration dialog
├── contexts/
│   └── FormContext.js               # Form state management
├── services/
│   ├── aiService.js                 # OpenAI GPT API integration
│   └── apiService.js                # Application submission API
├── App.js                           # Main application component
├── App.css                          # Application styles
├── i18n.js                          # Internationalization configuration
└── index.js                         # Application entry point
```

## Form Steps

### Step 1: Personal Information
- Full Name
- National ID
- Date of Birth
- Gender
- Address (Street, City, State, Country)
- Phone Number
- Email Address

### Step 2: Family & Financial Information
- Marital Status
- Number of Dependents
- Employment Status
- Monthly Income
- Housing Status

### Step 3: Situation Descriptions
- Current Financial Situation (with AI assistance)
- Employment Circumstances (with AI assistance)
- Reason for Applying (with AI assistance)

## AI Integration Details

### How It Works
1. User clicks "Help Me Write" button next to text areas in Step 3
2. System generates context-aware prompt based on user's form data
3. Request sent to OpenAI GPT-3.5-turbo API
4. AI-generated suggestion displayed in popup dialog
5. User can Accept, Edit, or Discard the suggestion

### Prompt Engineering
The AI prompts are context-aware and include:
- User's employment status
- Monthly income
- Marital status
- Number of dependents
- Specific field being filled

### Error Handling
- API key validation
- Rate limit handling
- Network timeout handling
- Invalid response handling
- User-friendly error messages

## Accessibility Features

### Keyboard Navigation
- Tab navigation through all form elements
- Enter/Space to activate buttons
- Arrow keys for dropdown selections
- Escape to close dialogs

### Screen Reader Support
- ARIA labels on all interactive elements
- Proper heading hierarchy
- Form field descriptions
- Status announcements

### Visual Accessibility
- High contrast color scheme
- Focus indicators
- Responsive text sizing
- RTL support for Arabic

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## API Integration

### Mock API (Development)
The application includes a mock API service for development and testing:
- Simulates API calls with 2-second delay
- 90% success rate for demonstration
- Generates unique application IDs

### Production API
To integrate with a real backend:
1. Update `REACT_APP_API_BASE_URL` in environment variables
2. Modify `apiService.js` to match your API endpoints
3. Update authentication headers if required

## Deployment

### Static Hosting (Recommended)
The application can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

### Build for Production
```bash
npm run build
```
Deploy the contents of the `build` folder to your hosting service.

### Environment Variables for Production
Set these environment variables in your hosting platform:
- `REACT_APP_OPENAI_API_KEY`: Your OpenAI API key
- `REACT_APP_API_BASE_URL`: Your backend API URL

## Security Considerations

### API Key Security
- API keys are stored in localStorage (client-side)
- Never expose API keys in version control
- Use environment variables for production
- Consider implementing a backend proxy for API calls

### Data Privacy
- Form data is stored locally in localStorage
- No data is sent to external servers except OpenAI API
- Consider implementing data encryption for sensitive information

## Troubleshooting

### Common Issues

1. **OpenAI API Key Not Working**
   - Verify the API key is correct
   - Check if you have sufficient credits
   - Ensure the key has the necessary permissions

2. **Form Not Saving Progress**
   - Check browser localStorage permissions
   - Clear browser cache and try again
   - Verify JavaScript is enabled

3. **Language Switching Not Working**
   - Refresh the page after changing language
   - Check browser console for errors
   - Verify i18n configuration

4. **Build Errors**
   - Delete `node_modules` and run `npm install` again
   - Check Node.js version compatibility
   - Verify all dependencies are installed

### Getting Help
- Check the browser console for error messages
- Verify all environment variables are set correctly
- Ensure all dependencies are installed
- Check network connectivity for API calls

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### ScreenShots Of UI Screens
- First Page
<img width="1919" height="969" alt="Screenshot 2025-10-05 193720" src="https://github.com/user-attachments/assets/28ea3779-1cf5-402e-90cb-d08a0a81e9fe" />
- Second Page
<img width="1918" height="953" alt="Screenshot 2025-10-05 193742" src="https://github.com/user-attachments/assets/a52824b9-e4c7-4a3a-91d5-c8815bde7499" />
- Third Page
<img width="1913" height="933" alt="Screenshot 2025-10-05 193837" src="https://github.com/user-attachments/assets/b603d54a-d5c1-4c6a-a903-589ace0fa3b6" />
- Language Changed 
<img width="1902" height="927" alt="Screenshot 2025-10-05 193859" src="https://github.com/user-attachments/assets/405d2f13-d8d8-4204-ae25-539fc124228a" />



