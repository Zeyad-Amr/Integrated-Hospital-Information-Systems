import CustomTextField from '@/core/shared/components/CustomTextField';
import PrimaryButton from '@/core/shared/components/btns/PrimaryButton';
import { Box } from '@mui/system';
import { Formik } from 'formik';
import React from 'react'
import * as Yup from "yup";

interface RoomInitalValues {
    name: string;
    description: string;
}

interface RoomsFormProps {
    edit?: boolean;
    propsIntialValues?: RoomInitalValues
}

const RoomsForm = ({ edit, propsIntialValues }: RoomsFormProps) => {

    const intialValues: RoomInitalValues = {
        name: '',
        description: '',
    }

    const handleFormSchema = Yup.object({
        name: Yup.string()
            .required("Name is required")
            .min(3, "Name must be at least 3 characters")
            .max(45, "Name must be at most 45 characters"),
        description: Yup.string()
            .required("description is required")
    });

    return (
        <Formik
            initialValues={edit && propsIntialValues ? propsIntialValues : intialValues}
            onSubmit={(values) => { console.log(values) }}
            validationSchema={handleFormSchema}
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
                        name="name"
                        label="الاســـم"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.name}
                        touched={touched.name}
                        width="100%"
                        props={{
                            type: "number",
                        }}
                    />
                    <CustomTextField
                        isRequired
                        name="description"
                        label="الـــوصف"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.description}
                        touched={touched.description}
                        width="100%"
                        props={{
                            type: "number",
                        }}
                    />

                    <PrimaryButton
                        title={edit ? "حفــــظ" : "اضـــافة"}
                        type="submit"
                    />
                </Box>
            )}
        </Formik>
    )
}

export default RoomsForm