import CustomFullScreenDialog from '@/core/shared/components/CustomFullScreenDialog'
import { Button } from '@mui/material';
import React from 'react'

const ErAreaForm = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <p>ErAreaForm</p>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Open full-screen dialog
      </Button>
      <CustomFullScreenDialog open={open} setOpen={setOpen} navTitle='ترياج' >
        <p>Momen</p>
      </CustomFullScreenDialog>
    </div>
  )
}

export default ErAreaForm