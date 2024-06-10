import { HeaderItem } from "@/core/shared/components/CustomDataTable";

export const medicationsHeaderTable: HeaderItem[] = [
  {
    filterKey: "drugName",
    id: "drugName",
    label: "اسم الدواء",
    minWidth: 100,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: false,
    searchable: false,
    filterable: false,
  },
  {
    filterKey: "beginDate",
    id: "beginDate",
    label: "تاريخ البدء",
    minWidth: 100,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: false,
    searchable: false,
    filterable: false,
  },
  {
    filterKey: "endDate",
    id: "endDate",
    label: "تاريخ الانتهاء",
    minWidth: 100,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: false,
    searchable: false,
    filterable: false,
  },
];
