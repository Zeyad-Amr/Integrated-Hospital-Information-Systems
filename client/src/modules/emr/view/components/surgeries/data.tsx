import { HeaderItem } from "@/core/shared/components/CustomDataTable";

export const surgeriesHeaderTable: HeaderItem[] = [
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
    filterKey: "place",
    id: "place",
    label: "الموضع",
    minWidth: 100,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: false,
    searchable: false,
    filterable: false,
  },
];
