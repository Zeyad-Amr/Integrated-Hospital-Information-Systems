import { HeaderItem } from "@/core/shared/components/CustomDataTable";

export interface IncidentVisit {
  comeFrom: string;
  injuryLocation: string;
  injuryCause: string;
  numberOfIncompletedVisits: string;
  numOfPatients : string;
  createdAt: string;
  update?: any;
}

export const header: HeaderItem[] = [
  {
    filterKey: "AdditionalInformation.cameFromId",
    id: "comeFrom",
    label: "مصدر الحالة",
    minWidth: 20,
    maxWidth: 50,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: false,
    searchable: true,
    onClick: () => {},
  },
  {
    filterKey: "AdditionalInformation.injuryLocation",
    id: "injuryLocation",
    label: "موقع الإصابة",
    minWidth: 50,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: false,
    searchable: true,
    onClick: () => {},
  },
  {
    filterKey: "AdditionalInformation.injuryCause",
    id: "injuryCause",
    label: "سبب الإصابة",
    minWidth: 50,
    maxWidth: 70,
    tableCellProps: { align: "center" },
    sortable: false,
    filterable: false,
    searchable: true,

    onClick: () => {},
  },
  {
    filterKey: "numOfPatients",
    id: "numOfPatients",
    label: "عدد الزيارات",
    minWidth: 50,
    maxWidth: 70,
    tableCellProps: { align: "center" },
    sortable: false,
    filterable: false,
    searchable: false,

    onClick: () => {},
  },
  {
    filterKey: "numberOfIncompletedVisits",
    id: "numberOfIncompletedVisits",
    label: "غير مكتمل",
    minWidth: 50,
    maxWidth: 70,
    tableCellProps: { align: "center" },
    sortable: false,
    filterable: false,
    searchable: false,

    onClick: () => {},
  },

  {
    filterKey: "createdAt",
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
    filterKey: "update",
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
