import CustomTextField from "@/core/shared/components/CustomTextField";
import { ExaminationFormComponentPropsInterface } from "@/core/shared/components/ExaminationAccordion";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { useAppDispatch } from "@/core/state/store";
import {
  createLab,
  updateLab,
} from "@/modules/emr/controllers/thunks/labs-thunk";
import { LabsInterface } from "@/modules/emr/interfaces/labs-interface";
import LabsModel from "@/modules/emr/models/labs-model";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import React from "react";

const LabsForm = ({
  patientId,
  visitCode,
  initialValues,
  isViewMode,
  setShowFormDialog,
}: ExaminationFormComponentPropsInterface) => {
  const dispatch = useAppDispatch();
  return (
    <Formik
      initialValues={
        initialValues
          ? ({
              ...initialValues,

            } as LabsInterface)
          : LabsModel.defaultValues()
      }
      onSubmit={async (values) => {
        const submitObject = {
          ...values,
          patientId: patientId,
          visitCode: visitCode,
        };

        const action = initialValues
          ? updateLab(submitObject)
          : createLab(submitObject);

        dispatch(action).then((res) => {
          if (res?.meta.requestStatus == "fulfilled") {
            setShowFormDialog(false);
          }
        });
      }}
      validationSchema={LabsModel.labsFormValidations()}
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
          <Grid container spacing={1}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <CustomTextField
                isRequired
                name="cvp"
                label="ضغط الوريد المركزي"
                value={values.CVP}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.CVP}
                touched={touched.CVP}
                width="100%"
                props={{
                  type: "number",
                  disabled: isViewMode,
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomTextField
                name="GCS"
                label="مقياس غلاسكو للغيبوبة"
                value={values.GCS}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.GCS}
                touched={touched.GCS}
                width="100%"
                props={{
                  type: "number",
                  disabled: isViewMode,
                }}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomTextField
                name="PR"
                label="معدل النبض"
                value={values.PR}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.PR}
                touched={touched.PR}
                width="100%"
                props={{
                  type: "number",
                  disabled: isViewMode,
                }}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomTextField
                name="RR"
                label="معدل ألتنفس"
                value={values.RR}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.RR}
                touched={touched.RR}
                width="100%"
                props={{
                  type: "number",
                  disabled: isViewMode,
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomTextField
                name="SpO2"
                label=" نسبة الأكسجين في الدم"
                value={values.SpO2}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.SpO2}
                touched={touched.SpO2}
                width="100%"
                props={{
                  type: "number",
                  disabled: isViewMode,
                }}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomTextField
                name="temp"
                label="درجة الحرارة"
                value={values.temp}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.temp}
                touched={touched.temp}
                width="100%"
                props={{
                  type: "number",
                  disabled: isViewMode,
                }}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomTextField
                name="SBP"
                label="ضغط الدم الانقباضي"
                value={values.SBP}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.SBP}
                touched={touched.SBP}
                width="100%"
                props={{
                  type: "number",
                  disabled: isViewMode,
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomTextField
                name="DBP"
                label="ضغط الدم الانبساطي"
                value={values.DBP}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.DBP}
                touched={touched.DBP}
                width="100%"
                props={{
                  type: "number",
                  disabled: isViewMode,
                }}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomTextField
                name="weight"
                label="الوزن"
                value={values.weight}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.weight}
                touched={touched.weight}
                width="100%"
                props={{
                  type: "number",
                  disabled: isViewMode,
                }}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomTextField
                name="height"
                label="الطول"
                value={values.height}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.height}
                touched={touched.height}
                width="100%"
                props={{
                  type: "number",
                  disabled: isViewMode,
                }}
              />
            </Grid>
          </Grid>

          {!isViewMode ? (
            <PrimaryButton
              title={initialValues ? "حفــــظ" : "اضـــافة"}
              type="submit"
            />
          ) : null}
        </Box>
      )}
    </Formik>
  );
};

export default LabsForm;
