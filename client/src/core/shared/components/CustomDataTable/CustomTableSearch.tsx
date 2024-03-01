import React, { useRef } from "react";

import {
  Box,
  FormControl,
  InputAdornment,
  InputBase,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

interface CustomTableSearchProps {
  columnHeader: any[];
  setSearchValue: Function;
}
const CustomTableSearch = ({
  columnHeader,
  setSearchValue,
}: CustomTableSearchProps) => {
  const search = useRef("");

  const SearchOptions: string[] = [];
  const handleSearchOptions = () => {
    columnHeader.map((item: any) => {
      item.searchable && SearchOptions.push(item.label);
    });
    return SearchOptions;
  };

  console.log(handleSearchOptions());
  const [searchOn, setSearchOn] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSearchOn(event.target.value as string);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      <InputAdornment position="start">
        <SearchRoundedIcon
          sx={{ cursor: "pointer" }}
          onClick={() => document.getElementById("table-search-field")?.focus()}
        />
      </InputAdornment>
      <FormControl sx={{ width: "12rem" }} size="small">
        {/* <InputLabel id="demo-simple-select-label">بحـــث عن</InputLabel> */}
        <Select
          displayEmpty
          value={searchOn}
          onChange={handleChange}
          // input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>بحـــث عن</em>;
            }

            return selected;
          }}
          sx={{
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": {
              border: 0,
              borderRight: "1px solid #00000030",
              borderRadius: "0",
            },
          }}
        >
          {SearchOptions.map((option: string, idx: number) => (
            <MenuItem value={option} key={idx}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <InputBase
        id="table-search-field"
        sx={{ ml: 1, flex: 1 }}
        placeholder="بحـــث"
        onChange={(e) => (
          setSearchValue(e.target.value), (search.current = e.target.value)
        )}
      />
    </Box>
  );
};

export default CustomTableSearch;
