"use client";
import { useEffect, useMemo, useCallback } from "react";
import { useLocalStorage } from "@/core/shared/hooks/use-local-storage";
import { localStorageGetItem } from "@/core/shared/utils/storage-available";
import { SettingsValueProps } from "../types";
import { SettingsContext } from "./settings-context";
// ----------------------------------------------------------------------

const STORAGE_KEY = "settings";

type SettingsProviderProps = {
  children: React.ReactNode;
  defaultSettings: SettingsValueProps;
};

export function SettingsProvider({
  children,
  defaultSettings,
}: SettingsProviderProps) {
  const { state, update } = useLocalStorage(STORAGE_KEY, defaultSettings);

  const isArabic = localStorageGetItem("i18nextLng") === "ar";

  useEffect(() => {
    if (isArabic) {
      onChangeDirectionByLang("ar");
    }
  }, []);

  // Direction by lang
  const onChangeDirectionByLang = useCallback(
    (lang: string) => {
      update("themeDirection", lang === "ar" ? "rtl" : "ltr");
    },
    [update]
  );

  const memoizedValue = useMemo(
    () => ({
      ...state,
      onUpdate: update,
      // Direction
      onChangeDirectionByLang,
    }),
    [update, state, onChangeDirectionByLang]
  );

  return (
    <SettingsContext.Provider value={memoizedValue}>
      {children}
    </SettingsContext.Provider>
  );
}
// themeMode: "light", // 'light' | 'dark'
// themeDirection: "rtl", //  'rtl' | 'ltr'
// themeContrast: "default", // 'default' | 'bold'
// themeLayout: "vertical", // 'vertical' | 'horizontal' | 'mini'
// themeColorPresets: "default", // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
// themeStretch: false,
