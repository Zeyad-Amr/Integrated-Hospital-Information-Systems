import React from 'react'
import ViewVisits from '../components/ViewVisits'
import { Box } from '@mui/material'

const  ClinicVisitsPage = () => {
  return (
    <Box
    sx={{
      width: "90%",
      height: "70vh",
      margin: "0 auto 0",
    }}
  >
    <ViewVisits/>
  </Box>
  )
}

export default ClinicVisitsPage