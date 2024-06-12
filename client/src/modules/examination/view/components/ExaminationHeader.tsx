import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useRouter } from "next/navigation";
import { VisitStatus } from "@/modules/registration/domain/entities/visit-entity";
import { useAppDispatch } from "@/core/state/store";
import { createVisitTransfer } from "@/modules/registration/presentation/controllers/thunks/visits-thunks";

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
  const router = useRouter();
  const dispatch = useAppDispatch();

  const transferPatientVisit = (status: VisitStatus, visitCode: string) => {
    dispatch(
      createVisitTransfer({ status: status, visitCode: visitCode })
    ).then((res) => {
      if (res.meta.requestStatus == "fulfilled") {
        router.push("/dashboard/clinic/visits");
      }
    });
  };
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
          transferPatientVisit(VisitStatus.EXAMINED, visitId);
        }}
      />
    </Box>
  );
};

export default ExaminationHeader;
