import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { Button, Box, Typography, Grid } from "@mui/material";
import { Formik, FormikProps } from "formik";
import React, { useEffect, useRef, useState } from "react";
import CustomTextField from "@/core/shared/components/CustomTextField";
import CustomAccordion from "@/core/shared/components/CustomAccordion";
import AdditionalData from "@/modules/registration/presentation/components/AdditionalData";
import { useAppDispatch, useAppSelector } from "@/core/state/store";
import { AdditionalDataInterface } from "@/modules/registration/domain/interfaces/additional-data-interface";
import AdditionalDataEntity from "@/modules/registration/domain/entities/additional-data-entity";
import PersonEntity from "@/core/shared/modules/person/domain/entities/person-entity";
import PersonInterface from "@/core/shared/modules/person/domain/interfaces/person-interface";
import VisitEntity from "@/modules/registration/domain/entities/visit-entity";
import VisitInterface from "@/modules/registration/domain/interfaces/visit-interface";
import { createVisit } from "../../../controllers/thunks/visits-thunks";
import CompanionForm from "../../CompanionForm";
import PersonalData from "@/core/shared/components/PersonalData";
import { CompanionInterface } from "@/modules/registration/domain/interfaces/companion-interface";
import { TransferDataInterface } from "@/modules/registration/domain/interfaces/transfer-data-interface";
import CustomSelectField from "@/core/shared/components/CustomSelectField";
import { SubDepartmentsState } from "@/modules/management/presentation/controllers/types";
import { SubDepartmentInterface } from "@/modules/management/domain/interfaces/sub-departments-interface";
import { getSubDepartmentsList } from "@/modules/management/presentation/controllers/thunks/sub-departments-thunks";

