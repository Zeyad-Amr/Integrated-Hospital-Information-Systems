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
    id: "companionName",
    label: "اسم المرافق",
    minWidth: 50,
    maxWidth: 70,
    tableCellProps: { align: "center" },
    sortable: false,
    filterable: false,
    searchable: true,
    isCustomFilter: true,
    onClick: () => {},
  },
  {
    id: "companionSSN",
    label: "رقم هوية المرافق",
    minWidth: 50,
    maxWidth: 70,
    tableCellProps: { align: "center" },
    sortable: false,
    filterable: false,
    searchable: true,
    isCustomFilter: true,
    onClick: () => {},
  },
  {
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
