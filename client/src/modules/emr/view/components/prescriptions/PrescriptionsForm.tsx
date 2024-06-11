import CustomSelectField from "@/core/shared/components/CustomSelectField";
import CustomTextField from "@/core/shared/components/CustomTextField";
import { ExaminationFormComponentPropsInterface } from "@/core/shared/components/ExaminationAccordion";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { useAppDispatch } from "@/core/state/store";
import {
  createPrescription,
  updatePrescription,
} from "@/modules/emr/controllers/thunks/prescriptions-thunk";
import { PrescriptionsInterface } from "@/modules/emr/interfaces/prescriptions-interface";
import PrescriptionsModel from "@/modules/emr/models/prescriptions-model";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import React from "react";

const PrescriptionsForm = ({
  visitCode,
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
              beginDate: initialValues?.beginDate?.split("T")[0],
            } as PrescriptionsInterface)
          : PrescriptionsModel.defaultValues()
      }
      onSubmit={async (values) => {
        const submitObject = {
          ...values,
          patientId: patientId,
          visitCode: visitCode,
        };

        const action = initialValues
          ? updatePrescription(submitObject)
          : createPrescription(submitObject);

        dispatch(action).then((res) => {
          if (res?.meta.requestStatus == "fulfilled") {
            setShowFormDialog(false);
          }
        });
      }}
      validationSchema={PrescriptionsModel.prescriptionsFormValidations()}
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
                name="drugName"
                label="الاسم"
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
          </Grid>
          <Grid container spacing={1}>
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
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomTextField
                isRequired
                name="dosage"
                label="الجرعة"
                value={values.dosage}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.dosage}
                touched={touched.dosage}
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
                name="quantity"
                label="الكمية"
                value={values.quantity}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.quantity}
                touched={touched.quantity}
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
              <CustomSelectField
                isDisabled={isViewMode}
                isRequired
                name="substitutionAllowed"
                label="السماح بالاستبدال"
                value={values.substitutionAllowed}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.substitutionAllowed}
                touched={touched.substitutionAllowed}
                width="100%"
                options={[
                  {
                    id: "1",
                    value: "No",
                  },
                  {
                    id: "2",
                    value: "Yes",
                  },
                ]}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomTextField
                name="medicineUnit"
                label="وحدة الدواء"
                value={values.medicineUnit}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.medicineUnit}
                touched={touched.medicineUnit}
                width="100%"
                props={{
                  type: "text",
                  disabled: isViewMode,
                }}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomTextField
                name="refills"
                label="إعادة التعبئة"
                value={values.refills}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.refills}
                touched={touched.refills}
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
                name="notes"
                label="ملاحظات"
                value={values.notes}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.notes}
                touched={touched.notes}
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

export default PrescriptionsForm;
