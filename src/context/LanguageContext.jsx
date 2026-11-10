import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { LanguageContext } from "./LanguageContextObject.js";
import { translations } from "./translations.js";

const LANGUAGE_STORAGE_KEY = "nandavaram-language";

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);

      return savedLanguage === "te" ? "te" : "en";
    } catch {
      return "en";
    }
  });

  const changeLanguage = useCallback((newLanguage) => {
    if (!Object.prototype.hasOwnProperty.call(translations, newLanguage)) {
      return;
    }

    setLanguage(newLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;

    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Language switching remains available without browser storage.
    }
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      changeLanguage,
      translations: translations[language],
      isTelugu: language === "te",
    }),
    [language, changeLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}