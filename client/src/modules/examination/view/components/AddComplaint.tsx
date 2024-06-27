import React, { useRef } from "react";
import { Formik, FormikProps } from "formik";
import CustomTextField from "@/core/shared/components/CustomTextField";
import { Box } from "@mui/system";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import ComplaintsModel from "../../../registration/data/models/complaint-model";
import { useAppDispatch } from "@/core/state/store";
import { ComplaintsInterface } from "../../../registration/domain/interfaces/complaint-interface";
import { updateComplaint } from "@/modules/registration/presentation/controllers/thunks/visits-thunks";

interface AddComplaintPropsInterface {
  visitCode: string;
}

const AddComplaint = ({ visitCode }: AddComplaintPropsInterface) => {
  // const [editing, setEditing] = useState<boolean>(false)
  const dispatch = useAppDispatch();
  const formikRefComplaints = useRef<FormikProps<ComplaintsInterface>>(null);
  return (
    <Formik
      innerRef={formikRefComplaints}
      initialValues={ComplaintsModel.defaultValues()}
      onSubmit={async (values) => {
        const submitObject: any = {
          ...values,
          visitCode: visitCode,
        };

        const action = updateComplaint(submitObject);

        dispatch(action).then((res) => {
          if (res?.meta.requestStatus == "fulfilled") {
           if(formikRefComplaints.current) formikRefComplaints.current.setFieldValue('mainComplaint','.')
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
          <PrimaryButton title={"حفــــظ"} type="submit" sx={{ mt: 1 }} />
        </Box>
      )}
    </Formik>
  );
};

export default AddComplaint;
