// import React from 'react'
import * as React from "react";
import { Box } from "@mui/material";
import IncidentTable from "../../components/view-incidents";

const IncidentTableComponent = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4
        }}>

            <IncidentTable />
        </Box>
    );
};

export default IncidentTableComponent;
