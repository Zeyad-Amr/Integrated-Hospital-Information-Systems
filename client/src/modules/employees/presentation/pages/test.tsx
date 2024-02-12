import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/core/state/store";
import { EmployeeState } from "../controllers/types";
import {
  getEmployeeList,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeDetails,
} from "../controllers/thunks/employee-thunks";
import UserEntity from "@/modules/auth/domain/entities/user-entity";
const EmployeeTest = () => {
  const dispatch = useAppDispatch();
  const employeeState: EmployeeState = useAppSelector(
    (state: any) => state.employees
  );

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
            createEmployee({
              id: "831b1c69-d5e2-4c86-8087-340e24a92b08",

              createdAt: new Date(),
              updatedAt: new Date(),
              person: UserEntity.defaultValue(),
              auth: {
                username: "user123",
                password: "User123",
              },
            })
          );
        }}
      >
        Create Employee
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          dispatch(getEmployeeDetails("63f41edd-0bba-401c-8d5a-4befda7b9433"));
        }}
      >
        Get Employee By Id
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          dispatch(getEmployeeList());
        }}
      >
        Get All Employee
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          dispatch(
            updateEmployee({
              id: "",

              createdAt: new Date(),
              updatedAt: new Date(),
              person: UserEntity.defaultValue(),
              auth: {
                username: "user123",
                password: "User123",
              },
            })
          );
        }}
      >
        update Employee
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          dispatch(deleteEmployee("63f41edd-0bba-401c-8d5a-4befda7b9433"));
        }}
      >
        delete Employee
      </Button>
      <Typography>
        {employeeState.loading
          ? "Loading..."
          : employeeState.error.length > 0
            ? employeeState.error
            : employeeState.employeeList.length > 0
              ? employeeState.employeeList.map((employee) => (
                  <div key={employee.id}>{employee.id}</div>
                ))
              : "No Data"}
      </Typography>
    </Box>
  );
};

export default EmployeeTest;
