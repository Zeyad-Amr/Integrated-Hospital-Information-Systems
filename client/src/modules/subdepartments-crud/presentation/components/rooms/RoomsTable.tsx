import {
  CustomDataTable,
  HeaderItem,
} from "@/core/shared/components/CustomDataTable";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import RoomsForm from "./RoomsForm";
import RoomInterface from "@/modules/subdepartments-crud/domain/interfaces/room-interface";
import {
  deleteRoom,
  getRoomList,
} from "@/modules/subdepartments-crud/presentation/controllers/thunks/room-thunks";
import { useAppDispatch, useAppSelector } from "@/core/state/store";
import { RoomState } from "../../controllers/types";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import CustomizedDialog from "@/core/shared/components/CustomizeDialog";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ConfirmationDialog from "@/core/shared/components/ConfirmationDialog";
import { FilterQuery } from "@/core/api";

const roomsTableHeader: HeaderItem[] = [
  {
    id: "name",
    label: "الأســـم",
    minWidth: 50,
    maxWidth: 50,
    tableCellProps: { align: "right" },
    sortable: true,
    filterable: true,
    searchable: true,
    onClick: () => {},
  },
  {
    id: "location",
    label: "الموقع",
    minWidth: 50,
    maxWidth: 50,
    tableCellProps: { align: "right" },
    sortable: true,
    filterable: true,
    searchable: true,
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

const RoomsTable = () => {
  // use state
  const [showRoomForm, setshowRoomForm] = useState<boolean>(false);
  const [showConfirmationDialog, setShowConfirmationDialog] =
    useState<boolean>(false);
  const [isEditRoomForm, setIsEditRoomForm] = useState<boolean>(false);
  const [roomData, setRoomData] = useState<RoomInterface>();

  // get room data from store
  const dispatch = useAppDispatch();
  const roomState: RoomState = useAppSelector((state: any) => state.rooms);

  // get rooms list
  useEffect(() => {
    dispatch(getRoomList());
  }, []);

  return (
    <>
      <ConfirmationDialog
        confirmFunction={async () =>
          dispatch(deleteRoom(String(roomData?.id))).then(() => {
            setShowConfirmationDialog(false);
          })
        }
        contentMessage="في حالة حذف الغرفة لن تستطيع العودة اليها مجددا, هل انت متأكد من حذف هذه الغرفة؟ "
        open={showConfirmationDialog}
        setOpen={setShowConfirmationDialog}
        title="حذف غرفة"
      />
      <PrimaryButton
        type="button"
        title="اضــافة غــرفة"
        sx={{ marginBottom: "1rem" }}
        onClick={() => {
          setshowRoomForm(true);
          setIsEditRoomForm(false);
        }}
      />
      <CustomizedDialog
        open={showRoomForm}
        setOpen={setshowRoomForm}
        title="اضــافة غــرفة"
      >
        <RoomsForm
          isEdit={isEditRoomForm}
          setshowRoomForm={setshowRoomForm}
          propsIntialValues={roomData}
        />
      </CustomizedDialog>
      <CustomDataTable
        fetchData={(filters: FilterQuery[]) => {
          console.log(filters);
        }}
        totalItems={roomState?.roomList?.length ?? 0}
        data={roomState?.roomList?.map((item: RoomInterface) => {
          return {
            name: item.name ?? "",
            location: item.location ?? "",
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
                    setshowRoomForm(true);
                    setIsEditRoomForm(true);
                    setRoomData({
                      id: item.id,
                      name: item.name,
                      location: item.location,
                    });
                  }}
                />
                <DeleteRoundedIcon
                  sx={{ cursor: "pointer", color: "red" }}
                  onClick={() => {
                    setRoomData({
                      id: item.id,
                      name: item.name,
                      location: item.location,
                    });
                    setShowConfirmationDialog(true);
                  }}
                />
              </Box>
            ),
          };
        })}
        width="100%"
        height="100%"
        boxShadow={10}
        sx={{ mb: 5 }}
        headerItems={roomsTableHeader}
        stickyHeader={true}
      />
    </>
  );
};

export default RoomsTable;
