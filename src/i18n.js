import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      title: "Social Support Portal",
      subtitle: "Apply for Financial Assistance",
      
      // Progress
      step1: "Personal Information",
      step2: "Family & Financial Info",
      step3: "Situation Descriptions",
      
      // Step 1 - Personal Information
      personalInfo: "Personal Information",
      name: "Full Name",
      nameRequired: "Name is required",
      nationalId: "National ID",
      nationalIdRequired: "National ID is required",
      dateOfBirth: "Date of Birth",
      dateOfBirthRequired: "Date of Birth is required",
      gender: "Gender",
      genderRequired: "Gender is required",
      male: "Male",
      female: "Female",
      other: "Other",
      address: "Address",
      addressRequired: "Address is required",
      city: "City",
      cityRequired: "City is required",
      state: "State/Province",
      stateRequired: "State/Province is required",
      country: "Country",
      countryRequired: "Country is required",
      phone: "Phone Number",
      phoneRequired: "Phone number is required",
      email: "Email Address",
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email address",
      
      // Step 2 - Family & Financial Info
      familyFinancialInfo: "Family & Financial Information",
      maritalStatus: "Marital Status",
      maritalStatusRequired: "Marital Status is required",
      single: "Single",
      married: "Married",
      divorced: "Divorced",
      widowed: "Widowed",
      dependents: "Number of Dependents",
      dependentsRequired: "Number of dependents is required",
      employmentStatus: "Employment Status",
      employmentStatusRequired: "Employment Status is required",
      employed: "Employed",
      unemployed: "Unemployed",
      selfEmployed: "Self-Employed",
      retired: "Retired",
      student: "Student",
      monthlyIncome: "Monthly Income",
      monthlyIncomeRequired: "Monthly Income is required",
      housingStatus: "Housing Status",
      housingStatusRequired: "Housing Status is required",
      owned: "Owned",
      rented: "Rented",
      livingWithFamily: "Living with Family",
      homeless: "Homeless",
      
      // Step 3 - Situation Descriptions
      situationDescriptions: "Situation Descriptions",
      currentFinancialSituation: "Current Financial Situation",
      currentFinancialSituationRequired: "Please describe your current financial situation",
      employmentCircumstances: "Employment Circumstances",
      employmentCircumstancesRequired: "Please describe your employment circumstances",
      reasonForApplying: "Reason for Applying",
      reasonForApplyingRequired: "Please explain your reason for applying",
      helpMeWrite: "Help Me Write",
      
      // AI Assistance
      aiAssistance: "AI Writing Assistant",
      aiGenerating: "Generating suggestion...",
      aiError: "Failed to generate suggestion. Please try again.",
      aiTimeout: "Request timed out. Please try again.",
      accept: "Accept",
      edit: "Edit",
      discard: "Discard",
      
      // Navigation
      next: "Next",
      previous: "Previous",
      submit: "Submit Application",
      submitting: "Submitting...",
      submitSuccess: "Application submitted successfully!",
      submitError: "Failed to submit application. Please try again.",
      
      // Language
      language: "Language",
      english: "English",
      arabic: "العربية",
      
      // Accessibility
      skipToContent: "Skip to main content",
      progressBar: "Application progress",
      formStep: "Form step",
      aiPopup: "AI writing assistant popup",
      
      // Validation
      required: "This field is required",
      invalidFormat: "Invalid format",
      minLength: "Minimum length is {{min}} characters",
      maxLength: "Maximum length is {{max}} characters",
      selectOption: "Please select an option",
    }
  },
  ar: {
    translation: {
      // Navigation
      title: "بوابة الدعم الاجتماعي",
      subtitle: "التقدم بطلب للحصول على المساعدة المالية",
      
      // Progress
      step1: "المعلومات الشخصية",
      step2: "معلومات العائلة والمالية",
      step3: "وصف الوضع",
      
      // Step 1 - Personal Information
      personalInfo: "المعلومات الشخصية",
      name: "الاسم الكامل",
      nameRequired: "الاسم مطلوب",
      nationalId: "رقم الهوية الوطنية",
      nationalIdRequired: "رقم الهوية الوطنية مطلوب",
      dateOfBirth: "تاريخ الميلاد",
      dateOfBirthRequired: "تاريخ الميلاد مطلوب",
      gender: "الجنس",
      genderRequired: "الجنس مطلوب",
      male: "ذكر",
      female: "أنثى",
      other: "آخر",
      address: "العنوان",
      addressRequired: "العنوان مطلوب",
      city: "المدينة",
      cityRequired: "المدينة مطلوبة",
      state: "الولاية/المحافظة",
      stateRequired: "الولاية/المحافظة مطلوبة",
      country: "البلد",
      countryRequired: "البلد مطلوب",
      phone: "رقم الهاتف",
      phoneRequired: "رقم الهاتف مطلوب",
      email: "عنوان البريد الإلكتروني",
      emailRequired: "البريد الإلكتروني مطلوب",
      emailInvalid: "يرجى إدخال عنوان بريد إلكتروني صحيح",
      
      // Step 2 - Family & Financial Info
      familyFinancialInfo: "معلومات العائلة والمالية",
      maritalStatus: "الحالة الاجتماعية",
      maritalStatusRequired: "الحالة الاجتماعية مطلوبة",
      single: "أعزب",
      married: "متزوج",
      divorced: "مطلق",
      widowed: "أرمل",
      dependents: "عدد المعالين",
      dependentsRequired: "عدد المعالين مطلوب",
      employmentStatus: "حالة التوظيف",
      employmentStatusRequired: "حالة التوظيف مطلوبة",
      employed: "موظف",
      unemployed: "عاطل عن العمل",
      selfEmployed: "يعمل لحسابه الخاص",
      retired: "متقاعد",
      student: "طالب",
      monthlyIncome: "الدخل الشهري",
      monthlyIncomeRequired: "الدخل الشهري مطلوب",
      housingStatus: "حالة السكن",
      housingStatusRequired: "حالة السكن مطلوبة",
      owned: "ملك",
      rented: "مستأجر",
      livingWithFamily: "يعيش مع العائلة",
      homeless: "بلا مأوى",
      
      // Step 3 - Situation Descriptions
      situationDescriptions: "وصف الوضع",
      currentFinancialSituation: "الوضع المالي الحالي",
      currentFinancialSituationRequired: "يرجى وصف وضعك المالي الحالي",
      employmentCircumstances: "ظروف التوظيف",
      employmentCircumstancesRequired: "يرجى وصف ظروف توظيفك",
      reasonForApplying: "سبب التقديم",
      reasonForApplyingRequired: "يرجى شرح سبب تقديمك للطلب",
      helpMeWrite: "ساعدني في الكتابة",
      
      // AI Assistance
      aiAssistance: "مساعد الكتابة بالذكاء الاصطناعي",
      aiGenerating: "جاري إنشاء الاقتراح...",
      aiError: "فشل في إنشاء الاقتراح. يرجى المحاولة مرة أخرى.",
      aiTimeout: "انتهت مهلة الطلب. يرجى المحاولة مرة أخرى.",
      accept: "قبول",
      edit: "تعديل",
      discard: "تجاهل",
      
      // Navigation
      next: "التالي",
      previous: "السابق",
      submit: "إرسال الطلب",
      submitting: "جاري الإرسال...",
      submitSuccess: "تم إرسال الطلب بنجاح!",
      submitError: "فشل في إرسال الطلب. يرجى المحاولة مرة أخرى.",
      
      // Language
      language: "اللغة",
      english: "English",
      arabic: "العربية",
      
      // Accessibility
      skipToContent: "انتقل إلى المحتوى الرئيسي",
      progressBar: "تقدم الطلب",
      formStep: "خطوة النموذج",
      aiPopup: "نافذة مساعد الكتابة بالذكاء الاصطناعي",
      
      // Validation
      required: "هذا الحقل مطلوب",
      invalidFormat: "تنسيق غير صحيح",
      minLength: "الحد الأدنى للطول هو {{min}} أحرف",
      maxLength: "الحد الأقصى للطول هو {{max}} أحرف",
      selectOption: "يرجى اختيار خيار",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
