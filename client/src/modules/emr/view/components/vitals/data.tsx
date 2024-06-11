import { HeaderItem } from "@/core/shared/components/CustomDataTable";

export const vitalsHeaderTable: HeaderItem[] = [
  {
    filterKey: "cvp",
    id: "cvp",
    label: "ضغط الوريد المركزي",
    minWidth: 100,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: false,
    searchable: false,
    filterable: false,
  },
  {
    filterKey: "PR",
    id: "PR",
    label: "معدل النبض",
    minWidth: 100,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: false,
    searchable: false,
    filterable: false,
  },
  {
    filterKey: "SpO2",
    id: "SpO2",
    label: "نسبة الأكسجين في الدم",
    minWidth: 100,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: false,
    searchable: false,
    filterable: false,
  },
];
