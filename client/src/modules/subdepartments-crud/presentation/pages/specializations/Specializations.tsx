import React from 'react'
import { Box } from '@mui/system'
import SpecializationsTable from '../../components/specializations/SpecializationsTable'

const Specializations = () => {

    return (
        <Box
            sx={{
                width: "90%",
                height: "70vh",
                margin: "0 auto 0",
            }}
        >
            <SpecializationsTable />
        </Box>
    )
}

export default Specializations