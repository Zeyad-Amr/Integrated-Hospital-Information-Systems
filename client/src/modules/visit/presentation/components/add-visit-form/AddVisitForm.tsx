import PersonalData, {
  PersonalDataValues,
} from "@/core/shared/components/PersonalData";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import SecondaryButton from "@/core/shared/components/btns/SecondaryButton";
import { Button, Box } from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import CustomTextField from "@/core/shared/components/CustomTextField";

const AddVisitForm = () => {
  // useRef
  const refSubmitFirstStepButton: any = useRef(null);
  const refSubmitSecondStepButton: any = useRef(null);
  const sequenceNumberValue: any = useRef("");
  const kinshipValue : any = useRef("");
  const patientData: any = useRef({});

  const onTest = () => {
    setShowCompanionFlag(false);
  };

  // useState
  const [submitPatientFlag, setSubmitPatientFlag] = useState<boolean>(false);
  const [showCompanionFlag, setShowCompanionFlag] = useState<boolean>(false);
  const [submitCompanionFlag, setSubmitCompanionFlag] =
    useState<boolean>(false);
  const [combinedValues, setCombinedValues] = useState<any>({
    patient: {},
    companion: {},
    visit: {
      sequenceNumber: "",
      kinship: "",
    },
  });

  const sharedInitialValues = {
    firstName: "",
    secondName: "",
    thirdName: "",
    forthName: "",
    email: "",
    SSN: "",
    phone: "",
    id: "",
    gender: "",
    governate: "",
    date: null,
    address: "",
    SSNtype: "",
    search: "",
  };

  const handlePatientSubmit = (values: PersonalDataValues) => {
    console.log("testSubmit", values);
    if (!showCompanionFlag) {
      setCombinedValues((prevValues: any) => ({
        ...prevValues,
        patient: values,
        visit: {
          sequenceNumber: sequenceNumberValue.current,
        },
      }));
      console.log(sequenceNumberValue.current);
      setShowCompanionFlag(true);
    } else {
      patientData.current = values;
    }
  };

  const handleRestPatientSubmit = (values: { frequencyNumber: string }) => {
    console.log("testRestSubmit", values);
    setSubmitPatientFlag(!submitPatientFlag);
    sequenceNumberValue.current = values.frequencyNumber;
  };

  const onTriggerRestAndPatientForm = () => {
    if (refSubmitFirstStepButton.current) {
      refSubmitFirstStepButton.current.click();
      if (showCompanionFlag) {
        if (refSubmitSecondStepButton.current) {
          refSubmitSecondStepButton.current.click();
        }
      }
    }
  };

  const restPatientFormSchema = Yup.object({
    frequencyNumber: Yup.string().required("يجب ادخال رقم التردد"),
  });

  useEffect(() => {
    // post request
    console.log(combinedValues);
  }, [combinedValues]);

  // second step

  const restCompanionFormSchema = Yup.object({
    kinship: Yup.string().required("يجب اختيار درجة القرابة"),
  });

  const handleRestCompanionSubmit = (values: { kinship: string }) => {
    console.log("testRestCompanionSubmit", values);
    setSubmitCompanionFlag(!submitCompanionFlag)
    kinshipValue.current = values.kinship
  };

  const handleCompanionSubmit = (values: PersonalDataValues) => {
    console.log("totalSubmit", values);
    setCombinedValues((prevValues: any) => ({
      ...prevValues,
      patient: patientData.current,
      companion : values,
      visit: {
        sequenceNumber: sequenceNumberValue.current,
        kinship : kinshipValue.current
      },
    }));
  };

  return (
    <Box sx={{ marginTop: "2.5rem" }}>
      {/* start rest patient form */}
      <Formik
        initialValues={{ frequencyNumber: "" }}
        validationSchema={restPatientFormSchema}
        onSubmit={(values) => {
          handleRestPatientSubmit(values);
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
            <CustomTextField
              isRequired
              name="frequencyNumber"
              label="رقم التردد"
              value={values.frequencyNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.frequencyNumber}
              touched={touched.frequencyNumber}
              width="100%"
              props={{
                type: "text",
              }}
            />
            <Button
              type="submit"
              sx={{ display: "none" }}
              ref={refSubmitFirstStepButton}
            ></Button>
          </Box>
        )}
      </Formik>

      {/* start patient form */}
      <PersonalData
        initialValues={sharedInitialValues}
        onSubmit={handlePatientSubmit}
        isSubmitted={submitPatientFlag}
      />

      <hr />
      <br />
      <br />
      <br />

      {/* second step */}
      {/* start rest companion form */}
      <Box sx={{ display: showCompanionFlag === true ? "block" : "none" }}>
        <Formik
          initialValues={{ kinship: "" }}
          validationSchema={restCompanionFormSchema}
          onSubmit={(values) => {
            handleRestCompanionSubmit(values);
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
              <CustomTextField
                isRequired
                name="kinship"
                label="درجة القرابة"
                value={values.kinship}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.kinship}
                touched={touched.kinship}
                width="100%"
                props={{
                  type: "text",
                }}
              />
              <Button
                type="submit"
                sx={{ display: "none" }}
                ref={refSubmitSecondStepButton}
              ></Button>
            </Box>
          )}
        </Formik>

        {/* start companion form */}
        <PersonalData
          initialValues={sharedInitialValues}
          onSubmit={handleCompanionSubmit}
          isSubmitted={submitCompanionFlag}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "4rem",
        }}
      >
        <PrimaryButton
          title="تأكيــد"
          type="button"
          onClick={() => onTriggerRestAndPatientForm()}
        />
        <SecondaryButton
          title="اضــــافة مـــرافق"
          type="button"
          onClick={() => onTriggerRestAndPatientForm()}
        />
        <SecondaryButton
          title="حذف مـــرافق"
          type="button"
          onClick={() => onTest()}
        />
      </Box>
    </Box>
  );
};

export default AddVisitForm;
