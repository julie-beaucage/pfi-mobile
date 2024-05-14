import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';
import i18n from 'i18n-js'; // Import directly from 'i18n-js' instead of destructuring
import en from './en.json';
import fr from './fr.json';

const resources = {
  en: en,
  fr: fr,
};

// Initialize i18n with the necessary configurations
i18n.defaultLocale = 'fr';
i18n.locale = 'fr';
i18n.fallbacks = true;
i18n.translations = resources;

export const changeLanguage = (language) => {
  i18n.locale = language; // Change the locale directly
  I18nManager.forceRTL(language === 'ar'); // If needed for RTL languages
};

export const loadLocale = async () => {
  for (const locale of Localization.locales) {
    if (i18n.translations[locale.languageCode] !== null) {
      i18n.locale = locale.languageCode;
      switch (locale.languageCode) {
        case 'en':
          i18n.translations = { ...resources.en };
          break;
        case 'fr':
        default:
          i18n.translations = { ...resources.fr };
          break;
      }
      break;
    }
  }
};

export default i18n; // Export i18n itself
