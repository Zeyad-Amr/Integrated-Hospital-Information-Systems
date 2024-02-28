import React from "react";
import { Formik } from "formik";
import { Box, Button, Grid } from "@mui/material";
import CustomTextField from "./CustomTextField";
import VitalsEntity from "@/modules/er-area/domain/entities/vitals-entity";
import VitalsInterface from "@/modules/er-area/domain/interfaces/vitals-interface";

interface VitalsDataPropsI {
  initialValues: VitalsInterface;
  onSubmit: (values: VitalsInterface) => void;
  refSubmitButton: React.MutableRefObject<null>;
  isResetForm?: boolean;
}

const VitalsData = ({
  initialValues,
  onSubmit,
  refSubmitButton,
  isResetForm,
}: VitalsDataPropsI) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        painScore: initialValues.painScore,
        SPO2: initialValues.SPO2,
        temperature: initialValues.temperature,
        pulseRate: initialValues.pulseRate,
        respiratoryRate: initialValues.respiratoryRate,
        CVP: initialValues.CVP,
        GCS: initialValues.GCS,
        diastolicPressure: initialValues.diastolicPressure,
        systolicPressure: initialValues.systolicPressure,
      }}
      validationSchema={VitalsEntity.getSchema()}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        if (isResetForm) {
          resetForm();
        }
      }}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container columns={12} spacing={2}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CustomTextField
                name="temperature"
                label="°C درجة الحرارة"
                value={values.temperature}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.temperature}
                touched={touched.temperature}
                width="100%"
                props={{
                  type: "number",
                }}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CustomTextField
                name="GCS"
                label="درجة تحسس الوعي"
                value={values.GCS}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.GCS}
                touched={touched.GCS}
                width="100%"
                props={{
                  type: "number",
                }}
              />
            </Grid>

            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CustomTextField
                name="systolicPressure"
                label="mmHg ضغط الدم الانقباضي"
                value={values.systolicPressure}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.systolicPressure}
                touched={touched.systolicPressure}
                width="100%"
                props={{
                  type: "number",
                }}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CustomTextField
                name="diastolicPressure"
                label="mmHg ضغط الدم الانبساطي"
                value={values.diastolicPressure}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.diastolicPressure}
                touched={touched.diastolicPressure}
                width="100%"
                props={{
                  type: "number",
                }}
              />
            </Grid>
          </Grid>

          <Grid container columns={12} spacing={2}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CustomTextField
                name="CVP"
                label="mmHg ضغط الوريد المركزي"
                value={values.CVP}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.CVP}
                touched={touched.CVP}
                width="100%"
                props={{
                  type: "number",
                }}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CustomTextField
                name="respiratoryRate"
                label="bpm معدل التنفس"
                value={values.respiratoryRate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.respiratoryRate}
                touched={touched.respiratoryRate}
                width="100%"
                props={{
                  type: "number",
                }}
              />
            </Grid>

            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CustomTextField
                name="pulseRate"
                label="bpm معدل نبضات القلب"
                value={values.pulseRate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.pulseRate}
                touched={touched.pulseRate}
                width="100%"
                props={{
                  type: "number",
                }}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CustomTextField
                name="SPO2"
                label="مستوى تشبع الأكسجين في الدم"
                value={values.SPO2}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.SPO2}
                touched={touched.SPO2}
                width="100%"
                props={{
                  type: "number",
                }}
              />
            </Grid>
          </Grid>
          {/*  */}
          <Grid container columns={12} spacing={2}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CustomTextField
                name="painScore"
                label="درجة الألم"
                value={values.painScore}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.painScore}
                touched={touched.painScore}
                width="100%"
                props={{
                  type: "number",
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            sx={{ display: "none" }}
            ref={refSubmitButton}
          ></Button>
        </Box>
      )}
    </Formik>
  );
};

export default VitalsData;
