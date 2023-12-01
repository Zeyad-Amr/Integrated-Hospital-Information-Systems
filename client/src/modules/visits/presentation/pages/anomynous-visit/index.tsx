// import React from 'react'
import * as React from "react";
import VisitsTable from "../../components/view-visits";
import { Box } from "@mui/material";
import PageHeader from "@/core/shared/components/headers/PageHeader";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const VisitsTableComponent = () => {
    return (
        <Box sx={{
            width: "90%",
            height: "70vh",
            margin: "3% auto 0",
        }}>
            <PageHeader title="المرضى المجهولون">
                <AccountBoxIcon />
            </PageHeader>


            <VisitsTable />
        </Box>
    );
};

export default VisitsTableComponent;
