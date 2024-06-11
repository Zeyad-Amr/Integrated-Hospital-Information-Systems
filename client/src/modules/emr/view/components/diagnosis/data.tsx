import { HeaderItem } from "@/core/shared/components/CustomDataTable";

export const diagnosisHeaderTable: HeaderItem[] = [
  {
    filterKey: "name",
    id: "name",
    label: "اسم التشخيص",
    minWidth: 100,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: false,
    searchable: false,
    filterable: false,
  },
  {
    filterKey: "type",
    id: "type",
    label: "نوع التشخيص",
    minWidth: 100,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: false,
    searchable: false,
    filterable: false,
  },
  {
    filterKey: "icdCode",
    id: "icdCode",
    label: "كود التصنيف الدولي للأمراض",
    minWidth: 100,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: false,
    searchable: false,
    filterable: false,
  },
];
