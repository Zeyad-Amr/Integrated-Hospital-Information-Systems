import { InputAdornment, InputBase, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

interface FIlterTableProps {
  columnHeader: string;
  data: [];
  setFilterdData: any;
  setSearchValue: Function;
}

const TablesTollbar = ({
  //   columnHeader,
  data,
  setFilterdData,
  setSearchValue,
}: FIlterTableProps) => {
  const myDivRef: any = useRef(null);
  const search = useRef("");

  const [filterMenuDisplay, setFilterMenuDisplay] =
    React.useState<string>("none");

  const handleClick = () => {
    setFilterMenuDisplay("block");
  };

  // const handleColumnData = (data: []) => {
  //   let rowData: {}[] = [];
  //   let columnHeaders: string[] = [];
  //   let finalArray: any[] = [];
  //   columnHeaders = Object.keys(data[0]);
  //   for (let i = 0; i < data.length; i++) {
  //     rowData.push(Object.values(data[i]));
  //   }
  //   const columnsData = rowData.map((_, Idx: number) =>
  //     rowData.map((row: any) => row[Idx])
  //   );

  //   columnHeaders.map((header: string, Idx: number) => {
  //     finalArray.push({ header: header, columnData: columnsData[Idx] });
  //   });
  //   return [columnHeaders, columnsData];
  // };

  // const getUniqueColumnData = (ColumnData: []) => {
  //   let uniqueArray = ColumnData.filter(function (item, pos) {
  //     return ColumnData.indexOf(item) == pos;
  //   });
  //   return uniqueArray;
  // };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        myDivRef.current &&
        !myDivRef.current.contains(event.target) &&
        event.target.id !== "filter-icon"
      ) {
        setFilterMenuDisplay("none");
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [myDivRef]);

  const handleSearch = (data: [], search: string) => {
    return data.filter((obj) =>
      Object.values(obj).some(
        (value) => typeof value === "string" && value.includes(search)
      )
    );
  };



  const [checked, setChecked] = React.useState([true, false, false]);
  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setChecked([event.target.checked, event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1], checked[2]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked, checked[2]]);
  };
  
  const handleChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], checked[1], event.target.checked]);
  };
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        padding: "0.5rem 2rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <InputAdornment position="start">
          <SearchRoundedIcon
            sx={{ cursor: "pointer" }}
            onClick={() =>
              document.getElementById("table-search-field")?.focus()
            }
          />
        </InputAdornment>
        <InputBase
          id="table-search-field"
          sx={{ ml: 1, flex: 1 }}
          placeholder="بحـــث"
          onChange={(e) => (
            setSearchValue(e.target.value),
            (search.current = e.target.value),
            setFilterdData([...handleSearch(data, search.current)])
          )}
        />{" "}
      </Box>
      <FilterListRoundedIcon
        id="filter-icon"
        sx={{ cursor: "pointer" }}
        onClick={() => handleClick()}
      />
      <Box
        ref={myDivRef}
        sx={{
          display: filterMenuDisplay,
          position: "absolute",
          boxShadow: "0 0 6px #00000025",
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "0 2rem",
          right: "-2rem",
          top: "3rem",
          zIndex: "1001",
        }}
      >
        <Box
          sx={{
            padding: "0.5rem 0.5rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* <FormControlLabel control={<Checkbox />} label={"الوظيفــة"} onChange={(e) => console.log(e.target.checked)}/> */}
          <FormControlLabel
            label="الوظيفــة"
            value="الوظيفــة"
            control={
              <Checkbox
                checked={checked[0] && checked[1] && checked[1]}
                indeterminate={checked[0] !== checked[1] || checked[0] !== checked[2] || checked[1] !== checked[2]}
                onChange={handleChange1}
              />
            }
          />
          <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
            <FormControlLabel
              label="Child 1"
              value="Child 1"
              control={
                <Checkbox checked={checked[0]} onChange={handleChange2} />
              }
            />
            <FormControlLabel
              label="Child 2"
              value="Child 2"
              control={
                <Checkbox checked={checked[1]} onChange={handleChange3} />
              }
            />
            <FormControlLabel
              label="Child 3"
              value="Child 3"
              control={
                <Checkbox checked={checked[2]} onChange={handleChange4} />
              }
            />
          </Box>
          {/* <FormControlLabel
            label="الوظيفــة"
            control={
              <Checkbox
                checked={checked[0] && checked[1]}
                indeterminate={checked[0] !== checked[1]}
                onChange={handleChange1}
              />
            }
          />
          <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
            <FormControlLabel
              label="Child 1"
              control={
                <Checkbox checked={checked[0]} onChange={handleChange2} />
              }
            />
            <FormControlLabel
              label="Child 2"
              control={
                <Checkbox checked={checked[1]} onChange={handleChange3} />
              }
            />
          </Box>
          <FormControlLabel
            label="الوظيفــة"
            control={
              <Checkbox
                checked={checked[0] && checked[1]}
                indeterminate={checked[0] !== checked[1]}
                onChange={handleChange1}
              />
            }
          />
          <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
            <FormControlLabel
              label="Child 1"
              control={
                <Checkbox checked={checked[0]} onChange={handleChange2} />
              }
            />
            <FormControlLabel
              label="Child 2"
              control={
                <Checkbox checked={checked[1]} onChange={handleChange3} />
              }
            />
          </Box> */}

        </Box>
      </Box>
    </Box>
  );
};

export default TablesTollbar;
