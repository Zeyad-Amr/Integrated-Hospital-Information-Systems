import { Formik } from "formik";
import { CompanionInterface } from "../../domain/interfaces/visit-interface";
import CustomSelectField from "@/core/shared/components/CustomSelectField";
import { Box, Button } from "@mui/material";
import { Yup } from "@/core/shared/utils/validation";
import PersonalData from "@/core/shared/components/PersonalData";
import { LookupsState } from "@/core/shared/modules/lookups/presentation/controllers/types";
import { useAppSelector } from "@/core/state/store";

interface CompanionFormProps {
    initialValues: CompanionInterface;
    onSubmit: (values: CompanionInterface) => void;
    refSubmitButton: React.MutableRefObject<null>;
    validationSchema: Yup.ObjectSchema<any>;
    isResetForm?: boolean;
    searchSSN?: boolean;
    innerFormRef?: React.MutableRefObject<null>;
}

export default function CompanionForm({
    initialValues,
    onSubmit,
    refSubmitButton,
    validationSchema,
    innerFormRef,
    isResetForm = false,
    searchSSN = true,
}: CompanionFormProps) {
    const lookupsState: LookupsState = useAppSelector(
        (state: any) => state.lookups
    );

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
            innerRef={innerFormRef}
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
                            options={lookupsState.lookups.kinshipTypes}
                        />
                        <PersonalData searchSSN={searchSSN} />
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