import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { Button, Box, Typography } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import CustomTextField from "@/core/shared/components/CustomTextField";
import CustomSelectField from "@/core/shared/components/CustomSelectField";
import CustomAccordion from "@/core/shared/components/CustomAccordion";
import AdditionalData from "@/core/shared/components/AdditionalData";
import { LookupsState } from "@/core/shared/modules/lookups/presentation/controllers/types";
import { useAppDispatch, useAppSelector } from "@/core/state/store";
import { AdditionalDataInterface } from "@/modules/registration/domain/interfaces/additional-data-interface";
import AdditionalDataEntity from "@/modules/registration/domain/entities/additional-data-entity";
import PersonalDataComponent from "@/core/shared/components/PersonalDataComponent";
import PersonEntity from "@/core/shared/modules/person/domain/entities/person-entity";
import PersonInterface from "@/core/shared/modules/person/domain/interfaces/person-interface";
import VisitEntity from "@/modules/registration/domain/entities/visit-entity";
import VisitInterface from "@/modules/registration/domain/interfaces/visit-interface";
import { createVisit } from "../../../controllers/thunks/visits-thunks";
import { allValuesUndefined } from "@/core/shared/utils/object-operations";

const AddVisitForm = () => {
  const dispatch = useAppDispatch();

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

  const [isChild, setIsChild] = useState<boolean>(false);


  //* buttons useRef
  const refSubmitPatientPerson: any = useRef(null);
  const refSubmitCompanionPerson: any = useRef(null);
  const refSubmitSequenceNum: any = useRef(null);
  const refSubmitKinship: any = useRef(null);
  const refSubmitAdditionalData: any = useRef(null);

  //* Form data refrence
  const sequenceNumberValue = useRef<string>();
  const kinshipValue = useRef<number>();
  const patientData = useRef<PersonInterface>();
  const companionData = useRef<PersonInterface>();
  const additionalData = useRef<AdditionalDataInterface>();

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
    companionData.current = values
    setCombinedValues((previous) => ({
      ...previous,
      companion: values,
      kinship: kinshipValue.current
    }))
  };


  //* Handle Additional Data Submit
  const handleAdditionalDataSubmit = (values: AdditionalDataInterface) => {
    additionalData.current = values
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
    if (patientData.current &&
      sequenceNumberValue.current &&
      companionData.current &&
      additionalData.current) {
      // TODO: Make Dispatch
      if (combinedValues) {

        dispatch(
          createVisit(combinedValues)
        ).then(() => {
          patientData.current = undefined
          sequenceNumberValue.current = undefined
          companionData.current = undefined
          kinshipValue.current = undefined
          additionalData.current = undefined
        })
        console.log(combinedValues)
      }
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
          initialValues={{ sequenceNumber: "" }}
          validationSchema={() => {
            setPatientDataExpanded(true);
            return VisitEntity.sequenceNumberSchema()
          }}
          onSubmit={(values,) => {
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
                      backgroundColor: isChild ? "primary.dark" : "#eee",
                      color: isChild ? "white" : "black",
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
                    onClick={() => setIsChild(!isChild)}
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
          validationSchema={VisitEntity.getPatientSchema(!isChild)}
        // isResetForm={true}
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
          // isResetForm={true}
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
              initialValues={{ kinship: 0 }}
              validationSchema={() => {
                setCompanionDataExpanded(true);
                return VisitEntity.kinshipSchema(companionData.current ? allValuesUndefined(companionData.current) : false);
              }}
              onSubmit={(values) => {
                handleKinshipSubmit(values)
              }}
              validateOnChange={true}
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
                  <CustomSelectField<any>
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
              onSubmit={(values) => { console.log(values); return handleCompanionSubmit(values) }}
              refSubmitButton={refSubmitCompanionPerson}
              validationSchema={VisitEntity.getCompanionSchema((kinshipValue.current ? true : false) || isChild)}
              // isResetForm={true}
              validateOnMount={true}
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
