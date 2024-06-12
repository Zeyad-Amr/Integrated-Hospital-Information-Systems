import { HeaderItem } from "@/core/shared/components/CustomDataTable";

export const radiologiesHeaderTable: HeaderItem[] = [
  {
    filterKey: "name",
    id: "name",
    label: "الاشعة",
    minWidth: 100,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: false,
    searchable: false,
    filterable: false,
  },
 
];
