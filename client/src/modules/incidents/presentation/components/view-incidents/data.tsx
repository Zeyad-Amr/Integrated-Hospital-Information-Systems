import { HeaderItem } from "@/core/shared/components/CustomDataTable";

export enum IncidentType {
  ACCIDENT = "حادث",
  FIGHT = "مشاجرة"
}

export interface DataItem {
  numberOfPatients: string;
  type: IncidentType;
  uncompletedPatients: string;
  date: string;
  time: string;
  update?: any;
}

export const data = [
  {
    "id": "9753fc6f-554e-4912-bb8f-67c2f4b94013",
    "description": "Accident",
    "numberOfPatients": 10,
    "isCompleted": false,
    "type": "FIGHT",
    "createdAt": "2023-11-24T20:20:56.659Z",
    "updatedAt": "2023-11-24T20:20:56.659Z",
    "carId": "e170b122-d006-424e-a08b-f4a62ce973ad",
    "Car": {
      "firstChar": "و",
      "secondChar": "س",
      "thirdChar": "أ"
    },
    "visits": [
      {
        "code": "2023112411",
        "patient": null,
        "creator": {
          "id": "c5c7b834-f450-4692-86ed-8a2f5c564da8",
          "role": "ADMIN",
          "createdAt": "2023-11-17T14:56:17.206Z",
          "updatedAt": "2023-11-17T14:56:17.206Z",
          "personID": "7e72efc2-41d6-4fb8-8e83-6e59d0bbbb1e",
          "createdById": null
        }
      },
      {
        "code": "2023112412",
        "patient": null,
        "creator": {
          "id": "c5c7b834-f450-4692-86ed-8a2f5c564da8",
          "role": "ADMIN",
          "createdAt": "2023-11-17T14:56:17.206Z",
          "updatedAt": "2023-11-17T14:56:17.206Z",
          "personID": "7e72efc2-41d6-4fb8-8e83-6e59d0bbbb1e",
          "createdById": null
        }
      },
      {
        "code": "2023112413",
        "patient": null,
        "creator": {
          "id": "c5c7b834-f450-4692-86ed-8a2f5c564da8",
          "role": "ADMIN",
          "createdAt": "2023-11-17T14:56:17.206Z",
          "updatedAt": "2023-11-17T14:56:17.206Z",
          "personID": "7e72efc2-41d6-4fb8-8e83-6e59d0bbbb1e",
          "createdById": null
        }
      },
      {
        "code": "2023112414",
        "patient": null,
        "creator": {
          "id": "c5c7b834-f450-4692-86ed-8a2f5c564da8",
          "role": "ADMIN",
          "createdAt": "2023-11-17T14:56:17.206Z",
          "updatedAt": "2023-11-17T14:56:17.206Z",
          "personID": "7e72efc2-41d6-4fb8-8e83-6e59d0bbbb1e",
          "createdById": null
        }
      },
      {
        "code": "2023112415",
        "patient": null,
        "creator": {
          "id": "c5c7b834-f450-4692-86ed-8a2f5c564da8",
          "role": "ADMIN",
          "createdAt": "2023-11-17T14:56:17.206Z",
          "updatedAt": "2023-11-17T14:56:17.206Z",
          "personID": "7e72efc2-41d6-4fb8-8e83-6e59d0bbbb1e",
          "createdById": null
        }
      },
      {
        "code": "2023112416",
        "patient": null,
        "creator": {
          "id": "c5c7b834-f450-4692-86ed-8a2f5c564da8",
          "role": "ADMIN",
          "createdAt": "2023-11-17T14:56:17.206Z",
          "updatedAt": "2023-11-17T14:56:17.206Z",
          "personID": "7e72efc2-41d6-4fb8-8e83-6e59d0bbbb1e",
          "createdById": null
        }
      },
      {
        "code": "2023112417",
        "patient": null,
        "creator": {
          "id": "c5c7b834-f450-4692-86ed-8a2f5c564da8",
          "role": "ADMIN",
          "createdAt": "2023-11-17T14:56:17.206Z",
          "updatedAt": "2023-11-17T14:56:17.206Z",
          "personID": "7e72efc2-41d6-4fb8-8e83-6e59d0bbbb1e",
          "createdById": null
        }
      },
      {
        "code": "2023112418",
        "patient": null,
        "creator": {
          "id": "c5c7b834-f450-4692-86ed-8a2f5c564da8",
          "role": "ADMIN",
          "createdAt": "2023-11-17T14:56:17.206Z",
          "updatedAt": "2023-11-17T14:56:17.206Z",
          "personID": "7e72efc2-41d6-4fb8-8e83-6e59d0bbbb1e",
          "createdById": null
        }
      },
      {
        "code": "2023112419",
        "patient": null,
        "creator": {
          "id": "c5c7b834-f450-4692-86ed-8a2f5c564da8",
          "role": "ADMIN",
          "createdAt": "2023-11-17T14:56:17.206Z",
          "updatedAt": "2023-11-17T14:56:17.206Z",
          "personID": "7e72efc2-41d6-4fb8-8e83-6e59d0bbbb1e",
          "createdById": null
        }
      },
      {
        "code": "2023112420",
        "patient": null,
        "creator": {
          "id": "c5c7b834-f450-4692-86ed-8a2f5c564da8",
          "role": "ADMIN",
          "createdAt": "2023-11-17T14:56:17.206Z",
          "updatedAt": "2023-11-17T14:56:17.206Z",
          "personID": "7e72efc2-41d6-4fb8-8e83-6e59d0bbbb1e",
          "createdById": null
        }
      }
    ],
    "CompanionsOnIncidents": [
      {
        "companion": {
          "id": "7e72efc2-41d6-4fb8-8e83-6e59d0bbbb1e",
          "firstName": "Ahmed",
          "secondName": "Raouf",
          "thirdName": "Mohamed",
          "fourthName": "Hussein",
          "SSN": "30002103105556",
          "verificationMethod": "NATIONALIDCARD",
          "gender": "MALE",
          "birthDate": "2000-05-10T00:00:00.000Z",
          "phone": "+201098157522",
          "email": "diaabad@gmail.com",
          "governate": "Giza",
          "address": "6th of october",
          "createdAt": "2023-11-17T14:56:17.206Z",
          "updatedAt": "2023-11-24T18:21:46.997Z"
        }
      }
    ],
    "numberOfIncompletedVisits": 10
  }
]

export const header: HeaderItem[] = [
  {
    id: "numberOfPatients",
    label: "عدد المرضى",
    minWidth: 50,
    tableCellProps: { align: "center" },
  },
  {
    id: "type",
    label: "نوع الحادث",
    minWidth: 50,
    tableCellProps: { align: "center" },
  },
  {
    id: "date",
    label: "تاريخ الحادث",
    minWidth: 100,
    tableCellProps: { align: "center", style: { direction: "ltr" } },
  },
  {
    id: "time",
    label: "وقت الحادث",
    minWidth: 100,
    tableCellProps: { align: "center", style: { direction: "ltr" } },
  },
  {
    id: "uncompletedPatients",
    label: "مرضى غير مكتملين",
    minWidth: 100,
    tableCellProps: { align: "center" },
  },
  {
    id: "update",
    label: "",
    minWidth: 100,
    tableCellProps: { align: "center" },
  },


];
