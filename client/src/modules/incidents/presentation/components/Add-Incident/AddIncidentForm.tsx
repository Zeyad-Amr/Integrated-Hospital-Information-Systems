import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import SecondaryButton from "@/core/shared/components/btns/SecondaryButton";
import PersonalData, {
  PersonalDataValues,
} from "@/core/shared/components/PersonalData";
import SubHeader from "@/core/shared/components/headers/SubHeader";
import IncidentHeader from "../IncidentHeader";
import CompleteIncident from "../../pages/CompleteIncident";
import AdditionalData, {
  AdditionalDataValues,
} from "@/core/shared/components/AdditionalData";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomTextField from "@/core/shared/components/CustomTextField";
import { Button } from "@mui/material";

const AddIncidentForm = () => {
  const refSubmitButton: any = useRef(null);

  const [showIncidentForm, setshowIncidentForm] = useState("block");
  const [hide, setHide] = useState("block");
  const [showIncidentHeader, setshowIncidentHeader] = useState("none");
  const [showCompForm, setshowCompForm] = useState("none");
  const [showDialog, setShawDialog] = useState("none");

  const [submitFlag, setSubmitFlag] = useState<boolean>(false);
  const [incidentFormSubmitted, setIncidentFormSubmitted] =
    useState<boolean>(false);
  const [addingCompanion, setAddingCompanion] = useState<string>("none");
  const [addDatasubmitFlag, setAddDatasubmitFlag] = useState<boolean>(false);

  const [clickedBtnId, setClickedBtnId] = useState("");

  const intialValues: PersonalDataValues = {
    firstName: "",
    secondName: "",
    thirdName: "",
    fourthName: "",
    email: "",
    SSN: "",
    phone: "",
    gender: "",
    governate: "",
    birthDate: "",
    address: "",
    verificationMethod: "",
  };

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
    response.current.companions.push(values);
    setAddingCompanion("added");
    console.log(document.getElementById('personal-data-form'));
    (document.getElementById('personal-data-form') as HTMLFormElement).reset()
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
    setshowIncidentHeader("flex");
    setshowIncidentForm("none");
    setHide("none");
  };

  const handleEditBtn = () => {
    setshowIncidentHeader("none");
    setshowIncidentForm("block");
    setIncidentFormSubmitted(false);
  };

  const submitButtonClick = () => {
    setAddDatasubmitFlag(!addDatasubmitFlag);
  };

  useEffect(() => {
    if (incidentFormSubmitted && clickedBtnId === "add-comp-btn") {
      handleAddCompanionShow();
    } else if (
      incidentFormSubmitted &&
      clickedBtnId === "confirm-btn" &&
      addingCompanion !== "adding"
    ) {
      console.log(response.current);
    }
  }, [addingCompanion, clickedBtnId, incidentFormSubmitted]);
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
            sx={{ marginTop: "2rem" }}
            component="form"
            onSubmit={handleSubmit}
            noValidate
          >
            <Box
              sx={{ display: showIncidentForm ? showIncidentForm : "block" }}
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

      <AdditionalData
        initialValues={intialAdditionalValues}
        onSubmit={handleIncidentSubmission}
        isSubmitted={addDatasubmitFlag}
        display={showIncidentForm}
      />
      <IncidentHeader
        // setIncidentData={setIncidentData}
        // setcompanionData={setcompanionData}
        data={response.current}
        display={showIncidentHeader}
        onClick={handleEditBtn}
      />
      <Box sx={{ display: showCompForm }}>
        <SubHeader
          setAddingCompanion={setAddingCompanion}
          setSubmitFlag={setSubmitFlag}
          handleEditBtn={handleEditBtn}
          SubHeaderText="بيـــانات المــرافق"
          compStateChanger={setshowCompForm}
          compBtnStateChanger={setHide}
        />
        <PersonalData
          initialValues={intialValues}
          onSubmit={handleCompanionSubmission}
          isSubmitted={submitFlag}
        />
      </Box>
      <Box
        sx={{
          // marginTop: "1.5rem",
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
          title="اضــــافة مـــرافق"
          type="button"
          onClick={(e: any) => {
            handleClickedButton(e);
          }}
        />
        <SecondaryButton
          display={hide}
          title="استكمال البيانات"
          type="button"
          onClick={() => {
            setShawDialog("block");
          }}
        />
      </Box>
    </>
  );
};

export default AddIncidentForm;
