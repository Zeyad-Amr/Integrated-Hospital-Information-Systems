"use client";

import { HeaderItem } from "@/core/shared/components/CustomDataTable";
import ExaminationAccordion from "@/core/shared/components/ExaminationAccordion";
import { useAppSelector } from "@/core/state/store";
import AllergiesModel from "@/modules/emr/models/allergies-model";
import AllergiesComponent from "@/modules/emr/view/components/allergies/AllergiesComponent";
import AllergiesForm from "@/modules/emr/view/components/allergies/AllergiesForm";
import RoomsForm from "@/modules/management/presentation/components/rooms/RoomsForm";
import {
  deleteRoom,
  getRoomList,
} from "@/modules/management/presentation/controllers/thunks/room-thunks";
import { RoomState } from "@/modules/management/presentation/controllers/types";
import { useState } from "react";

// ----------------------------------------------------------------------

export default function Test() {
  const roomsTableHeader: HeaderItem[] = [
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
      id: "location",
      key: "location",
      label: "الموقع",
      minWidth: 50,
      maxWidth: 50,
      tableCellProps: { align: "right" },
      sortable: true,
      filterable: false,
      searchable: true,
      onClick: () => {},
    },
  ];

  const roomState: RoomState = useAppSelector((state: any) => state.rooms);
  const [test, setState] = useState(false);

  return <AllergiesComponent />;
}
