import { HeaderItem } from "@/core/shared/components/CustomDataTable";

export const primarySurveyHeaderTable: HeaderItem[] = [
  {
    filterKey: "breathing",
    id: "breathing",
    label: "التنفس",
    minWidth: 100,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: false,
    searchable: false,
    filterable: false,
  },
  {
    filterKey: "disability",
    id: "disability",
    label: "الإعاقة",
    minWidth: 100,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: false,
    searchable: false,
    filterable: false,
  },
  {
    filterKey: "circulation",
    id: "circulation",
    label: "الدورة الدموية",
    minWidth: 100,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: false,
    searchable: false,
    filterable: false,
  },
];
