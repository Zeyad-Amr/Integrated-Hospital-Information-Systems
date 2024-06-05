import { HeaderItem } from "@/core/shared/components/CustomDataTable";

export interface IncidentVisit {
  comeFrom: string;
  injuryLocation: string;
  injuryCause: string;
  numberOfIncompletedVisits: string;
  numberOfVisits: string;
  createdAt: string;
  update?: any;
}

export const header: HeaderItem[] = [
  {
    id: "AdditionalInformation.comeFrom",
    label: "مصدر الحالة",
    minWidth: 20,
    maxWidth: 50,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: false,
    searchable: false,
    onClick: () => {},
  },
  {
    id: "AdditionalInformation.injuryLocation",
    label: "موقع الإصابة",
    minWidth: 50,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: false,
    searchable: true,
    onClick: () => {},
  },
  {
    id: "AdditionalInformation.injuryCause",
    label: "سبب الإصابة",
    minWidth: 50,
    maxWidth: 70,
    tableCellProps: { align: "center" },
    sortable: false,
    filterable: false,
    searchable: true,
    isCustomFilter: true,
    onClick: () => {},
  },
  {
    id: "numberOfVisits",
    label: "عدد الزيارات",
    minWidth: 50,
    maxWidth: 70,
    tableCellProps: { align: "center" },
    sortable: false,
    filterable: false,
    searchable: true,
    isCustomFilter: true,
    onClick: () => {},
  },
  {
    id: "numberOfIncompletedVisits",
    label: "عدد الزيارات الغير مكتملة",
    minWidth: 50,
    maxWidth: 70,
    tableCellProps: { align: "center" },
    sortable: false,
    filterable: false,
    searchable: true,
    isCustomFilter: true,
    onClick: () => {},
  },

  {
    id: "createdAt",
    label: "تاريخ الحجز",
    minWidth: 100,
    tableCellProps: { align: "center", style: { direction: "ltr" } },
    sortable: true,
    filterable: false,
    searchable: false,
    onClick: () => {},
  },
  {
    id: "update",
    label: "تعديل",
    isComponent: true,
    minWidth: 100,
    tableCellProps: { align: "center" },
    sortable: false,
    filterable: false,
    searchable: false,
    onClick: () => {},
  },
];
