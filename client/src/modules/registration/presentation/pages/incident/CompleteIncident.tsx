import CustomizedDialog from "@/core/shared/components/CustomizeDialog";
import PersonalData from "@/core/shared/components/PersonalData";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import PersonEntity from "@/core/shared/modules/person/domain/entities/person-entity";
import PersonInterface from "@/core/shared/modules/person/domain/interfaces/person-interface";
import { useAppDispatch } from "@/core/state/store";
import CompleteVisitEntity from "@/modules/registration/domain/entities/complete-visit-entity";
import IncidentInterface from "@/modules/registration/domain/interfaces/incident-interface";
import VisitInterface from "@/modules/registration/domain/interfaces/visit-interface";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Formik, FormikProps } from "formik";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { updateIncidentPatient } from "../../controllers/thunks/incident-thunk";

interface CompleteIncidentPropsInterface {
  isOpenDialog: boolean;
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>;
  incidentData: IncidentInterface;
}

const CompleteIncident = ({
  isOpenDialog,
  setIsOpenDialog,
  incidentData,
}: CompleteIncidentPropsInterface) => {
  const dispatch = useAppDispatch();

  //* useState
  const [combinedValues, setCombinedValues] = useState<{
    visitCode: string;
    patient: PersonInterface;
  }>(); //* Total value (submit object)
  const [selectedPatientVisitCode, setSelectedPatientVisitCode] =
    useState<string>("");
  const [incidentDataState, setIncidentDataState] = useState<IncidentInterface>();

  //* buttons useRef
  const refSubmitPatient: any = useRef(null);

  //* Form data reference
  const patientData = useRef<PersonInterface>();

  //* Submit functions
  const submitPatient = () => {
    if (refSubmitPatient.current) {
      refSubmitPatient.current.click();
    }
  };

  //* Formik refs
  const formikRefPatient = useRef<FormikProps<PersonInterface>>(null);

  //* Handle Patient Submit
  const handlePatientSubmit = (values: PersonInterface) => {
    patientData.current = values;
    setCombinedValues({
      patient: values,
      visitCode: selectedPatientVisitCode,
    });
  };

  //* Apply patient with visit code
  useEffect(() => {
    const applyPatientData = (visitCode: string) => {
      const selectedVisit = incidentDataState?.visits?.find(
        (visit) => visit.code === visitCode
      );
      const selectedPatientData = getProcessedPatientData(selectedVisit);
      if (selectedPatientData && formikRefPatient.current) {
        formikRefPatient.current.setValues(selectedPatientData);
      }
    };

    if (incidentDataState && incidentDataState.visits) {
      if (!selectedPatientVisitCode) {
        const initialVisit = sortingTotalVisits(incidentDataState.visits)[0];
        if (initialVisit?.code) {
          setSelectedPatientVisitCode(initialVisit.code);
          applyPatientData(initialVisit.code);
        }
      } else {
        applyPatientData(selectedPatientVisitCode);
      }
    }
  }, [selectedPatientVisitCode, incidentDataState]);

 //* set props values to manage in state  
  useEffect(() => {
    setIncidentDataState(incidentData)
  }, [incidentData])
  

  //* convert null and undefiend values in patient object to main values
  const getProcessedPatientData = (visit?: VisitInterface): PersonInterface => {
    if (visit && visit?.patient) {
      return PersonEntity.handleFormValues(visit.patient)
    }
    return PersonEntity.handleFormValues({});
  };

  //* Dispatch Update visit
  useEffect(() => {
    if (patientData.current && combinedValues) {
      dispatch(updateIncidentPatient(combinedValues)).then((res) => {
        if (res.meta.requestStatus == "fulfilled") {
          setIncidentDataState((prevState) => {
            if (!prevState) return prevState;
            const updatedVisits = prevState.visits?.map((visit) => {
              if (visit.code == selectedPatientVisitCode) {
                return { ...visit, patient: patientData.current };
              }
              return visit;
            });
            return { ...prevState, visits: updatedVisits };
          });
          
          patientData.current = undefined;

        }
      });
    }
  }, [combinedValues, dispatch]);

  const sortingTotalVisits = (array: VisitInterface[]) => {
    const sortedArray = [...array];

    // Sort the array based on the patient's data existence
    return sortedArray.sort((a, b) => {
      // Check if patient data is null
      const aIsNull = a.patient === null || a.patient === undefined;
      const bIsNull = b.patient === null || b.patient === undefined;

      // Patients with not null data come first
      if (aIsNull && !bIsNull) return 1;
      if (!aIsNull && bIsNull) return -1;

      // Otherwise, maintain the original order
      return 0;
    });
  };

  return (
    <CustomizedDialog
      open={isOpenDialog}
      setOpen={setIsOpenDialog}
      maxWidth={"lg"}
      title="استكمال بيانات الحادث"
    >
      {/* Additional data section (Header data) */}
      <Box
        sx={{
          backgroundColor: "primary.darker",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: ".5rem 2rem",
          borderRadius: "10px",
          marginTop: "-0.3rem",
        }}
      >
        <Grid
          container
          sx={{ color: "white", padding: "0.5rem", alignItems: "center" }}
        >
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Typography>عدد المرضى :</Typography>
            <Typography sx={{ fontWeight: "600" }}>
              {incidentDataState?.numberOfVisits}
            </Typography>
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Typography>قادم من :</Typography>
            <Typography sx={{ fontWeight: "600" }}>
              {incidentDataState?.additionalInfo?.comeFrom ?? "لا يوجد"}
            </Typography>
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Typography>المسعف :</Typography>
            <Typography sx={{ fontWeight: "600" }}>
              {incidentDataState?.additionalInfo?.attendantName ?? "لا يوجد"}
            </Typography>
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Typography>سيارة الاسعاف :</Typography>
            <Typography sx={{ fontWeight: "600" }}>
              {incidentDataState?.additionalInfo?.carNum &&
              incidentDataState?.additionalInfo?.firstChar &&
              incidentDataState?.additionalInfo?.secondChar &&
              incidentDataState?.additionalInfo?.thirdChar
                ? 
                  incidentDataState?.additionalInfo?.firstChar +
                  " " +
                  incidentDataState?.additionalInfo?.secondChar +
                  " " +
                  incidentDataState?.additionalInfo?.thirdChar +
                  " " +
                  incidentDataState?.additionalInfo?.carNum
                : "لا يوجد"}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Main Section */}
      <Box sx={{ display: "flex", width: "100%", padding: "1rem" }}>
        {/* Right Section (List of patients) */}
        <Box
          sx={{
            backgroundColor: "#eee",
            width: "25%",
            borderRadius: "15px",
            padding: "1rem",
            height: "64vh",
            overflowY: "scroll",
          }}
        >
          {incidentDataState?.visits &&
            sortingTotalVisits(incidentDataState.visits).map((visit) => (
              <Box
                key={visit.code}
                id={visit.code}
                sx={{
                  display: "flex",
                  padding: "1rem 2rem",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  transition: "0.2s ease-in-out",
                  backgroundColor:
                    visit.code == selectedPatientVisitCode
                      ? "primary.main"
                      : "#dddddd99",
                  color:
                    visit.code == selectedPatientVisitCode ? "white" : "black",
                  borderRadius: "15px",
                  marginBottom: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (visit.code) {
                    setSelectedPatientVisitCode(visit.code);
                  }
                }}
              >
                {/* status indication */}
                <Box
                  sx={{
                    pointerEvents: "none",
                    borderRadius: "50%",
                    width: "1rem",
                    height: "1rem",
                    backgroundColor:
                      visit.patient === null || visit.patient === undefined
                        ? "error.main" : visit.patient.SSN ? "success.main"
                        : "warning.main",
                    marginRight: "1rem",
                  }}
                ></Box>

                {/* patient data */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    pointerEvents: "none",
                  }}
                >
                  <Typography sx={{ fontWeight: "600" }}>
                    {visit.patient?.firstName && visit.patient?.secondName
                      ? `${visit.patient.firstName} ${visit.patient.secondName}`
                      : visit.patient?.firstName
                      ? visit.patient.firstName
                      : "مريض جديد"}{" "}
                  </Typography>
                  <Typography>{visit?.code}</Typography>
                </Box>
              </Box>
            ))}
        </Box>

        {/* Left Section (Update patient data form) */}
        <Box
          sx={{
            width: "75%",
            overflowY: "scroll",
            padding: "2rem 2rem 0rem 2rem",
          }}
        >
          {PersonEntity && (
            <Formik
              enableReinitialize
              innerRef={formikRefPatient}
              initialValues={PersonEntity.defaultValue()}
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
          )}
          {/* Submit Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "4rem",
            }}
          >
            <PrimaryButton
              title="تأكيــد"
              type="button"
              onClick={() => submitPatient()}
            />
          </Box>
        </Box>
      </Box>
    </CustomizedDialog>
  );
};

export default CompleteIncident;
