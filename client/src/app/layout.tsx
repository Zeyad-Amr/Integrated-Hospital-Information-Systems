// theme
import ThemeProvider from "@/core/theme";
import { primaryFont } from "@/core/theme/typography";
import { SettingsProvider } from "@/core/components/settings";
import "./globals.css";
import { StoreProvider } from "@/core/state/provider";
import { ServiceLocatorProvider } from "@/core/service-locator/provider";
import { AppProvider } from "@/core/shared/modules/lookups/presentation";
import { Metadata } from "next";

// ----------------------------------------------------------------------
export const metadata: Metadata = {
  title: "Qasr HIS",
  description:
    "Qasr HIS is a hospital information system that helps you to manage your hospital.",
  keywords: "hospital, information, system, qasr, his, qasr his, qasr-his",
};
type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html className={primaryFont.className}>
      <body>
        <ServiceLocatorProvider>
          <StoreProvider>
            <SettingsProvider
              defaultSettings={{
                themeMode: "light", // 'light' | 'dark'
                themeDirection: "rtl", // 'ltr' | 'rtl'
                themeContrast: "default", // 'default' | 'bold'
                themeLayout: "vertical", // 'vertical' | 'horizontal' | 'mini'
                themeColorPresets: "default", // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                themeStretch: false,
              }}
            >
              <ThemeProvider>
                <AppProvider>{children}</AppProvider>
              </ThemeProvider>
            </SettingsProvider>
          </StoreProvider>
        </ServiceLocatorProvider>
      </body>
    </html>
  );
}
