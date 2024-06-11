import CustomTextField from "@/core/shared/components/CustomTextField";
import { ExaminationFormComponentPropsInterface } from "@/core/shared/components/ExaminationAccordion";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { useAppDispatch } from "@/core/state/store";
import {
  createMedication,
  updateMedication,
} from "@/modules/emr/controllers/thunks/medications-thunk";
import { MedicationsInterface } from "@/modules/emr/interfaces/medications-interface";
import MedicationsModel from "@/modules/emr/models/medications-model";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import React from "react";

const MedicationsForm = ({
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
            } as MedicationsInterface)
          : MedicationsModel.defaultValues()
      }
      onSubmit={async (values) => {
        const submitObject = {
          ...values,
          patientId: patientId,
        };

        const action = initialValues
          ? updateMedication(submitObject)
          : createMedication(submitObject);

        dispatch(action).then((res) => {
          if (res?.meta.requestStatus == "fulfilled") {
            setShowFormDialog(false);
          }
        });
      }}
      validationSchema={MedicationsModel.medicationsFormValidations()}
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
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <CustomTextField
                isRequired
                name="drugName"
                label="اسم الدواء"
                value={values.drugName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.drugName}
                touched={touched.drugName}
                width="100%"
                props={{
                  type: "text",
                  disabled: isViewMode,
                }}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
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
          </Grid>
          <Grid container spacing={1}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
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
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <CustomTextField
                name="dosageInstruction"
                label="تعليمات الجرعة"
                value={values.dosageInstruction}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.dosageInstruction}
                touched={touched.dosageInstruction}
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
                name="medicationUsage"
                label="استخدام الدواء"
                value={values.medicationUsage}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.medicationUsage}
                touched={touched.medicationUsage}
                width="100%"
                props={{
                  type: "text",
                  disabled: isViewMode,
                }}
              />
            </Grid>

            <Grid item lg={8} md={8} sm={12} xs={12}>
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

export default MedicationsForm;
