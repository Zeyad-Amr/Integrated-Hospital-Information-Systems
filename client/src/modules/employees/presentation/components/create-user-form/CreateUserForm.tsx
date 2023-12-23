import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import Box from "@mui/material/Box";
import CustomTextField from "@/core/shared/components/CustomTextField";
import PersonalData from "@/core/shared/components/PersonalData";
import { Grid } from "@mui/material";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import CustomAccordion from "@/core/shared/components/CustomAccordion";
// import { useAppDispatch } from "@/core/redux/store";
// import { createEmployee } from "../../controllers/thunks/employee-thunks";
import EmployeeInterface from "@/modules/employees/domain/interfaces/employee-interface";
import EmployeeEntity from "@/modules/employees/domain/entities/employee-entity";
import PersonInterface from "@/modules/auth/domain/interfaces/person-interface";
import PersonEntity from "@/modules/auth/domain/entities/person-entity";
import AuthDataEntity from "@/modules/auth/domain/entities/auth-data-entity";
import AuthInterface from "@/modules/auth/domain/interfaces/auth-interface";
import CustomSelectField from "@/core/shared/components/CustomSelectField";
import {
  roleList,
  shiftList,
  departmentList,
} from "@/modules/auth/domain/data-values/constants";
import {
  IRole,
  IShift,
  IDepartment,
} from "@/modules/auth/domain/data-values/interfaces";

const CreateUserForm = () => {
  // const dispatch = useAppDispatch();

  // useRef
  const refSubmitPerson: any = useRef(null);
  const refSubmitAuth: any = useRef(null);
  const refSubmitEmployee: any = useRef(null);
  const checkFirstRender = useRef(true);

  // useState
  const [submitUserFlag, setSubmitUserFlag] = useState<boolean>(false);
  const [personSectionExpanded, setPersonSectionExpanded] =
    useState<boolean>(true);
  const [authSectionExpanded, setAuthSectionExpanded] = useState<boolean>(true);
  const [employeeSectionExpanded, setEmployeeSectionExpanded] =
    useState<boolean>(true);

  const [combinedValues, setCombinedValues] = useState<EmployeeInterface>(
    EmployeeEntity.defaultValue()
  );

  const handlePersonSubmit = (values: PersonInterface) => {
    setCombinedValues((prevValues: EmployeeInterface) => ({
      ...prevValues,
      person: values,
      auth: {
        username: refSubmitAuth.current.userName,
        password: refSubmitAuth.current.password,
        email: refSubmitAuth.current.email,
      },
      role: refSubmitEmployee.current.role,
      shift: refSubmitEmployee.current.shift,
      department: refSubmitEmployee.current.department,
    }));
  };

  // rest user functions and variables
  const handleAuthSubmit = (values: AuthInterface) => {
    setSubmitUserFlag(!submitUserFlag);
    refSubmitAuth.current = values;
  };
  const handleEmployeeSubmit = (values: EmployeeInterface) => {
    setSubmitUserFlag(!submitUserFlag);
    refSubmitAuth.current = values;
  };

  const onTriggerAllUserForm = () => {
    if (refSubmitPerson.current) {
      refSubmitPerson.current.click();
    }
  };

  useEffect(() => {
    if (checkFirstRender.current) {
      checkFirstRender.current = false;
    } else {
      // post request
      // dispatch(createEmployee(combinedValues));
      console.log(combinedValues);
    }
  }, [combinedValues]);

  return (
    <Box sx={{ marginTop: "2.5rem" }}>
      {/* Peronal Data Section */}
      <CustomAccordion
        isDisabled={false}
        isExpanded={personSectionExpanded}
        setExpanded={setPersonSectionExpanded}
        title="البيانات الشخصية"
        isClosable={false}
      >
        <PersonalData
          initialValues={PersonEntity.defaultValue()}
          isSubmitted={submitUserFlag}
          onSubmit={handlePersonSubmit}
        />
      </CustomAccordion>

      {/* Auth Section */}
      <CustomAccordion
        isDisabled={false}
        isExpanded={authSectionExpanded}
        setExpanded={setAuthSectionExpanded}
        title="بيانات المستخدم"
        isClosable={false}
      >
        <Formik
          initialValues={AuthDataEntity.defaultValue()}
          validationSchema={AuthDataEntity.getSchema()}
          onSubmit={(values) => {
            console.log("Validate Auth:", values);
            handleAuthSubmit(values);
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
                    name="username"
                    label="اسم المستخدم"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.username}
                    touched={touched.username}
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

              <Button
                type="submit"
                sx={{ display: "none" }}
                ref={refSubmitAuth}
              ></Button>
            </Box>
          )}
        </Formik>
      </CustomAccordion>

      <CustomAccordion
        isDisabled={false}
        isExpanded={employeeSectionExpanded}
        setExpanded={setEmployeeSectionExpanded}
        title="بيانات الموظف"
        isClosable={false}
      >
        <Formik
          initialValues={EmployeeEntity.defaultValue()}
          validationSchema={EmployeeEntity.getSchema()}
          onSubmit={(values) => {
            console.log("Validate Emmployee:", values);
            handleEmployeeSubmit(values);
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
                  <CustomSelectField<IRole>
                    isRequired
                    name="role"
                    label="الوظيفة"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.role}
                    touched={touched.role}
                    width="100%"
                    options={roleList}
                  />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                  <CustomSelectField<IShift>
                    isRequired
                    name="shift"
                    label="موعد العمل"
                    value={values.shift}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.shift}
                    touched={touched.shift}
                    width="100%"
                    options={shiftList}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <CustomSelectField<IDepartment>
                    isRequired
                    name="department"
                    label="القسم"
                    value={values.department}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.department}
                    touched={touched.department}
                    width="100%"
                    options={departmentList}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                sx={{ display: "none" }}
                ref={refSubmitEmployee}
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
