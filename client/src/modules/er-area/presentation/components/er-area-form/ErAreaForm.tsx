import CustomAccordion from "@/core/shared/components/CustomAccordion";
import CustomAlertHeaderData from "@/core/shared/components/CustomAlertHeaderData";
import CustomFullScreenDialog from "@/core/shared/components/CustomFullScreenDialog";
import CustomMultiSelectField from "@/core/shared/components/CustomMultiSelectField";
import CustomSelectField from "@/core/shared/components/CustomSelectField";
import CustomTextField from "@/core/shared/components/CustomTextField";
import VitalsData from "@/core/shared/components/VitalsData";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { LookupsState } from "@/core/shared/modules/lookups/presentation/controllers/types";
import { useAppDispatch, useAppSelector } from "@/core/state/store";
import TriageAXEntity from "@/modules/er-area/domain/entities/triageAX-without-vitals-entity";
import VitalsEntity from "@/modules/er-area/domain/entities/vitals-entity";
import VitalsInterface from "@/modules/er-area/domain/interfaces/vitals-interface";
import { Box, Button, Grid } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { createTriagAX } from "../../controllers/thunks/triagAX-thunk";
import { TriageAXInterface } from "@/modules/er-area/domain/interfaces/triageAX-interface";

interface IErAreaFormProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
  patientData: any
}

const ErAreaForm = ({ openDialog, setOpenDialog, patientData }: IErAreaFormProps) => {
  const [expandVitalsAccordion, setExpandVitalsAccordion] = useState(true);
  const [expandRestFormAccordion, setExpandRestFormAccordion] = useState(true);
  const refSubmitTriage: any = useRef(null);

  const dispatch = useAppDispatch();
  const lookupsState: LookupsState = useAppSelector(
    (state: any) => state.lookups
  );

  //* buttons useRef
  const refSubmitVitals: any = useRef(null);

  //* Form data refrence
  const triageData = useRef<TriageAXInterface>()
  const vitalsData = useRef<VitalsInterface>()

  const handleSubmitTriageData = (values: TriageAXInterface) => {
    triageData.current = values
  }

  const handleSubmitVitalsData = (values: VitalsInterface) => {
    vitalsData.current = values
  };

  const handleSubmitAllForms = () => {
    if (refSubmitTriage.current) {
      refSubmitTriage.current.click();
    }
    if (refSubmitVitals.current) {
      refSubmitVitals.current.click();
    }
  }

  useEffect(() => {
    if (triageData.current && vitalsData.current) {
      dispatch(
        createTriagAX({
          assessment: {
            ...triageData.current,
            vitals: vitalsData.current
          },
          visitCode: patientData.id
        })
      ).then(() => {
        setOpenDialog(false);
      })
    }
  }, [triageData.current, vitalsData.current]);

  return (
    <div>
      <CustomFullScreenDialog
        navTitle="نموذج فحص الفرز الأولي"
        open={openDialog}
        setOpen={setOpenDialog}
      >
        <CustomAlertHeaderData
          color="primary.dark"
          dataList={[
            {
              title: "رقم المريض",
              message: patientData.id,
            },
            {
              title: "اسم المريض",
              message: <span style={{ fontSize: "0.8rem", fontWeight: 500 }}>{patientData.name}</span>,
            },
            {
              title: "النوع",
              message: patientData.gender,
            },
            {
              title: "السن",
              message: patientData.age,
            },
          ]}
        />
        <Box
          sx={{
            width: "95%",
            margin: "1.5rem auto",
          }}
        >
          {/* er rest form */}
          <CustomAccordion
            isClosable={false}
            isDisabled={false}
            isExpanded={expandRestFormAccordion}
            setExpanded={setExpandRestFormAccordion}
            title="الفرز"
          >
            <Formik
              initialValues={TriageAXEntity.defaultValue()}
              validationSchema={TriageAXEntity.getSchema()}
              onSubmit={(values) => {
                handleSubmitTriageData(values);
              }}
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
                  <Grid container columns={12} spacing={2}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                      <CustomTextField
                        isRequired
                        name="mainComplaint"
                        label="الشكوى"
                        value={values.mainComplaint}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.mainComplaint}
                        touched={touched.mainComplaint}
                        width="100%"
                        props={{
                          type: "text",
                        }}
                      />
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <CustomSelectField<any>
                        isRequired
                        name="transferTo"
                        label="نقل إلى"
                        value={values.transferTo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.transferTo}
                        touched={touched.transferTo}
                        width="100%"
                        options={lookupsState.lookups.departments}
                      />
                    </Grid>
                  </Grid>
                  <Grid container columns={12} spacing={2}>

                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <CustomSelectField<any>
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
                      <CustomSelectField<any>
                        name="triageTypeId"
                        label="الفرز"
                        value={values.triageTypeId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.triageTypeId}
                        touched={touched.triageTypeId}
                        width="100%"
                        options={lookupsState.lookups.triageTypes}
                      />
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <CustomMultiSelectField<any>
                        name="comorbidityIds"
                        label="الأمراض المصاحبة"
                        value={values.comorbidityIds}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.comorbidityIds}
                        touched={touched.comorbidityIds}
                        width="100%"
                        options={lookupsState.lookups.comorbidities}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    sx={{ display: "none" }}
                    ref={refSubmitTriage}
                  ></Button>
                </Box>
              )}
            </Formik>
          </CustomAccordion>
          <CustomAccordion
            title="الاشارات الحيوية"
            isClosable={false}
            isDisabled={false}
            isExpanded={expandVitalsAccordion}
            setExpanded={setExpandVitalsAccordion}
          >
            <VitalsData
              initialValues={VitalsEntity.defaultValue()}
              onSubmit={handleSubmitVitalsData}
              refSubmitButton={refSubmitVitals}
            />
          </CustomAccordion>
          <PrimaryButton
            title="تأكيــد"
            sx={{ marginTop: "3rem" }}
            type="button"
            onClick={() => handleSubmitAllForms()}
          />
        </Box>
      </CustomFullScreenDialog>
    </div>
  );
};

export default ErAreaForm;
