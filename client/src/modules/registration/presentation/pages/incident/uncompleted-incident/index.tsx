// import React from 'react'
import * as React from "react";
import { Box } from "@mui/material";
import IncidentTable from "../../../components/incident/view-incidents";

const IncidentTableComponent = () => {
  return (
    <Box
      sx={{
        width: "90%",
        height: "70vh",
        margin: "0 auto 0",
      }}
    >
      <IncidentTable />
    </Box>
  );
};

export default IncidentTableComponent;
