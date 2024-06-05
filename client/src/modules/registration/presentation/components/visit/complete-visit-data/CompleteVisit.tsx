import CustomizedDialog from "@/core/shared/components/CustomizeDialog";
import PersonalData from "@/core/shared/components/PersonalData";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import PersonEntity from "@/core/shared/modules/person/domain/entities/person-entity";
import PersonInterface from "@/core/shared/modules/person/domain/interfaces/person-interface";
import CompleteVisitEntity from "@/modules/registration/domain/entities/complete-visit-entity";
import VisitInterface from "@/modules/registration/domain/interfaces/visit-interface";
import { Button, Box, Typography } from "@mui/material";
import { Formik } from "formik";
import { updateVisit } from "../../../controllers/thunks/visits-thunks";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppDispatch } from "@/core/state/store";
import { CompleteVisitInterface } from "@/modules/registration/domain/interfaces/complete-visit-interface";

interface CompleteVisitPropsInterface {
  showCompletePatientDialog: boolean;
  setShowCompletePatientDialog: Dispatch<SetStateAction<boolean>>;
  anonymousPatientData: VisitInterface;
}

const CompleteVisit = ({
  showCompletePatientDialog,
  setShowCompletePatientDialog,
  anonymousPatientData,
}: CompleteVisitPropsInterface) => {
  const dispatch = useAppDispatch();
  //* useState
  const [combinedValues, setCombinedValues] =
    useState<CompleteVisitInterface>();

  //* buttons useRef
  const refSubmitPatient: any = useRef(null);

  //* Form data refrence
  const patientData = useRef<PersonInterface>();

  //* Submit functions
  const submitPatient = () => {
    if (refSubmitPatient.current) {
      refSubmitPatient.current.click();
    }
  };

  //* Handle Patient Submit
  const handlePatientSubmit = (values: PersonInterface) => {
    patientData.current = values;
    if (anonymousPatientData?.code) {
      setCombinedValues((previous: any) => ({
        ...previous,
        patient: values,
        visitCode: anonymousPatientData?.code,
      }));
    }
  };

  useEffect(() => {
    if (patientData.current && combinedValues) {
      dispatch(updateVisit(combinedValues)).then((res) => {
        if (res.meta.requestStatus == "fulfilled") {
          patientData.current = undefined;
          setShowCompletePatientDialog(false)
        }
      });
    }
  }, [combinedValues]);

  return (
    <CustomizedDialog
      maxWidth={"lg"}
      open={showCompletePatientDialog}
      setOpen={setShowCompletePatientDialog}
      title="استكمال بيانات مريض"
    >
      {/* //* Anonymous patient data */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#0f70f2",
          borderRadius: "6px",
          color: "#fff",
          margin: "0rem 0rem 1rem 0rem",
          padding: "0.6rem 1rem",
        }}
      >
        <Typography>
          رقم التردد :{" "}
          {anonymousPatientData && anonymousPatientData?.sequenceNumber}
        </Typography>
        <Typography>
          اسم المرافق :{" "}
          {anonymousPatientData?.companion
            ? (anonymousPatientData.companion.firstName ?? "") + " " +
              (anonymousPatientData.companion.secondName ?? "")
            : "لا يوجد"}
        </Typography>
        <Typography>
          رقم المريض : {anonymousPatientData && anonymousPatientData?.code}
        </Typography>
      </Box>
      {/* //* Start Patient form */}
      <Formik
        initialValues={ anonymousPatientData?.patient ? CompleteVisitEntity.handleNullFormValues(PersonEntity.handleFormValues(anonymousPatientData?.patient)) : PersonEntity.defaultValue()}
        onSubmit={(values) => {
          handlePatientSubmit(values);
        }}
        validationSchema={CompleteVisitEntity.getPatientSchema()}
      >
        {({ handleSubmit }) => (
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <PersonalData />
            <Button
              type="submit"
              sx={{ display: "none" }}
              ref={refSubmitPatient}
            ></Button>
          </Box>
        )}
      </Formik>
      <PrimaryButton
        title="تأكيــد"
        type="button"
        onClick={() => submitPatient()}
      />
    </CustomizedDialog>
  );
};

export default CompleteVisit;
