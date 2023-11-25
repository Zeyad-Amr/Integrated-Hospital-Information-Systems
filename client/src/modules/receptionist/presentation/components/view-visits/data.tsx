import { HeaderItem } from "@/core/shared/components/CustomDataTable";


export interface DataItem {
  sequenceNumber: string;
  name: string;
  code: string;
  date: string;
  time: string;
  update?: any;
}

export const data = [
  // {
  //   sequenceNumber: "31",
  //   code: "2023112418",
  //   date: "2023-11-24",
  //   name: "علي أحمد",
  //   time: "08:00 AM"
  // },
  // {
  //   sequenceNumber: "32",
  //   code: "2023112419",
  //   date: "2023-11-25",
  //   name: "فاطمة محمد",
  //   time: "10:30 AM"
  // },
  // {
  //   sequenceNumber: "33",
  //   code: "2023112420",
  //   date: "2023-11-26",
  //   name: "محمد علي",
  //   time: "02:15 PM",
  // }
  {
    code: "202311241",
    sequenceNumber: 55,
    kinship: "BROTHER",
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
    code: "2023112410",
    sequenceNumber: 55,
    kinship: "BROTHER",
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
    sequenceNumber: 55,
    kinship: "BROTHER",
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
    sequenceNumber: 55,
    kinship: "BROTHER",
    createdAt: "2023-11-24T18:25:07.541Z",
    updatedAt: "2023-11-24T18:25:07.541Z",
    creatorId: "c5db3bec-6a27-4714-89e1-7ef055593b49",
    patientId: "2e32a83b-765f-4032-b381-520f659a354e",
    companionId: null,
    incidentId: null,
    companion: null
  },
  {
    code: "202311244",
    sequenceNumber: 55,
    kinship: "BROTHER",
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
    sequenceNumber: 55,
    kinship: "BROTHER",
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
    sequenceNumber: 55,
    kinship: "BROTHER",
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
    sequenceNumber: 55,
    kinship: "BROTHER",
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
    sequenceNumber: 55,
    kinship: "BROTHER",
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
    sequenceNumber: 55,
    kinship: "BROTHER",
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
    sequenceNumber: 55,
    kinship: "BROTHER",
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
    sequenceNumber: 55,
    kinship: "BROTHER",
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

export const header: HeaderItem[] = [
  {
    id: "sequenceNumber",
    label: "رقم التردد",
    minWidth: 50,
    tableCellProps: { align: "center" },
  },
  {
    id: "code",
    label: "رقم المريض",
    minWidth: 50,
    tableCellProps: { align: "center" },
  },
  {
    id: "name",
    label: "اسم المرافق",
    minWidth: 100,
    tableCellProps: { align: "center" },
  },
  {
    id: "date",
    label: "تاريخ الحجز",
    minWidth: 100,
    tableCellProps: { align: "center", style: { direction: "ltr" } },
  },
  {
    id: "time",
    label: "وقت الحجز",
    minWidth: 100,
    tableCellProps: { align: "center", style: { direction: "ltr" } },
  },
  {
    id: "update",
    label: "",
    minWidth: 100,
    tableCellProps: { align: "center" },
  },


];
