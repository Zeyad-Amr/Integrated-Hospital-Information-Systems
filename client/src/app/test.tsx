import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import TestPage from "@/core/shared/components/test";
// import { sl, ServiceKeys } from "@/core/service-locator";
import { useAppDispatch, useAppSelector } from "@/core/redux/store";
import { StaffState } from "../modules/staff/presentation/controllers/types";
import { getStaffList } from "../modules/staff/presentation/controllers/thunks/staff-thunks";
const Test = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const staffState: StaffState = useAppSelector((state: any) => state.staff);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
      {/* <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          const result = await CreateStaffMemberUseCase.call(
            new CreateStaffMemberUseCaseParameters(
              new StaffModel({
                id: "",
                name: "Raouf",
                ssn: "30003106108890",
                email: "raouaaf0@gmail.com",
                phone: "01098157730",
                role: "receptionist",
              })
            )
          );

          result.fold(
            (error) => console.log(error),
            (success) => console.log(success)
          );
        }}
      >
        Create Staff
      </Button> */}
      {/* <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          const result = await GetStaffDetailsUseCase.call(
            new GetStaffDetailsUseCaseParameters(
              "63f41edd-0bba-401c-8d5a-4befda7b9476"
            )
          );
          result.fold(
            (error) => console.log(error),
            (success) => console.log(success)
          );
        }}
      >
        Get Staff By Id
      </Button> */}
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          dispatch(getStaffList());
        }}
      >
        Get All Staff
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
      {/* <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          const result = await UpdateStaffMemberUseCase.call(
            new UpdateStaffMemberUseCaseParameters(
              new StaffModel({
                id: "63f41edd-0bba-401c-8d5a-4befda7b9476",
                name: "Raouf",
                ssn: "30003106108898",
                email: "raouf@gmail.com",
                phone: "01098157733",
                role: "receptionist",
              })
            )
          );
          result.fold(
            (error) => console.log(error),
            (success) => console.log(success)
          );
        }}
      >
        update Staff
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          const result = await DeleteStaffMemberUseCase.call(
            new DeleteStaffMemberUseCaseParameters("")
          );
          result.fold(
            (error) => console.log(error),
            (success) => console.log(success)
          );
        }}
      >
        delete Staff
      </Button> */}
    </Box>
  );
};

export default Test;
