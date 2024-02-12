// import React from 'react'
import * as React from "react";
import VisitsTable from "../../components/view-visits";
import { Box } from "@mui/material";

const VisitsTableComponent = () => {
  return (
    <Box
      sx={{
        width: "90%",
        height: "70vh",
        margin: "0 auto 0",
      }}
    >
      {/* <PageHeader title="المرضى المجهولون">
                <AccountBoxIcon />
            </PageHeader> */}
      <VisitsTable />
    </Box>
  );
};

export default VisitsTableComponent;
