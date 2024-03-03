import { Formik } from "formik";
import { CompanionInterface } from "../../domain/interfaces/visit-interface";
import CustomSelectField from "@/core/shared/components/CustomSelectField";
import { Box, Button } from "@mui/material";
import { Yup } from "@/core/shared/utils/validation";
import PersonalData from "@/core/shared/components/PersonalData";

interface CompanionFormProps {
    initialValues: CompanionInterface;
    onSubmit: (values: CompanionInterface) => void;
    refSubmitButton: React.MutableRefObject<null>;
    validationSchema: Yup.ObjectSchema<any>;
    isResetForm?: boolean;
    isSetValues?: any;
    newValues?: any;
    lookups: any
}

export default function CompanionForm({
    initialValues,
    onSubmit,
    refSubmitButton,
    validationSchema,
    lookups,
    isResetForm = false,
}: CompanionFormProps) {
    console.log(initialValues);

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values, { resetForm }) => {
                onSubmit(values)
                if (isResetForm) {
                    resetForm();
                }
            }}
            validationSchema={validationSchema}
            validateOnChange={true}
        >
            {({
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
            }) => {

                return (
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <CustomSelectField<any>
                            isRequired
                            name="kinship"
                            label="درجة القرابة"
                            value={values.kinship}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.kinship}
                            touched={touched.kinship}
                            width="100%"
                            options={lookups.kinshipTypes}
                        />
                        <PersonalData />
                        <Button
                            type="submit"
                            sx={{ display: "none" }}
                            ref={refSubmitButton}
                        ></Button>
                    </Box>
                )
            }}
        </Formik>
    )
}