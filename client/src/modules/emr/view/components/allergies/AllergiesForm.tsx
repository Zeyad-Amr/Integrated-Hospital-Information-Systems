import CustomTextField from "@/core/shared/components/CustomTextField";
import { ExaminationFormComponentPropsInterface } from "@/core/shared/components/ExaminationAccordion";
import SearchableSelectFieldComponent from "@/core/shared/components/SearchableSelectFieldComponent";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { allergiesLookup } from "@/core/shared/modules/lookups/data/emr-lookups";
import { useAppDispatch } from "@/core/state/store";
import {
  createAllergy,
  updateAllergy,
} from "@/modules/emr/controllers/thunks/allergies-thunk";
import { getFdaMedicationList } from "@/modules/emr/controllers/thunks/medications-thunk";
import { AllergiesInterface } from "@/modules/emr/interfaces/allergies-interface";
import AllergiesModel from "@/modules/emr/models/allergies-model";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import React, { useEffect } from "react";

const AllergiesForm = ({
  patientId,
  initialValues,
  isViewMode,
  setShowFormDialog,
}: ExaminationFormComponentPropsInterface) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFdaMedicationList())
  }, [])
  
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
        const submitObject = {
          ...values,
          patientId: patientId,
        };

        const action = initialValues
          ? updateAllergy(submitObject)
          : createAllergy(submitObject);

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
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <SearchableSelectFieldComponent  
                name="name"
                value={values.name}
                onChange={handleChange}
                error={errors.name}
                touched={touched.name}
                disabled={isViewMode}
                label="الاسم"
                options={allergiesLookup}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomTextField
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
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomTextField
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
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomTextField
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
          </Grid>

          <Grid container spacing={1}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomTextField
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
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomTextField
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
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomTextField
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
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <CustomTextField
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
