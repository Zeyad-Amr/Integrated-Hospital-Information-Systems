import PageHeader from '@/core/shared/components/headers/PageHeader'
import { Box } from '@mui/system'
import React from 'react'
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import AddVisitForm from '../components/add-visit-form/AddVisitForm';

const AddVisit = () => {
    return (
    <Box
      sx={{
        width: "90%",
        height: "70vh",
        margin: "0 auto 0",
      }}
    >
      <PageHeader title="اضافـــــــة مريض">
        <HealthAndSafetyOutlinedIcon />
      </PageHeader>
      <AddVisitForm/>
    </Box>
  )}


export default AddVisit