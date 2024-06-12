import { HeaderItem } from "@/core/shared/components/CustomDataTable";

export interface DataItem {
  id: any;
  sequenceNumber: string;
  name: string;
  date: string;
  time: string;
  watingTime: any;
  age?: any;
  gender?: string;
  assessment?: any;
}

export const header: HeaderItem[] = [
  {
    filterKey: "sequenceNumber",
    id: "sequenceNumber",
    label: "رقم التردد",
    minWidth: 50,
    tableCellProps: { align: "center" },
    showBorder: true,
  },
  {
    filterKey: "id",
    id: "id",
    label: "رقم المريض",
    minWidth: 50,
    tableCellProps: { align: "center" },
  },
  {
    filterKey: "name",
    id: "name",
    label: "اسم المريض",
    minWidth: 100,
    tableCellProps: { align: "center" },
  },
  {
    filterKey: "date",
    id: "date",
    label: "تاريخ الحجز",
    minWidth: 100,
    tableCellProps: { align: "center", style: { direction: "ltr" } },
  },
  {
    filterKey: "time",
    id: "time",
    label: "وقت الحجز",
    minWidth: 100,
    tableCellProps: { align: "center", style: { direction: "ltr" } },
  },
  {
    filterKey: "watingTime",
    id: "watingTime",
    label: `وقت الانتظار (hh:mm)`,
    minWidth: 100,
    isComponent: true,
    tableCellProps: { align: "center" },
  },
  {
    filterKey: "assessment",
    id: "assessment",
    label: "",
    isComponent: true,
    minWidth: 100,
    tableCellProps: { align: "center" },
    sortable: false,
    filterable: false,
    searchable: false,
    onClick: () => {},
  },
];
