import React from "react";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { Grid, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import CustomTextField from "@/core/shared/components/CustomTextField";
import CustomSelectField from "@/core/shared/components/CustomSelectField";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const CreateUserForm = () => {
  const onsubmit = (values: any) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
    }, 400);
  };

  const handleFormSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .min(3, "First name must be at least 3 characters")
      .max(45, "First name must be at most 45 characters")
      .matches(/^[aA-zZ\s]+$/, "First name must be alphabetic."),
    secondName: Yup.string()
      .required("Second name is required")
      .min(3, "Second name must be at least 3 characters")
      .max(45, "Second name must be at most 45 characters")
      .matches(/^[aA-zZ\s]+$/, "Second name must be alphabetic."),
    thirdName: Yup.string()
      .required("Third name is required")
      .min(3, "Third name must be at least 3 characters")
      .max(45, "Third name must be at most 45 characters")
      .matches(/^[aA-zZ\s]+$/, "Third name must be alphabetic."),
    forthName: Yup.string()
      .required("Forth name is required")
      .min(3, "Forth name must be at least 3 characters")
      .max(45, "Forth name must be at most 45 characters")
      .matches(/^[aA-zZ\s]+$/, "Forth name must be alphabetic."),
    address: Yup.string()
      .required("Address name is required")
      .min(3, "Address name must be at least 3 characters")
      .max(100, "Address name must be at most 100 characters"),
    role: Yup.string()
      .required("Role is required"),
    gender: Yup.string().required("Gender is required"),
    governate: Yup.string().required("Governate is required"),
    SSNtype: Yup.string().required("SSN type is required"),
    shift: Yup.string().required("Shift is required"),
    date: Yup.string().required("Date is required"),
    id: Yup.string()
      .required("Id is required")
      .length(14, "Id must be 14 number")
      .matches(/^[0-9]+$/, "Id must be numeric."),
    email: Yup.string()
      .required("Email is required")
      .min(3, "Enter a valid email")
      .max(45, "Enter a valid email")
      .email("Enter a valid email"),
    SSN: Yup.string()
      .required("SSN is required")
      .length(14, "SSN must be 14 numbers")
      .matches(/^[0-9]+$/, "Phone number must be numeric."),
    phone: Yup.string()
      .required("Phone number is required")
      .length(11, "Phone number must be 11 characters")
      .matches(/^[0-9]+$/, "Phone number must be numeric."),
  });

  return (
    <Formik
      initialValues={{
        firstName: "",
        secondName: "",
        thirdName: "",
        forthName: "",
        role: "",
        email: "",
        SSN: "",
        phone: "",
        id: "",
        gender: "",
        governate: "",
        date: null,
        address: "",
        SSNtype: "",
        shift: "",
      }}
      validationSchema={handleFormSchema}
      onSubmit={(values) => onsubmit(values)}
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
                  className: "input",
                }}
              />
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
                  className: "input",
                }}
              />
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
                  className: "input",
                }}
              />
              <CustomTextField
                isRequired
                name="forthName"
                label="الاسم الرابع"
                value={values.forthName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.forthName}
                touched={touched.forthName}
                width="100%"
                props={{
                  type: "text",
                  className: "input",
                }}
              />
              <CustomSelectField
                isRequired
                name="role"
                label="الوظيفة"
                value={values.role}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.role}
                touched={touched.role}
                width="100%"
                options={[
                  {
                    id: "1",
                    title: "دكتور",
                  },
                  {
                    id: "2",
                    title: "ممرض/ة",
                  },
                ]}
              />
              <CustomSelectField
                isRequired
                name="gender"
                label="الجنس"
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.gender}
                touched={touched.gender}
                width="100%"
                options={[
                  {
                    id: "1",
                    title: "ذكر",
                  },
                  {
                    id: "2",
                    title: "أنثي",
                  },
                ]}
              />
              <CustomSelectField
                isRequired
                name="shift"
                label="موعد العمل"
                value={values.shift}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.shift}
                touched={touched.shift}
                width="100%"
                options={[
                  {
                    id: "1",
                    title: "صباحي",
                  },
                  {
                    id: "2",
                    title: "مسائي",
                  },
                ]}
              />
              <CustomSelectField
                isRequired
                name="governate"
                label="المحافظة"
                value={values.governate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.governate}
                touched={touched.governate}
                width="100%"
                options={[
                  {
                    id: "1",
                    title: "القاهرة",
                  },
                  {
                    id: "2",
                    title: "الجيزة",
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
              lg={6}
              md={6}
              sm={12}
              xs={12}
            >
              <CustomTextField
                isRequired
                name="email"
                label="الايميل"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
                width="100%"
                props={{
                  type: "email",
                  className: "input",
                }}
              />
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
                  className: "input",
                }}
              />
              <CustomSelectField
                isRequired
                name="SSNtype"
                label="نوع الهوية"
                value={values.SSNtype}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.SSNtype}
                touched={touched.SSNtype}
                width="100%"
                options={[
                  {
                    id: "1",
                    title: "بطاقة",
                  },
                  {
                    id: "2",
                    title: "جواز سفر",
                  },
                ]}
              />
              <CustomTextField
                isRequired
                name="id"
                label="الرقم التعريفي"
                value={values.id}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.id}
                touched={touched.id}
                width="100%"
                props={{
                  type: "number",
                  className: "input",
                }}
              />
              <CustomTextField
                isRequired
                name="SSN"
                label="الرقم القومي"
                value={values.SSN}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.SSN}
                touched={touched.SSN}
                width="100%"
                props={{
                  type: "number",
                  className: "input",
                }}
              />
              {/* <CustomTextField
                isRequired
                name="date"
                label="تاريخ الميلاد"
                value={values.date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.date}
                touched={touched.date}
                width="100%"
                props={{
                  type: "date",
                  className: "input",
                }}
              /> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="تاريخ الميلاد"
                  value={values.date}
                  onChange={handleChange}
                  slotProps={{
                    textField: {
                      helperText:
                        errors.date && touched.date ? errors.date : "",
                        id : "outlined-required"
                      // onblur:  handleBlur ,
                      // error: errors.date,
                      // touched: touched.date,
                      // width: "100%",
                    },
                  }}
                  sx={{width: "100%"}}
                  
                />
              </LocalizationProvider>
              <CustomTextField
                isRequired
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
                  className: "input",
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            style={{
              color: "#fff",
              backgroundColor: "#232836",
            }}
          >
            تأكيد
          </Button>
        </Box>
      )}
    </Formik>
  );
};

export default CreateUserForm;
