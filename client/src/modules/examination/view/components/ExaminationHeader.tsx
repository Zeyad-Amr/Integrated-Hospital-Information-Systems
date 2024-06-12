import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useRouter } from "next/navigation";

interface ExaminationHeaderProps {
  patientName: string;
  clinicName: string;
}

const ExaminationHeader = ({
  patientName,
  clinicName,
}: ExaminationHeaderProps) => {
  const router = useRouter();
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
      <PrimaryButton
        title="انهاء الزيارة"
        onClick={() => {
          console.log("انهاء الزيارة");
          router.push("/dashboard/clinic/visits");
        }}
      />
    </Box>
  );
};

export default ExaminationHeader;
