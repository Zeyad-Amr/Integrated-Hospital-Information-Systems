import { HeaderItem } from "@/core/shared/components/CustomDataTable";

export const medicalProblemsHeaderTable: HeaderItem[] = [
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
];
