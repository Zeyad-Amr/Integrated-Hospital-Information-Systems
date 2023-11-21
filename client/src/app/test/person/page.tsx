"use client";

import Sidebar from "@/core/layout/sidebar";
import PersonalData, {
  PersonalDataValues,
} from "@/core/shared/components/PersonalData";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";

// ----------------------------------------------------------------------

export default function Dashboard() {
  const [submitFlag, setSubmitFlag] = useState<boolean>(false);

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

  const handleSubmit = (values: PersonalDataValues) => {
    // call back function - dealing with values
    console.log("testSubmit", values);
  };

  const handleClick = () => {
    setSubmitFlag(!submitFlag);
  };

  return (
    <Sidebar>
      <PersonalData
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isSubmitted={submitFlag}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="button"
          style={{
            color: "#fff",
            backgroundColor: "#232836",
            width: "40%",
            fontSize: "0.9rem",
            margin: "1rem 0rem 0rem 0rem",
            height: "40px",
          }}
          onClick={() => handleClick()}
        >
          تأكيــد
        </Button>
      </Box>
    </Sidebar>
  );
}
