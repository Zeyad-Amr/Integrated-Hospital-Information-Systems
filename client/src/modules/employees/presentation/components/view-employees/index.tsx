import CustomDataTable from "@/core/shared/components/CustomDataTable/CustomDataTable";
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
import { HeaderItem } from "@/core/shared/components/CustomDataTable";

export interface DataItem {
  SSN: string;
  name: string;
  phone: string;
  createdAt: string;
  roleName: string;
  shiftName: string;
}

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
  const header: HeaderItem[] = [
    {
      id: "SSN",
      key: "SSN",
      label: "رقم الهوية",
      minWidth: 50,
      maxWidth: 50,
      tableCellProps: { align: "center" },
      sortable: true,
      searchable: true,
      filterable: false,
    },
    {
      id: "name",
      key: "name",
      label: "الاسم",
      minWidth: 100,
      maxWidth: 100,
      tableCellProps: { align: "center" },
      sortable: true,
      searchable: true,
      filterable: false,
    },
    {
      id: "phone",
      key: "phone",
      label: "رقم الهاتف",
      minWidth: 50,
      maxWidth: 50,
      tableCellProps: { align: "center", style: { direction: "ltr" } },
      sortable: true,
      searchable: true,
      filterable: false,
    },

    {
      id: "createdAt",
      key: "createdAt",
      label: "التاريخ",
      minWidth: 100,
      maxWidth: 100,
      tableCellProps: { align: "center", style: { direction: "ltr" } },
      sortable: true,
      searchable: true,
      filterable: false,
    },

    {
      id: "roleName",
      key: "roleName",
      label: "الوظيفة",
      minWidth: 100,
      maxWidth: 100,
      tableCellProps: { align: "center", style: { direction: "ltr" } },
      sortable: true,
      searchable: false,
      filterable: true,
      filterOptions: lookupsState.lookups.roleTypes,
    },
    {
      id: "shiftName",
      key: "shiftName",
      label: "الوردية",
      minWidth: 100,
      maxWidth: 100,
      tableCellProps: { align: "center", style: { direction: "ltr" } },
      sortable: true,
      searchable: false,
      filterable: true,
      filterOptions: lookupsState.lookups.shiftTypes,
    },
    {
      id: "update",
      key: "update",
      label: "",
      isComponent: true,
      minWidth: 100,
      tableCellProps: { align: "right" },
      sortable: false,
      filterable: false,
      searchable: false,
      onClick: () => {},
    },
  ];

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
