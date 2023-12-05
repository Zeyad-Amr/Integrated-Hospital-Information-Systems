import React, { useEffect, useRef, useState } from "react";
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
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import CustomAccordion from "@/core/shared/components/CustomAccordion";

// User interfaces
interface allCombinedUserDataInterface {
  personalData: {
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
  };
  auth: {
    username: string;
    password: string;
  };
  role: string;
  departmentId: string;
  shift: string;
}
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
  const refRestUserDataValues: any = useRef(null);
  const checkFirstRender = useRef(true);

  // useState
  const [submitUserFlag, setSubmitUserFlag] = useState<boolean>(false);
  const [userDataAccordion, setUserDataAccordion] = useState<boolean>(true);
  const [restUserDataAccordion, setRestUserDataAccordion] = useState<boolean>(true);
  const [combinedValues, setCombinedValues] =
    useState<allCombinedUserDataInterface>({
      personalData: {
        firstName: "",
        secondName: "",
        thirdName: "",
        fourthName: "",
        SSN: "",
        verificationMethod: "",
        gender: "",
        birthDate: "",
        phone: "",
        email: "",
        governate: "",
        address: "",
      },
      auth: {
        username: "",
        password: "",
      },
      role: "",
      shift: "",
      departmentId: "",
    });

  const userInitialValues: PersonalDataValues = {
    firstName: "",
    secondName: "",
    thirdName: "",
    fourthName: "",
    SSN: "",
    phone: "",
    gender: "",
    governate: "",
    birthDate: null,
    address: "",
    verificationMethod: "",
  };

  const handleAllUserDataSubmit = (values: PersonalDataValues) => {
    setCombinedValues((prevValues: allCombinedUserDataInterface) => ({
      ...prevValues,
      personalData: { ...values, email: refRestUserDataValues.current.email },
      auth: {
        username: refRestUserDataValues.current.userName,
        password: refRestUserDataValues.current.password,
      },
      role: refRestUserDataValues.current.role,
      shift: refRestUserDataValues.current.shift,
      departmentId: refRestUserDataValues.current.department,
    }));
  };

  const onTriggerAllUserForm = () => {
    if (refSubmitUserDataButton.current) {
      refSubmitUserDataButton.current.click();
    }
  };

  // rest user functions and variables
  const handleRestUserSubmit = (values: restUserDataInterface) => {
    setSubmitUserFlag(!submitUserFlag);
    refRestUserDataValues.current = values;
  };

  const restUserInitialValues: restUserDataInterface = {
    role: "",
    shift: "",
    userName: "",
    password: "",
    email: "",
    department: "",
  };

  const restUserFormSchema = Yup.object({
    email: Yup.string()
      .required("البريد الألكتروني مطلوب")
      .email("البريد الألكتروني غير صحيح"),
    role: Yup.string().required("الوظيفة مطلوبة"),
    shift: Yup.string().required("موعد العمل مطلوب"),
    department: Yup.string().required("القسم مطلوب"),
    userName: Yup.string()
      .required("اسم المستخدم مطلوب")
      .min(3, "اسم المستخدم لا يقل عن 3 حروف")
      .max(45, "اسم المستخدم لا يزيد عن 45 حرف"),
    password: Yup.string()
      .required("الرقم السري مطلوب")
      .min(6, "الرقم السري لا يقل عن 6 حروف"),
  });

  useEffect(() => {
    if (checkFirstRender.current) {
      checkFirstRender.current = false;
    } else {
      // post request
      console.log(combinedValues);
    }
  }, [combinedValues]);

  return (
    <Box sx={{ marginTop: "2.5rem" }}>
      {/* start user personal data */}
      <CustomAccordion isDisabled={false} isExpanded={userDataAccordion} setExpanded={setUserDataAccordion} title="البيانات الشخصية">
        <PersonalData
          initialValues={userInitialValues}
          isSubmitted={submitUserFlag}
          onSubmit={handleAllUserDataSubmit}
        />
      </CustomAccordion>

      {/* start rest user form */}
      <CustomAccordion isDisabled={false} isExpanded={restUserDataAccordion} setExpanded={setRestUserDataAccordion}  title="بيانات المستخدم">
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
                      type: "password",
                    }}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
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
              </Grid>
              {/*  */}
              <Grid container columns={12} spacing={2}>
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
                        title: "طبيب",
                      },
                      {
                        id: "2",
                        title: "تمريض",
                      },
                      {
                        id: "2",
                        title: "موظف",
                      },
                    ]}
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
                        title: "12 صباحي",
                      },
                      {
                        id: "2",
                        title: "8 صباحي",
                      },
                      {
                        id: "3",
                        title: "12 مسائي",
                      },
                      {
                        id: "4",
                        title: "8 سهر",
                      },
                      {
                        id: "5",
                        title: "8 ظهر",
                      },
                      {
                        id: "6",
                        title: "24 يوم كامل",
                      },
                    ]}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
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
              </Grid>

              <Button
                type="submit"
                sx={{ display: "none" }}
                ref={refSubmitUserDataButton}
              ></Button>
            </Box>
          )}
        </Formik>
      </CustomAccordion>

      {/* submit button */}
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
          onClick={() => onTriggerAllUserForm()}
        />
      </Box>
    </Box>
  );
};

export default CreateUserForm;
