import CustomizedDialog from "@/core/shared/components/CustomizeDialog";
import Dialog from "@/core/shared/components/Dialog";
import PersonalData from "@/core/shared/components/PersonalData";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import PersonEntity from "@/core/shared/modules/person/domain/entities/person-entity";
import PersonInterface from "@/core/shared/modules/person/domain/interfaces/person-interface";
import CompleteVisitEntity from "@/modules/registration/domain/entities/complete-visit-entity";
import VisitEntity from "@/modules/registration/domain/entities/visit-entity";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Formik, FormikProps } from "formik";
import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface CompleteIncidentPropsInterface {
  isOpenDialog: boolean;
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>;
  incidentData: CompleteIncidentDataInterface[];
}

interface CompleteIncidentDataInterface {
  visitCode: string;
  patient: PersonInterface;
}

const CompleteIncident = ({
  isOpenDialog,
  setIsOpenDialog,
  incidentData,
}: CompleteIncidentPropsInterface) => {
  //* useState
  const [combinedValues, setCombinedValues] = useState<any>(); //* Total value ( submit object )
  const [selectedPatientData, setSelectedPatientData] = useState<PersonInterface>(); 
  const [selectedPatientVisitCode, setSelectedPatientVisitCode] = useState<string>("");

  const [totalPatientsList, setTotalPatientsList] = useState<CompleteIncidentDataInterface[]>([
    {
      visitCode: "256498",
      patient: {
        id: "1",
        firstName: "احمد",
        secondName: "طلعت",
        thirdName: "محمد",
        fourthName: "ابراهيم",
        SSN: "11111122235222",
        phone: "01211035528",
        gender: 1,
        governate: 1,
        birthDate: "2000-12-12",
        address: "حلولي",
        verificationMethod: 1,
      },
    },
    {
      visitCode: "262584",
      patient: {
        id: "2",
        firstName: "",
        secondName: "",
        thirdName: "",
        fourthName: "",
        SSN: "",
        phone: "",
        gender: 0,
        governate: 0,
        birthDate: "",
        address: "",
        verificationMethod: 0,
      },
    },
    {
      visitCode: "221478",
      patient: {
        id: "3",
        firstName: "نور",
        secondName: "فؤاد",
        thirdName: "",
        fourthName: "",
        SSN: "",
        phone: "",
        gender: 0,
        governate: 0,
        birthDate: "",
        address: "",
        verificationMethod: 0,
      },
    },
    {
      visitCode: "595855",
      patient: null,
    },
    {
      visitCode: "156498",
      patient: {
        id: "5",
        firstName: "احمد",
        secondName: "مروان",
        thirdName: "محمد",
        fourthName: "ابراهيم",
        SSN: "11111122235222",
        phone: "01211035528",
        gender: 2,
        governate: 2,
        birthDate: "2000-12-12",
        address: "حلولي",
        verificationMethod: 1,
      },
    },
    {
      visitCode: "285724",
      patient: {
        id: "6",
        firstName: "",
        secondName: "",
        thirdName: "",
        fourthName: "",
        SSN: "",
        phone: "",
        gender: 0,
        governate: 0,
        birthDate: "",
        address: "",
        verificationMethod: 1,
      },
    },
  ]);

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

  //* Formik refs
  const formikRefPatient = useRef<FormikProps<PersonInterface>>(null);

  //* Handle Patient Submit
  const handlePatientSubmit = (values: PersonInterface) => {
    patientData.current = values;
    setCombinedValues({ patient: values });
  };

  //* apply patient with visitcode ( switching between patients  )
  useEffect(() => {
    if (selectedPatientVisitCode) {
        const selectedPatient = totalPatientsList.find((patient) => patient.visitCode == selectedPatientVisitCode)
        setSelectedPatientData(selectedPatient?.patient)
    }
  }, [selectedPatientVisitCode]);

  //* apply initial patient with visitcode ( initial patient )
  useEffect(() => {
    const selectedPatient = totalPatientsList[0]
    setSelectedPatientVisitCode(selectedPatient.visitCode)
    setSelectedPatientData(selectedPatient?.patient)
  }, []);

  const arraySort = (array: any[]) => {
    let emptyArray = [];
    let NCArray = [];
    let CArray = [];

    let sortedArray = [];

    for (let i = 0; i < array.length; i++) {
      if (array[i].status === "empty") {
        emptyArray.push(array[i]);
      } else if (array[i].status === "notCompleted") {
        NCArray.push(array[i]);
      } else {
        CArray.push(array[i]);
      }
    }
    sortedArray = emptyArray.concat(NCArray, CArray);
    return sortedArray;
  };

  return (
    <CustomizedDialog
      open={true}
      setOpen={setIsOpenDialog}
      maxWidth={"lg"}
      title="استكمال بيانات الحادث"
    >
      {/* Additional data section ( Header data )   */}
      <Box
        sx={{
          backgroundColor: "primary.darker",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: ".5rem 2rem",
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
              &nbsp;{totalPatientsList.length}
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
            <Typography sx={{ fontWeight: "600" }}>&nbsp;حادث</Typography>
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
              &nbsp;محمد ابراهيم
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
            <Typography sx={{ fontWeight: "600" }}>&nbsp;س و م 23</Typography>
          </Grid>
        </Grid>
      </Box>

      {/*  Main Section  */}
      <Box sx={{ display: "flex", width: "100%", padding: "1rem" }}>
        {/* Right Section ( List of patients )  */}
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
          {totalPatientsList.map((patientEl: CompleteIncidentDataInterface) => (
            <Box
              key={patientEl.visitCode}
              id={patientEl.visitCode}
              sx={{
                display: "flex",
                padding: "1rem 2rem",
                alignItems: "center",
                justifyContent: "flex-start",
                transition: "0.2s ease-in-out",
                backgroundColor:
                patientEl.visitCode == selectedPatientVisitCode ? "primary.main" : "#dddddd99",
                color: patientEl.visitCode == selectedPatientVisitCode ? "white" : "black",
                borderRadius: "15px",
                marginBottom: "1rem",
                cursor: "pointer",
              }}
              onClick={() => setSelectedPatientVisitCode(patientEl.visitCode)}
            >
              {/* status indication */}
              {/* <Box
                sx={{
                  pointerEvents: "none",
                  borderRadius: "50%",
                  width: "1rem",
                  height: "1rem",
                  backgroundColor:
                  patientEl.status === "completed"
                      ? "success.main"
                      : patient.status === "notCompleted"
                      ? "warning.main"
                      : "error.main",
                  marginRight: "1rem",
                }}
              ></Box> */}

              {/* patient data */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  pointerEvents: "none",
                }}
              >
                <Typography sx={{ fontWeight: "600" }}>
                  {patientEl.patient.firstName ? patientEl.patient.firstName : "مريض"}{' '}
                  {patientEl.patient.secondName ? patientEl.patient.secondName : "جديد"}
                </Typography>
                <Typography>{patientEl.visitCode}</Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Left Section ( Update patient data form )  */}
        <Box sx={{ width: "75%", overflow: "scroll", padding: "2rem" }}>
          <Formik
            enableReinitialize
            innerRef={formikRefPatient}
            initialValues={ selectedPatientData ?? PersonEntity.defaultValue()}
            onSubmit={(values) => {
              console.log(values);
              handlePatientSubmit(values);
            }}
            validationSchema={CompleteVisitEntity.getPatientSchema()}
            key={selectedPatientVisitCode}
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

          {/* Submit Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "4rem",
              marginTop: "1.5rem",
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
