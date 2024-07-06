import CustomTextField from "@/core/shared/components/CustomTextField";
import { ExaminationFormComponentPropsInterface } from "@/core/shared/components/ExaminationAccordion";
import SearchableSelectFieldComponent from "@/core/shared/components/SearchableSelectFieldComponent";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { labTestsLookup } from "@/core/shared/modules/lookups/data/emr-lookups";
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
            <Grid item lg={6} md={6} sm={12} xs={12}>
            <SearchableSelectFieldComponent
                name="name"
                value={values.name}
                onChange={handleChange}
                error={errors.name}
                touched={touched.name}
                disabled={isViewMode}
                label="الاسم"
                options={labTestsLookup}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <CustomTextField
                name="url"
                label="الرابط"
                value={values.url}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.url}
                touched={touched.url}
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

export default LabsForm;
