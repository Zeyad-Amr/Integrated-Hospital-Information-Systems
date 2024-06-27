/** @type {import('next').NextConfig} */

const defaultLanguage = "ar";
const langs = ["en", "ar"];
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // https://nextjs.org/docs/advanced-features/i18n-routing
  i18n: {
    localeDetection: false,
    locales: langs,
    defaultLocale: defaultLanguage,
  },
};

module.exports = nextConfig;
