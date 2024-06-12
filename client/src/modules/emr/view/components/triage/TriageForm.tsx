import CustomSelectField from "@/core/shared/components/CustomSelectField";
import CustomTextField from "@/core/shared/components/CustomTextField";
import { ExaminationFormComponentPropsInterface } from "@/core/shared/components/ExaminationAccordion";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { LookupsState } from "@/core/shared/modules/lookups/presentation/controllers/types";
import { useAppDispatch, useAppSelector } from "@/core/state/store";
import {
  createTriage,
  updateTriage,
} from "@/modules/emr/controllers/thunks/triage-thunk";
import { TriageInterface } from "@/modules/emr/interfaces/triage-interface";
import TriageModel from "@/modules/emr/models/triage-model";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Formik, FormikProps } from "formik";
import React, { useRef } from "react";

const TriageForm = ({
  visitCode,
  initialValues,
  isViewMode,
  setShowFormDialog,
}: ExaminationFormComponentPropsInterface) => {
  const dispatch = useAppDispatch();
  const lookupsState: LookupsState = useAppSelector(
    (state: any) => state.lookups
  );
  const formikRef = useRef<FormikProps<TriageInterface>>(null);
  return (
    <Formik
      innerRef={formikRef}
      initialValues={
        initialValues
          ? ({
              ...initialValues,
            } as TriageInterface)
          : TriageModel.defaultValues()
      }
      onSubmit={async (values) => {
        console.log(values);
        const submitObject = {
          ...values,
          visitCode: visitCode,
        };

        const action = initialValues
          ? updateTriage(submitObject)
          : createTriage(submitObject);

        dispatch(action).then((res) => {
          if (res?.meta.requestStatus == "fulfilled") {
            if (formikRef.current) formikRef.current.resetForm();
            setShowFormDialog(false);
          }
        });
      }}
      validationSchema={TriageModel.triageFormValidations()}
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
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomTextField
                isRequired
                name="painScore"
                label="مستوى الألم"
                value={values.painScore}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.painScore}
                touched={touched.painScore}
                width="100%"
                props={{
                  type: "number",
                  disabled: isViewMode,
                }}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomSelectField
                isDisabled={isViewMode}
                name="LOCId"
                label="مستوى الوعي"
                value={values.LOCId}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.LOCId}
                touched={touched.LOCId}
                width="100%"
                options={lookupsState.lookups.LOC}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomSelectField
                isDisabled={isViewMode}
                name="triageTypeId"
                label="نوع الفرز"
                value={values.triageTypeId}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.triageTypeId}
                touched={touched.triageTypeId}
                width="100%"
                options={lookupsState.lookups.triageTypes}
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

export default TriageForm;
