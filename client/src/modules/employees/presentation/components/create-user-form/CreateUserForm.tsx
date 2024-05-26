import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import Box from "@mui/material/Box";
import CustomTextField from "@/core/shared/components/CustomTextField";
import { Grid } from "@mui/material";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import CustomAccordion from "@/core/shared/components/CustomAccordion";
import { useAppDispatch, useAppSelector } from "@/core/state/store";
import { createEmployee } from "../../controllers/thunks/employee-thunks";
import {
  setCurrentEmployee,
  setCurrentAuth,
  setCurrentPerson,
} from "../../controllers/slices/employee-slice";
import EmployeeInterface from "@/modules/employees/domain/interfaces/employee-interface";
import EmployeeEntity from "@/modules/employees/domain/entities/employee-entity";
import PersonInterface from "@/core/shared/modules/person/domain/interfaces/person-interface";
import PersonEntity from "@/core/shared/modules/person/domain/entities/person-entity";
import AuthDataEntity from "@/modules/auth/domain/entities/auth-data-entity";
import AuthInterface from "@/modules/auth/domain/interfaces/auth-interface";
import CustomSelectField from "@/core/shared/components/CustomSelectField";
import { EmployeeState } from "../../controllers/types";
import { LookupsState } from "@/core/shared/modules/lookups/presentation/controllers/types";
import {
  RoleType,
  ShiftType,
} from "@/core/shared/modules/lookups/domain/interfaces/lookups-interface";
import PersonalData from "@/core/shared/components/PersonalData";
import { getSubDepartmentsList } from "@/modules/management/presentation/controllers/thunks/sub-departments-thunks";
import { SubDepartmentsState } from "@/modules/management/presentation/controllers/types";
import { SubDepartmentsInterface } from "@/modules/management/domain/interfaces/sub-departments-interface";

interface CreateUserFormProps {
  employeeData?: EmployeeInterface;
}

