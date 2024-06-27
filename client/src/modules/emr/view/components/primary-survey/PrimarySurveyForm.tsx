import CustomTextField from "@/core/shared/components/CustomTextField";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { useAppDispatch } from "@/core/state/store";
import { createPrimarySurvey } from "@/modules/emr/controllers/thunks/primary-survey-thunk";
import { PrimarySurveyInterface } from "@/modules/emr/interfaces/primary-survey-interface";
import PrimarySurveyModel from "@/modules/emr/models/primary-survey-model";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import React from "react";

interface PrimarySurveyFormPropsInterface {
  visitCode : string
  initialValues? : PrimarySurveyInterface
  isViewMode : boolean
}

const PrimarySurveyForm = ({
  visitCode,
  initialValues,
  isViewMode,
}: PrimarySurveyFormPropsInterface) => {
  const dispatch = useAppDispatch();
  return (
    <Formik
      enableReinitialize
      initialValues={
        initialValues
          ? ({
              ...initialValues,
            } as PrimarySurveyInterface)
          : PrimarySurveyModel.defaultValues()
      }
      onSubmit={async (values) => {
        const submitObject = {
          ...values,
          visitCode: visitCode,
        };

        dispatch(createPrimarySurvey(submitObject)).then((res) => {
          if (res?.meta.requestStatus == "fulfilled") {
            
          }
        });
      }}
      validationSchema={PrimarySurveyModel.primarySurveyFormValidations()}
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
                name="airway"
                label="المجرى الهوائي"
                value={values.airway}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.airway}
                touched={touched.airway}
                width="100%"
                props={{
                  type: "text",
                  disabled: !!(isViewMode && initialValues)
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <CustomTextField
                isRequired
                name="breathing"
                label="التنفس"
                value={values.breathing}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.breathing}
                touched={touched.breathing}
                width="100%"
                props={{
                  type: "text",
                  disabled: !!(isViewMode && initialValues)
                }}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <CustomTextField
                isRequired
                name="circulation"
                label="الدورة الدموية"
                value={values.circulation}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.circulation}
                touched={touched.circulation}
                width="100%"
                props={{
                  type: "text",
                  disabled: !!(isViewMode && initialValues)
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <CustomTextField
                isRequired
                name="disability"
                label="الإعاقة"
                value={values.disability}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.disability}
                touched={touched.disability}
                width="100%"
                props={{
                  type: "text",
                  disabled: !!(isViewMode && initialValues)
                }}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <CustomTextField
                isRequired
                name="exposure"
                label="التعرض"
                value={values.exposure}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.exposure}
                touched={touched.exposure}
                width="100%"
                props={{
                  type: "text",
                  disabled: !!(isViewMode && initialValues)
                }}
              />
            </Grid>
          </Grid>

          {!isViewMode && !initialValues ? (
            <PrimaryButton
              title="اضـــافة"
              type="submit"
            />
          ) : null}
        </Box>
      )}
    </Formik>
  );
};

export default PrimarySurveyForm;
