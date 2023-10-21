import { ServiceKeys, sl } from "@/core/service-locator";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { BaseStaffDataSource } from "@/modules/staff/data/datasources/staff-datasource";
import TestPage from "@/core/shared/components/test";
import StaffModel from "@/modules/staff/data/models/staff-model";

const Test = () => {
  const router = useRouter();

  const staffDataSource = sl.get<BaseStaffDataSource>(
    ServiceKeys.StaffDataSource
  );

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

      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          const result = await staffDataSource.createStaffMember(
            new StaffModel({
              id: "",
              name: "Raouf",
              ssn: "30003106108893",
              email: "raouaaf@gmail.com",
              phone: "01098157733",
              role: "receptionist",
            })
          );

          result.fold(
            (error) => console.log(error),
            (success) => console.log(success)
          );
        }}
      >
        Create Staff
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          const result = await staffDataSource.getStaffMemberById(
            "63f41edd-0bba-401c-8d5a-4befda7b9476"
          );
          result.fold(
            (error) => console.log(error),
            (success) => console.log(success)
          );
        }}
      >
        Get Staff By Id
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          const result = await staffDataSource.getAllStaffMembers();
          result.fold(
            (error) => console.log(error),
            (success) => console.log(success)
          );
        }}
      >
        Get All Staff
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          const result = await staffDataSource.updateStaffMember(
            "63f41edd-0bba-401c-8d5a-4befda7b9476",
            new StaffModel({
              id: "63f41edd-0bba-401c-8d5a-4befda7b9476",
              name: "Raouf",
              ssn: "30003106108898",
              email: "raouf@gmail.com",
              phone: "01098157733",
              role: "receptionist",
            })
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
          const result = await staffDataSource.deleteStaffMember(
            "63f41edd-0bba-401c-8d5a-4befda7b9476"
          );
          result.fold(
            (error) => console.log(error),
            (success) => console.log(success)
          );
        }}
      >
        delete Staff
      </Button>
    </Box>
  );
};

export default Test;
