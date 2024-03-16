// import React from 'react'
import * as React from "react";
import { Box } from "@mui/material";
import IncidentTable from "../../../components/incident/view-incidents";
import PageHeader from "@/core/shared/components/headers/PageHeader";
import { HealthAndSafetyOutlined } from "@mui/icons-material";

const IncidentTableComponent = () => {
    return (
        <Box sx={{
            width: "90%",
            height: "70vh",
            margin: "0 auto 0",
        }}>
            {/* <PageHeader title="استكمال بيانات حـــادث">
                <HealthAndSafetyOutlined />
            </PageHeader> */}
            <IncidentTable />
        </Box>
    );
};

export default IncidentTableComponent;
