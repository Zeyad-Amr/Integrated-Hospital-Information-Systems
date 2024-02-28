import { Box } from '@mui/system'
import React from 'react'
import AddVisitForm from '../../components/visit/add-visit-form/AddVisitForm';

const AddVisit = () => {
  return (
    <Box
      sx={{
        width: "90%",
        height: "70vh",
        margin: "0 auto 0",
      }}
    >
      <AddVisitForm />
    </Box>
  )
}


export default AddVisit