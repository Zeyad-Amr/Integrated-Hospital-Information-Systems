import React, { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Grid, TextField, Typography } from "@mui/material";
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
  const [showDialog, setShawDialog] = useState("none");

  const [incidentData, setIncidentData] = useState({});
  const [companionData, setcompanionData] = useState({});

  const [comeFrom, serComeFrom] = useState("");

  const [submitFlag, setSubmitFlag] = useState<boolean>(false);

  const [clickedBtnId, setClickedBtnId] = useState("");

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
    if (refSubmitButton.current) {
      refSubmitButton.current.click();
    }
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
    // comeFromNum: Yup.number().required("يجب إدخال جهة القدوم"),
    comeFromString: Yup.string().required("يجب إدخال جهة القدوم"),
    paramedicName: Yup.string()
      .required("يجب إدخال اسم المسعف")
      .min(3, "First name must be at least 3 characters")
      .max(45, "First name must be at most 45 characters"),
    firstChar: Yup.string()
      .required("يجب إدخال رقم سيارة الاسعاف")
      .max(1, "حرف واحد على الاكثر"),
    secondChar: Yup.string()
      .required("يجب إدخال رقم سيارة الاسعاف")
      .max(1, "حرف واحد على الاكثر"),
    thirdChar: Yup.string().max(1, "حرف واحد على الاكثر"),
    carNum: Yup.string().required("يجب إدخال رقم سيارة الاسعاف"),
    reason: Yup.string(),
    place: Yup.string(),
    notes: Yup.string(),
  });
  const handleKeyDown = (id: string, key: number, value: any) => {
    console.log(id[id.length - 1]);
    let x: number = parseInt(id[id.length - 1]);
    x = parseInt(id[id.length - 1]) + 1;
    console.log(x);
    if (parseInt(id[id.length - 1]) < 4) {
      switch (key) {
        case 13: // Enter
          x = parseInt(id[id.length - 1]) + 1;
          break;
        case 8: // Backspace
          value.length === 0
            ? (x = parseInt(id[id.length - 1]) - 1)
            : (x = parseInt(id[id.length - 1]));
          break;
        default:
          break;
      }
      setTimeout(() => {
        (document.getElementById(`amb-car-${x}`) as HTMLInputElement).focus();
      }, 100);
    }
  };
  return (
    <>
      <CompleteIncident
        display={showDialog}
        DialogStateController={setShawDialog}
      />
      <Formik
        initialValues={{
          numOfPatients: "",
          // comeFromNum: "",
          comeFromString: "",
          paramedicName: "",
          carNum: "",
          firstChar: "",
          secondChar: "",
          thirdChar: "",
          reason: "",
          place: "",
          notes: "",
        }}
        validationSchema={handleFormSchema}
        onSubmit={(values) => {
          console.log("ahhh");

          handleIncidentSubmission(values);
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
                  <Grid
                    container
                    columns={6}
                    spacing={4}
                    sx={{ marginBottom: "-5px" }}
                  >
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
                      {/* <CustomTextField
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
                      /> */}
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
                    </Grid>
                  </Grid>
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
                  <Typography
                    sx={{
                      width: "100%",
                      marginLeft: "1rem",
                      marginTop: ".55rem",
                    }}
                  >
                    رقم سيارة الاسعاف
                  </Typography>
                  <Grid container columns={9} spacing={2}>
                    <Grid item lg={2} md={2} sm={2} xs={2}>
                      <CustomTextField
                        isRequired
                        name="firstChar"
                        label=""
                        value={values.firstChar}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.firstChar}
                        touched={touched.firstChar}
                        width="200%"
                        props={{
                          onKeyDown: (e: any) =>
                            handleKeyDown(
                              e.target.id,
                              e.keyCode,
                              e.target.value
                            ),
                          id: "amb-car-1",
                          type: "text",
                          placeholder: "الحرف الاول",
                        }}
                      />
<<<<<<< Updated upstream
                      <Grid container columns={9} spacing={2}>
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                          <CustomTextField
                            isRequired
                            id="amb-car-1"
                            name="firstChar"
                            label="الحرف الاول"
                            value={values.firstChar}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={(e) =>
                              handleKeyDown(
                                e.target.id,
                                e.keyCode,
                                e.target.value
                              )
                            }
                            error={errors.firstChar}
                            touched={touched.firstChar}
                            width="200%"
                            props={{
                              type: "text",
                            }}
                          />
                        </Grid>
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                          <CustomTextField
                            id="amb-car-2"
                            isRequired
                            name="secondChar"
                            label="الحرف الثاني"
                            value={values.secondChar}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={(e) =>
                              handleKeyDown(
                                e.target.id,
                                e.keyCode,
                                e.target.value
                              )
                            }
                            error={errors.secondChar}
                            touched={touched.secondChar}
                            width="200%"
                            props={{
                              type: "text",
                            }}
                          />
                        </Grid>
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                          <CustomTextField
                            id="amb-car-3"
                            name="thirdChar"
                            label="الحرف الثالث"
                            value={values.thirdChar}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={(e) =>
                              handleKeyDown(
                                e.target.id,
                                e.keyCode,
                                e.target.value
                              )
                            }
                            error={errors.thirdChar}
                            touched={touched.thirdChar}
                            width="100%"
                            props={{
                              type: "text",
                            }}
                          />
                        </Grid>
                        <Grid item lg={3} md={3} sm={3} xs={3}>
                          <CustomTextField
                            isRequired
                            id="amb-car-4"
                            name="carNum"
                            label="الرقم"
                            value={values.carNum}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={(e) =>
                              handleKeyDown(
                                e.target.id,
                                e.keyCode,
                                e.target.value
                              )
                            }
                            error={errors.carNum}
                            touched={touched.carNum}
                            width="100%"
                            props={{
                              type: "text",
                            }}
                          />
                        </Grid>
                      </Grid>
=======
                    </Grid>
                    <Grid item lg={2} md={2} sm={2} xs={2}>
                      <CustomTextField
                        isRequired
                        name="secondChar"
                        label=""
                        value={values.secondChar}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.secondChar}
                        touched={touched.secondChar}
                        width="200%"
                        props={{
                          onKeyDown: (e: any) =>
                            handleKeyDown(
                              e.target.id,
                              e.keyCode,
                              e.target.value
                            ),

                          id: "amb-car-2",
                          type: "text",
                          placeholder: "الحرف الثاني",
                        }}
                      />
                    </Grid>
                    <Grid item lg={2} md={2} sm={2} xs={2}>
                      <CustomTextField
                        name="thirdChar"
                        label=""
                        value={values.thirdChar}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.thirdChar}
                        touched={touched.thirdChar}
                        width="100%"
                        props={{
                          onKeyDown: (e: any) =>
                            handleKeyDown(
                              e.target.id,
                              e.keyCode,
                              e.target.value
                            ),
                          id: "amb-car-3",
                          type: "text",
                          placeholder: "الحرف الثالث",
                        }}
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={3}>
                      <CustomTextField
                        isRequired
                        name="carNum"
                        label=""
                        value={values.carNum}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.carNum}
                        touched={touched.carNum}
                        width="100%"
                        props={{
                          onKeyDown: (e: any) =>
                            handleKeyDown(
                              e.target.id,
                              e.keyCode,
                              e.target.value
                            ),
                          id: "amb-car-4",
                          type: "text",
                          placeholder: "الرقم",
                        }}
                      />
                    </Grid>
                  </Grid>
>>>>>>> Stashed changes
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
                    multiline
                    rows={2}
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
