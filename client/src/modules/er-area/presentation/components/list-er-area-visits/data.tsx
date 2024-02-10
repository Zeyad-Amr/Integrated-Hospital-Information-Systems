import { HeaderItem } from "@/core/shared/components/CustomDataTable";


export interface DataItem {
  id: any;
  sequenceNumber: string;
  name: string;
  date: string;
  time: string;
  watingTime: any;
  age?: any;
  gender?: string;
}

export const data = [

  {
    code: "202312251",
    sequenceNumber: 55,
    createdAt: "2023-12-25T11:15:54.896Z",
    updatedAt: "2023-12-25T11:15:54.896Z",
    additionalInfoId: "50880eb6-1bf5-4867-b725-6328b3cbf850",
    creatorId: "5ff867d6-282b-49e4-8b64-f5b07859908f",
    patientId: "b449330c-0761-4af8-9490-ee45fdaf9432",
    companionId: "e54ec78f-5a5b-486e-ba23-294437cd220a",
    incidentId: null,
    patient: {
      id: "b449330c-0761-4af8-9490-ee45fdaf9432",
      createdAt: "2023-12-24T19:00:16.389Z",
      updatedAt: "2023-12-24T19:00:16.389Z",
      personId: "3456ed3e-5dc3-4fb3-988b-88ea29ce9744",
      person: {
        id: "3456ed3e-5dc3-4fb3-988b-88ea29ce9744",
        firstName: "Ahmed",
        secondName: "Raouf",
        thirdName: "Mohamed",
        fourthName: "Hussein",
        SSN: null,
        verificationMethodId: null,
        genderId: 1,
        birthDate: null,
        phone: null,
        governate: null,
        address: null,
        type: "PATIENT"
      }
    },
    transfers: []
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
    id: "id",
    label: "رقم المريض",
    minWidth: 50,
    tableCellProps: { align: "center" },
  },
  {
    id: "name",
    label: "اسم المريض",
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
    id: "watingTime",
    label: `وقت الانتظار (hh:mm)`,
    minWidth: 100,
    tableCellProps: { align: "center" },
  },



];
