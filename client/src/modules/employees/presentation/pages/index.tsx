// import React from 'react'
"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import CreateEmployee from "../components/create-user-form/CreateUserForm";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import PageHeader from "@/core/shared/components/headers/PageHeader";
import CreateUserForm from "../components/create-user-form/CreateUserForm";

const CreateUserComponent = () => {
  return (
    <Box
      sx={{
        width: "90%",
        height: "70vh",
        margin: "0 auto 0",
      }}
    >
      <PageHeader title="اضافـــــــة مستخدم">
        <PersonAddAltRoundedIcon />
      </PageHeader>

      <CreateUserForm/>
    </Box>
  );
};

export default CreateUserComponent;
