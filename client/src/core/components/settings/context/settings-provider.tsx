"use client";
import isEqual from "lodash/isEqual";
import { useEffect, useMemo, useCallback, useState } from "react";
import { useLocalStorage } from "@/core/shared/hooks/use-local-storage";
import { localStorageGetItem } from "@/core/shared/utils/storage-available";
import { SettingsValueProps } from "../types";
import { SettingsContext } from "./settings-context";
import i18n from "@/core/localization/i18n.config";

const STORAGE_KEY = "settings";

type SettingsProviderProps = {
  children: React.ReactNode;
  defaultSettings: SettingsValueProps;
};

export function SettingsProvider({
  children,
  defaultSettings,
}: SettingsProviderProps) {
  const { state, update, reset } = useLocalStorage(
    STORAGE_KEY,
    defaultSettings
  );
  const [openDrawer, setOpenDrawer] = useState(false);

  const isArabic = localStorageGetItem("i18nextLng") === "ar";

  useEffect(() => {
    if (isArabic) {
      onChangeDirectionByLang("ar");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isArabic]);

  // Direction by lang
  const onChangeDirectionByLang = useCallback(
    (lang: string) => {
      update("themeDirection", lang === "ar" ? "rtl" : "ltr");
      i18n.changeLanguage(lang);
    },
    [update, i18n]
  );

  // Drawer
  const onToggleDrawer = useCallback(() => {
    setOpenDrawer((prev) => !prev);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const canReset = !isEqual(state, defaultSettings);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      onUpdate: update,
      // Direction
      onChangeDirectionByLang,
      // Reset
      canReset,
      onReset: reset,
      // Drawer
      open: openDrawer,
      onToggle: onToggleDrawer,
      onClose: onCloseDrawer,
      isArabic,
    }),
    [
      reset,
      update,
      state,
      canReset,
      openDrawer,
      onCloseDrawer,
      onToggleDrawer,
      onChangeDirectionByLang,
      isArabic,
    ]
  );

  return (
    <SettingsContext.Provider value={memoizedValue}>
      {children}
    </SettingsContext.Provider>
  );
}
