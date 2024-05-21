// import React from 'react'
import React from "react";
import { Box } from "@mui/material";
import EmployeesTable from "../../components/view-employees";

const EmployeesTableComponent = () => {
  return (
    <Box
      sx={{
        width: "90%",
        height: "70vh",
        margin: "0 auto ",
      }}
    >
      <EmployeesTable />
    </Box>
  );
};

export default EmployeesTableComponent;
