import AllergiesComponent from "@/modules/emr/view/components/allergies/AllergiesComponent";
import DiagnosisComponent from "@/modules/emr/view/components/diagnosis/DiagnosisComponent";
import MedicalProblemsComponent from "@/modules/emr/view/components/medical-problems/MedicalProblemsComponent";
import MedicationsComponent from "@/modules/emr/view/components/medications/MedicationsComponent";
import PrescriptionsComponent from "@/modules/emr/view/components/prescriptions/PrescriptionsComponent";
import SurgeriesComponent from "@/modules/emr/view/components/surgeries/SurgeriesComponent";
import { Grid } from "@mui/material";
import React from "react";
import AddComplaint from "./AddComplaint";
import { VisitsState } from "@/modules/registration/presentation/controllers/types";
import VitalsComponent from "@/modules/emr/view/components/vitals/VitalsComponent";

interface PatientHistoryPropsInterface {
  visitState: VisitsState;
}

const PatientHistory = ({ visitState }: PatientHistoryPropsInterface) => {
  return (
    <>
      <Grid container spacing={1} sx={{ mb: 2 }}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          {visitState?.currentVisit?.code && (
            <AddComplaint visitCode={visitState?.currentVisit?.code} />
          )}
        </Grid>
        {/* <Grid item lg={8} md={8} sm={12} xs={12}>
          <DemographicData />
        </Grid> */}
      </Grid>

      <Grid container spacing={1}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {visitState?.currentVisit?.patientId &&
                visitState?.currentVisit?.code && (
                  <DiagnosisComponent
                    patientId={visitState?.currentVisit?.patientId}
                    visitCode={visitState?.currentVisit?.code}
                  />
                )}
            </Grid>
            <Grid item xs={12}>
              {visitState?.currentVisit?.patientId && (
                <MedicationsComponent
                  patientId={visitState?.currentVisit?.patientId}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {visitState?.currentVisit?.patientId &&
                visitState?.currentVisit?.code && (
                  <SurgeriesComponent
                    patientId={visitState?.currentVisit?.patientId}
                    visitCode={visitState?.currentVisit?.code}
                  />
                )}
            </Grid>
            <Grid item xs={12}>
              {visitState?.currentVisit?.patientId &&
                visitState?.currentVisit?.code && (
                  <VitalsComponent
                    patientId={visitState?.currentVisit?.patientId}
                    visitCode={visitState?.currentVisit?.code}
                  />
                )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {visitState?.currentVisit?.patientId && (
                <AllergiesComponent
                  patientId={visitState?.currentVisit?.patientId}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {visitState?.currentVisit?.patientId &&
                visitState?.currentVisit?.code && (
                  <PrescriptionsComponent
                    patientId={visitState?.currentVisit?.patientId}
                    visitCode={visitState?.currentVisit?.code}
                  />
                )}
            </Grid>
            <Grid item xs={12}>
              {visitState?.currentVisit?.patientId && (
                <MedicalProblemsComponent
                  patientId={visitState?.currentVisit?.patientId}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PatientHistory;
