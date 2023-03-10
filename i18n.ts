import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import translation_en from './src/translations/en/translation.json';
import translation_fr from './src/translations/fr/translation.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'fr',
    debug: true,
    lng: 'fr',
    resources: {
      en: {
        translation: translation_en,
      },
      fr: {
        translation: translation_fr,
      },
    },
  });

export default i18n;
