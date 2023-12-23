import { HeaderItem } from "@/core/shared/components/CustomDataTable";


export interface DataItem {
  SSN: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  // update?: any;
}

export const data = [
  {
    id: "4f5b2472-cf01-44db-b819-6cfcdc445acc",
    role: "RECEPTIONIST",
    createdAt: "2023-11-25T15:52:05.620Z",
    updatedAt: "2023-11-25T15:52:05.620Z",
    personID: "5a3ff397-0d07-4ca1-b412-3f5dd77aa6db",
    createdById: "c5db3bec-6a27-4714-89e1-7ef055593b49",
    person: {
      id: "5a3ff397-0d07-4ca1-b412-3f5dd77aa6db",
      firstName: "أحمد",
      secondName: "رؤوف",
      thirdName: "محمد",
      fourthName: "حسين",
      SSN: "1",
      verificationMethod: "NATIONALIDCARD",
      gender: "MALE",
      birthDate: "2000-05-10T00:00:00.000Z",
      phone: "+201198157522",
      email: "diaabad182@gmail.com",
      governate: "Giza",
      address: "6th of October",
      createdAt: "2023-11-25T15:52:05.620Z",
      updatedAt: "2023-11-25T15:52:05.620Z"
    }
  },
  {
    id: "9a33b768-b66f-476b-b41f-076483813733",
    role: "RECEPTIONIST",
    createdAt: "2023-11-17T15:44:23.721Z",
    updatedAt: "2023-11-17T15:44:23.721Z",
    personID: "caacfb5b-3026-4e73-b2e4-f3a10e63cd92",
    createdById: "c5c7b834-f450-4692-86ed-8a2f5c564da8",
    person: {
      id: "caacfb5b-3026-4e73-b2e4-f3a10e63cd92",
      firstName: "أحمد",
      secondName: "رؤوف",
      thirdName: "محمد",
      fourthName: "حسين",
      SSN: "4",
      verificationMethod: "NATIONALIDCARD",
      gender: "MALE",
      birthDate: "2000-05-10T00:00:00.000Z",
      phone: "+201098257522",
      email: "diaabadr2@gmail.com",
      governate: "Giza",
      address: "6th of October",
      createdAt: "2023-11-17T15:00:47.476Z",
      updatedAt: "2023-11-17T15:00:47.476Z"
    }
  },
  {
    id: "a91e88ad-9f25-473d-98b8-b3921d58f5b9",
    role: "RECEPTIONIST",
    createdAt: "2023-11-25T18:36:05.539Z",
    updatedAt: "2023-11-25T18:36:05.539Z",
    personID: "75c956a9-8bbb-4a4e-b35c-61a615313173",
    createdById: "c5db3bec-6a27-4714-89e1-7ef055593b49",
    person: {
      id: "75c956a9-8bbb-4a4e-b35c-61a615313173",
      firstName: "أحمد",
      secondName: "رؤوف",
      thirdName: "محمد",
      fourthName: "حسين",
      SSN: "2",
      verificationMethod: "NATIONALIDCARD",
      gender: "MALE",
      birthDate: "2000-05-10T00:00:00.000Z",
      phone: "+201091252522",
      email: "diaabar22@gmail.com",
      governate: "Giza",
      address: "6th of October",
      createdAt: "2023-11-25T18:36:05.539Z",
      updatedAt: "2023-11-25T18:36:05.539Z"
    }
  },
  {
    id: "c5c7b834-f450-4692-86ed-8a2f5c564da8",
    role: "ADMIN",
    createdAt: "2023-11-17T14:56:17.206Z",
    updatedAt: "2023-11-17T14:56:17.206Z",
    personID: "7e72efc2-41d6-4fb8-8e83-6e59d0bbbb1e",
    createdById: null,
    person: {
      id: "7e72efc2-41d6-4fb8-8e83-6e59d0bbbb1e",
      firstName: "أحمد",
      secondName: "رؤوف",
      thirdName: "محمد",
      fourthName: "حسين",
      SSN: "3",
      verificationMethod: "NATIONALIDCARD",
      gender: "MALE",
      birthDate: "2000-05-10T00:00:00.000Z",
      phone: "+201098157522",
      email: "diaabad@gmail.com",
      governate: "Giza",
      address: "6th of October"
    }
  }]

export const header: HeaderItem[] = [
  {
    id: "SSN",
    label: "رقم الهوية",
    minWidth: 50,
    tableCellProps: { align: "center" },
  },
  {
    id: "name",
    label: "الاسم",
    minWidth: 100,
    tableCellProps: { align: "center" },
  },
  {
    id: "phone",
    label: "رقم الهاتف",
    minWidth: 50,
    tableCellProps: { align: "center", style: { direction: "ltr" } },
  },
  {
    id: "email",
    label: "الايميل",
    minWidth: 50,
    tableCellProps: { align: "center", style: { direction: "ltr" } },
  },

  {
    id: "role",
    label: "الوظيفة",
    minWidth: 100,
    tableCellProps: { align: "center", style: { direction: "ltr" } },
  },
  // {
  //   id: "time",
  //   label: "وقت الحجز",
  //   minWidth: 100,
  //   tableCellProps: { align: "center", style: { direction: "ltr" } },
  // },
  // {
  //   id: "update",
  //   label: "",
  //   minWidth: 100,
  //   tableCellProps: { align: "center" },
  // },


];
