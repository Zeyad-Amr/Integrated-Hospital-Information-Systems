// import React from 'react'
"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import HeaderText from "../components/header-text/HeaderText";
import "../components/header-text/HeaderText.css";
import CreateStaff from "../components/user-form/form";

const CreateUserComponent = () => {
  return (
    <Box
      sx={{
        width: "90%",
        height: "70vh",
        marginTop: "9vh",
        marginRight: "5%",
        marginLeft: "5%",
      }}
    >
      <HeaderText title="اضافة مستخدم" />
      <CreateStaff />
    </Box>
  );
};

export default CreateUserComponent;
