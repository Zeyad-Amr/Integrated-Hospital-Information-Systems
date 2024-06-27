import { useTranslation } from "react-i18next";
import { useSettingsContext } from "../components/settings";

const useLocalization = () => {
  // get current language
  const { t } = useTranslation();
  const { onChangeDirectionByLang, isArabic } = useSettingsContext();

  // toggle language

  const toggleLanguage = () => {
    if (isArabic) {
      onChangeDirectionByLang("en");
    } else {
      onChangeDirectionByLang("ar");
    }
  };

  return {
    t,
    currentLanguage: isArabic ? "ar" : "en",
    changeLanguage: onChangeDirectionByLang,
    toggleLanguage,
  };
};

export default useLocalization;
