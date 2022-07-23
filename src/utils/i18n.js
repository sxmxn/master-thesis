import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from '../i18n/de.json';
import en from '../i18n/en.json';

export const resources = {
  de: {
    translation: { ...de },
  },
  en: {
    translation: { ...en },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
