import { HeaderItem } from "@/core/shared/components/CustomDataTable";

export interface AnonymizedVisit {
  sequenceNumber: string;
  companionName: string;
  companionSSN: string;
  code: string;
  date: string;
  time: string;
  update?: any;
}

export const header: HeaderItem[] = [
  {
    id: "sequenceNumber",
    label: "رقم التردد",
    minWidth: 20,
    maxWidth: 50,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: false,
    searchable: true,
    onClick: () => {},
  },
  {
    id: "code",
    label: "رقم المريض",
    minWidth: 50,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: false,
    searchable: true,
    onClick: () => {},
  },
  {
    id: "companionName",
    label: "اسم المرافق",
    minWidth: 50,
    maxWidth: 70,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: false,
    searchable: true,
    onClick: () => {},
  },
  {
    id: "companionSSN",
    label: "رقم هوية المرافق",
    minWidth: 50,
    maxWidth: 70,
    tableCellProps: { align: "center" },
    sortable: true,
    filterable: false,
    searchable: true,
    display: false,
    onClick: () => {},
  },
  // {
  //   id: "kinship",
  //   label: "صلة القرابة",
  //   minWidth: 100,
  //   tableCellProps: { align: "center" },
  //   sortable: false,
  //   filterable: true,
  //   searchable: false,
  //   onClick: () => {},
  // },
  {
    id: "date",
    label: "تاريخ الحجز",
    minWidth: 100,
    tableCellProps: { align: "center", style: { direction: "ltr" } },
    sortable: false,
    filterable: false,
    searchable: false,
    onClick: () => {},
  },
  {
    id: "time",
    label: "وقت الحجز",
    minWidth: 100,
    tableCellProps: { align: "center", style: { direction: "ltr" } },
    sortable: false,
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

export const data = [
  {
    code: "202311241",
    sequenceNumber: 1,
    kinship: { id: "1", value: "Brother" },
    createdAt: "2023-11-24T18:24:16.011Z",
    updatedAt: "2023-11-24T18:24:16.011Z",
    creatorId: "c5db3bec-6a27-4714-89e1-7ef055593b49",
    patientId: "17149416-514d-4993-b9b1-a4864119c2c9",
    companionId: null,
    incidentId: null,
    companion: {
      firstName: "احمد",
      secondName: "محمد",
      thirdName: "عبدالرءوف",
      fourthName: "محمد",
    },
  },
  {
    code: "202311241",
    sequenceNumber: 2,
    kinship: { id: "2", value: "Sister" },
    createdAt: "2023-11-24T18:28:38.857Z",
    updatedAt: "2023-11-24T18:28:38.857Z",
    creatorId: "c5db3bec-6a27-4714-89e1-7ef055593b49",
    patientId: "c0447958-913f-4d41-b95e-ab2c1f23ce25",
    companionId: null,
    incidentId: null,
    companion: {
      firstName: "ضياء",
      secondName: "بدر",
      thirdName: "مبروك",
      fourthName: "احمد",
    },
  },
  {
    code: "202311242",
    sequenceNumber: 3,
    kinship: { id: "1", value: "Brother" },
    createdAt: "2023-11-24T18:24:50.364Z",
    updatedAt: "2023-11-24T18:24:50.364Z",
    creatorId: "c5db3bec-6a27-4714-89e1-7ef055593b49",
    patientId: "2e32a83b-765f-4032-b381-520f659a354e",
    companionId: null,
    incidentId: null,
    companion: {
      firstName: "زياد",
      secondName: "عمرو",
      thirdName: "فكري",
      fourthName: "ابراهيم",
    },
  },
  {
    code: "202311243",
    sequenceNumber: 4,
    kinship: { id: "3", value: "Father" },
    createdAt: "2023-11-24T18:25:07.541Z",
    updatedAt: "2023-11-24T18:25:07.541Z",
    creatorId: "c5db3bec-6a27-4714-89e1-7ef055593b49",
    patientId: "2e32a83b-765f-4032-b381-520f659a354e",
    companionId: null,
    incidentId: null,
    companion: null,
  },
  {
    code: "202311244",
    sequenceNumber: 5,
    kinship: { id: "4", value: "Mother" },
    createdAt: "2023-11-24T18:25:42.107Z",
    updatedAt: "2023-11-24T18:25:42.107Z",
    creatorId: "c5db3bec-6a27-4714-89e1-7ef055593b49",
    patientId: "2e32a83b-765f-4032-b381-520f659a354e",
    companionId: null,
    incidentId: null,
    companion: {
      firstName: "زياد",
      secondName: "عمرو",
      thirdName: "فكري",
      fourthName: "ابراهيم",
    },
  },
  {
    code: "202311244",
    sequenceNumber: 6,
    kinship: { id: "1", value: "Brother" },
    createdAt: "2023-11-24T18:25:42.107Z",
    updatedAt: "2023-11-24T18:25:42.107Z",
    creatorId: "c5db3bec-6a27-4714-89e1-7ef055593b49",
    patientId: "2e32a83b-765f-4032-b381-520f659a354e",
    companionId: null,
    incidentId: null,
    companion: {
      firstName: "زياد",
      secondName: "عمرو",
      thirdName: "فكري",
      fourthName: "ابراهيم",
    },
  },
  {
    code: "202311244",
    sequenceNumber: 7,
    kinship: { id: "1", value: "Brother" },
    createdAt: "2023-11-24T18:25:42.107Z",
    updatedAt: "2023-11-24T18:25:42.107Z",
    creatorId: "c5db3bec-6a27-4714-89e1-7ef055593b49",
    patientId: "2e32a83b-765f-4032-b381-520f659a354e",
    companionId: null,
    incidentId: null,
    companion: {
      firstName: "زياد",
      secondName: "عمرو",
      thirdName: "فكري",
      fourthName: "ابراهيم",
    },
  },
  {
    code: "202311244",
    sequenceNumber: 8,
    kinship: { id: "1", value: "Brother" },
    createdAt: "2023-11-24T18:25:42.107Z",
    updatedAt: "2023-11-24T18:25:42.107Z",
    creatorId: "c5db3bec-6a27-4714-89e1-7ef055593b49",
    patientId: "2e32a83b-765f-4032-b381-520f659a354e",
    companionId: null,
    incidentId: null,
    companion: {
      firstName: "زياد",
      secondName: "عمرو",
      thirdName: "فكري",
      fourthName: "ابراهيم",
    },
  },
  {
    code: "202311244",
    sequenceNumber: 9,
    kinship: { id: "1", value: "Brother" },
    createdAt: "2023-11-24T18:25:42.107Z",
    updatedAt: "2023-11-24T18:25:42.107Z",
    creatorId: "c5db3bec-6a27-4714-89e1-7ef055593b49",
    patientId: "2e32a83b-765f-4032-b381-520f659a354e",
    companionId: null,
    incidentId: null,
    companion: {
      firstName: "زياد",
      secondName: "عمرو",
      thirdName: "فكري",
      fourthName: "ابراهيم",
    },
  },
  {
    code: "202311247",
    sequenceNumber: 10,
    kinship: { id: "1", value: "Brother" },
    createdAt: "2023-11-24T18:25:42.107Z",
    updatedAt: "2023-11-24T18:25:42.107Z",
    creatorId: "c5db3bec-6a27-4714-89e1-7ef055593b49",
    patientId: "2e32a83b-765f-4032-b381-520f659a354e",
    companionId: null,
    incidentId: null,
    companion: {
      firstName: "زياد",
      secondName: "عمرو",
      thirdName: "فكري",
      fourthName: "ابراهيم",
    },
  },
  {
    code: "202311244",
    sequenceNumber: 11,
    kinship: { id: "1", value: "Brother" },
    createdAt: "2023-11-24T18:25:42.107Z",
    updatedAt: "2023-11-24T18:25:42.107Z",
    creatorId: "c5db3bec-6a27-4714-89e1-7ef055593b49",
    patientId: "2e32a83b-765f-4032-b381-520f659a354e",
    companionId: null,
    incidentId: null,
    companion: {
      firstName: "زياد",
      secondName: "عمرو",
      thirdName: "فكري",
      fourthName: "ابراهيم",
    },
  },
  {
    code: "202311245",
    sequenceNumber: 12,
    kinship: { id: "1", value: "Brother" },
    createdAt: "2023-11-24T18:27:10.716Z",
    updatedAt: "2023-11-24T18:27:10.716Z",
    creatorId: "c5db3bec-6a27-4714-89e1-7ef055593b49",
    patientId: "f0f6f314-79a0-4d92-a81f-59b6aa2973ab",
    companionId: null,
    incidentId: null,
    companion: {
      firstName: "مؤمن",
      secondName: "محمد",
      thirdName: "حسين",
      fourthName: "امين",
    },
  },
];
