import { Box, Grid, Typography, Button } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useRef } from "react";
import CustomTextField from "./CustomTextField";
import CustomSelectField from "./CustomSelectField";

export interface AdditionalDataValues {
  comeFromString: { id: any; label: string };
  attendantName: string;
  attendantSSN: string;
  attendantSerialNumber: string;
  carNum: string;
  firstChar: string;
  secondChar: string;
  thirdChar: string;
  reason: string | null;
  place: string | null;
  notes: string | null;
}

interface AdditionalDataProps {
  initialValues: AdditionalDataValues;
  onSubmit: (values: AdditionalDataValues) => void;
  isSubmitted: boolean;
  display?: string;
}

const AdditionalData = ({
  initialValues,
  onSubmit,
  isSubmitted,
  display,
}: AdditionalDataProps) => {
  const refSubmitButton: any = useRef(null);
  const checkFirstRender = useRef(true);
  const checkFirstRender2 = useRef(true);
  useEffect(() => {
    if (checkFirstRender.current) {
      checkFirstRender.current = false;
    } else {
      if (checkFirstRender2.current) {
        checkFirstRender2.current = false;
      } else {
        if (refSubmitButton.current) {
          refSubmitButton.current.click();
        }
      }
    }
  }, [isSubmitted]);

  const handleFormSchema = Yup.object({
    comeFromString: Yup.string().required("يجب إدخال جهة القدوم"),
    attendantName: Yup.string()
      .required("يجب إدخال اسم المسعف")
      .min(3, "First name must be at least 3 characters")
      .max(45, "First name must be at most 45 characters"),
    attendantSSN: Yup.number().required("يجب الادخال"),
    attendantSerialNumber: Yup.number().required("يجب الادخال"),
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
    let x: number = parseInt(id[id.length - 1]);
    if (key !== 18 && key !== 16) {
      x < 4 && key !== 8
        ? ((document.getElementById(`amb-car-${x}`) as HTMLInputElement).value =
            "")
        : null;
      x = parseInt(id[id.length - 1]) + 1;
      if (parseInt(id[id.length - 1]) <= 4) {
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
          x <= 4 && x >= 1
            ? (
                document.getElementById(`amb-car-${x}`) as HTMLInputElement
              ).focus()
            : null;
        }, 10);
      }
    }
  };

  return (
    <Formik
      initialValues={{
        comeFromString: initialValues.comeFromString,
        attendantName: initialValues.attendantName,
        attendantSSN: initialValues.attendantSSN,
        attendantSerialNumber: initialValues.attendantSerialNumber,
        carNum: initialValues.carNum,
        firstChar: initialValues.firstChar,
        secondChar: initialValues.secondChar,
        thirdChar: initialValues.thirdChar,
        reason: initialValues.reason,
        place: initialValues.place,
        notes: initialValues.notes,
      }}
      validationSchema={handleFormSchema}
      onSubmit={(values) => {
        onSubmit(values);
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
          <Box sx={{ display: display ? display : "block" }}>
            <Grid container columns={12} columnSpacing={2} rowSpacing={0}>
              <Grid
                item
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                }}
                lg={3}
                md={3}
                sm={6}
                xs={12}
              >
                <CustomSelectField
                  isRequired
                  name="comeFromString"
                  label="قادم من"
                  value={values.comeFromString}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  error={errors.comeFromString}
                  touched={touched.comeFromString}
                  width="100%"
                  options={[
                    {
                      id: "1",
                      label: "منــــزل",
                    },
                    {
                      id: "2",
                      label: "حـــادث",
                    },
                    {
                      id: "3",
                      label: "سجــــن",
                    },
                  ]}
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
                lg={3}
                md={3}
                sm={6}
                xs={12}
              >
                <CustomTextField
                  isRequired
                  name="attendantSerialNumber"
                  label="الرقم التعريفي للمحضر"
                  value={values.attendantSerialNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.attendantSerialNumber}
                  touched={touched.attendantSerialNumber}
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
                lg={3}
                md={3}
                sm={6}
                xs={12}
              >
                <CustomTextField
                  isRequired
                  name="attendantName"
                  label="اسم المحضر"
                  value={values.attendantName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.attendantName}
                  touched={touched.attendantName}
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
                lg={3}
                md={3}
                sm={6}
                xs={12}
              >
                <CustomTextField
                  isRequired
                  name="attendantSSN"
                  label="الرقم القومي للمحضر"
                  value={values.attendantSSN}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.attendantSSN}
                  touched={touched.attendantSSN}
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
                sm={6}
                xs={12}
              >
                {/* <Typography
                  sx={{
                    width: "100%",
                    marginLeft: "1rem",
                    fontSize: "0.5rem"
                  }}
                >
                  رقم سيارة الاسعاف
                </Typography> */}
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
                          isNaN(e.key)
                            ? handleKeyDown(
                                e.target.id,
                                e.keyCode,
                                e.target.value
                              )
                            : e.preventDefault(),
                        id: "amb-car-1",
                        type: "text",
                        placeholder: "الحرف الاول",
                      }}
                    />{" "}
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
                          isNaN(e.key)
                            ? handleKeyDown(
                                e.target.id,
                                e.keyCode,
                                e.target.value
                              )
                            : e.preventDefault(),

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
                          isNaN(e.key)
                            ? handleKeyDown(
                                e.target.id,
                                e.keyCode,
                                e.target.value
                              )
                            : e.preventDefault(),
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
                      maxLength={4}
                      props={{
                        onKeyDown: (e: any) =>
                          !isNaN(e.key) || e.key === "Backspace"
                            ? handleKeyDown(
                                e.target.id,
                                e.keyCode,
                                e.target.value
                              )
                            : e.preventDefault(),
                        id: "amb-car-4",
                        type: "text",
                        placeholder: "الرقم",
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                }}
                lg={3}
                md={3}
                sm={6}
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
              </Grid>
              <Grid
                item
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                }}
                lg={3}
                md={3}
                sm={6}
                xs={12}
              >
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
                lg={12}
                md={12}
                sm={12}
                xs={12}
              >
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
  );
};

export default AdditionalData;
