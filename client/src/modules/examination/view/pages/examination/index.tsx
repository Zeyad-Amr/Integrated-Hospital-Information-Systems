import Tabs from "@/core/shared/components/tabs/Tabs";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import ExaminationHeader from "../../components/ExaminationHeader";
import PatientHistory from "../../components/PatientHistory";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/core/state/store";
import { getVisitByCode } from "@/modules/registration/presentation/controllers/thunks/visits-thunks";
import { VisitsState } from "@/modules/registration/presentation/controllers/types";
import { AuthState } from "@/modules/auth/presentation/controllers/types";

const ExaminationPage = () => {
  const { visitId } = useParams();
  console.log("visitId", visitId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getVisitByCode(visitId as string));
  }, []);
  const visitState: VisitsState = useAppSelector((state: any) => state.visits);
  const authState: AuthState = useAppSelector((state: any) => state.auth);
  console.log("currentVisit", visitState.currentVisit);

  return (
    !visitState.loading && (
      <Box>
        <ExaminationHeader
          patientName={
            visitState.currentVisit.patient?.firstName +
            " " +
            visitState.currentVisit.patient?.secondName
          }
          clinicName={authState.currentPermission?.subDepartment?.name}
          visitId={visitId as string}
        />
        <Tabs
          Tabs={[
            { name: "السجل المرضي", content: <PatientHistory visitState={visitState} /> },
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
      </Box>
    )
  );
};

export default ExaminationPage;
