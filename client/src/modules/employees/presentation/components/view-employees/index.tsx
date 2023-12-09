import CustomDataTable from "@/core/shared/components/CustomDataTable";
import { DataItem, header } from "./data";
import { Box } from "@mui/system";
import CompleteVisit from "../../../../visits/presentation/components/complete-visit-data/CompleteVisit";
import { useRef, useState } from "react";
import { useAppSelector } from "@/core/redux/store";
import { EmployeeState } from "../../controllers/types";
import EmployeeInterface from "@/modules/employees/domain/interfaces/employee-interface";

const EmployeesTable = () => {
  // const dispatch = useAppDispatch();

  const employeeState: EmployeeState = useAppSelector(
    (state: any) => state.employees
  );
  // useRef
  const refIdValue = useRef("");

  // useState
  const [showDialog, setShawDialog] = useState("none");

  //* data that in the state
  const apiData: EmployeeInterface[] = employeeState.employeeList;
  let tableData: DataItem[] = [];
  apiData.forEach((item: EmployeeInterface) => {
    tableData.push({
      SSN: item.person.SSN,
      email: item.auth.email ?? "",
      phone: item.person.phone ?? "",
      role: item.role.toLowerCase(),
      name:
        item.person?.firstName +
        " " +
        item.person?.secondName +
        " " +
        item.person?.thirdName +
        " " +
        item.person?.fourthName,
      // date: (item.createdAt).split('T')[0],
      // time: new Date(item.createdAt).toLocaleTimeString([], {
      //     hour: '2-digit',
      //     minute: '2-digit',
      //     second: '2-digit'
      // }),
      // update: <Button
      //     color="info"
      //     variant="outlined"
      //     fullWidth
      //     onClick={() => {
      //         refIdValue.current = item.code
      //         setShawDialog("block");
      //     }}
      // >استكمال بيانات</Button>
    });
  });

  return (
    <Box
      sx={{
        p: 3,
      }}
    >
      <CustomDataTable
        data={tableData}
        renderItem={header}
        stickyHeader={true}
        boxShadow={5}
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
