// import React from 'react'
"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import HeaderText from "../components/create-user/header-text";
import "../components/create-user/header-text/HeaderText.css";
import CreateStaff from "../components/create-user/user-form";
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
const CreateUserComponent = () => {
  return (
    <Box
      sx={{
        width: "90%",
        height: "70vh",
        margin: "3% 3% 0",
      }}
    >
      <Box sx = {{
        position:'relative',
        backgroundColor:'primary.darker',
        color:'white' ,
        padding: '1rem 2rem',
        borderRadius: '15px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <PersonAddAltRoundedIcon sx={{
          position:'absolute',
          left:'50%',
          top:'50%',
          transform:'translateY(-50%) translateX(150%)',
          fontSize:'14rem',
          marginRight:'1rem',
          color:'white',
          filter: "drop-shadow(5px 5px 6px #0000008f);",
          }}/>
        <HeaderText title="اضافـــــــة مستخدم" />
      </Box>
      <CreateStaff />
    </Box>
  );
};

export default CreateUserComponent;
