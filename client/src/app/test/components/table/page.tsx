"use client";

import CustomDataTable from "../../../../core/shared/components/CustomDataTable/CustomDataTable";
import { Box, Typography } from "@mui/material";
import { data, header } from "./data";
import { FilterQuery } from "@/core/api";
const TablePageTest = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Typography variant="h4">Fully Dynamic Table</Typography>
      <Typography variant="h5">Example 1</Typography>
      <CustomDataTable
        fetchData={(filters: FilterQuery[]) => {
          console.log(filters);
        }}
        data={data}
        headerItems={header}
        width="80vw"
        height="70vh"
        boxShadow={10}
        stickyHeader={true}
        sx={{ mb: 5 }}
        onRowClick={(item) => console.log(item)}
      />
      <Typography variant="h4">Example 2</Typography>
      <CustomDataTable
        fetchData={(filters: FilterQuery[]) => {
          console.log(filters);
        }}
        data={data}
        headerItems={header}
        width="60vw"
        height="50vh"
        boxShadow={30}
        stickyHeader={false}
        sx={{ mb: 5 }}
        onRowClick={(item) => console.log(item)}
        hover={false}
      />
      <Typography variant="h4">Example 3</Typography>
      <CustomDataTable
        fetchData={(filters: FilterQuery[]) => {
          console.log(filters);
        }}
        data={data}
        headerItems={header}
        width="90vw"
        height="100vh"
        boxShadow={10}
        stickyHeader={true}
        sx={{ m: 5 }}
        onRowClick={(item) => console.log(item)}
      />
    </Box>
  );
};

export default TablePageTest;
