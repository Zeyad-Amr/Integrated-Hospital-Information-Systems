// import React from 'react'
"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import CreateStaff from "../components/create-user/user-form";
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import PageHeader from "@/core/shared/components/headers/PageHeader";

const CreateUserComponent = () => {
  return (
    <Box
      sx={{
        width: "90%",
        height: "70vh",
        margin: "3% auto 0",
      }}
    >
      <PageHeader title="اضافـــــــة مستخدم">
        <PersonAddAltRoundedIcon />
      </PageHeader>

      <CreateStaff />
    </Box>
  );
};

export default CreateUserComponent;