const AddVisitForm = () => {
  const dispatch = useAppDispatch();

  // useState
  const [patientDataExpanded, setPatientDataExpanded] = useState<boolean>(true);
  const [transferDataExpanded, setTransferDataExpanded] =
    useState<boolean>(true);
  const [companionDataExpanded, setCompanionDataExpanded] =
    useState<boolean>(false);
  const [additionalDataExpanded, setAdditionalDataExpanded] =
    useState<boolean>(false);
  const [combinedValues, setCombinedValues] = useState<VisitInterface>();

  const [isChild, setIsChild] = useState<boolean>(false);

  //* buttons useRef
  const refSubmitPatient: any = useRef(null);
  const refSubmitCompanion: any = useRef(null);
  const refSubmitAdditionalData: any = useRef(null);
  const refSubmitTransferData: any = useRef(null);

  //* Form data refrence
  const patientData = useRef<PersonInterface>();
  const companionData = useRef<CompanionInterface>();
  const additionalData = useRef<AdditionalDataInterface>();
  const transferData = useRef<TransferDataInterface>();

  //* Submit functions
  const submitPatient = () => {
    if (refSubmitPatient.current) {
      refSubmitPatient.current.click();
    }
  };
  const submitCompanion = () => {
    if (refSubmitCompanion.current) {
      refSubmitCompanion.current.click();
    }
  };
  const submitAdditionalData = () => {
    if (refSubmitAdditionalData.current) {
      refSubmitAdditionalData.current.click();
    }
  };
  const submitTransferData = () => {
    if (refSubmitTransferData.current) {
      refSubmitTransferData.current.click();
    }
  };

  //* Handle Patient Submit
  const handlePatientSubmit = (
    values: PersonInterface & { sequenceNumber: string }
  ) => {
    const { sequenceNumber, ...patientPersonalData } = values;
    patientData.current = values;
    setCombinedValues((previous) => ({
      ...previous,
      patient: patientPersonalData,
      sequenceNumber,
    }));
  };

  //* Handle Companion Submit
  const handleCompanionSubmit = (values: PersonInterface) => {
    companionData.current = values;
    setCombinedValues((previous) => ({
      ...previous,
      companion: values,
    }));
  };

  //* Handle Additional Data Submit
  const handleAdditionalDataSubmit = (values: AdditionalDataInterface) => {
    additionalData.current = values;
    setCombinedValues((previous) => ({
      ...previous,
      additionalInfo: values,
    }));
  };

  //* Handle Transfer Data Submit
  const handleTransferDataSubmit = (values: TransferDataInterface) => {
    transferData.current = values;
    setCombinedValues((previous) => ({
      ...previous,
      transfer: values,
    }));
  };

  //* Handle Submit all Forms
  const handleSubmitAllForms = () => {
    submitPatient();
    submitCompanion();
    submitAdditionalData();
    submitTransferData();
  };

  //* Formik refs
  const formikRefPatient =
    useRef<FormikProps<PersonInterface & { sequenceNumber: string }>>(null);
  const formikRefCompanion = useRef<FormikProps<CompanionInterface>>(null);
  const formikRefAdditionalData =
    useRef<FormikProps<AdditionalDataInterface>>(null);
  const formikRefTransferData =
    useRef<FormikProps<TransferDataInterface>>(null);

  useEffect(() => {
    if (
      patientData.current &&
      companionData.current &&
      additionalData.current &&
      transferData.current
    ) {
      if (combinedValues) {
        dispatch(createVisit(combinedValues)).then((res) => {
          if (res?.meta?.requestStatus == "fulfilled") {
            patientData.current = undefined;
            companionData.current = undefined;
            additionalData.current = undefined;
            transferData.current = undefined;
            // Reset forms after successful submission
            if (formikRefPatient.current) formikRefPatient.current.resetForm();
            if (formikRefCompanion.current)
              formikRefCompanion.current.resetForm();
            if (formikRefAdditionalData.current)
              formikRefAdditionalData.current.resetForm();
            if (formikRefTransferData.current)
              formikRefTransferData.current.resetForm();
          }
        });
        console.log(combinedValues);
      }
    }
  }, [combinedValues]);

  useEffect(() => {
    dispatch(getSubDepartmentsList([]))
  }, [])
  

  const subdepartmentState: SubDepartmentsState = useAppSelector(
    (state: any) => state.subDepartments
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
          innerRef={formikRefPatient}
          initialValues={{ sequenceNumber: "", ...PersonEntity.defaultValue() }}
          onSubmit={(values) => {
            console.log(values);
            handlePatientSubmit(values);
          }}
          // validateOnMount={true}
          validationSchema={VisitEntity.getPatientSchema(!isChild)}
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
                      transition: "0.2s",
                      userSelect: "none",
                    }}
                    onClick={() => setIsChild(!isChild)}
                  >
                    <Typography>طفل / مجهول</Typography>
                  </Box>
                </Box>
              </Box>
              <PersonalData />
              <Button
                type="submit"
                sx={{ display: "none" }}
                ref={refSubmitPatient}
              ></Button>
            </Box>
          )}
        </Formik>
      </CustomAccordion>

      {/* //* Start Transfer Data *******************  */}
      <CustomAccordion
        isClosable={false}
        title="نقل المريض"
        isDisabled={false}
        isExpanded={transferDataExpanded}
        setExpanded={setTransferDataExpanded}
      >
        {/* //* Start Patient form ********************* */}
        <Formik
          innerRef={formikRefTransferData}
          initialValues={VisitEntity.transferDataValue()}
          onSubmit={(values) => {
            console.log(values);
            handleTransferDataSubmit(values);
          }}
          validationSchema={VisitEntity.transferDataSchema()}
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
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <CustomTextField
                    name="transferDate"
                    label="تاريخ نقل المريض"
                    value={values.transferDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.transferDate}
                    touched={touched.transferDate}
                    width="100%"
                    props={{
                      type: "date",
                    }}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <CustomSelectField
                    value={values.toSubDepId}
                    options={subdepartmentState?.subDepartments?.items.map(
                      (subdepartment: SubDepartmentInterface) => {
                        return {
                          id: subdepartment.id,
                          value: subdepartment.name,
                        };
                      }
                    )}
                    name="toSubDepId"
                    label="نقل المريض الي"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.toSubDepId}
                    touched={touched.toSubDepId}
                    width="100%"
                    sx={{ margin: "0" }}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                sx={{ display: "none" }}
                ref={refSubmitTransferData}
              ></Button>
            </Box>
          )}
        </Formik>
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
            innerFormRef={formikRefAdditionalData}
            initialValues={AdditionalDataEntity.defaultValue()}
            refSubmitButton={refSubmitAdditionalData}
            onSubmit={(values) => {
              setAdditionalDataExpanded(true);
              return handleAdditionalDataSubmit(values);
            }}
          />
        </CustomAccordion>
      </Box>

      {/* //* Start Companion ************************************* */}
      <Box mt={2}>
        <CustomAccordion
          isClosable={false}
          title="بيانات المرافق"
          isDisabled={false}
          isExpanded={companionDataExpanded}
          setExpanded={setCompanionDataExpanded}
        >
          <Box>
            <CompanionForm
              innerFormRef={formikRefCompanion}
              initialValues={VisitEntity.companionDefaultValue()}
              onSubmit={(values) => {
                setCompanionDataExpanded(true);
                return handleCompanionSubmit(values);
              }}
              validationSchema={VisitEntity.getCompanionSchema(isChild)}
              refSubmitButton={refSubmitCompanion}
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
      </Box>
    </Box>
  );
};

export default AddVisitForm;
