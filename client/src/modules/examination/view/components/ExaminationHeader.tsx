import PrimaryButton from '@/core/shared/components/btns/PrimaryButton'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

interface ExaminationHeaderProps {
    patientName: string
    clinicName: string
}

const ExaminationHeader = ({ patientName, clinicName }: ExaminationHeaderProps) => {
    return (
        <Box sx={{
            display: 'flex',
            backgroundColor: 'primary.dark',
            color: 'white',
            width: '90%',
            margin: '0 auto',
            padding: '0.75rem 1rem',
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Box sx={{ display: 'flex', gap: '1rem' }}>

                <Typography> {patientName}</Typography>
                <Box sx={{ width: '1px', backgroundColor: '#fff' }} />
                <Typography> {clinicName}</Typography>
            </Box>
            <PrimaryButton title='انهاء الزيارة' />
        </Box>
    )
}

export default ExaminationHeader