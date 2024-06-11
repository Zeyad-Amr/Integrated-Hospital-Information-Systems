import AllergiesComponent from "@/modules/emr/view/components/allergies/AllergiesComponent";
import DiagnosisComponent from "@/modules/emr/view/components/diagnosis/DiagnosisComponent";
import MedicalProblemsComponent from "@/modules/emr/view/components/medical-problems/MedicalProblemsComponent";
import MedicationsComponent from "@/modules/emr/view/components/medications/MedicationsComponent";
import PrescriptionsComponent from "@/modules/emr/view/components/prescriptions/PrescriptionsComponent";
import SurgeriesComponent from "@/modules/emr/view/components/surgeries/SurgeriesComponent";
import { Grid } from "@mui/material";
import React from "react";

const PatientHistory = () => {
  return (
    <Grid container spacing={1}>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <DiagnosisComponent />
          </Grid>
          <Grid item xs={12}>
            <MedicationsComponent />
          </Grid>
          <Grid item xs={12}>
            <SurgeriesComponent />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <AllergiesComponent />
          </Grid>
          <Grid item xs={12}>
            <PrescriptionsComponent />
          </Grid>
          <Grid item xs={12}>
            <MedicalProblemsComponent />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PatientHistory;
