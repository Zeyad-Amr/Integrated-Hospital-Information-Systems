import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/core/redux/store";
import { EmployeeState } from "../controllers/types";
import {
  getEmployeeList,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeDetails,
} from "../controllers/thunks/employee-thunks";
import EmployeeEntity from "../../domain/entities/employee-entity";
import AuthDataEntity from "@/modules/auth/domain/entities/auth-data-entity";
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
              data: new EmployeeEntity({
                id: "831b1c69-d5e2-4c86-8087-340e24a92b08",
                role: "ADMIN",
                createdAt: new Date(),
                updatedAt: new Date(),

                createdById: null,
                person: {
                  id: "4d11eb35-4dd0-4830-b705-0c7aefecf644",
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
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              }),
              authData: new AuthDataEntity({
                username: "user123",
                password: "User123",
              }),
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
              data: new EmployeeEntity({
                id: "",
                role: "ADMIN",
                createdAt: new Date(),
                updatedAt: new Date(),

                createdById: null,
                person: {
                  id: "4d11eb35-4dd0-4830-b705-0c7aefecf644",
                  firstName: "Ahmed44",
                  secondName: "Mohamed",
                  thirdName: "AbdELRaouf",
                  fourthName: "Mohamed",
                  SSN: "30002103105556",
                  verificationMethod: "NATIONALIDCARD",
                  gender: "MALE",
                  birthDate: new Date(),
                  phone: "+201067662458",
                  email: "ahmed844442@gmail.com",
                  governate: "Giza",
                  address: "Fasil",
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              }),
              authData: new AuthDataEntity({
                username: "user123",
                password: "user123",
              }),
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
