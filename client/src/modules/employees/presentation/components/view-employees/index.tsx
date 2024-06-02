import CustomDataTable from "@/core/shared/components/CustomDataTable/CustomDataTable";
import { DataItem, header } from "./data";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/core/state/store";
import { EmployeeState } from "../../controllers/types";
import EmployeeInterface from "@/modules/employees/domain/interfaces/employee-interface";
import { FilterQuery } from "@/core/api";
import { getEmployeeList } from "../../controllers/thunks/employee-thunks";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ConfirmationDialog from "@/core/shared/components/ConfirmationDialog";
import { deleteEmployee } from "@/modules/employees/presentation/controllers/thunks/employee-thunks";
import CustomizedDialog from "@/core/shared/components/CustomizeDialog";
import CreateUserForm from "../create-user-form/CreateUserForm";
import { LookupsState } from "@/core/shared/modules/lookups/presentation/controllers/types";
import {
  RoleTypeInterface,
  ShiftTypeInterface,
} from "@/core/shared/modules/lookups/domain/interfaces/lookups-interface";
import { getSubDepartmentsList } from "@/modules/management/presentation/controllers/thunks/sub-departments-thunks";

const EmployeesTable = () => {
  const dispatch = useAppDispatch();

  //* Get data from store
  const employeeState: EmployeeState = useAppSelector(
    (state: any) => state.employees
  );
  const lookupsState: LookupsState = useAppSelector(
    (state: any) => state.lookups
  );

  useEffect(() => {
    dispatch(getSubDepartmentsList([]));
  }, []);

  // useState
  const [showConfirmationDialog, setShowConfirmationDialog] =
    useState<boolean>(false);
  const [showEditEmployeeDialog, setShowEditEmployeeDialog] =
    useState<boolean>(false);
  const [employeeData, setEmployeeData] = useState<EmployeeInterface>();

  return (
    <Box
      sx={{
        pt: 3,
      }}
    >
      <CustomizedDialog
        maxWidth={"lg"}
        open={showEditEmployeeDialog}
        setOpen={setShowEditEmployeeDialog}
        title="تحديث بيانات موظف"
      >
        <CreateUserForm
          setShowEditEmployeeDialog={setShowEditEmployeeDialog}
          employeeData={employeeData}
        />
      </CustomizedDialog>
      <ConfirmationDialog
        confirmFunction={async () =>
          dispatch(deleteEmployee(String(employeeData?.id))).then(() => {
            setShowConfirmationDialog(false);
          })
        }
        contentMessage="في حالة حذف الموظف لن تستطيع العودة اليه مجددا, هل انت متأكد من حذف هذا الموظف؟"
        open={showConfirmationDialog}
        setOpen={setShowConfirmationDialog}
        title="حذف موظف"
      />
      <CustomDataTable
        fetchData={(filters: FilterQuery[]) => {
          console.log(filters);
          dispatch(getEmployeeList(filters));
        }}
        resetControls={employeeState.employees.isInitial}
        totalItems={employeeState.employees.total}
        data={employeeState.employees.items.map<DataItem>(
          (item: EmployeeInterface) => {
            return {
              SSN: item.person?.SSN ?? "لا يوجد",
              createdAt: item?.createdAt
                ? new Date(item?.createdAt).toLocaleDateString() +
                  " " +
                  new Date(item?.createdAt).toLocaleTimeString()
                : "لا يوجد",
              shiftName:
                lookupsState?.lookups?.shiftTypes?.find(
                  (el: ShiftTypeInterface) => el.id == item.shiftId
                )?.value ?? "لا يوجد",
              phone: item.person?.phone ?? "لا يوجد",
              roleName:
                lookupsState?.lookups?.roleTypes?.find(
                  (el: RoleTypeInterface) => el.id == item.roleId
                )?.value ?? "لا يوجد",
              name:
                item.person?.firstName +
                " " +
                item.person?.secondName +
                " " +
                item.person?.thirdName +
                " " +
                item.person?.fourthName,
              update: (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                    color: "primary.dark",
                  }}
                >
                  <EditRoundedIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setEmployeeData(item);
                      setShowEditEmployeeDialog(true);
                    }}
                  />
                  <DeleteRoundedIcon
                    sx={{ cursor: "pointer", color: "red" }}
                    onClick={() => {
                      setEmployeeData(item);
                      setShowConfirmationDialog(true);
                    }}
                  />
                </Box>
              ),
            };
          }
        )}
        headerItems={header}
      />
    </Box>
  );
};

export default EmployeesTable;
