import { HeaderItem } from "@/core/shared/components/CustomDataTable";

export const labsHeaderTable: HeaderItem[] = [
  {
    filterKey: "name",
    id: "name",
    label: "التحليل",
    minWidth: 100,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: false,
    searchable: false,
    filterable: false,
  },
 
];
