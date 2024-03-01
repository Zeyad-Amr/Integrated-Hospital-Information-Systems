// import React from 'react'
import React, { useEffect } from "react";
import { Box } from "@mui/material";

import EmployeesTable from "../../components/view-employees";
import { useAppDispatch } from "@/core/state/store";
import { getEmployeeList } from "../../controllers/thunks/employee-thunks";

const EmployeesTableComponent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEmployeeList());
  }, [dispatch]);

  return (
    <Box
      sx={{
        width: "90%",
        height: "70vh",
        margin: "0 auto ",
      }}
    >
      {/* <PageHeader title="الموظفون">
        <AccountBoxIcon />
      </PageHeader> */}

      <EmployeesTable />
    </Box>
  );
};

export default EmployeesTableComponent;
