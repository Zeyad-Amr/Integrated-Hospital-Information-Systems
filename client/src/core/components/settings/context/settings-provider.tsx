"use client";

import isEqual from "lodash/isEqual";
import { useEffect, useMemo, useCallback, useState } from "react";
// hooks
import { useLocalStorage } from "@/core/shared/hooks/use-local-storage";
// utils
import { localStorageGetItem } from "@/core/shared/utils/storage-available";
//
import { SettingsValueProps } from "../types";
import { SettingsContext } from "./settings-context";
// ----------------------------------------------------------------------

const STORAGE_KEY = "settings";

type SettingsProviderProps = {
  children: React.ReactNode;
  defaultSettings: SettingsValueProps;
};

// themeMode: "light", // 'light' | 'dark'
// themeDirection: "rtl", //  'rtl' | 'ltr'
// themeContrast: "default", // 'default' | 'bold'
// themeLayout: "vertical", // 'vertical' | 'horizontal' | 'mini'
// themeColorPresets: "default", // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
// themeStretch: false,

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
    },
    [update]
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
    ]
  );

  return (
    <SettingsContext.Provider value={memoizedValue}>
      {children}
    </SettingsContext.Provider>
  );
}
