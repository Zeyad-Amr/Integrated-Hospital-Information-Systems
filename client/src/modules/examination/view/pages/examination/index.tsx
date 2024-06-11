import Tabs from '@/core/shared/components/tabs/Tabs'
import { Box } from '@mui/system'
import React from 'react'
import ExaminationHeader from '../../components/ExaminationHeader'

const ExaminationPage = () => {
  return (
    <>
      <ExaminationHeader patientName='باسل توفيق' clinicName='امراض تناسلية'/>
      <Tabs Tabs={[
        { name: 'السجل المرضي', content: <Box>السجل المرضي</Box> },
        { name: 'المعامل', content: <Box>المعامل</Box> },
        { name: 'الأشعة', content: <Box>الأشعة</Box> },
        {
          name: 'الاستشارة', content: <Box>
            <Box>الاستشارة</Box>
            <Box>الاستشارة</Box>
            <Box>الاستشارة</Box>
            <Box>الاستشارة</Box>
            <Box>الاستشارة</Box>
            <Box>الاستشارة</Box>
            <Box>الاستشارة</Box>
            <Box>الاستشارة</Box>
            <Box>الاستشارة</Box>
            <Box>الاستشارة</Box>
            <Box>الاستشارة</Box>
            <Box>الاستشارة</Box>
            <Box>الاستشارة</Box>
            <Box>الاستشارة</Box>
            <Box>الاستشارة</Box>
            <Box>الاستشارة</Box>
            <Box>الاستشارة</Box>
            <Box>الاستشارة</Box>
            <Box>الاستشارة</Box>
            <Box>الاستشارة</Box>
            <Box>الاستشارة</Box>
            <Box>الاستشارة</Box>
            <Box>الاستشارة</Box>
            <Box>الاستشارة</Box>
            <Box>الاستشارة</Box>
          </Box>
        },
      ]} />
    </>
  )
}

export default ExaminationPage