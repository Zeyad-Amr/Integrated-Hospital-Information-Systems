import React, { useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import CustomTextField from "@/core/shared/components/CustomTextField";
import CustomSelectField from "@/core/shared/components/CustomSelectField";

export interface PersonalDataValues {
  firstName: string;
  secondName: string;
  thirdName: string;
  fourthName: string;
  email: string;
  SSN: string;
  phone: string;
  gender: string;
  governate: string;
  birthDate: null | string;
  address: string;
  verificationMethod: string;
}

interface PersonalDataProps {
  initialValues: PersonalDataValues;
  onSubmit: (values: PersonalDataValues) => void;
  isSubmitted: boolean;
}

const PersonalData = ({
  initialValues,
  onSubmit,
  isSubmitted,
}: PersonalDataProps) => {
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
    firstName: Yup.string()
      .required("First name is required")
      .min(3, "First name must be at least 3 characters")
      .max(45, "First name must be at most 45 characters"),
    // .matches(/^[aA-zZ\s]+$/, "First name must be alphabetic."),
    secondName: Yup.string()
      .required("Second name is required")
      .min(3, "Second name must be at least 3 characters")
      .max(45, "Second name must be at most 45 characters"),
    // .matches(/^[aA-zZ\s]+$/, "Second name must be alphabetic."),
    thirdName: Yup.string()
      .required("Third name is required")
      .min(3, "Third name must be at least 3 characters")
      .max(45, "Third name must be at most 45 characters"),
    // .matches(/^[aA-zZ\s]+$/, "Third name must be alphabetic."),
    fourthName: Yup.string()
      .required("Forth name is required")
      .min(3, "Forth name must be at least 3 characters")
      .max(45, "Forth name must be at most 45 characters"),
    // .matches(/^[aA-zZ\s]+$/, "Forth name must be alphabetic."),
    address: Yup.string()
      .required("Address name is required")
      .min(3, "Address name must be at least 3 characters")
      .max(100, "Address name must be at most 100 characters"),
    gender: Yup.string().required("Gender is required"),
    governate: Yup.string().required("Governate is required"),
    verificationMethod: Yup.string().required("SSN type is required"),
    birthDate: Yup.string().required("Date is required"),
    email: Yup.string()
      .min(3, "Enter a valid email")
      .max(45, "Enter a valid email")
      .email("Enter a valid email"),
    SSN: Yup.string()
      .required("SSN is required")
      .length(14, "SSN must be 14 numbers")
      .matches(/^[0-9]+$/, "Phone number must be numeric."),
    phone: Yup.string()
      .length(11, "Phone number must be 11 characters")
      .matches(/^[0-9]+$/, "Phone number must be numeric."),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={{
        firstName: initialValues.firstName,
        secondName: initialValues.secondName,
        thirdName: initialValues.thirdName,
        fourthName: initialValues.fourthName,
        email: initialValues.email,
        SSN: initialValues.SSN,
        phone: initialValues.phone,
        gender: initialValues.gender,
        governate: initialValues.governate,
        birthDate: initialValues.birthDate,
        address: initialValues.address,
        verificationMethod: initialValues.verificationMethod,
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
                name="SSN"
                label="الرقم القومي"
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

              <CustomTextField
                isRequired
                name="birthDate"
                label="تاريخ الميلاد"
                value={values.birthDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.birthDate}
                touched={touched.birthDate}
                width="100%"
                props={{
                  type: "date",
                }}
              />
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
                    id: "MALE",
                    title: "ذكر",
                  },
                  {
                    id: "FEMALE",
                    title: "أنثي",
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
              <CustomSelectField
                isRequired
                name="verificationMethod"
                label="نوع الهوية"
                value={values.verificationMethod}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.verificationMethod}
                touched={touched.verificationMethod}
                width="100%"
                options={[
                  {
                    id: "NATIONALIDCARD",
                    title: "بطاقة",
                  },
                  {
                    id: "PASSPORT",
                    title: "جواز سفر",
                  },
                ]}
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
                }}
              />
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
              <CustomTextField
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
                }}
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
          </Grid>
          <Button
            type="submit"
            sx={{ display: "none" }}
            ref={refSubmitButton}
          ></Button>
        </Box>
      )}
    </Formik>
  );
};

export default PersonalData;
