// "use client";

// import { HeaderItem } from "@/core/shared/components/CustomDataTable";
// import ExaminationAccordion from "@/core/shared/components/ExaminationAccordion";
// import { useAppSelector } from "@/core/state/store";
// import RoomsForm from "@/modules/management/presentation/components/rooms/RoomsForm";
// import {
//   deleteRoom,
//   getRoomList,
// } from "@/modules/management/presentation/controllers/thunks/room-thunks";
// import { RoomState } from "@/modules/management/presentation/controllers/types";

// // ----------------------------------------------------------------------

// export default function Test() {
//   const roomsTableHeader: HeaderItem[] = [
//     {
//       id: "name",
//       key: "name",
//       label: "الأســـم",
//       minWidth: 50,
//       maxWidth: 50,
//       tableCellProps: { align: "right" },
//       sortable: true,
//       filterable: false,
//       searchable: true,
//       onClick: () => {},
//     },
//     {
//       id: "location",
//       key: "location",
//       label: "الموقع",
//       minWidth: 50,
//       maxWidth: 50,
//       tableCellProps: { align: "right" },
//       sortable: true,
//       filterable: false,
//       searchable: true,
//       onClick: () => {},
//     },
//   ];

//   const roomState: RoomState = useAppSelector((state: any) => state.rooms);

//   return (
//     <ExaminationAccordion
//       getListThunk={getRoomList}
//       deleteThunk={deleteRoom}
//       tableList={roomState.rooms}
//       tableHeader={roomsTableHeader}
//       title="الأدوية"
//       FormComponent={RoomsForm}
//     />
//   );
// }
