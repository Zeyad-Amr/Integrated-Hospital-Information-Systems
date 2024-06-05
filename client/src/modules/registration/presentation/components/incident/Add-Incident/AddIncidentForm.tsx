import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import SecondaryButton from "@/core/shared/components/btns/SecondaryButton";
import { Formik, FormikProps } from "formik";
import CustomTextField from "@/core/shared/components/CustomTextField";
import { Button } from "@mui/material";
import CustomAccordion from "@/core/shared/components/CustomAccordion";
import AlertDialog from "@/core/shared/components/AlertDialog";
import AdditionalData from "@/modules/registration/presentation/components/AdditionalData";
import AdditionalDataEntity from "@/modules/registration/domain/entities/additional-data-entity";
import IncidentEntity from "@/modules/registration/domain/entities/incident-entity";
import CompanionList from "../CompanionList";
import CompanionForm from "../../CompanionForm";
import VisitEntity from "@/modules/registration/domain/entities/visit-entity";
import IncidentInterface from "@/modules/registration/domain/interfaces/incident-interface";
import { AdditionalDataInterface } from "@/modules/registration/domain/interfaces/additional-data-interface";
import { useAppDispatch } from "@/core/state/store";
import { createIncident } from "../../../controllers/thunks/incident-thunk";
import { CompanionInterface } from "@/modules/registration/domain/interfaces/companion-interface";

