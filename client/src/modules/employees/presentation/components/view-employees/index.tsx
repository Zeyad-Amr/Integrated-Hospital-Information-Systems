import CustomDataTable from "@/core/shared/components/CustomDataTable/CustomDataTable";
import { DataItem, header } from "./data";
import { Box } from "@mui/system";
import CompleteVisit from "../../../../registration/presentation/components/visit/complete-visit-data/CompleteVisit";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/core/state/store";
import { EmployeeState } from "../../controllers/types";
import EmployeeInterface from "@/modules/employees/domain/interfaces/employee-interface";
import { FilterQuery } from "@/core/api";
import { getEmployeeList } from "../../controllers/thunks/employee-thunks";

const EmployeesTable = () => {
  const dispatch = useAppDispatch();

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
      <CustomDataTable
        fetchData={(filters: FilterQuery[]) => {
          console.log(filters);
          dispatch(getEmployeeList(filters));
        }}
        totalItems={employeeState.employeeList.length}
        data={employeeState.employeeList.map<DataItem>(
          (item: EmployeeInterface) => {
            return {
              SSN: item.person?.SSN ?? "لا يوجد",
              createdAt: item?.createdAt
                ? new Date(item?.createdAt).toLocaleDateString() +
                  " " +
                  new Date(item?.createdAt).toLocaleTimeString()
                : "لا يوجد",
              shift: item.shift?.value ?? "لا يوجد",
              phone: item.person?.phone ?? "لا يوجد",
              role: item.role?.value ?? "لا يوجد",
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
        headerItems={header}
        stickyHeader={true}
        boxShadow={5}
        width="100%"
        height="80vh"
        sx={{ mb: 5 }}
        onRowClick={(item: any) => console.log(item)}
      />

      <CompleteVisit
        display={showDialog}
        DialogStateController={setShawDialog}
        id={refIdValue.current}
      />
    </Box>
  );
};

export default EmployeesTable;
