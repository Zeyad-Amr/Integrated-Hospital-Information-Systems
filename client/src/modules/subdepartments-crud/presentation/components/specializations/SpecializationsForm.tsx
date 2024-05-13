import CustomTextField from '@/core/shared/components/CustomTextField';
import PrimaryButton from '@/core/shared/components/btns/PrimaryButton';
import { useAppDispatch } from '@/core/state/store';
import SpecializationEntity from '@/modules/subdepartments-crud/domain/entities/specialization-entity';
import { Box } from '@mui/system';
import { Formik } from 'formik';
import React from 'react'
import { createSpecialization , updateSpecializations } from "@/modules/subdepartments-crud/presentation/controllers/thunks/specialization-thunks";
import SpecializationInterface from '@/modules/subdepartments-crud/domain/interfaces/specialization -interface';

interface SpecializationsFormProps {
    edit?: boolean;
    propsIntialValues?: SpecializationInterface
}

const SpecializationsForm = ({ edit, propsIntialValues }: SpecializationsFormProps) => {

    const dispatch = useAppDispatch();

    return (
        <Formik
            initialValues={edit && propsIntialValues ? { name : propsIntialValues.name , description : propsIntialValues.description } : SpecializationEntity.defaultValue()}
            onSubmit={async (values) => { 
                console.log(values) ; 
                edit && propsIntialValues ? 
                // in case edit mode
                dispatch(updateSpecializations({
                    id : String(propsIntialValues.id),
                    name : values.name,
                    description : values.description,
                })).then(() => {
                    // setShowDialog('none')
                })
                : 
                // in case not edit mode
                dispatch(createSpecialization(values)).then(() => {
                    // setShowDialog('none')
                })
             }}
            validationSchema={SpecializationEntity.specializationsFormValidations()}
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
                            type: "text",
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
                            type: "text",
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

export default SpecializationsForm