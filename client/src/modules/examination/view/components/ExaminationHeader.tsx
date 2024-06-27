import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import EndExaminationForm from "./EndExaminationForm";

interface ExaminationHeaderProps {
  patientName: string;
  clinicName: string;
  visitId: string;
}

const ExaminationHeader = ({
  patientName,
  clinicName,
  visitId,
}: ExaminationHeaderProps) => {
  const [discharge, setDischarge] = useState<boolean>(false);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "primary.dark",
        color: "white",
        width: "95%",
        margin: "0 auto",
        padding: "0.5rem 1rem",
        borderTopLeftRadius: "5px",
        borderTopRightRadius: "5px",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Typography> {patientName}</Typography>
        <Box sx={{ width: "1px", backgroundColor: "#fff" }} />
        <Typography> {clinicName}</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            backgroundColor: "primary.dark",
            color: discharge ? "#fff" : "#888",
            display: "flex",
            border: discharge ? "1px solid #fff" : "1px solid #888",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "5px",
            width: "max-content",
            cursor: "pointer",
            transition: "0.2s",
            userSelect: "none",
            fontSize: "0.9rem",
            height: "40px",
            padding: "0 1rem",
            boxSizing: "border-box",
            mr: 2,
            opacity: discharge ? 1 : 0.8,
          }}
          onClick={() => setDischarge(!discharge)}
        >
          <Typography>خروج</Typography>
        </Box>
        <EndExaminationForm discharge={discharge} visitId={visitId} />
      </Box>
    </Box>
  );
};

export default ExaminationHeader;
