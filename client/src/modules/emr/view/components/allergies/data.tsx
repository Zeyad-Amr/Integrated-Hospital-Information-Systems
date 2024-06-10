import { HeaderItem } from "@/core/shared/components/CustomDataTable";

export const allergiesHeaderTable: HeaderItem[] = [
  {
    id: "name",
    key: "name",
    label: "الاسم",
    minWidth: 100,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: false,
    searchable: false,
    filterable: false,
  },
  {
    id: "beginDate",
    key: "beginDate",
    label: "تاريخ البدء",
    minWidth: 100,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: false,
    searchable: false,
    filterable: false,
  },
  {
    id: "severity",
    key: "severity",
    label: "شدة",
    minWidth: 100,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: false,
    searchable: false,
    filterable: false,
  },
];
