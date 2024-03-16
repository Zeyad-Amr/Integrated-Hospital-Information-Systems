import CustomDataTable from "@/core/shared/components/CustomDataTable/CustomDataTable";
import { DataItem, header } from "./data";
import { Box } from "@mui/system";
import CompleteVisit from "../../../../registration/presentation/components/visit/complete-visit-data/CompleteVisit";
import { useRef, useState } from "react";
import { useAppSelector } from "@/core/state/store";
import { EmployeeState } from "../../controllers/types";
import EmployeeInterface from "@/modules/employees/domain/interfaces/employee-interface";
import { Typography } from "@mui/material";
import { FilterQueryParam } from "@/core/api";

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
          applyFilters={(filters: FilterQueryParam[]) => {
            console.log(filters);
          }}
          data={employeeState.employeeList.map<DataItem>(
            (item: EmployeeInterface) => {
              return {
                SSN: item.person?.SSN ?? "",
                email: item.auth?.email ?? "",
                phone: item.person?.phone ?? "",
                role: item.role?.value.toLowerCase() ?? "",
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
          width="100%"
          height="100%"
          boxShadow={10}
          sx={{ mb: 5 }}
          onRowClick={(item) => console.log(item)}
          headerItems={header}
          stickyHeader={true}
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
