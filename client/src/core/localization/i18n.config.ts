import LanguageDetector from "i18next-browser-languagedetector";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const defaultLanguage = "ar";
const langs = ["en", "ar"];
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: defaultLanguage,
    supportedLngs: langs,
    load: "currentOnly",
    lowerCaseLng: true,
    preload: langs,
    resources: {
      en: {
        translation: require("./locales/en.json"),
      },
      ar: {
        translation: require("./locales/ar.json"),
      },
    },
    detection: {
      order: ["path", "cookie", "navigator", "htmlTag"],
      caches: ["cookie"],
      cookieMinutes: 60,
    },
  });

export default i18n;
