import { HeaderItem } from "@/core/shared/components/CustomDataTable";

export interface AnonymizedVisit {
  sequenceNumber: string;
  companionName: string;
  companionSSN: string;
  code: string;
  createdAt: string;
  update?: any;
}

export const header: HeaderItem[] = [
  {
    filterKey: "sequenceNumber",
    id: "sequenceNumber",
    label: "رقم التردد",
    minWidth: 20,
    maxWidth: 50,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: false,
    searchable: false,
    onClick: () => {},
  },
  {
    filterKey: "code",
    id: "code",
    label: "رقم المريض",
    minWidth: 50,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: false,
    searchable: true,
    onClick: () => {},
  },
  {
    filterKey: "companionName",
    id: "companionName",
    label: "اسم المرافق",
    minWidth: 50,
    maxWidth: 70,
    tableCellProps: { align: "center" },
    sortable: false,
    filterable: false,
    searchable: true,

    onClick: () => {},
  },
  {
    filterKey: "companionSSN",
    id: "companionSSN",
    label: "رقم هوية المرافق",
    minWidth: 50,
    maxWidth: 70,
    tableCellProps: { align: "center" },
    sortable: false,
    filterable: false,
    searchable: true,

    onClick: () => {},
  },
  {
    filterKey: "createdAt",
    id: "createdAt",
    label: "تاريخ الحجز",
    minWidth: 100,
    tableCellProps: { align: "center", style: { direction: "ltr" } },
    sortable: true,
    filterable: false,
    searchable: false,
    onClick: () => {},
  },
  {
    filterKey: "update",
    id: "update",
    label: "تعديل",
    isComponent: true,
    minWidth: 100,
    tableCellProps: { align: "center" },
    sortable: false,
    filterable: false,
    searchable: false,
    onClick: () => {},
  },
];
