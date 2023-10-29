import { ServiceKeys, sl } from "@/core/service-locator";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import TestPage from "@/core/shared/components/test";
import StaffModel from "@/modules/staff/data/models/staff-model";
// usecases
import {
  CreateStaffMemberUseCase,
  DeleteStaffMemberUseCase,
  GetAllStaffMembersUseCase,
  GetStaffDetailsUseCase,
  UpdateStaffMemberUseCase,
  CreateStaffMemberUseCaseParameters,
  DeleteStaffMemberUseCaseParameters,
  GetStaffDetailsUseCaseParameters,
  UpdateStaffMemberUseCaseParameters,
} from "@/modules/staff/domain/usecases/index";
const Test = () => {
  const router = useRouter();

  const CreateStaffMemberUseCase = sl.get<CreateStaffMemberUseCase>(
    ServiceKeys.CreateStaffMemberUseCase
  );
  const DeleteStaffMemberUseCase = sl.get<DeleteStaffMemberUseCase>(
    ServiceKeys.DeleteStaffMemberUseCase
  );
  const GetStaffListUseCase = sl.get<GetAllStaffMembersUseCase>(
    ServiceKeys.GetStaffListUseCase
  );
  const GetStaffDetailsUseCase = sl.get<GetStaffDetailsUseCase>(
    ServiceKeys.GetStaffDetailsUseCase
  );
  const UpdateStaffMemberUseCase = sl.get<UpdateStaffMemberUseCase>(
    ServiceKeys.UpdateStaffMemberUseCase
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
      </Button>
      <Button
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
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          const result = await GetStaffListUseCase.call();
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
      </Button>
    </Box>
  );
};

export default Test;
