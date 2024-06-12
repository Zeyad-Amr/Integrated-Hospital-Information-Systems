import React, { useState } from 'react'
import { Formik } from "formik";
import CustomTextField from '@/core/shared/components/CustomTextField';
import { values } from 'lodash';
import { Box } from '@mui/system';
import PrimaryButton from '@/core/shared/components/btns/PrimaryButton';

const AddComplaint = () => {

    const [editing, setEditing] = useState<boolean>(false)

    return (
        <Formik
            initialValues={{ complaint: '' }}
            onSubmit={(values) => {
                console.log(values)
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
                    <CustomTextField
                        isRequired
                        name="complaint"
                        label="الشكوى"
                        multiline
                        rows={7}
                        value={values.complaint}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.complaint}
                        touched={touched.complaint}
                        width="100%"
                        props={{
                            type: "text",
                        }}
                    />
                    <PrimaryButton
                        title={editing ? "حفــــظ" : "اضـــافة"}
                        type="submit"
                        sx={{ mt: 1 }}
                    />
                </Box>
            )}
        </Formik >
    );
};

export default AddComplaint