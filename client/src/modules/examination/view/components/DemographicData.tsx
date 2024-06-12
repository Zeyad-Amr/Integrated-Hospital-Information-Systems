import React, { useState } from 'react'
import { Formik } from "formik";
import PersonalData from '@/core/shared/components/PersonalData';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import PrimaryButton from '@/core/shared/components/btns/PrimaryButton';

const DemographicData = () => {
    const [editing, setEditing] = useState<boolean>(false)

    return (
        <Formik
            initialValues={{ }}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {({
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
            }) => (
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <PersonalData />
                    <PrimaryButton
                        title={editing ? "تعــــديل" : "حفـــــظ"}
                        type="submit"
                    />
                </Box>
            )}
        </Formik>
    )
}

export default DemographicData