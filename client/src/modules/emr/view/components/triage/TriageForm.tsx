import CustomSelectField from "@/core/shared/components/CustomSelectField";
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
  refSubmitButton,
  onSubmit,
}: ExaminationFormComponentPropsInterface & {
  refSubmitButton?: React.MutableRefObject<null>;
  onSubmit?: (values: TriageInterface) => void;
}) => {
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
      onSubmit={
        onSubmit
          ? onSubmit
          : async (values) => {
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
            }
      }
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
              <CustomSelectField
                isDisabled={isViewMode}
                name="painScore"
                label="مستوى الألم"
                value={values.painScore}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.painScore}
                touched={touched.painScore}
                width="100%"
                options={[
                  { id: 1, value: "1" },
                  { id: 2, value: "2" },
                  { id: 3, value: "3" },
                  { id: 4, value: "4" },
                  { id: 5, value: "5" },
                  { id: 6, value: "6" },
                  { id: 7, value: "7" },
                  { id: 8, value: "8" },
                  { id: 9, value: "9" },
                  { id: 10, value: "10" },
                ]}
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
              ref={refSubmitButton}
              display={refSubmitButton ? "none" : "block"}
            />
          ) : null}
        </Box>
      )}
    </Formik>
  );
};

export default TriageForm;
