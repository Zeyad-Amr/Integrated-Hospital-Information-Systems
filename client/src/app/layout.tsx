// theme
import ThemeProvider from "@/core/theme";
import { primaryFont } from "@/core/theme/typography";
// components
// import ProgressBar from "@/core/shared/components/progress-bar";
// import { MotionLazy } from "@/core/shared/components/animate/motion-lazy";
// import SnackbarProvider from "@/core/shared/components/snackbar/snackbar-provider";
import {
  SettingsProvider,
  // SettingsDrawer,
} from "@/core/components/settings";
import "./globals.css";
import type { Metadata } from "next";
import { AppServicesLocator } from "@/core/service-locator";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Qasr HIS",
  description:
    "Qasr HIS is a hospital information system that helps you to manage your hospital.",
  keywords: "hospital, information, system, qasr, his, qasr his, qasr-his",
  themeColor: "#000000",
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: [
    {
      rel: "icon",
      url: "/favicon/favicon.ico",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicon/apple-touch-icon.png",
    },
  ],
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  AppServicesLocator.init();
  return (
    <html lang="en" className={primaryFont.className}>
      <body>
        <SettingsProvider
          defaultSettings={{
            themeMode: "light", // 'light' | 'dark'
            themeDirection: "rtl", //  'rtl' | 'ltr'
            themeContrast: "default", // 'default' | 'bold'
            themeLayout: "vertical", // 'vertical' | 'horizontal' | 'mini'
            themeColorPresets: "default", // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            themeStretch: false,
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
