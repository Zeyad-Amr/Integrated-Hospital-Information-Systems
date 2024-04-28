import CustomSelectField from '@/core/shared/components/CustomSelectField';
import CustomTextField from '@/core/shared/components/CustomTextField';
import PrimaryButton from '@/core/shared/components/btns/PrimaryButton';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Formik } from 'formik';
import React from 'react'
import * as Yup from "yup";

interface SubDepartmentInitalValues {
    name: string;
    department: string;
    room: string;
    specialization: string;
    features: string[];
}

interface SubDepartmentsFormProps {
    edit?: boolean;
    propsIntialValues?: SubDepartmentInitalValues
}

const SubDepartmentsForm = ({ edit, propsIntialValues }: SubDepartmentsFormProps) => {

    const intialValues: SubDepartmentInitalValues = {
        name: '',
        department: '',
        room: '',
        specialization: '',
        features: ['1', '2'],
    }

    const handleFormSchema = Yup.object({
        name: Yup.string()
            .required("Name is required")
            .min(3, "Name must be at least 3 characters")
            .max(45, "Name must be at most 45 characters"),
        department: Yup.string()
            .required("department is required"),
        room: Yup.string()
            .required("room is required"),
        specialization: Yup.string()
            .required("specialization is required"),
        features: Yup.string()
            .required("at least one feature is required")
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
                    <Grid container spacing={2}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
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
                                sx={{ margin: '0' }}
                                props={{
                                    type: "text",
                                }}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <CustomSelectField
                                value={values.department}
                                options={[{ id: 1, value: '1' }]}
                                isRequired
                                name="department"
                                label="القســــم"
                                // value={values.department}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.department}
                                touched={touched.department}
                                width="100%"
                                sx={{ margin: '0' }}


                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <CustomSelectField
                                value={values.room}
                                options={[{ id: 1, value: '1' }]}
                                isRequired
                                name="room"
                                label="الغـــرفة"
                                // value={values.room}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.room}
                                touched={touched.room}
                                width="100%"
                                sx={{ margin: '0' }}


                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <CustomSelectField
                                value={values.specialization}
                                options={[{ id: 1, value: '1' }]}
                                isRequired
                                name="specialization"
                                label="التخصص"
                                // value={values.specialization"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.specialization}
                                touched={touched.specialization}
                                width="100%"
                                sx={{ margin: '0' }}


                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <CustomSelectField
                                multiple
                                value={values.features}
                                options={[{ id: '1', value: 'one' }, { id: '2', value: 'two' }, { id: '3', value: 'three' }]}
                                isRequired
                                name="features"
                                label="الميــزات"
                                // value={values.features}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                // error={errors.features}
                                // touched={touched.features}
                                width="100%"
                                sx={{ margin: '0' }}


                            />
                        </Grid>
                    </Grid>
                    <PrimaryButton
                        title={edit ? "حفــــظ" : "اضـــافة"}
                        type="submit"
                    />
                </Box>
            )}
        </Formik>
    )
}

export default SubDepartmentsForm