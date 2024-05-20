/*import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';
import {I18n} from 'i18n-js';
//import i18n from 'i18n-js'; 
import en from './en.json';
import fr from './fr.json';

const translations = {
  en: en,
  fr: fr,
};

const i18n = new I18n(translations);

i18n.defaultLocale = 'fr-CA';
i18n.locale = 'fr';
i18n.fallbacks = true;
i18n.translations = translations;

export const changeLanguage = (language) => {
  i18n.locale = language; 
 // I18nManager.forceRTL(language === 'ar');
};

/*
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
};*/

//export default i18n; 
