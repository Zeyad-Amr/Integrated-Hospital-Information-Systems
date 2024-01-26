import CustomAccordion from "@/core/shared/components/CustomAccordion";
import CustomAlertHeaderData from "@/core/shared/components/CustomAlertHeaderData";
import CustomFullScreenDialog from "@/core/shared/components/CustomFullScreenDialog";
import CustomMultiSelectField from "@/core/shared/components/CustomMultiSelectField";
import CustomSelectField from "@/core/shared/components/CustomSelectField";
import CustomTextField from "@/core/shared/components/CustomTextField";
import VitalsData from "@/core/shared/components/VitalsData";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { LookupsState } from "@/core/shared/modules/lookups/presentation/controllers/types";
import { useAppSelector } from "@/core/state/store";
import TriageAXEntity from "@/modules/er-area/domain/entities/triageAX-without-vitals-entity";
import VitalsEntity from "@/modules/er-area/domain/entities/vitals-entity";
import VitalsInterface from "@/modules/er-area/domain/interfaces/vitals-interface";
import { Box, Button, Grid } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";

interface IErAreaFormProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
  visitCode: string
}

const ErAreaForm = ({ openDialog, setOpenDialog, visitCode }: IErAreaFormProps) => {
  const [submitVitalsFlag, setSubmitVitalsFlag] = useState(false);
  const [expandVitalsAccordion, setExpandVitalsAccordion] = useState(true);
  const [expandRestFormAccordion, setExpandRestFormAccordion] = useState(true);
  const [combinedValues, setCombinedValues] = useState<any>({});
  const refSubmitFirstStepButton: any = useRef(null);
  const refRestFormData: any = useRef(null);
  const checkFirstRender = useRef(true);


  const lookupsState: LookupsState = useAppSelector(
    (state: any) => state.lookups
  );

  const handleSubmitVitalsData = (data: VitalsInterface) => {
    setCombinedValues((preValues: any) => ({
      ...preValues,
      mainComplaint: refRestFormData.current.complaint,
      LOCId: refRestFormData.current.consciousnessLevel,
      triageTypeId: refRestFormData.current.triage,
      comorbidityIds: refRestFormData.current.comorbidities,
      transferTo: refRestFormData.current.transferTo,
      vitals: {
        CVP: data.CVP,
        GCS: data.GCS,
        painScore: data.painScore,
        PR: data.pulseRate,
        RR: data.respiratoryRate,
        SpO2: data.SPO2,
        temp: data.temperature,
        SBP: data.systolicPressure,
        DBP: data.diastolicPressure,
      },
    }));
  };

  interface restErAreaI {
    complaint: string;
    transferTo: string;
    comorbidities: any;
    triage: string;
    consciousnessLevel: string;
  }

  const restErAreaInitialValues: restErAreaI = {
    comorbidities: [],
    complaint: "",
    consciousnessLevel: "",
    transferTo: "",
    triage: "",
  };

  const onRestFormSubmit = (values: any) => {
    refRestFormData.current = values;
    setSubmitVitalsFlag(!submitVitalsFlag);
  };

  const onTriggerAllForm = () => {
    if (refSubmitFirstStepButton.current) {
      refSubmitFirstStepButton.current.click();
    }
  };

  useEffect(() => {
    if (checkFirstRender.current) {
      checkFirstRender.current = false;
    } else {
      console.log(combinedValues);
    }
  }, [combinedValues]);

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
              title: "تيست 1",
              message: visitCode,
            },
            {
              title: "تيست 2",
              message: "5555",
            },
            {
              title: "تيست 3",
              message: "5555",
            },
            {
              title: "تيست 4",
              message: "5555",
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
              enableReinitialize
              initialValues={restErAreaInitialValues}
              validationSchema={TriageAXEntity.getSchema()}
              onSubmit={(values) => {
                onRestFormSubmit(values);
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
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomMultiSelectField
                        isRequired
                        name="comorbidities"
                        label="الأمراض المصاحبة"
                        value={values.comorbidities}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.comorbidities}
                        touched={touched.comorbidities}
                        width="100%"
                        options={[
                          {
                            id: "1",
                            label: "ضغط",
                          },
                          {
                            id: "2",
                            label: "سكر",
                          },
                        ]}
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
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

                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomSelectField<any>
                        isRequired
                        name="consciousnessLevel"
                        label="مستوى الوعي"
                        value={values.consciousnessLevel}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.consciousnessLevel}
                        touched={touched.consciousnessLevel}
                        width="100%"
                        options={lookupsState.lookups.LOC}
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomSelectField<any>
                        isRequired
                        name="triage"
                        label="الفرز"
                        value={values.triage}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.triage}
                        touched={touched.triage}
                        width="100%"
                        options={lookupsState.lookups.triageTypes}
                      />
                    </Grid>
                  </Grid>
                  <Grid container columns={12} spacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <CustomTextField
                        isRequired
                        name="complaint"
                        label="الشكوى"
                        value={values.complaint}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.complaint}
                        touched={touched.complaint}
                        width="100%"
                        multiline
                        rows={3}
                        props={{
                          type: "text",
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    sx={{ display: "none" }}
                    ref={refSubmitFirstStepButton}
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
              isSubmitted={submitVitalsFlag}
            />
          </CustomAccordion>
          <PrimaryButton
            title="تأكيــد"
            sx={{ marginTop: "3rem" }}
            type="button"
            onClick={() => onTriggerAllForm()}
          />
        </Box>
      </CustomFullScreenDialog>
    </div>
  );
};

export default ErAreaForm;
