import CustomAccordion from '@/core/shared/components/CustomAccordion';
import CustomFullScreenDialog from '@/core/shared/components/CustomFullScreenDialog'
import VitalsData, { VitalsDataValuesI } from '@/core/shared/components/VitalsData';
import { Button } from '@mui/material';
import React , {useState} from 'react'

const ErAreaForm = () => {
  const [open, setOpen] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [expandVitalsAccordion, setExpandVitalsAccordion] = useState(true);

  const handleSubmit = (data : VitalsDataValuesI) => {
    console.log('test', data);
  }

  const initialValues : VitalsDataValuesI = {
    CVP : 1,
    diastolicPressure : 1,
    GCS : 1,
    painScore : 1,
    pulseRate : 1,
    respiratoryRate : 1,
    SPO2 : 1,
    systolicPressure : 1,
    temperature : 1,
  }

  return (
    <div>
      <p>ErAreaForm</p>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Open full-screen dialog
      </Button>
      <CustomFullScreenDialog open={open} setOpen={setOpen} navTitle='ترياج' >
        <CustomAccordion title='الاشارات الحيوية' isClosable={false} isDisabled={false} isExpanded={expandVitalsAccordion} setExpanded={setExpandVitalsAccordion}>
        <VitalsData initialValues={initialValues} onSubmit={handleSubmit} isSubmitted={submit}  />
        </CustomAccordion>
      <Button variant="outlined" onClick={() => setSubmit(!submit)}>
        Submit
      </Button>
      </CustomFullScreenDialog>
      
    </div>
  )
}

export default ErAreaForm