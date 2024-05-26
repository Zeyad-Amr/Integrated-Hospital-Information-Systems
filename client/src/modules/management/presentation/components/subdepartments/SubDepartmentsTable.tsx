import {
  CustomDataTable,
  HeaderItem,
} from "@/core/shared/components/CustomDataTable";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import SubDepartmentsForm from "./SubDepartmentsForm";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import {
  getSubDepartmentsList,
  deleteSubDepartment,
} from "@/modules/management/presentation/controllers/thunks/sub-departments-thunks";
import { getRoomList } from "@/modules/management/presentation/controllers/thunks/room-thunks";
import { getSpecializationList } from "@/modules/management/presentation/controllers/thunks/specialization-thunks";
import { getRolesList } from "@/modules/management/presentation/controllers/thunks/roles-thunks";
import { useAppDispatch, useAppSelector } from "@/core/state/store";
import {
  DepartmentsState,
  RoomState,
  SpecializationState,
  SubDepartmentsState,
} from "../../controllers/types";
import { SubDepartmentsInterface } from "@/modules/management/domain/interfaces/sub-departments-interface";
import { getDepartmentsList } from "@/modules/management/presentation/controllers/thunks/departments-thunks";
import PermissionsForm from "./PermissionsForm";
import CustomizedDialog from "@/core/shared/components/CustomizeDialog";
import { getPermissionsList } from "../../controllers/thunks/permissions-thunks";
import { getFeaturesList } from "../../controllers/thunks/features-thunks";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import ConfirmationDialog from "@/core/shared/components/ConfirmationDialog";
import { FilterQuery } from "@/core/api";

