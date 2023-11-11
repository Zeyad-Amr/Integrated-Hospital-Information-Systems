"use client";

import Sidebar from "@/core/layout/sidebar";
import PersonalData, { PersonalDataValues } from "@/core/shared/components/PersonalData";

// ----------------------------------------------------------------------

const initialValues = {
  firstName: "akwa",
  secondName: "mix",
  thirdName: "for",
  forthName: "ever",
  email: "test@example.com",
  SSN: "",
  phone: "",
  id: "",
  gender: "",
  governate: "",
  date: null,
  address: "",
  SSNtype: "",
  search: "",
};

const handleSubmit = (values : PersonalDataValues) => {
  // call back function - dealing with values
  console.log('testSubmit', values);
}

export default function Dashboard() {
  return (
    <Sidebar>
      <PersonalData initialValues={initialValues} onSubmit={handleSubmit} />
    </Sidebar>
  );
}
