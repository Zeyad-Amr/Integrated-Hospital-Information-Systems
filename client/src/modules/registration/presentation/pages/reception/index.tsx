// import React from 'react'
import * as React from "react";
import { Box } from "@mui/material";
import ReceptionTable from "../../components/reception";

const ReceptionTableComponent = () => {
  return (
    <Box
      sx={{
        width: "90%",
        height: "70vh",
        margin: "0 auto 0",
      }}
    >
      <ReceptionTable />
    </Box>
  );
};

export default ReceptionTableComponent;
