import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import CustomTextField from "@/core/shared/components/CustomTextField";
import PersonalData, {
  PersonalDataValues,
} from "@/core/shared/components/PersonalData";
import { Grid } from "@mui/material";
import CustomSelectField from "@/core/shared/components/CustomSelectField";

// User interfaces
interface restUserDataInterface {
  role: string;
  department: string;
  shift: string;
  userName: string;
  password: string;
  email: string;
}

const CreateUserForm = () => {
  // useRef
  const refSubmitUserDataButton: any = useRef(null);

  // useState
  const [submitUserFlag, setSubmitUserFlag] = useState<boolean>(false);

  const userInitialValues: PersonalDataValues = {
    firstName: "",
    secondName: "",
    thirdName: "",
    fourthName: "",
    email: "",
    SSN: "",
    phone: "",
    gender: "",
    governate: "",
    birthDate: null,
    address: "",
    verificationMethod: "",
  };

  const restUserInitialValues: restUserDataInterface = {
    role: "",
    shift: "",
    userName: "",
    password: "",
    email: "",
    department: "",
  };

  const handleAllUserDataSubmit = (values: PersonalDataValues) => {
    console.log(values);
  };

  const handleRestUserSubmit = (values: restUserDataInterface) => {
    setSubmitUserFlag(!submitUserFlag);
    // sequenceNumberValue.current = values.sequenceNumber;
  };

  const onTriggerAllUserForm = () => {
    if (refSubmitUserDataButton.current) {
      refSubmitUserDataButton.current.click();
    }
  };

  const restUserFormSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    role: Yup.string().required("Role is required"),
    shift: Yup.string().required("Shift is required"),
    department: Yup.string().required("Department is required"),
    userName: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(45, "Username must be at most 45 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
  });

  return (
    <Box sx={{ marginTop: "2.5rem" }}>
      {/* start rest user form */}
      <Formik
        initialValues={restUserInitialValues}
        validationSchema={restUserFormSchema}
        onSubmit={(values) => {
          handleRestUserSubmit(values);
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
                <CustomTextField
                  isRequired
                  name="userName"
                  label="اسم المستخدم"
                  value={values.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.userName}
                  touched={touched.userName}
                  width="100%"
                  props={{
                    type: "text",
                  }}
                />
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <CustomTextField
                  isRequired
                  name="password"
                  label="الرقم السري"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password}
                  touched={touched.password}
                  width="100%"
                  props={{
                    type: "text",
                  }}
                />
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}></Grid>

              <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
            </Grid>
            {/*  */}
            <Grid container columns={12} spacing={2}>
              <Grid item lg={3} md={3} sm={12} xs={12}>
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
                  }}
                />
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}>
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
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <CustomSelectField
                  isRequired
                  name="department"
                  label="القسم"
                  value={values.department}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.department}
                  touched={touched.department}
                  width="100%"
                  options={[
                    {
                      id: "1",
                      title: "قلب",
                    },
                    {
                      id: "2",
                      title: "باطنة",
                    },
                  ]}
                />
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}>
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
              </Grid>
            </Grid>

            <Button
              type="submit"
              sx={{ display: "none" }}
              ref={refSubmitUserDataButton}
            ></Button>
          </Box>
        )}
      </Formik>

      {/* start user personal data */}
      <PersonalData
        initialValues={userInitialValues}
        isSubmitted={submitUserFlag}
        onSubmit={handleAllUserDataSubmit}
      />
    </Box>
  );
};

export default CreateUserForm;