const CreateUserForm = ({ employeeData }: CreateUserFormProps) => {
  const dispatch = useAppDispatch();
  const lookupsState: LookupsState = useAppSelector(
    (state: any) => state.lookups
  );
  const employeeState: EmployeeState = useAppSelector(
    (state: any) => state.employees
  );
  const subDepartmentsState: SubDepartmentsState = useAppSelector(
    (state: any) => state.subDepartments
  );

  //* buttons useRef
  const refSubmitPerson: any = useRef(null);
  const refSubmitAuth: any = useRef(null);
  const refSubmitEmployee: any = useRef(null);

  //* accordions expand and collapse State
  const [personSectionExpanded, setPersonSectionExpanded] =
    useState<boolean>(true);
  const [authSectionExpanded, setAuthSectionExpanded] = useState<boolean>(true);
  const [employeeSectionExpanded, setEmployeeSectionExpanded] =
    useState<boolean>(true);

  //* validation flags
  const [personValid, setPersonValid] = useState<boolean>(false);
  const [authValid, setAuthValid] = useState<boolean>(false);
  const [employeeValid, setEmployeeValid] = useState<boolean>(false);

  //* Handle on submit person section
  const onSubmitPerson = (values: PersonInterface) => {
    setPersonValid(true);
    dispatch(setCurrentPerson(values));
    console.log("Submit Person:", values);
  };

  //* Handle on submit auth data section
  const onSubmitAuth = (values: AuthInterface) => {
    setAuthValid(true);
    dispatch(setCurrentAuth(values));
    console.log("Submit Auth:", values);
  };

  //* handle on submit employee specific data section
  const onSubmitEmployee = (values: EmployeeInterface) => {
    setEmployeeValid(true);
    dispatch(
      setCurrentEmployee({
        ...employeeState.currentEmployee,
        shift: values.shift,
        role: values.role,
        suDepartmentIds: values.suDepartmentIds,
      })
    );
    console.log("Submit Employee:", values);
  };

  //* handle on submit all forms
  //* Call click event for all sections buttons
  const handleSubmitAllForms = () => {
    if (refSubmitPerson.current) {
      setPersonValid(false);
      console.log("Submit Person");
      refSubmitPerson.current.click();
    }
    if (refSubmitAuth.current) {
      setAuthValid(false);
      console.log("Submit Auth");
      refSubmitAuth.current.click();
    }
    if (refSubmitEmployee.current) {
      setEmployeeValid(false);
      console.log("Submit Employee");
      refSubmitEmployee.current.click();
    }
  };

  //* dispatch when all forms are valid
  useEffect(() => {
    if (personValid && authValid && employeeValid) {
      console.log("Submit All Forms:", employeeState.currentEmployee);
      dispatch(
        createEmployee({
          ...employeeState.currentEmployee,
          auth: employeeState.currentAuth,
          person: employeeState.currentPerson,
        })
      );
    } else {
      console.log("Not Valid");
    }
  }, [personValid, authValid, employeeValid]);

  //* dispatch getSubdepartments
  useEffect(() => {
    dispatch(getSubDepartmentsList());
  }, []);

  return (
    <Box sx={{ marginTop: "2.5rem" }}>
      {/* --------------- Peronal Data Section --------------- */}
      <CustomAccordion
        isDisabled={false}
        isExpanded={personSectionExpanded}
        setExpanded={setPersonSectionExpanded}
        title="البيانات الشخصية"
        isClosable={false}
      >
        <Formik
          initialValues={employeeData?.person ?? PersonEntity.defaultValue()}
          onSubmit={onSubmitPerson}
          validationSchema={PersonEntity.getSchema()}
        >
          {({ handleSubmit }) => (
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <PersonalData />
              <Button
                type="submit"
                sx={{ display: "none" }}
                ref={refSubmitPerson}
              ></Button>
            </Box>
          )}
        </Formik>
      </CustomAccordion>

      {/* --------------- Auth Data Section --------------- */}
      <CustomAccordion
        isDisabled={false}
        isExpanded={authSectionExpanded}
        setExpanded={setAuthSectionExpanded}
        title="بيانات المستخدم"
        isClosable={false}
      >
        <Formik
          initialValues={employeeData?.auth ?? AuthDataEntity.defaultValue()}
          validationSchema={AuthDataEntity.getSchema()}
          onSubmit={(values) => {
            onSubmitAuth(values);
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
                {!employeeData ? (
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
                ) : null}
                <Grid item lg={6} md={6} sm={12} xs={12}>
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

      {/* --------------- Employee Data Section --------------- */}
      <CustomAccordion
        isDisabled={false}
        isExpanded={employeeSectionExpanded}
        setExpanded={setEmployeeSectionExpanded}
        title="بيانات الموظف"
        isClosable={false}
      >
        <Formik
          initialValues={
            employeeData
              ? {
                  id: employeeData?.id,
                  shift: employeeData?.shift as ShiftType,
                  role: employeeData?.role as RoleType,
                  suDepartmentIds: employeeData?.suDepartmentIds as
                    | number[]
                    | string[],
                }
              : EmployeeEntity.defaultValue()
          }
          validationSchema={EmployeeEntity.getSchema()}
          onSubmit={(values) => {
            onSubmitEmployee(values);
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
                  <CustomSelectField<RoleType>
                    isRequired
                    name="role"
                    label="الوظيفة"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.role}
                    touched={touched.role}
                    width="100%"
                    options={lookupsState.lookups.roleTypes}
                  />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                  <CustomSelectField<ShiftType>
                    isRequired
                    name="shift"
                    label="موعد العمل"
                    value={values.shift}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.shift}
                    touched={touched.shift}
                    width="100%"
                    options={lookupsState.lookups.shiftTypes}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <CustomSelectField
                    multiple
                    isRequired
                    name="suDepartmentIds"
                    label="القسم الفرعي"
                    value={values.suDepartmentIds}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.suDepartmentIds}
                    touched={touched.suDepartmentIds}
                    width="100%"
                    options={subDepartmentsState?.subDepartmentsList.map(
                      (subdepartmentEl: SubDepartmentsInterface) => {
                        return {
                          id: subdepartmentEl.id,
                          value: subdepartmentEl.name,
                        };
                      }
                    )}
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
          onClick={() => handleSubmitAllForms()}
        />
      </Box>
    </Box>
  );
};

export default CreateUserForm;
