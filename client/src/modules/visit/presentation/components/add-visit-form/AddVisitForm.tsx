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
  const refSubmitButton: any = useRef(null);
  const sequenceNumberValue: any = useRef("");

  // useState
  const [submitFlag, setSubmitFlag] = useState<boolean>(false);
  const [combinedValues, setCombinedValues] = useState<any>({
    patient: {},
    companion: {},
    visit: {
      sequenceNumber: "",
      kinship: "",
    },
  });

  const patientInitialValues = {
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
    setCombinedValues((prevValues: any) => ({
      ...prevValues,
      patient: values,
      visit: {
        sequenceNumber: sequenceNumberValue.current,
      },
    }));
    console.log(sequenceNumberValue.current);
  };

  const handleRestPatientSubmit = (values: { frequencyNumber: string }) => {
    console.log("testRestSubmit", values);
    setSubmitFlag(!submitFlag);
    sequenceNumberValue.current = values.frequencyNumber;
  };

  useEffect(() => {
    console.log(combinedValues);
  }, [combinedValues]);


  const onTriggerRestAndPatientForm = () => {
    if (refSubmitButton.current) {
      refSubmitButton.current.click();
    }
  };

  const restPatientFormSchema = Yup.object({
    frequencyNumber: Yup.string().required("يجب ادخال رقم التردد"),
    // .length(14, "Id must be 14 number")
    // .matches(/^[0-9]+$/, "Id must be numeric."),
  });

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
              ref={refSubmitButton}
            ></Button>
          </Box>
        )}
      </Formik>

      {/* start patient form */}
      <PersonalData
        initialValues={patientInitialValues}
        onSubmit={handlePatientSubmit}
        isSubmitted={submitFlag}
      />

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
        <SecondaryButton title="اضــــافة مـــرافق" type="submit" />
      </Box>
    </Box>
  );
};

export default AddVisitForm;
