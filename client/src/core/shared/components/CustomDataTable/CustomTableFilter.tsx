import React, { useEffect, useRef } from "react";
import { Checkbox, FormControlLabel, Box, Button, Grid } from "@mui/material";
import Popper from "@mui/material/Popper";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { FilterColumn, HeaderItem } from ".";
import { useTableContext } from "./context";

const CustomTableFilter = () => {
  const { filterColumns, setFilterColumns, data, columnHeader } =
    useTableContext();

  //* ---------------------------------------- Handle Filter Popper
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popperRef.current &&
        !popperRef.current.contains(event.target as Node)
      ) {
        setAnchorEl(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //* ---------------------------------------- Get Filterable Columns

  // get filterable columns
  const getFilterableColumns = (): HeaderItem[] => {
    return columnHeader.filter((column) => column.filterable);
  };

  // get all unique values of the column in the data
  // const getSelectedFilterOptions = (columnId: string): FilterOption[] => {
  //   // filterColumns is the data that will be displayed in the filter
  //   //
  // };

  // get FilterColumns
  const getFilterColumns = (): FilterColumn[] => {
    // get filterable columns
    const filterColumns = getFilterableColumns();

    if (filterColumns.length === 0) {
      return [];
    }
    // get filter columns
    const filterColumnsData: FilterColumn[] = filterColumns.map((column) => {
      return {
        columnId: column.id,
        label: column.label,
        values: column.filterOptions ?? [],
        selectedValuesIds: (column.filterOptions ?? []).map(
          (option) => option.id
        ),
      };
    });

    return filterColumnsData;
  };

  useEffect(() => {
    const result: FilterColumn[] = getFilterColumns();
    setFilterColumns(result);
  }, [data]);

  useEffect(() => {
    console.log(filterColumns);
  }, [filterColumns]);

  //* ---------------------------------------- Handle Checking
  const handleCheck = (columnId: string, valueId: string) => {
    // find the column by columnId
    const column: FilterColumn = filterColumns.filter(
      (column) => column.columnId === columnId
    )[0];

    // Apply changes
    if (column) {
      // if the valueId is already in the selectedValuesIds, remove it
      if (column.selectedValuesIds.includes(valueId)) {
        column.selectedValuesIds = column.selectedValuesIds.filter(
          (id) => id !== valueId
        );
      } else {
        // if the valueId is not in the selectedValuesIds, add it
        column.selectedValuesIds.push(valueId);
      }
    }

    // Update column in filterColumns
    const newFilterColumns = filterColumns.map((filterColumn) => {
      if (filterColumn.columnId === columnId) {
        return column;
      }
      return filterColumn;
    });

    setFilterColumns(newFilterColumns);
  };

  const handleWholeColumnCheck = (columnId: string) => {
    // find the column by columnId
    const column: FilterColumn = filterColumns.filter(
      (column) => column.columnId === columnId
    )[0];

    // Apply changes
    if (column) {
      // Check if all are checked, then uncheck all, else check all
      if (column.selectedValuesIds.length === column.values.length) {
        column.selectedValuesIds = [];
      } else {
        column.selectedValuesIds = column.values.map((value) => value.id);
      }
    }

    // Update column in filterColumns
    const newFilterColumns = filterColumns.map((filterColumn) => {
      if (filterColumn.columnId === columnId) {
        return column;
      }
      return filterColumn;
    });

    // setFilterColumnsData(newFilterColumns);
    setFilterColumns(newFilterColumns);
  };

  //////////////////////////////////////////////////
  return (
    <>
      <Button onClick={handleClick}>
        <FilterListRoundedIcon id="filter-icon" />
      </Button>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        sx={{ zIndex: 1000 }}
      >
        <Box
          ref={popperRef}
          sx={{
            boxShadow: "0 0 6px #00000025",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "0 2rem",
          }}
        >
          <Grid container>
            {filterColumns.map((column: FilterColumn, index: number) => (
              <Grid item xs={4} key={index}>
                <Box
                  sx={{
                    padding: "1rem 0.5rem",
                    mr: 4,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <FormControlLabel
                    label={column.label}
                    value={column.label}
                    control={
                      <Checkbox
                        checked={
                          column.selectedValuesIds.length ===
                          column.values.length
                        }
                        indeterminate={
                          column.selectedValuesIds.length > 0 &&
                          column.selectedValuesIds.length < column.values.length
                        }
                        onChange={(_event) => {
                          handleWholeColumnCheck(column.columnId);
                        }}
                      />
                    }
                  />
                  <Box
                    sx={{ display: "flex", flexDirection: "column", ml: 2.5 }}
                  >
                    {column.values.map((value, index) => {
                      return (
                        <FormControlLabel
                          key={index}
                          label={value?.value}
                          value={value?.id}
                          control={
                            <Checkbox
                              checked={column.selectedValuesIds.includes(
                                value?.id
                              )}
                              onChange={(event) => {
                                console.log(event.target.checked);
                                handleCheck(column.columnId, value?.id);
                              }}
                            />
                          }
                        />
                      );
                    })}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Popper>
    </>
  );
};

export default CustomTableFilter;
