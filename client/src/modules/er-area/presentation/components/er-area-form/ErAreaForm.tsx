import CustomAccordion from '@/core/shared/components/CustomAccordion';
import CustomFullScreenDialog from '@/core/shared/components/CustomFullScreenDialog'
import CustomMultiSelectField from '@/core/shared/components/CustomMultiSelectField';
import CustomTextField from '@/core/shared/components/CustomTextField';
import VitalsData, { VitalsDataValuesI } from '@/core/shared/components/VitalsData';
import { Box, Button, Grid } from '@mui/material';
import { Formik } from 'formik';
import React , {useState} from 'react'
import * as Yup from "yup";

const ErAreaForm = () => {
  const [open, setOpen] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [expandVitalsAccordion, setExpandVitalsAccordion] = useState(true);

  const handleSubmit = (data : VitalsDataValuesI) => {
    console.log('test', data);
  }

  const initialValues : {
    painScore: number;
    SPO2: number;
    temperature: any;
    pulseRate: number;
    respiratoryRate: number;
    CVP: number;
    GCS: number;
    diastolicPressure: number;
    systolicPressure : number,
  } = {
    CVP : 1,
    diastolicPressure : 1,
    GCS : 1,
    painScore : 1,
    pulseRate : 1,
    respiratoryRate : 1,
    SPO2 : 1,
    systolicPressure : 1,
    temperature : 1,
  }

  const onSubmit = (values : any) => {
    console.log(values);
  }

  const handleFormSchema = Yup.object({
    temperature: Yup.string()
      .required("درجة الحرارة مطلوبة")
      .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),

    systolicPressure: Yup.string()
      .required("ضغط الدم الانقباضي مطلوب")
      .matches(/^\d+$/, "يجب ألا تحتوي على أرقام عشرية")
      .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),

    diastolicPressure: Yup.string()
      .required("ضغط الدم الانبساطي مطلوب")
      .matches(/^\d+$/, "يجب ألا تحتوي على أرقام عشرية")
      .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),

    GCS: Yup.string()
      .required("درجة تحسس الوعي مطلوبة")
      .matches(/^\d+$/, "يجب ألا تحتوي على أرقام عشرية")
      .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),

    CVP: Yup.string()
      .required("ضغط الوريد المركزي مطلوب")
      .matches(/^\d+$/, "يجب ألا تحتوي على أرقام عشرية")
      .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),

    respiratoryRate: Yup.string()
      .required("معدل التنفس مطلوب")
      .matches(/^\d+$/, "يجب ألا تحتوي على أرقام عشرية")
      .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),

    pulseRate: Yup.string()
      .required("معدل نبضات القلب مطلوب")
      .matches(/^\d+$/, "يجب ألا تحتوي على أرقام عشرية")
      .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),

    SPO2: Yup.string()
      .required("مستوى تشبع الأكسجين في الدم مطلوب")
      .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),

    painScore: Yup.string()
      .required("درجة الألم مطلوبة")
      .matches(/^\d+$/, "يجب ألا تحتوي على أرقام عشرية")
      .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),
  });

  

  return (
    <div>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Open full-screen dialog
      </Button>
      <CustomFullScreenDialog open={open} setOpen={setOpen} navTitle='ترياج' >
        <CustomAccordion title='الاشارات الحيوية' isClosable={false} isDisabled={false} isExpanded={expandVitalsAccordion} setExpanded={setExpandVitalsAccordion}>
        <VitalsData initialValues={initialValues} onSubmit={handleSubmit} isSubmitted={submit}  />
        </CustomAccordion>
        {/* er rest form */}
        <Formik
      enableReinitialize
      initialValues={{
        painScore: initialValues.painScore,
        SPO2: initialValues.SPO2,
        temperature: initialValues.temperature,
        pulseRate: initialValues.pulseRate,
        respiratoryRate: initialValues.respiratoryRate,
        CVP: initialValues.CVP,
        GCS: initialValues.GCS,
        diastolicPressure: initialValues.diastolicPressure,
        systolicPressure: initialValues.systolicPressure,
      }}
      validationSchema={handleFormSchema}
      onSubmit={(values) => {
        onSubmit(values);
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
                name="temperature"
                label="قادم من"
                value={values.temperature}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.temperature}
                touched={touched.temperature}
                width="100%"
                options={[
                  {
                    id: "1",
                    label: "منــــزل",
                  },
                  {
                    id: "2",
                    label: "حـــادث",
                  },
                  {
                    id: "3",
                    label: "سجــــن",
                  },
                ]}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CustomTextField
                isRequired
                name="GCS"
                label="درجة تحسس الوعي"
                value={values.GCS}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.GCS}
                touched={touched.GCS}
                width="100%"
                props={{
                  type: "number",
                }}
              />
            </Grid>

            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CustomTextField
                isRequired
                name="systolicPressure"
                label="mmHg ضغط الدم الانقباضي"
                value={values.systolicPressure}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.systolicPressure}
                touched={touched.systolicPressure}
                width="100%"
                props={{
                  type: "number",
                }}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CustomTextField
                isRequired
                name="diastolicPressure"
                label="mmHg ضغط الدم الانبساطي"
                value={values.diastolicPressure}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.diastolicPressure}
                touched={touched.diastolicPressure}
                width="100%"
                props={{
                  type: "number",
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            sx={{ display: "none" }}
          ></Button>
        </Box>
      )}
    </Formik>
      <Button variant="outlined" onClick={() => setSubmit(!submit)}>
        Submit
      </Button>
      </CustomFullScreenDialog>
      
    </div>
  )
}

export default ErAreaForm