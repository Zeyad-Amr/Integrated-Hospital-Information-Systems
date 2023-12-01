import PageHeader from '@/core/shared/components/headers/PageHeader'
import { Box } from '@mui/system'
import React from 'react'
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import AddIncidentForm from '../components/add-incident/AddIncidentForm';

const AddIncident = () => {
    return (
    <Box
      sx={{
        width: "90%",
        height: "70vh",
        margin: "3% auto 0",
      }}
    >
      <PageHeader title="اضافـــــــة حـــادث">
        <HealthAndSafetyOutlinedIcon />
      </PageHeader>

      <AddIncidentForm />
    </Box>
  )}


export default AddIncident