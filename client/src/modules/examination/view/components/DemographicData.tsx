import React from 'react'
import { Formik } from "formik";
import PersonalData from '@/core/shared/components/PersonalData';
import { Box } from '@mui/system';
import PrimaryButton from '@/core/shared/components/btns/PrimaryButton';

const DemographicData = () => {
    return (
        <Formik
            initialValues={{ }}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {({
                handleSubmit,
            }) => (
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <PersonalData />
                    <PrimaryButton
                        title={"حفـــــظ"}
                        type="submit"
                    />
                </Box>
            )}
        </Formik>
    )
}

export default DemographicData