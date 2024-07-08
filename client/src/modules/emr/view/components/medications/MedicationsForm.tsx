import CustomTextField from "@/core/shared/components/CustomTextField";
import { ExaminationFormComponentPropsInterface } from "@/core/shared/components/ExaminationAccordion";
import SearchableSelectFieldComponent from "@/core/shared/components/SearchableSelectFieldComponent";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { useAppDispatch, useAppSelector } from "@/core/state/store";
import {
  createMedication,
  getFdaMedicationList,
  updateMedication,
} from "@/modules/emr/controllers/thunks/medications-thunk";
import { MedicationsState } from "@/modules/emr/controllers/types";
import { MedicationsInterface } from "@/modules/emr/interfaces/medications-interface";
import MedicationsModel from "@/modules/emr/models/medications-model";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";

const MedicationsForm = ({
  patientId,
  initialValues,
  isViewMode,
  setShowFormDialog,
}: ExaminationFormComponentPropsInterface) => {
  const FDAMedicationsState: MedicationsState = useAppSelector(
    (state: any) => state.medications
  );
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState<string>('')

  useEffect(() => {
    dispatch(getFdaMedicationList({ search: `*${searchValue}*` }))
  }, [searchValue])

  const formatFdaDrugs = (data: any) => {
    const results: { names: string[] } = { names: [] }
    data.results?.map((result: any) => (
      console.log(result.products),
      result.products.map((product: any) => {
        if (!results.names.includes(convertToTitleCase(product.brand_name))) {
          results.names.push(convertToTitleCase(product.brand_name));
        }
      }
      )
    )
    )
    return results
  }
  const getSearchValue = (value: string) => { setSearchValue(value) }

  function convertToTitleCase(str: string) {
    return str.toLowerCase().split(' ').map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

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
              <SearchableSelectFieldComponent
                name="name"
                value={values.drugName}
                onChange={handleChange}
                getSearchValue={getSearchValue}
                error={errors.drugName}
                touched={touched.drugName}
                disabled={isViewMode}
                label="الاسم"
                options={formatFdaDrugs(FDAMedicationsState.fdaMedications).names.sort()}
              />
            </Grid>
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

export default MedicationsForm;
