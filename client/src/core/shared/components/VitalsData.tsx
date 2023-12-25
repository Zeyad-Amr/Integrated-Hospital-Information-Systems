import React, { useEffect, useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Box, Button, Grid } from "@mui/material";
import CustomTextField from "./CustomTextField";

export interface VitalsDataValuesI {
  painScore: number | undefined;
  SPO2: number | undefined;
  temperature: number | undefined;
  pulseRate: number | undefined;
  respiratoryRate: number | undefined;
  CVP: number | undefined;
  GCS: number | undefined;
  diastolicPressure: number | undefined;
  systolicPressure: number | undefined;
}

interface VitalsDataPropsI {
  initialValues: VitalsDataValuesI;
  onSubmit: (values: VitalsDataValuesI) => void;
  isSubmitted: boolean;
  isResetForm?: boolean;
}

const VitalsData = ({
  initialValues,
  onSubmit,
  isSubmitted,
  isResetForm,
}: VitalsDataPropsI) => {
  const refSubmitButton: any = useRef(null);
  const checkFirstRender = useRef(true);
  const checkFirstRender2 = useRef(true);
  useEffect(() => {
    if (checkFirstRender.current) {
      checkFirstRender.current = false;
    } else {
      if (checkFirstRender2.current) {
        checkFirstRender2.current = false;
      } else {
        if (refSubmitButton.current) {
          refSubmitButton.current.click();
        }
      }
    }
  }, [isSubmitted]);

  const handleFormSchema = Yup.object({
    temperature: Yup.string()
      .required("درجة الحرارة مطلوبة")
      .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),

    systolicPressure: Yup.string()
      .required("ضغط الدم الانقباضي مطلوب")
      .matches(/^\d+$/, "يجب ألا تحتوي على أرقام عشرية")
      .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),

    diastolicPressure: Yup.string()
      .required("ضغط الدم الانبساطي مطلوب")
      .matches(/^\d+$/, "يجب ألا تحتوي على أرقام عشرية")
      .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),

    GCS: Yup.string()
      .required("درجة تحسس الوعي مطلوبة")
      .matches(/^\d+$/, "يجب ألا تحتوي على أرقام عشرية")
      .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),

    CVP: Yup.string()
      .required("ضغط الوريد المركزي مطلوب")
      .matches(/^\d+$/, "يجب ألا تحتوي على أرقام عشرية")
      .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),

    respiratoryRate: Yup.string()
      .required("معدل التنفس مطلوب")
      .matches(/^\d+$/, "يجب ألا تحتوي على أرقام عشرية")
      .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),

    pulseRate: Yup.string()
      .required("معدل نبضات القلب مطلوب")
      .matches(/^\d+$/, "يجب ألا تحتوي على أرقام عشرية")
      .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),

    SPO2: Yup.string()
      .required("مستوى تشبع الأكسجين في الدم مطلوب")
      .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),

    painScore: Yup.string()
      .required("درجة الألم مطلوبة")
      .matches(/^\d+$/, "يجب ألا تحتوي على أرقام عشرية")
      .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),
  });

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
      validationSchema={handleFormSchema}
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
                isRequired
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
                isRequired
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
                isRequired
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
                isRequired
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
                isRequired
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
                isRequired
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
                isRequired
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
                isRequired
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
                isRequired
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
