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
import { useAppDispatch, useAppSelector } from "@/core/state/store";
import {
  RoomState,
  SpecializationState,
  SubDepartmentsState,
} from "../../controllers/types";
import { SubDepartmentInterface } from "@/modules/management/domain/interfaces/sub-departments-interface";
import PermissionsForm from "./PermissionsForm";
import CustomizedDialog from "@/core/shared/components/CustomizeDialog";
import { getPermissionsList } from "../../controllers/thunks/permissions-thunks";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import ConfirmationDialog from "@/core/shared/components/ConfirmationDialog";
import { FilterQuery } from "@/core/api";
import { LookupsState } from "@/core/shared/modules/lookups/presentation/controllers/types";
import { FilterOption } from "@/core/shared/components/CustomDataTable/types";

const SubDepartmentsTable = () => {
  // use state
  const [showSubDepartmentForm, setshowSubDepartmentForm] =
    useState<boolean>(false);
  const [isEditSubDepartmentForm, setIsEditSubDepartmentForm] =
    useState<boolean>(false);
  const [showPermissionsForm, setShowPermissionsForm] = useState(false);
  const [subDepartmentData, setSubDepartmentData] =
    useState<SubDepartmentInterface>();
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
  const lookupsState: LookupsState = useAppSelector(
    (state: any) => state.lookups
  );
  const dispatch = useAppDispatch();

  // get all lookups for subdepartments, departments, rooms, roles, specializations, permissions and features
  useEffect(() => {
    dispatch(getRoomList([]));
    dispatch(getSpecializationList([]));
    dispatch(getPermissionsList());
  }, []);

  const SubDepartmentsTableHeader: HeaderItem[] = [
    {
      id: "name",
      key: "name",
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
      id: "departmentId",
      key: "department",
      label: "القســـم",
      minWidth: 50,
      maxWidth: 50,
      tableCellProps: { align: "right" },
      sortable: true,
      filterable: false,
      searchable: false,
      filterOptions: lookupsState.lookups.departments.map(
        (item) =>
          ({
            id: item.id.toString(),
            value: item.value,
          }) as FilterOption
      ),

      onClick: () => {},
    },
    {
      id: "roomId",
      key: "room",
      label: "الغـــرفة",
      minWidth: 50,
      maxWidth: 50,
      tableCellProps: { align: "right" },
      sortable: true,
      filterable: false,
      searchable: false,
      filterOptions: roomsState?.rooms.items.map(
        (item) =>
          ({
            id: item.id?.toString(),
            value: item.name,
          }) as FilterOption
      ),
      onClick: () => {},
    },
    {
      id: "specializationId",
      key: "specialization",
      label: "التخصص",
      minWidth: 50,
      maxWidth: 50,
      tableCellProps: { align: "right" },
      sortable: true,
      filterable: false,
      searchable: false,
      filterOptions: specializationsState?.specializations.items.map(
        (item) =>
          ({
            id: item.id?.toString(),
            value: item.name,
          }) as FilterOption
      ),
      onClick: () => {},
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

  // function to get name value of item using its id
  const getNameOfItemWithItsId = (id: string | number, listOfSearch: any) => {
    const targetEl = listOfSearch?.find((el: any) => el.id == id);
    return targetEl?.name ?? targetEl?.value ?? "";
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
        resetControls={subDepartmentsState?.subDepartments.isInitial}
        totalItems={subDepartmentsState?.subDepartments.total}
        data={subDepartmentsState?.subDepartments.items?.map(
          (item: SubDepartmentInterface) => {
            return {
              name: item.name ?? "",
              department: getNameOfItemWithItsId(
                item.departmentId,
                lookupsState.lookups.departments
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
