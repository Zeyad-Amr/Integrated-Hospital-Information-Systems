import Tabs from "@/core/shared/components/tabs/Tabs";
import { Box } from "@mui/system";
import React from "react";
import ExaminationHeader from "../../components/ExaminationHeader";
import PatientHistory from "../../components/PatientHistory";
import { useParams } from "next/navigation";

const ExaminationPage = () => {
  const { visitId } = useParams();
  console.log("visitId", visitId);
  return (
    <>
      <ExaminationHeader patientName="باسل توفيق" clinicName="امراض تناسلية" />
      <Tabs
        Tabs={[
          { name: "السجل المرضي", content: <PatientHistory /> },
          { name: "المعامل", content: <Box>المعامل</Box> },
          { name: "الأشعة", content: <Box>الأشعة</Box> },
          {
            name: "الاستشارة",
            content: (
              <Box>
                <Box>الاستشارة</Box>
                <Box>الاستشارة</Box>
                <Box>الاستشارة</Box>
                <Box>الاستشارة</Box>
                <Box>الاستشارة</Box>
                <Box>الاستشارة</Box>
                <Box>الاستشارة</Box>
                <Box>الاستشارة</Box>
                <Box>الاستشارة</Box>
                <Box>الاستشارة</Box>
                <Box>الاستشارة</Box>
                <Box>الاستشارة</Box>
                <Box>الاستشارة</Box>
                <Box>الاستشارة</Box>
                <Box>الاستشارة</Box>
                <Box>الاستشارة</Box>
                <Box>الاستشارة</Box>
                <Box>الاستشارة</Box>
                <Box>الاستشارة</Box>
                <Box>الاستشارة</Box>
                <Box>الاستشارة</Box>
                <Box>الاستشارة</Box>
                <Box>الاستشارة</Box>
                <Box>الاستشارة</Box>
                <Box>الاستشارة</Box>
              </Box>
            ),
          },
        ]}
      />
    </>
  );
};

export default ExaminationPage;
