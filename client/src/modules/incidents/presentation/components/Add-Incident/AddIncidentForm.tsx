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
import CustomSelectField from "@/core/shared/components/CustomSelectField";
import CustomTextField from "@/core/shared/components/CustomTextField";
import { Grid } from "@mui/material";
import { values } from "lodash";

const AddIncidentForm = () => {
  const refSubmitButton: any = useRef(null);

  const [showIncidentForm, setshowIncidentForm] = useState("block");
  const [hide, setHide] = useState("block");
  const [showIncidentHeader, setshowIncidentHeader] = useState("none");
  const [showCompForm, setshowCompForm] = useState("none");
  const [showDialog, setShawDialog] = useState("none");

  const [incidentData, setIncidentData] = useState({});
  const [companionData, setcompanionData] = useState({});

  const [submitFlag, setSubmitFlag] = useState<boolean>(false);
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
    setcompanionData(values);
  };

  const handleIncidentSubmission = (values: any) => {
    setIncidentData(values);
  };

  useEffect(() => {
    if (
      Object.keys(incidentData).length !== 0 &&
      Object.keys(companionData).length === 0
    ) {
      console.log("incidentData", incidentData);
    } else if (
      Object.keys(companionData).length === 0 &&
      Object.keys(companionData).length !== 0
    ) {
      console.log("companionData", companionData);
    } else if (
      Object.keys(incidentData).length !== 0 &&
      Object.keys(companionData).length !== 0
    ) {
      console.log("incidentData", incidentData);
      console.log("companionData", companionData);
    }
  }, [companionData, incidentData]);

  const handleClickedButton = (e: any) => {
    if (e.target.id === "confirm-btn") {
      if (showCompForm === "none" && showIncidentForm === "block") {
        submitButtonClick();
      } else if (showCompForm === "block" && showIncidentForm === "none") {
        setSubmitFlag(!submitFlag);
      } else if (showCompForm === "block" && showIncidentForm === "block") {
        submitButtonClick();
        setSubmitFlag(!submitFlag);
      }
      setClickedBtnId(e.target.id);
    } else if (e.target.id === "add-comp-btn") {
      submitButtonClick();
      setClickedBtnId(e.target.id);
    }
  };

  const handleAddCompanionShow = () => {
    setshowCompForm("block");
    setshowIncidentHeader("flex");
    setshowIncidentForm("none");
    setHide("none");
  };

  const handleEditBtn = () => {
    setshowIncidentHeader("none");
    setshowIncidentForm("block");
    setIncidentData([]);
    setcompanionData([]);
  };

  const submitButtonClick = () => {
    setAddDatasubmitFlag(!addDatasubmitFlag);
  };

  useEffect(() => {
    if (
      Object.keys(incidentData).length > 1 &&
      clickedBtnId === "add-comp-btn"
    ) {
      handleAddCompanionShow();
    }
  }, [clickedBtnId, incidentData]);
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
        onSubmit={() => {
          // onSubmit(values);
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
        setIncidentData={setIncidentData}
        setcompanionData={setcompanionData}
        data={incidentData}
        display={showIncidentHeader}
        onClick={handleEditBtn}
      />
      <Box sx={{ display: showCompForm }}>
        <SubHeader
          setSubmitFlag={setSubmitFlag}
          handleEditBtn={handleEditBtn}
          setIncidentData={setIncidentData}
          setcompanionData={setcompanionData}
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
          marginTop: "2.5rem",
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
          display={hide}
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
