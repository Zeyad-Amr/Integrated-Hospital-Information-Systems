import PersonalData, { PersonalDataValues } from '@/core/shared/components/PersonalData';
import { Button , Box } from '@mui/material';
import React, { useState } from 'react'

const AddVisitForm = () => {

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
    <div>
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
    </div>
  )
}

export default AddVisitForm