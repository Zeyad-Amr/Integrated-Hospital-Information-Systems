import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import SecondaryButton from "@/core/shared/components/btns/SecondaryButton";
import PersonalData, {
  PersonalDataValues,
} from "@/core/shared/components/PersonalData";
// import SubHeader from "@/core/shared/components/headers/SubHeader";
// import IncidentHeader from "../IncidentHeader";
import GetCompanions from "../GetCompanions";
import CompleteIncident from "../../pages/CompleteIncident";
import AdditionalData, {
  AdditionalDataValues,
} from "@/core/shared/components/AdditionalData";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomTextField from "@/core/shared/components/CustomTextField";
import { Button } from "@mui/material";
import CustomAccordion from "@/core/shared/components/CustomAccordion";

const AddIncidentForm = () => {
  const refSubmitButton: any = useRef(null);

  // const [showIncidentForm, setshowIncidentForm] = useState("block");
  // const [showIncidentHeader, setshowIncidentHeader] = useState("none");
  const [showCompForm, setshowCompForm] = useState("none");
  const [showDialog, setShawDialog] = useState("none");

  const [submitFlag, setSubmitFlag] = useState<boolean>(false);
  const [incidentFormSubmitted, setIncidentFormSubmitted] =
    useState<boolean>(false);
  const [NumOfPatients, setNumOfPatients] = useState<boolean>(false);
  const [addingCompanion, setAddingCompanion] = useState<string>("none");
  const [addDatasubmitFlag, setAddDatasubmitFlag] = useState<boolean>(false);

  const [clickedBtnId, setClickedBtnId] = useState("");
  const [additionalDataAccordion, setAdditionalDataAccordion] =
    useState<boolean>(true);
  const [userDataAccordion, setUserDataAccordion] = useState<boolean>(false);

  const MainInitialVlaues = {
    firstName: "",
    secondName: "",
    thirdName: "",
    fourthName: "",
    SSN: "",
    phone: "",
    gender: "",
    governate: "",
    birthDate: "",
    address: "",
    verificationMethod: "",
  }

  const [editing, setEditing] = useState<boolean>(false);
  const [intialValues, setIntialValues] = useState<PersonalDataValues>(MainInitialVlaues);


  const [idx, setIdx] = useState<number>(0);

  const intialAdditionalValues: AdditionalDataValues = {
    comeFromString: "",
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

  const handleCompanionSubmission = (values: PersonalDataValues) => {
    console.log(editing);
    if (editing) {
      response.current.companions[idx] = values;
      setEditing(false);
      setIntialValues(MainInitialVlaues);
    } else {
      response.current.companions.push(values);
      setAddingCompanion("added");
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
      (response.current.notes = values.notes),
      setIncidentFormSubmitted(true);
  };

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
    if (refSubmitButton.current) {
      refSubmitButton.current.click();
    }
    submitButtonClick();

    if (e.target.id === "confirm-btn") {
      setClickedBtnId(e.target.id);
      if (addingCompanion === "adding") {
        setSubmitFlag(!submitFlag);
      }
    } else if (e.target.id === "add-comp-btn") {
      setClickedBtnId(e.target.id);
      if (addingCompanion === "adding") {
        setSubmitFlag(!submitFlag);
      }
    }
  };

  const handleAddCompanionShow = () => {
    setAddingCompanion("adding");
    setshowCompForm("block");
    // setshowIncidentHeader("flex");
    // setshowIncidentForm("none");
    setAdditionalDataAccordion(false);
    setUserDataAccordion(true);
  };

  // const handleEditBtn = () => {
  //   setshowIncidentHeader("none");
  //   setshowIncidentForm("block");
  //   setIncidentFormSubmitted(false);
  // };

  const submitButtonClick = () => {
    setAddDatasubmitFlag(!addDatasubmitFlag);
  };

  useEffect(() => {
    if (
      incidentFormSubmitted &&
      NumOfPatients &&
      clickedBtnId === "add-comp-btn"
    ) {
      handleAddCompanionShow();
    } else if (
      incidentFormSubmitted &&
      clickedBtnId === "confirm-btn" &&
      addingCompanion !== "adding"
    ) {
      console.log(response.current);
    }
  }, [addingCompanion, clickedBtnId, incidentFormSubmitted, NumOfPatients]);
  const handleFormSchema = Yup.object({
    numOfPatients: Yup.number().required("يجب إدخال عدد المرضى"),
  });
  return (
    <>
      <CompleteIncident
        display={showDialog}
        DialogStateController={setShawDialog}
      />
      <Formik
        initialValues={{
          numOfPatients: "",
        }}
        validationSchema={handleFormSchema}
        onSubmit={(values) => {
          response.current.numOfPatients = values.numOfPatients;
          setNumOfPatients(true);
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
            <Box
            // sx={{ display: showIncidentForm ? showIncidentForm : "block" }}
            >
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
        isExpanded={additionalDataAccordion}
        setExpanded={setAdditionalDataAccordion}
        title="البيــانات الاضـــافية"
        isClosable={false}
      >
        <AdditionalData
          initialValues={intialAdditionalValues}
          onSubmit={handleIncidentSubmission}
          isSubmitted={addDatasubmitFlag}
          // display={showIncidentForm}
        />
      </CustomAccordion>
      {/* <IncidentHeader
        Companions={response.current.companions}
        data={response.current}
        display={showIncidentHeader}
        onClick={handleEditBtn}
      /> */}
      <Box sx={{ display: showCompForm }}>
        {/* <SubHeader
          setAddingCompanion={setAddingCompanion}
          setSubmitFlag={setSubmitFlag}
          handleEditBtn={handleEditBtn}
          SubHeaderText="بيـــانات المــرافق"
          compStateChanger={setshowCompForm}
        /> */}
        <CustomAccordion
          isDisabled={false}
          isExpanded={userDataAccordion}
          setExpanded={setUserDataAccordion}
          title="بيــانات المـــرافقين"
          isClosable
        >
          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: "75%" }}>
              <PersonalData
                initialValues={intialValues}
                onSubmit={handleCompanionSubmission}
                isSubmitted={submitFlag}
              />
            </Box>
            <Box sx={{ height: "20rem", width: "25%", paddingLeft: "1rem" }}>
              <Box
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "#eee",
                  width: "100%",
                  height: "100%",
                }}
              >
                <GetCompanions
                  companionsArray={response.current.companions}
                  setIntialValues={setIntialValues}
                  setEditing={setEditing}
                  getIdx={setIdx}
                />
              </Box>
            </Box>
          </Box>
        </CustomAccordion>
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
          id="confirm-btn"
          title="تأكيــد"
          type="button"
          onClick={(e: any) => {
            handleClickedButton(e);
          }}
        />
        <SecondaryButton
          id="add-comp-btn"
          title={
            showCompForm === "none"
              ? "اضــــافة مـــرافق"
              : !editing
              ? "اضـافة مـرافق أخــر"
              : "حفـــظ"
          }
          type="button"
          onClick={(e: any) => {
            handleClickedButton(e);
          }}
        />
      </Box>
    </>
  );
};

export default AddIncidentForm;
