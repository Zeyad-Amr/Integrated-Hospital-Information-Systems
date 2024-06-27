"use client";

import useLocalization from "@/core/localization/useLocalization";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export default function Localization() {
  const { changeLanguage } = useLocalization();
  const { t } = useTranslation();

  return (
    <Box>
      <Box>
        <button onClick={() => changeLanguage("ar")}>Change to Arabic</button>
        <button onClick={() => changeLanguage("en")}>Change to English</button>
      </Box>

      <Typography>{t("welcome")}</Typography>
    </Box>
  );
}
