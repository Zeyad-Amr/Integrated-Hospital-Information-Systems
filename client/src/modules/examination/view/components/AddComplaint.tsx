import React, { useState } from 'react'
import { Formik } from "formik";
import CustomTextField from '@/core/shared/components/CustomTextField';
import { Box } from '@mui/system';
import PrimaryButton from '@/core/shared/components/btns/PrimaryButton';
import { ExaminationFormComponentPropsInterface } from '@/core/shared/components/ExaminationAccordion';
import { updateComplaint } from '../../controllers/thunks/complaints-thunk';
import { ComplaintsInterface } from '../../interfaces/complaints-interface';
import ComplaintsModel from '../../models/complaints-model';
import { useAppDispatch } from '@/core/state/store';

const AddComplaint = ({
    visitCode,
    initialValues,
     }: ExaminationFormComponentPropsInterface) => {
    const [editing, setEditing] = useState<boolean>(false)
    const dispatch = useAppDispatch();
    return (
        <Formik
            initialValues={
                initialValues
                    ? ({
                        ...initialValues,

                    } as ComplaintsInterface)
                    : ComplaintsModel.defaultValues()
            }
            onSubmit={async (values) => {
                const submitObject = {
                    ...values,
                    visitCode: visitCode,
                };

                const action = updateComplaint(submitObject);

                dispatch(action).then((res) => {
                    if (res?.meta.requestStatus == "fulfilled") {
                    }
                });
            }}
            validationSchema={ComplaintsModel.complaintsFormValidations()}
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
                        name="mainComplaint"
                        label="الشكوى"
                        multiline
                        rows={4}
                        value={values.mainComplaint}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.mainComplaint}
                        touched={touched.mainComplaint}
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