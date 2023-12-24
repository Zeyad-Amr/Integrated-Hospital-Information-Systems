import CustomDataTable from "@/core/shared/components/CustomDataTable";
import { DataItem, header } from "./data";
import { Box } from "@mui/system";
import CompleteVisit from "../../../../visits/presentation/components/complete-visit-data/CompleteVisit";
import { useRef, useState } from "react";
import { useAppSelector } from "@/core/redux/store";
import { EmployeeState } from "../../controllers/types";
import EmployeeInterface from "@/modules/employees/domain/interfaces/employee-interface";
import { Typography } from "@mui/material";

const EmployeesTable = () => {
  // const dispatch = useAppDispatch();

  const employeeState: EmployeeState = useAppSelector(
    (state: any) => state.employees
  );
  // useRef
  const refIdValue = useRef("");

  // useState
  const [showDialog, setShawDialog] = useState("none");

  return (
    <Box
      sx={{
        p: 3,
      }}
    >
      {employeeState.loading ? (
        <Box
          sx={{
            p: 3,
          }}
        >
          <Typography variant="h6" align="center">
            Loading...
          </Typography>
        </Box>
      ) : (
        <CustomDataTable
          data={employeeState.employeeList.map<DataItem>(
            (item: EmployeeInterface) => {
              return {
                SSN: item.person?.SSN ?? "",
                email: item.auth?.email ?? "",
                phone: item.person?.phone ?? "",
                role: item.role?.label.toLowerCase() ?? "",
                name:
                  item.person?.firstName +
                  " " +
                  item.person?.secondName +
                  " " +
                  item.person?.thirdName +
                  " " +
                  item.person?.fourthName,
              };
            }
          )}
          renderItem={header}
          stickyHeader={true}
          boxShadow={5}
        />
      )}
      <CompleteVisit
        display={showDialog}
        DialogStateController={setShawDialog}
        id={refIdValue.current}
      />
    </Box>
  );
};

export default EmployeesTable;
