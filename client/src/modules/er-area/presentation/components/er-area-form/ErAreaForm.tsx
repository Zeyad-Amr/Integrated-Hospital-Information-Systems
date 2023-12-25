import CustomAccordion from "@/core/shared/components/CustomAccordion";
import CustomDialog from "@/core/shared/components/CustomDialog";
import CustomFullScreenDialog from "@/core/shared/components/CustomFullScreenDialog";
import CustomMultiSelectField from "@/core/shared/components/CustomMultiSelectField";
import CustomSelectField from "@/core/shared/components/CustomSelectField";
import CustomTextField from "@/core/shared/components/CustomTextField";
import VitalsData, {
  VitalsDataValuesI,
} from "@/core/shared/components/VitalsData";
import { Box, Button, Grid } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";

const ErAreaForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [submitVitalsFlag, setSubmitVitalsFlag] = useState(false);
  const [expandVitalsAccordion, setExpandVitalsAccordion] = useState(true);
  const [expandRestFormAccordion, setExpandRestFormAccordion] = useState(true);
  const [combinedValues, setCombinedValues] = useState<any>({});
  const refSubmitFirstStepButton: any = useRef(null);
  const refRestFormData: any = useRef(null);
  const checkFirstRender = useRef(true);

  const handleSubmitVitalsData = (data: VitalsDataValuesI) => {
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

  const initialValues: VitalsDataValuesI = {
    CVP: undefined,
    diastolicPressure: undefined,
    GCS: undefined,
    painScore: undefined,
    pulseRate: undefined,
    respiratoryRate: undefined,
    SPO2: undefined,
    systolicPressure: undefined,
    temperature: undefined,
  };

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

  const handleRestFormSchema = Yup.object({
    complaint: Yup.string().required("الشكوى مطلوبة"),

    transferTo: Yup.string().required("نقل إلى مطلوب"),

    // comorbidities: Yup.string().required("الأمراض المصاحبة مطلوبة"),

    triage: Yup.string().required("الفرز مطلوب"),

    consciousnessLevel: Yup.string().required("مستوى الوعي مطلوب"),
  });

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
      <Button variant="outlined" onClick={() => setOpenDialog(true)}>
        Open full-screen dialog
      </Button>
      <CustomFullScreenDialog
        navTitle="ترياج"
        open={openDialog}
        setOpen={setOpenDialog}
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
            validationSchema={handleRestFormSchema}
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
                      options={[
                        {
                          id: "1",
                          label: "تيست 1",
                        },
                        {
                          id: "2",
                          label: "تيست 2",
                        },
                      ]}
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
                      options={[
                        {
                          id: "1",
                          label: "تيست 1",
                        },
                        {
                          id: "2",
                          label: "تيست 2",
                        },
                      ]}
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
                      options={[
                        {
                          id: "1",
                          label: "تيست 1",
                        },
                        {
                          id: "2",
                          label: "تيست 2",
                        },
                      ]}
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
            initialValues={initialValues}
            onSubmit={handleSubmitVitalsData}
            isSubmitted={submitVitalsFlag}
          />
        </CustomAccordion>
        <Button
          sx={{ marginTop: "3rem" }}
          variant="outlined"
          onClick={() => onTriggerAllForm()}
        >
          Submit
        </Button>
      </CustomFullScreenDialog>
    </div>
  );
};

export default ErAreaForm;