const AddIncidentForm = () => {
  const dispatch = useAppDispatch();

  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const [AdditionalDataAccordion, setAdditionalDataAccordion] =
    useState<boolean>(true);
  const [companionAccordion, setCompanionAccordion] = useState<boolean>(false);

  const [editing, setEditing] = useState<boolean>(false);
  const [searchSSN, setSearchSSN] = useState<boolean>(true);
  const [index, setIndex] = useState<number>(0);
  const [companionsArray, setCompanionsArray] = useState<{}[]>([]);

  const [combinedValues, setCombinedValues] = useState<IncidentInterface>();

  //* buttons useRef
  const refSubmitNumOfPatients: any = useRef(null);
  const refSubmitAdditionalData: any = useRef(null);
  const refSubmitCompanion: any = useRef(null);

  //* Form data refrence
  const numOfPatients = useRef<any>();
  const additionalData = useRef<AdditionalDataInterface>();

  //* Submit functions
  const submitNumOfPatients = () => {
    if (refSubmitNumOfPatients.current) {
      refSubmitNumOfPatients.current.click();
    }
  };
  const submitCompanion = () => {
    if (refSubmitCompanion.current) {
      refSubmitCompanion.current.click();
    }
  };
  const submitAdditionalData = () => {
    if (refSubmitAdditionalData.current) {
      console.log("hhhhh");
      refSubmitAdditionalData.current.click();
    }
  };

  //* Handle Companion Submit
  const handleCompanionSubmit = (values: CompanionInterface) => {
    if (editing) {
      setSearchSSN(true);
      setCompanionsArray((previous) => {
        previous[index] = values;
        return previous;
      });
      setEditing(false);
    } else {
      setCompanionsArray((previous) => [...previous, values]);
      setEditing(false);
    }
    if (formikRefCompanion.current) formikRefCompanion.current.resetForm();
  };

  //* Handle Submit all Forms
  const handleSubmitAllForms = () => {
    console.log("ah");

    submitNumOfPatients();
    submitAdditionalData();
    setCombinedValues((previous) => ({
      ...previous,
      companions: companionsArray,
    }));
  };

    //* Formik refs
    const formikRefNoPatients = useRef<FormikProps<{numOfPatients : string}>>(null);
    const formikRefAdditionalData = useRef<FormikProps<AdditionalDataInterface>>(null);
    const formikRefCompanion = useRef<FormikProps<CompanionInterface>>(null);

  //* Handle Number of Patients Submit
  const handleNumOfPatientsSubmit = (values: { numOfPatients: string }) => {
    numOfPatients.current = values;
    setCombinedValues((previous) => ({
      ...previous,
      numOfPatients: values.numOfPatients,
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

  useEffect(() => {
    if (numOfPatients.current && additionalData.current) {
      if (combinedValues) {
        dispatch(createIncident(combinedValues)).then((res) => {
          if (res.meta.requestStatus == "fulfilled") {
            numOfPatients.current = undefined;
            additionalData.current = undefined;
            setCompanionsArray([]);
          // Reset forms after successful submission
          if (formikRefAdditionalData.current) formikRefAdditionalData.current.resetForm();
          if (formikRefCompanion.current) formikRefCompanion.current.resetForm();
          if (formikRefNoPatients.current) formikRefNoPatients.current.resetForm();
          }
        });
        console.log(combinedValues);
      }
    }
  }, [combinedValues]);

  return (
    <>
      <AlertDialog openAlert={openAlert} setOpenAlert={setOpenAlert} />

      <Formik
        innerRef={formikRefNoPatients}
        enableReinitialize
        initialValues={{
          numOfPatients: "",
        }}
        validationSchema={IncidentEntity.getNumOfPatientsSchema()}
        onSubmit={(values, { resetForm }) => {
          handleNumOfPatientsSubmit(values);
          resetForm();
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
          <Box
            sx={{ marginTop: "1rem" }}
            component="form"
            onSubmit={handleSubmit}
            noValidate
          >
            <Box>
              <CustomTextField
                isRequired
                name="numOfPatients"
                label="عدد المرضى"
                value={values.numOfPatients}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.numOfPatients}
                touched={touched.numOfPatients}
                width="100%"
                props={{
                  type: "number",
                }}
              />
              <Button
                type="submit"
                sx={{ display: "none" }}
                ref={refSubmitNumOfPatients}
              ></Button>
            </Box>
          </Box>
        )}
      </Formik>

      {/* //* Start Additional Data Accordion************************************************* */}
      <CustomAccordion
        isDisabled={false}
        isExpanded={AdditionalDataAccordion}
        setExpanded={setAdditionalDataAccordion}
        title="البيــانات الاضـــافية"
        isClosable={false}
      >
        <AdditionalData
          innerFormRef={formikRefAdditionalData}
          initialValues={AdditionalDataEntity.defaultValue()}
          onSubmit={(values) => {
            console.log(values);
            return handleAdditionalDataSubmit(values);
          }}
          refSubmitButton={refSubmitAdditionalData}
          isResetForm
        />
      </CustomAccordion>

      {/* //* Start Companion Accordion************************************************* */}
      <CustomAccordion
        isDisabled={false}
        isExpanded={companionAccordion}
        setExpanded={setCompanionAccordion}
        title="بيــانات المـــرافقين"
        isClosable={false}
      >
        <Box sx={{ display: "flex" }}>
          {/* //* Start Companion Form */}
          <Box sx={{ width: "75%" }}>
            <CompanionForm
              initialValues={VisitEntity.companionDefaultValue()}
              validationSchema={VisitEntity.getCompanionSchema(true)}
              onSubmit={(values) => {
                return handleCompanionSubmit(values);
              }}
              refSubmitButton={refSubmitCompanion}
              searchSSN={searchSSN}
              innerFormRef={formikRefCompanion}
              // newValues={companionFormValues}
            />
            <SecondaryButton
              id="add-comp-btn"
              title={editing ? "حفــــظ" : "اضــــافة"}
              type="button"
              onClick={() => {
                submitCompanion();
              }}
            />
          </Box>

          {/* //* Start Companion List */}
          <Box
            sx={{
              width: `25%`,
              paddingLeft: `1rem`,
              transition: "0.3s",
            }}
          >
            <Box
              sx={{
                borderRadius: "10px",
                backgroundColor: "#eee",
                width: "100%",
                height: "100%",
              }}
            >
              <CompanionList
                companionsArray={companionsArray}
                companionFormRef={formikRefCompanion}
                setSearchSSN={setSearchSSN}
                setEditing={setEditing}
                setIndex={setIndex}
              />
            </Box>
          </Box>
        </Box>
      </CustomAccordion>

      <PrimaryButton
        id="confirm-btn"
        title="حفـــظ"
        type="button"
        onClick={handleSubmitAllForms}
      />
    </>
  );
};

export default AddIncidentForm;
