// import React from 'react'
import * as React from "react";
import { Box } from "@mui/material";
import PageHeader from "@/core/shared/components/headers/PageHeader";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ERVisitsTable from "../../components/list-er-area-visits";

const ERVisitsTableComponent = () => {
    return (
        <Box sx={{
            width: "90%",
            height: "70vh",
            margin: "0 auto 0",
        }}>
            <PageHeader title="المرضى المجهولون">
                <AccountBoxIcon />
            </PageHeader>


            <ERVisitsTable />
        </Box>
    );
};

export default ERVisitsTableComponent;
