import { HeaderItem } from "@/core/shared/components/CustomDataTable";

export const medicalProblemsHeaderTable: HeaderItem[] = [
  {
    filterKey: "name",
    id: "name",
    label: "الاسم",
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
];
