"use client";

import React from "react";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import CustomTextField from "@/core/shared/components/CustomTextField";
import styles from "./loginPage.module.css";
import { useAppDispatch } from "@/core/state/store";
import { login } from "../../controllers/thunks/auth-thunks";
import { useRouter } from "next/navigation";
import PageTitle from "@/core/shared/components/PageTitle";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleFormSchema = Yup.object({
    userName: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(45, "Username must be at most 45 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
  });

  const onsubmit = (values: { userName: string; password: string }) => {
    console.log(values);
    dispatch(
      login({
        username: values.userName,
        password: values.password,
      })
    ).then((res) => {
      console.log(res);
      if (!(res as any)?.error) {
        router.push("dashboard/home");
      }
    });
  };

  return (
    <Box className={`${styles.loginPage} ${styles.flexCenter}`}>
      <Box className={`${styles.loginBG}`}></Box>
      <Box
        className={`${styles.loginFormContainer} ${styles.flexCenter}`}
        sx={{ overflow: "hidden" }}
      >
        <Box
          component="img"
          src="https://i.postimg.cc/HnFF8MvW/logo.png"
          sx={{ width: "8rem", mb: 3 }}
        />
        <PageTitle title="تسجيــل الدخــول" />
        <Formik
          initialValues={{
            userName: "",
            password: "",
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
              component="form"
              onSubmit={handleSubmit}
              noValidate
              style={{
                width: "70%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid container spacing={1}>
                <Grid
                  item
                  style={{ height: "100%" }}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                >
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
                      className: "input",
                    }}
                  />
                </Grid>
                <Grid
                  item
                  style={{ height: "100%" }}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                >
                  <CustomTextField
                    isRequired
                    name="password"
                    label="كلمة المرور"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password}
                    touched={touched.password}
                    width="100%"
                    props={{
                      type: "password",
                      className: "input",
                    }}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Button
                    type="submit"
                    style={{
                      color: "#fff",
                      backgroundColor: "#232836",
                      width: "8vw",
                    }}
                  >
                    دخـــول
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default LoginPage;
