import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import th from './locales/th.json';

export const defaultNS = 'th';

i18next.use(initReactI18next).init({
  lng: 'th', // if you're using a language detector, do not define the lng option
  debug: true,
  resources: {
    en: {
      en
    },
    th: {
      th
    }
  },
  defaultNS,
});