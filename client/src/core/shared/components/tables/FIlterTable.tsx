import React, { useEffect, useRef, useState } from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Box } from "@mui/system";
import { Input, InputAdornment, Typography } from "@mui/material";

import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import SortRoundedIcon from "@mui/icons-material/SortRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DropDownMenu from "../DropDownMenu";

export interface FIlterTableProps {
  columnHeader: string;
  data: [];
  setFilterdData: any;
}

const handleColumnData = (data: [], columnHeader: string) => {
  let ColumnData: [] = [];
  data.map((item) => ColumnData.push(item[columnHeader]));
  return ColumnData;
};

const getUniqueColumnData = (ColumnData: []) => {
  let uniqueArray = ColumnData.filter(function (item, pos) {
    return ColumnData.indexOf(item) == pos;
  });
  return uniqueArray;
};

const sortData = (data: [], header: string, type: string) => {
  let sortedData: [] = data;
  if (type === "Ascending") {
    sortedData = data.sort((a: any, b: any) =>
      a[header] > b[header] ? 1 : -1
    );
  } else if (type === "Decending") {
    sortedData = data.sort((a: any, b: any) =>
      a[header] < b[header] ? 1 : -1
    );
  }

  return sortedData;
};

const handleSearch = (data: [], header: string, search: string) => {
  return data.filter((obj) =>
    Object.values(obj).some(
      (value) => typeof value === "string" && value.includes(search)
    )
  );

  // let found = data.filter(function (el: any) {
  //   return el[header].includes(search);
  // });
  // return found;
};



const FIlterTable = ({
  columnHeader,
  data,
  setFilterdData,
}: FIlterTableProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    search.current = "";
  };

  const search = useRef("");

  // useEffect(() => {
  //   console.log(search);
  // }, [search]);

  return (
    <Box sx={{ height: "100%", position: "relative" }}>
      <KeyboardArrowDownRoundedIcon
        sx={{ cursor: "pointer", marginX: "0.5rem" }}
        onClick={(event: any) => handleClick(event)}
      />
      <DropDownMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {/* <InputLabel htmlFor="input-with-icon-adornment">بحـــث</InputLabel> */}
        <Input
          // sx={{padding:' 0 1rem', boxSizing: 'border-box'}}

          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          }
          onChange={(e) => (
            (search.current = e.target.value),
            setFilterdData([
              ...handleSearch(data, columnHeader, search.current),
            ])
          )}
        />
        <MenuItem
          sx={{ padding: "0.5rem 1rem" }}
          onClick={() => (
            handleClose(),
            setFilterdData([...sortData(data, columnHeader, "Ascending")])
          )}
          disableRipple
        >
          <SortRoundedIcon sx={{ color: "primary.darker" }} />
          تــرتيب تصـــاعدي
        </MenuItem>
        <MenuItem
          sx={{ padding: "0.5rem 1rem" }}
          onClick={() => (
            handleClose(),
            setFilterdData([...sortData(data, columnHeader, "Decending")])
          )}
          disableRipple
        >
          <SortRoundedIcon sx={{ color: "primary.darker" }} />
          تــرتيب تنـــازلي
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <Box sx={{ paddingLeft: "1rem", margin: "1rem 0", display: "flex" }}>
          <FilterListRoundedIcon />

          <Typography
            sx={{
              color: "primary.darker",
              marginLeft: "1rem",
              fontWeight: "600",
            }}
          >
            تـــرشيح
          </Typography>
        </Box>
      </DropDownMenu>
    </Box>
  );
};

export default FIlterTable;
