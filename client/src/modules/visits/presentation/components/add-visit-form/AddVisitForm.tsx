import PersonalData from "@/core/shared/components/PersonalData";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import SecondaryButton from "@/core/shared/components/btns/SecondaryButton";
import { Button, Box, Typography } from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import CustomTextField from "@/core/shared/components/CustomTextField";
import CustomSelectField from "@/core/shared/components/CustomSelectField";
import CustomAccordion from "@/core/shared/components/CustomAccordion";
import AdditionalData, {
  AdditionalDataValues,
} from "@/core/shared/components/AdditionalData";

const AddVisitForm = () => {
  // useRef
  const refSubmitFirstStepButton: any = useRef(null);
  const refSubmitSecondStepButton: any = useRef(null);
  const sequenceNumberValue: any = useRef("");
  const kinshipValue: any = useRef("");
  const patientData: any = useRef({});
  // const companionData: any = useRef({});
  const additionalData: any = useRef({});
  const checkFirstRender = useRef(true);

  // useState
  const [submitPatientFlag, setSubmitPatientFlag] = useState<boolean>(false);
  const [submitAdditionalDataFlag, setSubmitAdditionalDataFlag] =
    useState<boolean>(false);
  const [patientDataExpanded, setPatientDataExpanded] = useState<boolean>(true);
  const [companionDataExpanded, setCompanionDataExpanded] =
    useState<boolean>(false);
  const [additionalDataExpanded, setAdditionalDataExpanded] =
    useState<boolean>(false);
  const [showCompanionFlag, setShowCompanionFlag] = useState<boolean>(false);
  const [addCompanionClicked, setAddCompanionClicked] =
    useState<boolean>(false);
  const [submitCompanionFlag, setSubmitCompanionFlag] =
    useState<boolean>(false);
  const [combinedValues, setCombinedValues] = useState<any>({
    patient: {},
    companion: {},
    visit: {
      sequenceNumber: "",
      kinship: "",
    },
    additionalInfo: {
      cameFrom: "",
      injuryLocation: "",
      injuryCause: "",
      notes: "",
      car: {
        firstChar: "",
        secondChar: "",
        thirdChar: "",
        number: null,
      },
      attendant: {
        name: "",
        SSN: "",
        role: "",
      },
    },
  });
  const [child, setChild] = useState<boolean>(false);
  const sharedInitialValues: any = {
    firstName: "",
    secondName: "",
    thirdName: "",
    fourthName: "",
    SSN: "",
    phone: "",
    gender: "",
    governate: "",
    birthDate: null,
    address: "",
    verificationMethod: "",
  };

  const handlePatientSubmit = (values: any) => {
    if (addCompanionClicked) {
      setShowCompanionFlag(true);
      setPatientDataExpanded(false);
      setCompanionDataExpanded(true);
    } else {
      setSubmitAdditionalDataFlag(!submitAdditionalDataFlag);
    }
    patientData.current = values;
    //  else {
    //   setCombinedValues((prevValues: any) => ({
    //     ...prevValues,
    //     patient: values,
    //     companion: {sharedInitialValues},
    //     visit: {
    //       sequenceNumber: sequenceNumberValue.current,
    //       kinship: "",
    //     },
    //   }));
    // }
  };

  const handleRestPatientSubmit = (values: { sequenceNumber: string }) => {
    setSubmitPatientFlag(!submitPatientFlag);
    sequenceNumberValue.current = values.sequenceNumber;
  };

  const restPatientFormSchema = Yup.object({
    sequenceNumber: Yup.string()
      .required("يجب ادخال رقم التردد")
      .matches(/^[0-9]+$/, "رقم التردد يجب ان يكون ارقام عددية"),
  });

  // second step
  const restCompanionFormSchema = Yup.object({
    kinship: Yup.string().required("يجب اختيار درجة القرابة"),
  });

  const handleRestCompanionSubmit = (values: {
    kinship: { id: string; value: string };
  }) => {
    setSubmitAdditionalDataFlag(!submitAdditionalDataFlag);
    setSubmitCompanionFlag(!submitCompanionFlag);
    kinshipValue.current = values.kinship;
  };

  const handleCompanionSubmit = (values: any) => {
    setCombinedValues({
      patient: patientData.current,
      companion: values,
      visit: {
        sequenceNumber: sequenceNumberValue.current,
        kinship: kinshipValue.current,
      },
      additionalInfo: {
        cameFrom: additionalData.current.comeFromString,
        injuryLocation: additionalData.current.place,
        injuryCause: additionalData.current.reason,
        notes: additionalData.current.notes,
        car: {
          firstChar: additionalData.current.firstChar,
          secondChar: additionalData.current.secondChar,
          thirdChar: additionalData.current.thirdChar,
          number: additionalData.current.carNum,
        },
        attendant: {
          name: additionalData.current.attendantName,
          SSN: additionalData.current.attendantSSN,
          id: additionalData.current.attendantSerialNumber,
          role: "",
        },
      },
    });

    // setCombinedValues((prevValues: any) => ({
    //   ...prevValues,
    //   patient: patientData.current,
    //   companion: values,
    //   visit: {
    //     sequenceNumber: sequenceNumberValue.current,
    //     kinship: kinshipValue.current,
    //   },
    // }));
  };

  const onDeleteCompanion = () => {
    setShowCompanionFlag(false);
    setAddCompanionClicked(false);
  };

  // additional data

  const intialAdditionalValues: AdditionalDataValues = {
    comeFromString: { id: "", value: "" },
    attendantName: "",
    attendantSSN: "",
    attendantSerialNumber: "",
    carNum: "",
    firstChar: "",
    secondChar: "",
    thirdChar: "",
    reason: "",
    place: "",
    notes: "",
  };

  const handleAdditionalDataSubmit = (values: AdditionalDataValues) => {
    if (!addCompanionClicked) {
      setCombinedValues({
        patient: patientData.current,
        companion: sharedInitialValues,
        visit: {
          sequenceNumber: sequenceNumberValue.current,
          kinship: "",
        },
        additionalInfo: {
          cameFrom: values.comeFromString,
          injuryLocation: values.place,
          injuryCause: values.reason,
          notes: values.notes,
          car: {
            firstChar: values.firstChar,
            secondChar: values.secondChar,
            thirdChar: values.thirdChar,
            number: values.carNum,
          },
          attendant: {
            name: values.attendantName,
            SSN: values.attendantSSN,
            id: values.attendantSerialNumber,
            role: "",
          },
        },
      });
    } else {
      additionalData.current = values;
      console.log("ana da5lt", additionalData.current);
    }
  };

  // global methods

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

  useEffect(() => {
    if (checkFirstRender.current) {
      checkFirstRender.current = false;
    } else {
      console.log(combinedValues);
    }
  }, [combinedValues]);

  return (
    <Box sx={{ marginTop: "2.5rem" }}>
      <CustomAccordion
        isClosable={false}
        title="بيانات المريض"
        isDisabled={false}
        isExpanded={patientDataExpanded}
        setExpanded={setPatientDataExpanded}
      >
        {/* start rest patient form */}
        <Formik
          initialValues={{ sequenceNumber: "" }}
          validationSchema={() => {
            setPatientDataExpanded(true);
            return restPatientFormSchema;
          }}
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
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <CustomTextField
                  isRequired
                  name="sequenceNumber"
                  label="رقم التردد"
                  value={values.sequenceNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.sequenceNumber}
                  touched={touched.sequenceNumber}
                  width="100%"
                  props={{
                    type: "text",
                  }}
                />
                <Box
                  sx={{
                    padding: "0",
                    marginLeft: "0.5rem",
                    marginTop: "1rem",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: child ? "primary.dark" : "#eee",
                      color: child ? "white" : "black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "5px",
                      padding: "0.6rem 0.7rem ",
                      width: "max-content",
                      cursor: "pointer",
                      transition: "0.2s",
                      userSelect: "none",
                    }}
                    onClick={() => setChild(!child)}
                  >
                    <Typography>طفل / مجهول</Typography>
                  </Box>
                </Box>
                <Button
                  type="submit"
                  sx={{ display: "none" }}
                  ref={refSubmitFirstStepButton}
                ></Button>
              </Box>
            </Box>
          )}
        </Formik>

        {/* start patient form */}
        <PersonalData
          initialValues={sharedInitialValues}
          onSubmit={handlePatientSubmit}
          isSubmitted={submitPatientFlag}
        />
      </CustomAccordion>

      {/* second step */}
      <Box sx={{ display: showCompanionFlag === true ? "block" : "none" }}>
        <CustomAccordion
          isClosable={true}
          handleClosed={onDeleteCompanion}
          title="بيانات المرافق"
          isDisabled={false}
          isExpanded={companionDataExpanded}
          setExpanded={setCompanionDataExpanded}
        >
          {/* start rest companion form */}
          <Box>
            <Formik
              initialValues={{
                kinship: {
                  id: "",
                  value: "",
                },
              }}
              validationSchema={() => {
                setCompanionDataExpanded(true);
                return restCompanionFormSchema;
              }}
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
                  <CustomSelectField
                    isRequired
                    name="kinship"
                    label="درجة القرابة"
                    value={values.kinship}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.kinship}
                    touched={touched.kinship}
                    width="100%"
                    options={
                      [
                        // {
                        //   id: "BROTHER",
                        //   title: "أخ",
                        // },
                        // {
                        //   id: "SISTER",
                        //   title: "أخت",
                        // },
                        // {
                        //   id: "FATHER",
                        //   title: "أب",
                        // },
                        // {
                        //   id: "MOTHER",
                        //   title: "أم",
                        // },
                        // {
                        //   id: "COUSIN",
                        //   title: "ابن/ة عم - ابن/ة خال",
                        // },
                        // {
                        //   id: "AUNT",
                        //   title: "عمة / خالة",
                        // },
                        // {
                        //   id: "OTHER",
                        //   title: "آخر",
                        // },
                      ]
                    }
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
        </CustomAccordion>
      </Box>

      <Box>
        <CustomAccordion
          isClosable={false}
          title="البيانات الأضافية"
          isDisabled={false}
          isExpanded={additionalDataExpanded}
          setExpanded={setAdditionalDataExpanded}
        >
          <AdditionalData
            initialValues={intialAdditionalValues}
            isSubmitted={submitAdditionalDataFlag}
            onSubmit={handleAdditionalDataSubmit}
          />
        </CustomAccordion>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "4rem",
          marginTop: "1.5rem",
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
          onClick={() => {
            setAddCompanionClicked(true);
            onTriggerRestAndPatientForm();
          }}
          sx={{ display: showCompanionFlag ? "none" : "block" }}
        />
      </Box>
    </Box>
  );
};

export default AddVisitForm;
