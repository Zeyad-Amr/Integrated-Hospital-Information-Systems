import PageHeader from '@/core/shared/components/headers/PageHeader'
import { Box } from '@mui/system'
import React from 'react'
import ErAreaForm from '../components/er-area-form/ErAreaForm'

const ErAreaPage = () => {
  return (
    <Box
      sx={{
        width: "90%",
        height: "70vh",
        margin: "0 auto 0",
      }}
    >
      {/* <PageHeader title="التــريــاج">
      </PageHeader>  */}
      <ErAreaForm/>
    </Box>
  )
}

export default ErAreaPage