import {
  CustomDataTable,
  HeaderItem,
} from "@/core/shared/components/CustomDataTable";
import { Box } from "@mui/material";
import React, { useState } from "react";
import RoomsForm from "./RoomsForm";
import RoomInterface from "@/modules/management/domain/interfaces/room-interface";
import {
  deleteRoom,
  getRoomList,
} from "@/modules/management/presentation/controllers/thunks/room-thunks";
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
    filterKey: "name",
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
    filterKey: "location",
    id: "location",
    label: "الموقع",
    minWidth: 50,
    maxWidth: 50,
    tableCellProps: { align: "right" },
    sortable: true,
    filterable: false,
    searchable: true,
    onClick: () => {},
  },
  {
    filterKey: "update",
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

  return (
    <Box>
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
        title={isEditRoomForm ? "تعديل غرفة" : "اضافة غرفة"}
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
          dispatch(getRoomList(filters));
        }}
        resetComponent={roomState?.rooms.reset}
        totalItems={roomState?.rooms.total}
        data={roomState?.rooms.items?.map((item: RoomInterface) => {
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
        headerItems={roomsTableHeader}
        height="75vh"
      />
    </Box>
  );
};

export default RoomsTable;
