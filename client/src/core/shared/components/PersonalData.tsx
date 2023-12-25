import React, { useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import CustomTextField from "@/core/shared/components/CustomTextField";
import CustomSelectField from "@/core/shared/components/CustomSelectField";
import PersonInterface from "@/modules/auth/domain/interfaces/person-interface";
import {
  IGender,
  IGovernate,
  IIdentity,
} from "@/modules/auth/domain/data-values/interfaces";
import {
  genderList,
  governateList,
  identityList,
} from "@/modules/auth/domain/data-values/constants";
import PersonEntity from "@/modules/auth/domain/entities/person-entity";

interface PersonalDataProps {
  initialValues: PersonInterface;
  onSubmit: (values: PersonInterface) => void;
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
    console.log(valuesArray);
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

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={PersonEntity.getSchema()}
      onChange={(e: any) => test(e.target.value)}
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
              <CustomSelectField<IIdentity>
                isRequired
                name="verificationMethod"
                label="نوع الهوية"
                value={values.verificationMethod}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.verificationMethod}
                touched={touched.verificationMethod}
                width="100%"
                options={identityList}
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
              <CustomSelectField<IGender>
                isRequired
                name="gender"
                label="الجنس"
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.gender}
                touched={touched.gender}
                width="100%"
                options={genderList}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CustomSelectField<IGovernate>
                isRequired
                name="governate"
                label="المحافظة"
                value={values.governate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.governate}
                touched={touched.governate}
                width="100%"
                options={governateList}
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
