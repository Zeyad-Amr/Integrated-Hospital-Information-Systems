import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/core/state/store";
import { VisitsState } from "../../controllers/types";
import {
  createVisit,
  // createVisit,
  // updateVisit,
  getAnonymousVisits,
  getVisitByCode,
  updateVisit,
} from "../../controllers/thunks/visits-thunks";

const VisitsTest = () => {
  const dispatch = useAppDispatch();
  const visitsState: VisitsState = useAppSelector((state: any) => state.visits);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        height: "100vh",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          dispatch(
            createVisit({
              sequenceNumber: 12,
              kinship: "BROTHER",
              createdAt: new Date(),
              updatedAt: new Date(),
              patient: {
                firstName: "Ahmed",
                secondName: "Mohamed",
                thirdName: "AbdELRaouf",
                fourthName: "Mohamed",
                SSN: "30002103101556",
                verificationMethod: "NATIONALIDCARD",
                gender: "MALE",
                birthDate: new Date(),
                phone: "+201067162458",
                email: "ahmed821@gmail.com",
                governate: "Giza",
                address: "Fasil",
              },
              companion: {
                firstName: "Ahmed",
                secondName: "Mohamed",
                thirdName: "AbdELRaouf",
                fourthName: "Mohamed",
                SSN: "30002103105556",
                verificationMethod: "NATIONALIDCARD",
                gender: "MALE",
                birthDate: new Date(),
                phone: "+201067662458",
                email: "ahmed82@gmail.com",
                governate: "Giza",
                address: "Fasil",
              },
            })
          );
        }}
      >
        Create Visit
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          dispatch(getVisitByCode("202311271"));
        }}
      >
        Get Visit By Code
      </Button>
      <Typography>
        {visitsState.loading
          ? "Loading..."
          : visitsState.currentVisit.sequenceNumber}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          dispatch(getAnonymousVisits());
        }}
      >
        Get Anonymous Visits
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          dispatch(
            updateVisit({
              code: "202311271",
              sequenceNumber: 13,
              kinship: "BROTHER",
              createdAt: new Date(),
              updatedAt: new Date(),
              patient: {
                firstName: "Ahmed",
                secondName: "Mohamed",
                thirdName: "AbdELRaouf",
                fourthName: "Mohamed",
                SSN: "30002103101556",
                verificationMethod: "NATIONALIDCARD",
                gender: "MALE",
                birthDate: new Date(),
                phone: "+201067162458",
                email: "ahmed821@gmail.com",
                governate: "Giza",
                address: "Fasil",
              },
              companion: {
                firstName: "Ahmed",
                secondName: "Mohamed",
                thirdName: "AbdELRaouf",
                fourthName: "Mohamed",
                SSN: "30002103105556",
                verificationMethod: "NATIONALIDCARD",
                gender: "MALE",
                birthDate: new Date(),
                phone: "+201067662458",
                email: "ahmed82@gmail.com",
                governate: "Giza",
                address: "Fasil",
              },
            })
          );
        }}
      >
        update Visits
      </Button>

      <Typography>
        {visitsState.loading
          ? "Loading..."
          : visitsState.error.length > 0
            ? visitsState.error
            : visitsState.visits.length > 0
              ? visitsState.visits.map((v) => <div key={v.code}>{v.code}</div>)
              : "No Data"}
      </Typography>
    </Box>
  );
};

export default VisitsTest;
