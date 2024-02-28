// import React from 'react'
import * as React from "react";
import VisitTable from "../../../components/visit/view-visits";
import { Box } from "@mui/material";
import PageHeader from "@/core/shared/components/headers/PageHeader";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const VisitTableComponent = () => {
    return (
        <Box sx={{
            width: "90%",
            height: "70vh",
            margin: "0 auto 0",
        }}>
            {/* <PageHeader title="المرضى المجهولون">
                <AccountBoxIcon />
            </PageHeader> */}


            <VisitTable />
        </Box>
    );
};

export default VisitTableComponent;
