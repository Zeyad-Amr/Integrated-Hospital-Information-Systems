import Dialog from "@/core/shared/components/Dialog";
import PersonalData, {
  PersonalDataValues,
} from "@/core/shared/components/PersonalData";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";

interface incidentData {
  id: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  forthName: string;
  email: string;
  SSN: string;
  phone: string;
  gender: string;
  governate: string;
  birthDate: string;
  address: string;
  verificationMethod: string;
  status: string;
}

const CompleteIncident = (props: any) => {
  console.log(props.id)
  const [intialValues, setIntialValues] = useState<incidentData>({
    id: "",
    firstName: "",
    secondName: "",
    thirdName: "",
    forthName: "",
    email: "",
    SSN: "",
    phone: "",
    gender: "",
    governate: "",
    birthDate: "",
    address: "",
    verificationMethod: "",
    status: "",
  });

  const [submitFlag, setSubmitFlag] = useState<boolean>(false);

  const handlePersonSubmission = (values: PersonalDataValues) => {
    console.log(selectedId);
    console.log({
      id: selectedId,
      data: values,
    });
  };

  const [patients, setPatients] = useState<incidentData[]>([
    {
      id: "1",
      firstName: "احمد",
      secondName: "طلعت",
      thirdName: "محمد",
      forthName: "ابراهيم",
      email: "mail@mail.com",
      SSN: "11111122235222",
      phone: "01211035528",
      gender: "1",
      governate: "1",
      birthDate: "2000-12-12",
      address: "حلولي",
      verificationMethod: "1",
      status: "completed",
    },
    {
      id: "2",
      firstName: "",
      secondName: "",
      thirdName: "",
      forthName: "",
      email: "",
      SSN: "",
      phone: "",
      gender: "",
      governate: "",
      birthDate: "",
      address: "",
      verificationMethod: "",
      status: "empty",
    },
    {
      id: "3",
      firstName: "نور",
      secondName: "فؤاد",
      thirdName: "",
      forthName: "",
      email: "",
      SSN: "",
      phone: "",
      gender: "",
      governate: "",
      birthDate: "",
      address: "",
      verificationMethod: "",
      status: "notCompleted",
    },
    {
      id: "4",
      firstName: "",
      secondName: "",
      thirdName: "",
      forthName: "",
      email: "",
      SSN: "",
      phone: "",
      gender: "",
      governate: "",
      birthDate: "",
      address: "",
      verificationMethod: "",
      status: "empty",
    },
    {
      id: "5",
      firstName: "احمد",
      secondName: "مروان",
      thirdName: "محمد",
      forthName: "ابراهيم",
      email: "mail@mail.com",
      SSN: "11111122235222",
      phone: "01211035528",
      gender: "1",
      governate: "1",
      birthDate: "2000-12-12",
      address: "حلولي",
      verificationMethod: "1",
      status: "completed",
    },
    {
      id: "6",
      firstName: "",
      secondName: "",
      thirdName: "",
      forthName: "",
      email: "",
      SSN: "",
      phone: "",
      gender: "",
      governate: "",
      birthDate: "",
      address: "",
      verificationMethod: "",
      status: "empty",
    },
    {
      id: "7",
      firstName: "هاني",
      secondName: "نسيم",
      thirdName: "",
      forthName: "",
      email: "",
      SSN: "",
      phone: "",
      gender: "",
      governate: "",
      birthDate: "",
      address: "",
      verificationMethod: "",
      status: "notCompleted",
    },
  ]);

  const [selectedId, setSelectedId] = useState<string>("");

  const checkFirstRender = useRef(true);
  const checkFirstRender2 = useRef(true);
  useEffect(() => {
    if (checkFirstRender.current) {
      checkFirstRender.current = false;
    } else if (checkFirstRender2.current) {
      checkFirstRender2.current = false;
    } else {
      setIntialValues(patients[parseInt(selectedId) - 1]);
    }
  }, [intialValues, patients, selectedId]);

  interface patientData {
    firstName: string;
    secondName: string;
    thirdName: string;
    forthName: string;
    email: string;
    SSN: string;
    phone: string;
    gender: string;
    governate: string;
    birthDate: null | string;
    address: string;
    verificationMethod: string;
    status: string;
  }

  const arraySort = (array: patientData[]) => {
    let emptyArray: patientData[] = [];
    let NCArray: patientData[] = [];
    let CArray: patientData[] = [];

    let sortedArray: patientData[] = [];

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
    <Dialog
      display={props.display}
      DialogStateController={props.DialogStateController}
      title="استكمال بيانات الحادث"
    >
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
              &nbsp;{patients.length}
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
      <Box
        sx={{ display: "flex", width: "100%", height: "80%", padding: "1rem" }}
      >
        <Box
          sx={{
            backgroundColor: "#eee",
            width: "25%",
            height: "100%",
            borderRadius: "15px",
            padding: "1rem",
            overflow: "auto",
          }}
        >
          {arraySort(patients).map((patient: any) => (
            <Box
              key={patient.id}
              id={patient.id}
              sx={{
                display: "flex",
                padding: "1rem 2rem",
                alignItems: "center",
                justifyContent: "flex-start",
                transition: "0.2s ease-in-out",
                backgroundColor:
                  patient.id === selectedId ? "primary.main" : "#dddddd99",
                color: patient.id === selectedId ? "white" : "black",
                borderRadius: "15px",
                marginBottom: "1rem",
                cursor: "pointer",
              }}
              onClick={(e: any) => setSelectedId(e.target.id)}
            >
              <Box
                sx={{
                  pointerEvents: "none",
                  borderRadius: "50%",
                  width: "1rem",
                  height: "1rem",
                  backgroundColor:
                    patient.status === "completed"
                      ? "success.main"
                      : patient.status === "notCompleted"
                        ? "warning.main"
                        : "error.main",
                  marginRight: "1rem",
                }}
              ></Box>
              <Typography sx={{ pointerEvents: "none" }}>
                {patient.firstName ? patient.firstName : "مريض"}&nbsp;
                {patient.secondName ? patient.secondName : "جديد"}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ width: "75%", overflow: "scroll", padding: "2rem" }}>
          <PersonalData
            initialValues={intialValues}
            onSubmit={handlePersonSubmission}
            isSubmitted={submitFlag}
          />
          <PrimaryButton title="حفــظ" onClick={setSubmitFlag} />
        </Box>
      </Box>
    </Dialog>
  );
};

export default CompleteIncident;
