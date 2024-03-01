import { Box } from "@mui/system";
import React from "react";
import { HeaderItem } from "../CustomBasicTable";
import { CustomTableFilter, CustomTableSearch } from ".";

interface FIlterTableProps {
  columnHeader: HeaderItem[];
  setFilterdData: Function;
  setSearchValue: Function;
}

const CustomTablesToolbar = ({
  columnHeader,
  setSearchValue,
}: FIlterTableProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        padding: "0.3rem 1rem",
        marginBottom: "0.5rem",
        boxShadow: "0 0 6px #00000025",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <CustomTableSearch
        columnHeader={columnHeader}
        setSearchValue={setSearchValue}
      />
      <CustomTableFilter />
    </Box>
  );
};

export default CustomTablesToolbar;
