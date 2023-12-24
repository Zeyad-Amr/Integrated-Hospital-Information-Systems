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
  isResetForm?: boolean;
}

const PersonalData = ({
  initialValues,
  onSubmit,
  isSubmitted,
  isResetForm = false,
}: PersonalDataProps) => {
  const test = (values: {}) => {
    let length: number = 0;
    const valuesArray = Object.values(values);
    valuesArray.map((value: any) => (length += value.length));
    console.log(length);
  };

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
      .required("الاسم الأول مطلوب")
      .min(3, "يجب أن يكون الاسم الأول على الأقل 3 أحرف")
      .max(45, "يجب أن يكون الاسم الأول على الأكثر 45 حرفًا"),
    secondName: Yup.string()
      .required("الاسم الثاني مطلوب")
      .min(3, "يجب أن يكون الاسم الثاني على الأقل 3 أحرف")
      .max(45, "يجب أن يكون الاسم الثاني على الأكثر 45 حرفًا"),
    thirdName: Yup.string()
      .required("الاسم الثالث مطلوب")
      .min(3, "يجب أن يكون الاسم الثالث على الأقل 3 أحرف")
      .max(45, "يجب أن يكون الاسم الثالث على الأكثر 45 حرفًا"),
    fourthName: Yup.string()
      .required("الاسم الرابع مطلوب")
      .min(3, "يجب أن يكون الاسم الرابع على الأقل 3 أحرف")
      .max(45, "يجب أن يكون الاسم الرابع على الأكثر 45 حرفًا"),
    address: Yup.string()
      .required("اسم العنوان مطلوب")
      .min(3, "يجب أن يكون اسم العنوان على الأقل 3 أحرف")
      .max(100, "يجب أن يكون اسم العنوان على الأكثر 100 حرفًا"),
    gender: Yup.string().required("الجنس مطلوب"),
    governate: Yup.string().required("المحافظة مطلوبة"),
    verificationMethod: Yup.string().required("نوع الهوية مطلوب"),
    birthDate: Yup.string().required("التاريخ مطلوب"),
    SSN: Yup.string()
      .required("الرقم القومي مطلوب")
      .length(14, "يجب أن يكون الرقم القومي 14 رقمًا")
      .matches(/^[0-9]+$/, "يجب أن يكون الرقم القومي رقميًا."),
    phone: Yup.string()
      .length(11, "يجب أن يكون رقم الهاتف 11 حرفًا")
      .matches(/^[0-9]+$/, "يجب أن يكون رقم الهاتف رقميًا."),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={{
        firstName: initialValues.firstName,
        secondName: initialValues.secondName,
        thirdName: initialValues.thirdName,
        fourthName: initialValues.fourthName,
        SSN: initialValues.SSN,
        phone: initialValues.phone,
        gender: initialValues.gender,
        governate: initialValues.governate,
        birthDate: initialValues.birthDate,
        address: initialValues.address,
        verificationMethod: initialValues.verificationMethod,
      }}
      validationSchema={handleFormSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        if (isResetForm) {
          resetForm();
        }
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
          <Grid container columns={12} spacing={2}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
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
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
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
            </Grid>

            <Grid item lg={3} md={3} sm={12} xs={12}>
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
            <Grid item lg={3} md={3} sm={12} xs={12}>
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
            onClick={() => test(values)}
            sx={{ display: "none" }}
            ref={refSubmitButton}
          ></Button>
        </Box>
      )}
    </Formik>
  );
};

export default PersonalData;
