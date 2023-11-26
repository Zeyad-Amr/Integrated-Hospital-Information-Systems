import React, { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CustomTextField from "@/core/shared/components/CustomTextField";
import CustomSelectField from "@/core/shared/components/CustomSelectField";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import SecondaryButton from "@/core/shared/components/btns/SecondaryButton";
import PersonalData, {
  PersonalDataValues,
} from "@/core/shared/components/PersonalData";
import SubHeader from "@/core/shared/components/headers/SubHeader";
import IncidentHeader from "../IncidentHeader";
import CompleteIncident from "../../pages/CompleteIncident";

const AddIncidentForm = () => {
  const refSubmitButton: any = useRef(null);

  const [showIncidentForm, setshowIncidentForm] = useState("block");
  const [hide, setHide] = useState("block");
  const [showIncidentHeader, setshowIncidentHeader] = useState("none");
  const [showCompForm, setshowCompForm] = useState("none");
  const [incidentData, setIncidentData] = useState({});
  const [companionData, setcompanionData] = useState({});

  useEffect(() => {
    console.log(incidentData);
  }, [incidentData]);

  const [comeFrom, serComeFrom] = useState("");

  const [showDialog, setShawDialog] = useState("none");

  const [submitFlag, setSubmitFlag] = useState<boolean>(false);

  const intialValues: PersonalDataValues = {
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
    date: "",
    address: "",
    SSNtype: "",
    search: "",
  };

  const handleSubmitForm = (values: PersonalDataValues) => {
    setcompanionData(values);
  };

  const [valuesArray, setValuesArray] = useState({});

  const handleIncidentForm = (values: any) => {
    setIncidentData(values);

    setValuesArray(values);
    return values;
  };

  useEffect(() => {
    console.log(companionData);
    console.log(incidentData);
  }, [companionData, incidentData, submitFlag]);

  const handleClick = () => {
    if (showCompForm === "block") {
      setSubmitFlag(!submitFlag);
    } else {
      handleAddCompanion();
    }
  };

  const handleAddCompanionShow = () => {
    setshowCompForm("block");
    setshowIncidentHeader("flex");
    setshowIncidentForm("none");
    setHide("none");
  };

  const handleAddCompanion = () => {
    if (refSubmitButton.current) {
      refSubmitButton.current.click();
    }
  };

  const [addCompanionKey, setAddCompanionKey] = useState(false);

  useEffect(() => {
    if (Object.keys(valuesArray).length > 1 && addCompanionKey) {
      handleAddCompanionShow();
    }
  }, [addCompanionKey, valuesArray]);

  const handleEditBtn = () => {
    setshowIncidentHeader("none");
    setshowIncidentForm("block");
  };

  const handleFormSchema = Yup.object({
    numOfPatients: Yup.number().required("يجب إدخال عدد المرضى"),
    comeFromNum: Yup.number().required("يجب إدخال جهة القدوم"),
    comeFromString: Yup.string().required("يجب إدخال جهة القدوم"),
    paramedicName: Yup.string()
      .required("يجب إدخال اسم المسعف")
      .min(3, "First name must be at least 3 characters")
      .max(45, "First name must be at most 45 characters"),
    ambCarNum: Yup.string().required("يجب إدخال رقم سيارة الاسعاف"),
    reason: Yup.string(),
    place: Yup.string(),
    notes: Yup.string(),
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
          comeFromNum: "",
          comeFromString: "",
          paramedicName: "",
          ambCarNum: "",
          reason: "",
          place: "",
          notes: "",
        }}
        validationSchema={handleFormSchema}
        onSubmit={(values) => {
          handleIncidentForm(values);
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
            <Box sx={{ display: showIncidentForm }}>
              <Grid container columns={12} spacing={4}>
                <Grid
                  item
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                  }}
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                >
                  <Grid container columns={6} spacing={4}>
                    <Grid item lg={3} md={3} sm={6} xs={6}>
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
                    </Grid>
                    <Grid item lg={3} md={3} sm={6} xs={6}>
                      <CustomTextField
                        isRequired
                        name="comeFromNum"
                        label="قادم من"
                        value={comeFrom}
                        onChange={(e) => {
                          handleChange(e);
                          serComeFrom(String(e.target.value));
                          console.log(comeFrom);
                        }}
                        onBlur={handleBlur}
                        error={errors.comeFromNum}
                        touched={touched.comeFromNum}
                        width="100%"
                        props={{
                          type: "number",
                        }}
                      />
                    </Grid>
                  </Grid>
                  <CustomSelectField
                    isRequired
                    name="comeFromString"
                    label="قادم من"
                    value={comeFrom}
                    onChange={(e) => {
                      handleChange(e);
                      serComeFrom(e.target.value);
                    }}
                    onBlur={handleBlur}
                    error={errors.comeFromString}
                    touched={touched.comeFromString}
                    width="100%"
                    options={[
                      {
                        id: "1",
                        title: "حـــادث",
                      },
                      {
                        id: "2",
                        title: "خنـــاقة",
                      },
                    ]}
                  />
                  <CustomTextField
                    name="reason"
                    label="سبب الاصابة"
                    value={values.reason}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.reason}
                    touched={touched.reason}
                    width="100%"
                    props={{
                      type: "text",
                    }}
                  />

                  <CustomTextField
                    name="place"
                    label="مكان الاصابة"
                    value={values.place}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.place}
                    touched={touched.place}
                    width="100%"
                    props={{
                      type: "text",
                    }}
                  />
                </Grid>
                <Grid
                  item
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                  }}
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                >
                  <CustomTextField
                    isRequired
                    name="paramedicName"
                    label="اسم المسعف"
                    value={values.paramedicName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.paramedicName}
                    touched={touched.paramedicName}
                    width="100%"
                    props={{
                      type: "text",
                    }}
                  />
                  <CustomTextField
                    isRequired
                    name="ambCarNum"
                    label="رقم سيارة الاسعاف"
                    value={values.ambCarNum}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.ambCarNum}
                    touched={touched.ambCarNum}
                    width="100%"
                    props={{
                      type: "text",
                    }}
                  />
                  <CustomTextField
                    name="notes"
                    label="ملاحظــات"
                    value={values.notes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.notes}
                    touched={touched.notes}
                    width="100%"
                    props={{
                      type: "text",
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                sx={{ display: "none" }}
                ref={refSubmitButton}
              ></Button>
            </Box>
          </Box>
        )}
      </Formik>

      <IncidentHeader
        data={incidentData}
        display={showIncidentHeader}
        onClick={handleEditBtn}
      />
      <Box sx={{ display: showCompForm }}>
        <SubHeader
          setAddCompanionKey={setAddCompanionKey}
          SubHeaderText="بيـــانات المــرافق"
          compStateChanger={setshowCompForm}
          compBtnStateChanger={setHide}
        />
        <PersonalData
          initialValues={intialValues}
          onSubmit={handleSubmitForm}
          isSubmitted={submitFlag}
        />
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
          title="تأكيــد"
          type="button"
          onClick={() => handleClick()}
        />
        <SecondaryButton
          display={hide}
          title="اضــــافة مـــرافق"
          type="button"
          onClick={() => {
            handleAddCompanion();
            setAddCompanionKey(true);
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
