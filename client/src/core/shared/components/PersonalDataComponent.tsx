import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CustomTextField from "@/core/shared/components/CustomTextField";
import CustomSelectField from "@/core/shared/components/CustomSelectField";
import PersonInterface from "@/core/shared/modules/person/domain/interfaces/person-interface";
import FeaturedVideoRoundedIcon from "@mui/icons-material/FeaturedVideoRounded";
import PersonEntity from "@/core/shared/modules/person/domain/entities/person-entity";
import { LookupsState } from "../modules/lookups/presentation/controllers/types";
import { AppDispatch, useAppSelector } from "@/core/state/store";
import { Yup } from "../utils/validation";

import Dialog from "./Dialog";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch } from "react-redux";
import { getPerson } from "../modules/person/presentation/controllers/thunks/person-thunk";
interface PersonalDataProps {
  initialValues: PersonInterface;
  onSubmit: (values: PersonInterface) => void;
  refSubmitButton: React.MutableRefObject<null>;
  validationSchema?: Yup.ObjectSchema<any>
  isResetForm?: boolean;
  validateOnMount?: boolean;
}

const PersonalDataComponent = ({
  initialValues,
  validationSchema,
  onSubmit,
  refSubmitButton,
  isResetForm = false,
  validateOnMount = false,
}: PersonalDataProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const lookupsState: LookupsState = useAppSelector(
    (state: any) => state.lookups
  );

  dispatch(getPerson({ ssn: "30012134105193" }))

  const fileInputRef = useRef<any>();
  const selectFile = () => {
    setShawDialog("block");
  };
  const [showDialog, setShawDialog] = useState("none");
  const [sub, setSub] = useState(true);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [selectedBack, setSelectedBack] = useState<any>(null);

  const handleFileInput = (e: any) => {
    sub
      ? setSelectedFile(e.target.files[0])
      : setSelectedBack(e.target.files[0]);
    setSub(!sub);
    // setSelectedFile((prevSelectedFile:any) => {
    //   return [...prevSelectedFile, e.target.files[0]];
    // });
  };
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema ?? PersonEntity.getSchema()}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        if (isResetForm) {
          resetForm();
        }
      }}
      validateOnMount={validateOnMount}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <>
          <Dialog
            title="صورة الهوية"
            display={showDialog}
            DialogStateController={setShawDialog}
          >
            <Typography
              sx={{ width: "100%", textAlign: "center", marginTop: "1rem", fontSize: "1.2rem", fontWeight: "600" }}
            >
              {sub ? "قم بفحص الوجه الامامي" : "قم بفحص الوجه الخلفي"}
            </Typography>
            <Grid
              container
              spacing={0}
              sx={{ padding: "1rem", width: "100%", height: "80%" }}
            >
              <Grid item lg={8} md={8} sm={12} xs={12}>
                <Box
                  sx={{
                    backgroundColor: "white",
                    boxSizing: "border-box",
                    // borderRadius: "10px",
                    width: "100%",
                    margin: "0 auto",
                    height: "100%",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                  onClick={() =>
                    fileInputRef.current ? fileInputRef.current.click() : null
                  }
                >
                  <Box
                    sx={{
                      borderRadius: "10px",
                      border: "#aaa 2px solid",
                      width: "90%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-start",
                      padding: "2rem",
                    }}
                  >
                    {sub ? (
                      <PersonIcon sx={{ color: "#aaa", fontSize: "10rem" }} />
                    ) : (
                      <Box sx={{ width: "100%", height: "100%" }}>
                        <Box
                          sx={{
                            width: "60%",
                            height: "0.5rem",
                            backgroundColor: "#aaa",
                            margin: "2rem 0",
                          }}
                        ></Box>
                        <Box
                          sx={{
                            width: "100%",
                            height: "0.5rem",
                            backgroundColor: "#aaa",
                            margin: "2rem 0",
                          }}
                        ></Box>
                        <Box
                          sx={{
                            width: "100%",
                            height: "0.5rem",
                            backgroundColor: "#aaa",
                            margin: "2rem 0",
                          }}
                        ></Box>
                        <Box
                          sx={{
                            width: "100%",
                            height: "6rem",
                            backgroundColor: "#aaa",
                            margin: "7rem 0 1rem ",
                            borderRadius: "5px",
                          }}
                        ></Box>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12} sx={{ maxHeight: '100%' }}>
                <Box sx={{ width: "100%", maxHeight: '30rem' }}>
                  {selectedFile !== null ? (
                    <Box
                      component="img"
                      src={URL.createObjectURL(selectedFile)}
                      alt="Selected"
                      sx={{
                        maxWidth: "100%",
                        padding: "0.5rem",
                        boxSizing: "border-box",
                        borderRadius: "10px",
                        maxHeight: '13rem'
                      }}
                      loading="lazy"
                    />
                  ) : null}
                </Box>
                <Box sx={{ width: "100%" }}>
                  {selectedBack !== null ? (
                    <Box
                      component="img"
                      src={URL.createObjectURL(selectedBack)}
                      alt="Selected"
                      sx={{
                        maxWidth: "100%",
                        padding: "0.5rem",
                        boxSizing: "border-box",
                        borderRadius: "10px", maxHeight: '13rem'
                      }}
                      loading="lazy"
                    />
                  ) : null}
                </Box>
              </Grid>
            </Grid>
          </Dialog>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container columns={12} spacing={2}>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <CustomSelectField<any>
                  isRequired
                  name="verificationMethod"
                  label="نوع الهوية"
                  value={values.verificationMethod}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.verificationMethod}
                  touched={touched.verificationMethod}
                  width="100%"
                  options={lookupsState.lookups.identityTypes}
                />
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <CustomTextField
                    isRequired
                    name="SSN"
                    label="رقم الهوية"
                    value={values.SSN}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.SSN}
                    touched={touched.SSN}
                    width="100%"
                    props={{
                      type: "text",
                    }}
                  />
                  <Box
                    sx={{
                      padding: "0",
                      marginLeft: "-0.5rem",
                      marginTop: "1rem",
                    }}
                  >
                    <input
                      type="file"
                      id="fileInput"
                      style={{ display: "none" }}
                      ref={fileInputRef}
                      onChange={handleFileInput}
                    />
                    <Box
                      sx={{
                        backgroundColor: "primary.dark",
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottomRightRadius: "10px",
                        borderTopRightRadius: "10px",
                        padding: "0.6rem 0.7rem 0.6rem 1rem",

                        cursor: "pointer",
                      }}
                      onClick={selectFile}
                    >
                      <FeaturedVideoRoundedIcon />
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item lg={3} md={3} sm={12} xs={12}>
                <CustomSelectField<any>
                  isRequired
                  name="gender"
                  label="الجنس"
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.gender}
                  touched={touched.gender}
                  width="100%"
                  options={lookupsState.lookups.genderTypes}
                />
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <CustomSelectField<any>
                  isRequired
                  name="governateId"
                  label="المحافظة"
                  value={values.governate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.governate}
                  touched={touched.governate}
                  width="100%"
                  options={lookupsState.lookups.governates}
                />
              </Grid>
            </Grid>
            <Grid container columns={12} spacing={2}>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <CustomTextField
                  isRequired
                  name="firstName"
                  label="الاسم الأول"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.firstName}
                  touched={touched.firstName}
                  width="100%"
                  props={{
                    type: "text",
                  }}
                />
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <CustomTextField
                  isRequired
                  name="secondName"
                  label="الاسم الثاني"
                  value={values.secondName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.secondName}
                  touched={touched.secondName}
                  width="100%"
                  props={{
                    type: "text",
                  }}
                />
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <CustomTextField
                  isRequired
                  name="thirdName"
                  label="الاسم الثالث"
                  value={values.thirdName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.thirdName}
                  touched={touched.thirdName}
                  width="100%"
                  props={{
                    type: "text",
                  }}
                />
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <CustomTextField
                  isRequired
                  name="fourthName"
                  label="الاسم الرابع"
                  value={values.fourthName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.fourthName}
                  touched={touched.fourthName}
                  width="100%"
                  props={{
                    type: "text",
                  }}
                />
              </Grid>
            </Grid>
            <Grid container columns={12} spacing={2}>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <CustomTextField
                  isRequired
                  name="birthDate"
                  label="تاريخ الميلاد"
                  value={values.birthDate?.toString()}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.birthDate}
                  touched={touched.birthDate}
                  width="100%"
                  props={{
                    type: "date",
                  }}
                />
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <CustomTextField
                  name="phone"
                  label="رقم الهاتف"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.phone}
                  touched={touched.phone}
                  width="100%"
                  props={{
                    type: "text",
                  }}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomTextField
                  isRequired
                  name="address"
                  label="العنوان"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.address}
                  touched={touched.address}
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
        </>
      )}
    </Formik>
  );
};

export default PersonalDataComponent;
