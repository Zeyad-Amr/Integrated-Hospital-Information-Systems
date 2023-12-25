import React, { useRef } from "react";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import CustomTextField from "@/core/shared/components/CustomTextField";
import CustomSelectField from "@/core/shared/components/CustomSelectField";
import PersonInterface from "@/modules/auth/domain/interfaces/person-interface";
import FeaturedVideoRoundedIcon from "@mui/icons-material/FeaturedVideoRounded";
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
  refSubmitButton: React.MutableRefObject<null>;
  isResetForm?: boolean;
}

const PersonalDataComponent = ({
  initialValues,
  onSubmit,
  refSubmitButton,
  isResetForm = false,
}: PersonalDataProps) => {
  const fileInputRef = useRef<any>();

  const selectFile = () => {
    fileInputRef.current?  fileInputRef.current.click(): null;
  };
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={PersonEntity.getSchema()}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        console.log("onSubmit Person:", values);
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
            sx={{ display: "none" }}
            ref={refSubmitButton}
          ></Button>
        </Box>
      )}
    </Formik>
  );
};

export default PersonalDataComponent;
