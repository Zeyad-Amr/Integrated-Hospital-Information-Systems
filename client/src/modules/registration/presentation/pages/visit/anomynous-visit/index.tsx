// import React from 'react'
import React from "react";
import VisitTable from "../../../components/visit/view-visits";
import { Box } from "@mui/material";

const VisitTableComponent = () => {
  return (
    <Box
      sx={{
        width: "90%",
        height: "70vh",
        margin: "0 auto 0",
      }}
    >
      <VisitTable />
    </Box>
  );
};

export default VisitTableComponent;
