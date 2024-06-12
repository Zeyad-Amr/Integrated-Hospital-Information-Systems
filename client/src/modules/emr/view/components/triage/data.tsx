import { HeaderItem } from "@/core/shared/components/CustomDataTable";

export const triageHeaderTable: HeaderItem[] = [
  {
    filterKey: "painScore",
    id: "painScore",
    label: "مستوى الألم",
    minWidth: 100,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: false,
    searchable: false,
    filterable: false,
  },
  {
    filterKey: "LOCId",
    id: "LOCId",
    label: "مستوى الوعي",
    minWidth: 100,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: false,
    searchable: false,
    filterable: false,
  },
  {
    filterKey: "triageTypeId",
    id: "triageTypeId",
    label: "نوع الفرز",
    minWidth: 100,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: false,
    searchable: false,
    filterable: false,
  },
];
