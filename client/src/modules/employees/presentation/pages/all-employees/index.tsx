// import React from 'react'
import * as React from "react";
import { Box } from "@mui/material";
import PageHeader from "@/core/shared/components/headers/PageHeader";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmployeesTable from "../../components/view-employees";

const EmployeesTableComponent = () => {
    return (
        <Box sx={{
            width: "90%",
            height: "70vh",
            margin: "3% auto 0",
        }}>
            <PageHeader title="الموظفون">
                <AccountBoxIcon />
            </PageHeader>


            <EmployeesTable />
        </Box>
    );
};

export default EmployeesTableComponent;
