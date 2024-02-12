// import React from 'react'
import * as React from "react";
import { Box } from "@mui/material";
import IncidentTable from "../../components/view-incidents";

const IncidentTableComponent = () => {
  return (
    <Box
      sx={{
        width: "90%",
        height: "70vh",
        margin: "0 auto 0",
      }}
    >
      {/* <PageHeader title="استكمال بيانات حـــادث">
                <HealthAndSafetyOutlined />
            </PageHeader> */}
      <IncidentTable />
    </Box>
  );
};

export default IncidentTableComponent;
