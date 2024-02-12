import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { Button, Box, Typography } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import CustomTextField from "@/core/shared/components/CustomTextField";
import CustomSelectField from "@/core/shared/components/CustomSelectField";
import CustomAccordion from "@/core/shared/components/CustomAccordion";
import AdditionalData from "@/core/shared/components/AdditionalData";
import { LookupsState } from "@/core/shared/modules/lookups/presentation/controllers/types";
import { useAppSelector } from "@/core/state/store";
import { AdditionalDataInterface } from "@/modules/visits/domain/interfaces/additional-data-interface";
import AdditionalDataEntity from "@/modules/visits/domain/entities/additional-data-entity";
import PersonalDataComponent from "@/core/shared/components/PersonalDataComponent";
import PersonEntity from "@/modules/auth/domain/entities/person-entity";
import PersonInterface from "@/modules/auth/domain/interfaces/person-interface";
import VisitEntity from "@/modules/visits/domain/entities/visit-entity";
import VisitInterface from "@/modules/visits/domain/interfaces/visit-interface";

const AddVisitForm = () => {
  const lookupsState: LookupsState = useAppSelector(
    (state: any) => state.lookups
  );

  // useState
  const [patientDataExpanded, setPatientDataExpanded] = useState<boolean>(true);
  const [companionDataExpanded, setCompanionDataExpanded] =
    useState<boolean>(false);
  const [additionalDataExpanded, setAdditionalDataExpanded] =
    useState<boolean>(false);
  const [combinedValues, setCombinedValues] = useState<VisitInterface>();

  const [child, setChild] = useState<boolean>(false);


  //* buttons useRef
  const refSubmitPatientPerson: any = useRef(null);
  const refSubmitCompanionPerson: any = useRef(null);
  const refSubmitSequenceNum: any = useRef(null);
  const refSubmitKinship: any = useRef(null);
  const refSubmitAdditionalData: any = useRef(null);

  //* Form data refrence
  const sequenceNumberValue = useRef<number>();
  const kinshipValue = useRef<number>();
  const patientData = useRef<PersonInterface>();

  //* Submit functions
  const submitPatient = () => {
    if (refSubmitPatientPerson.current && refSubmitSequenceNum.current) {
      refSubmitSequenceNum.current.click();
      refSubmitPatientPerson.current.click();
    }
  }
  const submitCompanion = () => {
    if (refSubmitCompanionPerson.current && refSubmitKinship.current) {
      refSubmitKinship.current.click();
      refSubmitCompanionPerson.current.click();
    }
  }
  const submitAdditionalData = () => {
    if (refSubmitAdditionalData.current) {
      refSubmitAdditionalData.current.click();
    }
  }

  //* Handle Patient Submit
  const handleSequenceNumSubmit = (values: Pick<VisitInterface, 'sequenceNumber'>) => {
    sequenceNumberValue.current = values.sequenceNumber;
  };

  const handlePatientSubmit = (values: PersonInterface) => {
    patientData.current = values;
    setCombinedValues((previous) => ({
      ...previous,
      patient: values,
      sequenceNumber: sequenceNumberValue.current
    }))
  };


  //* Handle Companion Submit
  const handleKinshipSubmit = (values: Pick<VisitInterface, 'kinship'>) => {
    kinshipValue.current = values.kinship;
  };

  const handleCompanionSubmit = (values: PersonInterface) => {
    setCombinedValues((previous) => ({
      ...previous,
      companion: values,
      kinship: kinshipValue.current
    }))
  };


  //* Handle Additional Data Submit
  const handleAdditionalDataSubmit = (values: AdditionalDataInterface) => {
    setCombinedValues((previous) => ({
      ...previous,
      additionalInfo: values,
    }))
  };

  //* Handle Submit all Forms
  const handleSubmitAllForms = () => {
    submitPatient()
    submitCompanion()
    submitAdditionalData()
  }


  useEffect(() => {
    if (patientData.current && sequenceNumberValue.current) {
      // TODO: Make Dispatch
      console.log(combinedValues)
    }
  },
    [combinedValues]
  );

  return (
    <Box sx={{ marginTop: "2.5rem" }}>
      <CustomAccordion
        isClosable={false}
        title="بيانات المريض"
        isDisabled={false}
        isExpanded={patientDataExpanded}
        setExpanded={setPatientDataExpanded}
      >
        {/* //* Start Patient form ********************* */}
        <Formik
          initialValues={{ sequenceNumber: undefined }}
          validationSchema={() => {
            setPatientDataExpanded(true);
            return VisitEntity.sequenceNumberSchema()
          }}
          onSubmit={(values) => {
            handleSequenceNumSubmit(values);
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
                    type: "number",
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
                      transition: '0.2s',
                      userSelect: 'none'
                    }}
                    onClick={() => setChild(!child)}
                  >
                    <Typography>طفل / مجهول</Typography>
                  </Box>
                </Box>
                <Button
                  type="submit"
                  sx={{ display: "none" }}
                  ref={refSubmitSequenceNum}
                ></Button>
              </Box>
            </Box>
          )}
        </Formik>

        {/* //* start Patient Personal form *************************** */}
        <PersonalDataComponent
          initialValues={PersonEntity.defaultValue()}
          onSubmit={handlePatientSubmit}
          refSubmitButton={refSubmitPatientPerson}
          validateOnMount={true}
          validationSchema={VisitEntity.getPatientSchema(!child)}
        />
      </CustomAccordion>

      {/* //* Start Additional Data ******************* */}
      <Box>
        <CustomAccordion
          isClosable={false}
          title="البيانات الأضافية"
          isDisabled={false}
          isExpanded={additionalDataExpanded}
          setExpanded={setAdditionalDataExpanded}
        >
          <AdditionalData
            initialValues={AdditionalDataEntity.defaultValue()}
            refSubmitButton={refSubmitAdditionalData}
            onSubmit={handleAdditionalDataSubmit}
          />
        </CustomAccordion>
      </Box>


      {/* //* Start Companion ************************************* */}
      <Box>
        <CustomAccordion
          isClosable={false}
          title="بيانات المرافق"
          isDisabled={false}
          isExpanded={companionDataExpanded}
          setExpanded={setCompanionDataExpanded}
        >
          {/* //* start rest companion form */}
          <Box>
            <Formik
              initialValues={{ kinship: undefined }}
              validationSchema={() => {
                setCompanionDataExpanded(true);
                return VisitEntity.kinshipSchema();
              }}
              onSubmit={(values) => {
                handleKinshipSubmit(values);
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
                    options={lookupsState.lookups.kinshipTypes}
                  />
                  <Button
                    type="submit"
                    sx={{ display: "none" }}
                    ref={refSubmitKinship}
                  ></Button>
                </Box>
              )}
            </Formik>

            {/* //* start companion form */}
            <PersonalDataComponent
              initialValues={PersonEntity.defaultValue()}
              onSubmit={handleCompanionSubmit}
              refSubmitButton={refSubmitCompanionPerson}
              validationSchema={VisitEntity.getCompanionSchema()}
            />
          </Box>
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
          onClick={() => handleSubmitAllForms()}
        />
        {/* <SecondaryButton
          title="اضــــافة مـــرافق"
          type="button"
          onClick={() => {
            setAddCompanionClicked(true);
            setShowCompanionFlag(true)
            // onTriggerRestAndPatientForm();
          }}
          sx={{ display: showCompanionFlag ? "none" : "block" }}
        /> */}
      </Box>
    </Box>
  );
};

export default AddVisitForm;
