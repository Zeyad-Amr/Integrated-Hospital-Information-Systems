import CustomTextField from "@/core/shared/components/CustomTextField";
import { ExaminationFormComponentPropsInterface } from "@/core/shared/components/ExaminationAccordion";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { useAppDispatch } from "@/core/state/store";
import {
  createAllergy,
  updateAllergy,
} from "@/modules/emr/controllers/thunks/allergies-thunk";
import { AllergiesInterface } from "@/modules/emr/interfaces/allergies-interface";
import AllergiesModel from "@/modules/emr/models/allergies-model";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import React from "react";

const AllergiesForm = ({
  patientId,
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
              endDate: initialValues?.endDate?.split("T")[0],
              beginDate: initialValues?.beginDate?.split("T")[0],
            } as AllergiesInterface)
          : AllergiesModel.defaultValues()
      }
      onSubmit={async (values) => {
        console.log(values);
        const action = initialValues
          ? updateAllergy({
              ...values,
              patientId: "0bdfe596-d938-4214-9aed-a25c3ada56bf",
            })
          : createAllergy({ ...values, patientId: "0bdfe596-d938-4214-9aed-a25c3ada56bf" });
        dispatch(action).then((res) => {
          if (res?.meta.requestStatus == "fulfilled") {
            setShowFormDialog(false);
          }
        });
      }}
      validationSchema={AllergiesModel.allergiesFormValidations()}
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
            <Grid
              item
              lg={4}
              md={4}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <CustomTextField
                isRequired
                name="name"
                label="الاسم"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                touched={touched.name}
                width="100%"
                props={{
                  type: "text",
                  disabled: isViewMode,
                }}
              />
            </Grid>
            <Grid
              item
              lg={4}
              md={4}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <CustomTextField
                isRequired
                name="beginDate"
                label="تاريخ البدء"
                value={values.beginDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.beginDate}
                touched={touched.beginDate}
                width="100%"
                props={{
                  type: "date",
                  disabled: isViewMode,
                }}
              />
            </Grid>
            <Grid
              item
              lg={4}
              md={4}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <CustomTextField
                isRequired
                name="endDate"
                label="تاريخ الانتهاء"
                value={values.endDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.endDate}
                touched={touched.endDate}
                width="100%"
                props={{
                  type: "date",
                  disabled: isViewMode,
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid
              item
              lg={4}
              md={4}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <CustomTextField
                isRequired
                name="verification"
                label="التحقق"
                value={values.verification}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.verification}
                touched={touched.verification}
                width="100%"
                props={{
                  type: "text",
                  disabled: isViewMode,
                }}
              />
            </Grid>
            <Grid
              item
              lg={4}
              md={4}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <CustomTextField
                isRequired
                name="occurrence"
                label="حدوث"
                value={values.occurrence}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.occurrence}
                touched={touched.occurrence}
                width="100%"
                props={{
                  type: "text",
                  disabled: isViewMode,
                }}
              />
            </Grid>
            <Grid
              item
              lg={4}
              md={4}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <CustomTextField
                isRequired
                name="reaction"
                label="رد الفعل"
                value={values.reaction}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.reaction}
                touched={touched.reaction}
                width="100%"
                props={{
                  type: "text",
                  disabled: isViewMode,
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid
              item
              lg={4}
              md={4}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <CustomTextField
                isRequired
                name="severity"
                label="شدة"
                value={values.severity}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.severity}
                touched={touched.severity}
                width="100%"
                props={{
                  type: "text",
                  disabled: isViewMode,
                }}
              />
            </Grid>
            <Grid
              item
              lg={8}
              md={8}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <CustomTextField
                isRequired
                name="comments"
                label="تعليقات"
                value={values.comments}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.comments}
                touched={touched.comments}
                width="100%"
                props={{
                  type: "text",
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

export default AllergiesForm;
