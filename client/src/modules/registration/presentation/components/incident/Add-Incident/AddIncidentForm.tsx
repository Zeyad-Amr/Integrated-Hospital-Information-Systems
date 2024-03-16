import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import SecondaryButton from "@/core/shared/components/btns/SecondaryButton";

import GetCompanions from "../GetCompanions";

import { Formik } from "formik";
import * as Yup from "yup";
import CustomTextField from "@/core/shared/components/CustomTextField";
import { Button } from "@mui/material";
import CustomAccordion from "@/core/shared/components/CustomAccordion";
import AlertDialog from "@/core/shared/components/AlertDialog";
import { AdditionalDataInterface } from "@/modules/registration/domain/interfaces/additional-data-interface";
import AdditionalData from "@/core/shared/components/AdditionalData";
import PersonInterface from "@/core/shared/modules/person/domain/interfaces/person-interface";
import PersonalDataComponent from "@/core/shared/components/PersonalDataComponent";
import AdditionalDataEntity from "@/modules/registration/domain/entities/additional-data-entity";
import PersonEntity from "@/core/shared/modules/person/domain/entities/person-entity";

const AddIncidentForm = () => {
  const refSubmitButton: any = useRef(null);

  const [submitFlag, setSubmitFlag] = useState<boolean>(false);
  const [incidentFormSubmitted, setIncidentFormSubmitted] =
    useState<boolean>(false);

  const [addDatasubmitFlag, setAddDatasubmitFlag] = useState<boolean>(false);

  const [clickedBtnId, setClickedBtnId] = useState("");
  const [AdditionalDataAccordion, setAdditionalDataAccordion] =
    useState<boolean>(true);
  const [userDataAccordion, setUserDataAccordion] = useState<boolean>(false);

  const [editing, setEditing] = useState<boolean>(false);
  const [intialValues, setIntialValues] =
    useState<PersonInterface>();

  const [idx, setIdx] = useState<number>(0);


  const [companionsArray, setTestArray] = useState<{}[]>([]);

  const handleCompanionSubmission = (values: PersonInterface) => {
    let newCompanionsArray: {}[];
    if (editing) {
      response.current.companions[idx] = values;
      setEditing(false);
      setIntialValues(MainInitialVlaues);
      newCompanionsArray = [...companionsArray];
      newCompanionsArray[idx] = values;
      setTestArray(newCompanionsArray);
    } else {
      response.current.companions.push(values);
      newCompanionsArray = [...companionsArray, values];
      setTestArray(newCompanionsArray);
    }
  };

  const handleIncidentSubmission = (values: any) => {
    response.current.description =
      values.comeFromString === "1"
        ? "home"
        : values.comeFromString === "2"
          ? "accedent"
          : "prison";
    (response.current.attendantName = values.attendantName),
      (response.current.attendantSSN = values.attendantSSN),
      (response.current.attendantSerialNumber = values.attendantSerialNumber),
      (response.current.car.firstChar = values.firstChar),
      (response.current.car.secondChar = values.secondChar),
      (response.current.car.thirdChar = values.thirdChar),
      (response.current.car.number = values.carNum);
    (response.current.reason = values.reason),
      (response.current.place = values.place),
      (response.current.notes = values.notes);
    setIncidentFormSubmitted(true);
  };
  //////////////////////////////// AlertDialog ////////////////////////////////
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  /////////////////////////////////////////////////////////////////////////////
  let response: React.MutableRefObject<{
    numOfPatients: string;
    description: string;
    attendantName: string;
    attendantSSN: string;
    attendantSerialNumber: string;
    car: {
      firstChar: string;
      secondChar: string;
      thirdChar: string;
      number: string;
    };
    companions: {}[];
    reason: string;
    place: string;
    notes: string;
  }> = useRef({
    numOfPatients: "",
    description: "",
    attendantName: "",
    attendantSSN: "",
    attendantSerialNumber: "",
    car: {
      firstChar: "",
      secondChar: "",
      thirdChar: "",
      number: "",
    },
    companions: [],
    reason: "",
    place: "",
    notes: "",
  });

  const handleClickedButton = (e: any) => {
    if (e.target.id === "confirm-btn") {
      if (refSubmitButton.current) {
        refSubmitButton.current.click();
      }
      submitButtonClick();
      setClickedBtnId(e.target.id);
    } else if (e.target.id === "add-comp-btn") {
      setClickedBtnId(e.target.id);

      setSubmitFlag(!submitFlag);
    }
  };

  const submitButtonClick = () => {
    setAddDatasubmitFlag(!addDatasubmitFlag);
  };

  useEffect(() => {
    if (incidentFormSubmitted && clickedBtnId === "confirm-btn") {
      if (true) {
        setOpenAlert(true);
      } else {
        console.log(response.current);
      }
    }
  }, [addDatasubmitFlag, incidentFormSubmitted]);

  const handleFormSchema = Yup.object({
    numOfPatients: Yup.number().required("يجب إدخال عدد المرضى"),
  });

  return (
    <>
      <AlertDialog openAlert={openAlert} setOpenAlert={setOpenAlert} />
      {/* <CustomAlert
        msg="test"
        onClose={() => console.log("ahhh")}
        duration={5000}
        openAlert
      /> */}
      <Formik
        initialValues={{
          numOfPatients: "",
        }}
        validationSchema={handleFormSchema}
        onSubmit={(values) => {
          response.current.numOfPatients = values.numOfPatients;
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
                ref={refSubmitButton}
              ></Button>
            </Box>
          </Box>
        )}
      </Formik>
      <CustomAccordion
        isDisabled={false}
        isExpanded={AdditionalDataAccordion}
        setExpanded={setAdditionalDataAccordion}
        title="البيــانات الاضـــافية"
        isClosable={false}
      >
        <AdditionalData
          initialValues={AdditionalDataEntity.defaultValue()}
          onSubmit={handleIncidentSubmission}
          isSubmitted={addDatasubmitFlag}
        />
      </CustomAccordion>

      <CustomAccordion
        isDisabled={false}
        isExpanded={userDataAccordion}
        setExpanded={setUserDataAccordion}
        title="بيــانات المـــرافقين"
        isClosable={false}
      >
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "75%" }}>
            <PersonalDataComponent
              isResetForm
              initialValues={PersonEntity.defaultValue()}
              onSubmit={handleCompanionSubmission}
              refSubmitButton={submitFlag}
            />
            <SecondaryButton
              id="add-comp-btn"
              title={editing ? "حفــــظ" : "اضــــافة"}
              type="button"
              onClick={(e: any) => {
                handleClickedButton(e);
              }}
            />
          </Box>
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
              <GetCompanions
                companionsArray={companionsArray}
                setIntialValues={setIntialValues}
                setEditing={setEditing}
                getIdx={setIdx}
              />
            </Box>
          </Box>
        </Box>
      </CustomAccordion>

      <PrimaryButton
        id="confirm-btn"
        title="حفـــظ"
        type="button"
        onClick={(e: HTMLElement) => {
          handleClickedButton(e);
        }}
      />
    </>
  );
};

export default AddIncidentForm;
