 
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'; 

// Import your translation resources
import enTranslation from '../locale/en.json';

i18n 
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // For more options, check the documentation
    lng: 'en',
    fallbackLng: 'en',
    debug: false, 
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    resources: {
      en: {
        translation: enTranslation,
      },
    },
  });

export default i18n;
