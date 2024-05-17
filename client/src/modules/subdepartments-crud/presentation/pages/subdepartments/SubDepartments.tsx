import React, { useState } from 'react'
import { Box } from '@mui/system'
import SubDepartmentsTable from '../../components/subdepartments/SubDepartmentsTable'


const SubDepartments = () => {

    return (
        <Box
            sx={{
                width: "90%",
                height: "70vh",
                margin: "0 auto 0",
            }}
        >
            <SubDepartmentsTable />
        </Box>
    )
}

export default SubDepartments