const SubDepartmentsTableHeader: HeaderItem[] = [
  {
    id: "name",
    label: "الأســـم",
    minWidth: 50,
    maxWidth: 50,
    tableCellProps: { align: "right" },
    sortable: true,
    filterable: false,
    searchable: true,
    onClick: () => {},
  },
  {
    id: "department",
    label: "القســـم",
    minWidth: 50,
    maxWidth: 50,
    tableCellProps: { align: "right" },
    sortable: true,
    filterable: false,
    searchable: true,
    onClick: () => {},
  },
  {
    id: "room",
    label: "الغـــرفة",
    minWidth: 50,
    maxWidth: 50,
    tableCellProps: { align: "right" },
    sortable: false,
    filterable: false,
    searchable: false,
    onClick: () => {},
  },
  {
    id: "specialization",
    label: "التخصص",
    minWidth: 50,
    maxWidth: 50,
    tableCellProps: { align: "right" },
    sortable: false,
    filterable: false,
    searchable: false,
    onClick: () => {},
  },
  {
    id: "update",
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

const SubDepartmentsTable = () => {
  // use state
  const [showSubDepartmentForm, setshowSubDepartmentForm] =
    useState<boolean>(false);
  const [isEditSubDepartmentForm, setIsEditSubDepartmentForm] =
    useState<boolean>(false);
  const [showPermissionsForm, setShowPermissionsForm] = useState(false);
  const [subDepartmentData, setSubDepartmentData] =
    useState<SubDepartmentsInterface>();
  const [showConfirmationDialog, setShowConfirmationDialog] =
    useState<boolean>(false);

  // get data from store
  const subDepartmentsState: SubDepartmentsState = useAppSelector(
    (state: any) => state.subDepartments
  );
  const roomsState: RoomState = useAppSelector((state: any) => state.rooms);
  const specializationsState: SpecializationState = useAppSelector(
    (state: any) => state.specializations
  );
  const departmentsState: DepartmentsState = useAppSelector(
    (state: any) => state.departments
  );
  const dispatch = useAppDispatch();

  // get all lookups for subdepartments, departments, rooms, roles, specializations, permissions and features
  useEffect(() => {
    dispatch(getRoomList([]));
    dispatch(getSpecializationList([]));
    dispatch(getRolesList());
    dispatch(getPermissionsList());
    dispatch(getFeaturesList());
    dispatch(getDepartmentsList());
  }, []);

  // function to get name value of item using its id
  const getNameOfItemWithItsId = (id: string | number, listOfSearch: any) => {
    const targetEl = listOfSearch?.find((el: any) => el.id == id);
    return targetEl?.name ?? "";
  };

  return (
    <Box>
      <ConfirmationDialog
        confirmFunction={async () =>
          dispatch(deleteSubDepartment(String(subDepartmentData?.id))).then(
            () => {
              setShowConfirmationDialog(false);
            }
          )
        }
        contentMessage="في حالة حذف القسم الفرعي لن تستطيع العودة اليه مجددا, هل انت متأكد من حذف هذا القسم الفرعي؟ "
        open={showConfirmationDialog}
        setOpen={setShowConfirmationDialog}
        title="حذف قسم فرعي"
      />
      <PrimaryButton
        type="button"
        title="اضــافة قســم فــرعي"
        sx={{ marginBottom: "1rem" }}
        onClick={() => {
          setshowSubDepartmentForm(true);
          setIsEditSubDepartmentForm(false);
        }}
      />
      <CustomizedDialog
        title="اضــافة قســم فــرعي"
        open={showSubDepartmentForm}
        setOpen={setshowSubDepartmentForm}
      >
        <SubDepartmentsForm
          isEdit={isEditSubDepartmentForm}
          setshowSubDepartmentForm={setshowSubDepartmentForm}
          propsIntialValues={subDepartmentData}
        />
      </CustomizedDialog>
      <CustomizedDialog
        open={showPermissionsForm}
        setOpen={setShowPermissionsForm}
        title="تحديد الصلاحيات"
      >
        <PermissionsForm
          setShowPermissionsForm={setShowPermissionsForm}
          subDepartmentData={subDepartmentData}
        />
      </CustomizedDialog>
      <CustomDataTable
        fetchData={(filters: FilterQuery[]) => {
          console.log(filters);
          dispatch(getSubDepartmentsList(filters));
        }}
        totalItems={subDepartmentsState?.subDepartments.total}
        data={subDepartmentsState?.subDepartments.items?.map(
          (item: SubDepartmentsInterface) => {
            return {
              name: item.name ?? "",
              department: getNameOfItemWithItsId(
                item.departmentId,
                departmentsState?.departmentsList
              ),
              room: getNameOfItemWithItsId(
                item.roomId,
                roomsState?.rooms.items
              ),
              specialization: getNameOfItemWithItsId(
                item.specializationId,
                specializationsState?.specializations.items
              ),
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
                  <AddModeratorIcon
                    onClick={() => {
                      setShowPermissionsForm(true);
                      setSubDepartmentData({
                        departmentId: item.departmentId,
                        name: item.name,
                        roomId: item.roomId,
                        specializationId: item.specializationId,
                        id: item.id,
                      });
                    }}
                    sx={{ cursor: "pointer" }}
                  />
                  <EditRoundedIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setshowSubDepartmentForm(true);
                      setIsEditSubDepartmentForm(true);
                      setSubDepartmentData({
                        departmentId: item.departmentId,
                        name: item.name,
                        roomId: item.roomId,
                        specializationId: item.specializationId,
                        id: item.id,
                      });
                    }}
                  />
                  <DeleteRoundedIcon
                    onClick={() => {
                      setSubDepartmentData({
                        departmentId: item.departmentId,
                        name: item.name,
                        roomId: item.roomId,
                        specializationId: item.specializationId,
                        id: item.id,
                      });
                      setShowConfirmationDialog(true);
                    }}
                    sx={{ cursor: "pointer", color: "red" }}
                  />
                </Box>
              ),
            };
          }
        )}
        headerItems={SubDepartmentsTableHeader}
        height="75vh"
      />
    </Box>
  );
};

export default SubDepartmentsTable;
