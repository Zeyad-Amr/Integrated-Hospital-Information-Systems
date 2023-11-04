import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import TestPage from "@/core/shared/components/test";
import { useAppDispatch, useAppSelector } from "@/core/redux/store";
import { StaffState } from "../controllers/types";
import {
  getStaffList,
  createStaff,
  updateStaff,
  deleteStaff,
  getStaffDetails,
} from "../controllers/thunks/staff-thunks";
import StaffEntity from "../../domain/entities/staff-entity";
const StaffTest = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const staffState: StaffState = useAppSelector((state: any) => state.staff);

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
      <TestPage label="Hello, My Team" />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        Go to Dashboard
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          dispatch(
            createStaff(
              new StaffEntity({
                id: "63f41edd-0bba-401c-8d5a-4befda7b9433",
                name: "Raouf",
                ssn: "30003106108898",
                email: "raouf@gmail.com",
                phone: "01098157733",
                role: "receptionist",
              })
            )
          );
        }}
      >
        Create Staff
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          dispatch(getStaffDetails("63f41edd-0bba-401c-8d5a-4befda7b9433"));
        }}
      >
        Get Staff By Id
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          dispatch(getStaffList());
        }}
      >
        Get All Staff
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          dispatch(
            updateStaff(
              new StaffEntity({
                id: "63f41edd-0bba-401c-8d5a-4befda7b9433",
                name: "Raouf",
                ssn: "30003106108899",
                email: "raouf@gmail.com",
                phone: "01098157733",
                role: "receptionist",
              })
            )
          );
        }}
      >
        update Staff
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          dispatch(deleteStaff("63f41edd-0bba-401c-8d5a-4befda7b9433"));
        }}
      >
        delete Staff
      </Button>
      <Typography>
        {staffState.loading ? (
          <div>Loading...</div>
        ) : (
          staffState.staffList.map((staff) => (
            <div key={staff.id}>{staff.name}</div>
          ))
        )}
      </Typography>
    </Box>
  );
};

export default StaffTest;
