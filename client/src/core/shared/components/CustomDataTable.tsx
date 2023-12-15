import React, { useEffect, useRef, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableCellProps,
  SxProps,
  Box,
  Typography,
} from "@mui/material";
import TablesTollbar from "./tables/TablesTollbar";
import ColumnsSort from "./tables/ColumnsSort";

export interface HeaderItem {
  id: string;
  label: string;
  minWidth?: number;
  tableCellProps?: TableCellProps;
  format?: (value: number) => string;
  onClick?: () => void;
  isIcon?: boolean;
  icon?: React.ReactNode;
  component?: React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  searchable?: boolean;
}

interface Props<T> {
  data: T[];
  renderItem: HeaderItem[];
  width?: string;
  height?: string;
  boxShadow?: number;
  stickyHeader?: boolean;
  sx?: SxProps;
  onRowClick?: (row: T) => void;
  hover?: boolean;
}

const CustomDataTable = <T,>({
  data,
  renderItem,
  width,
  height,
  boxShadow,
  // stickyHeader = false,
  sx,
  onRowClick,
  hover = true,
}: Props<T>) => {
  const [filterdData, setFilterddData] = useState<any>(data);

  //////////////////////////// HANDLE SORTING ////////////////////////////
  const [sortColumn, setSortColumn] = useState<string>("SSN");
  const [click, setClick] = useState<boolean>(true);
  const [sort, setSort] = useState<{ sortColumn: string; sortType: string }>({
    sortColumn: "SSN",
    sortType: "ascending",
  });

  const checkFirstRender = useRef(true);
  const checkSecondRender = useRef(true);

  useEffect(() => {
    if (checkFirstRender.current) {
      checkFirstRender.current = false;
    } else {
      if (checkSecondRender.current) {
        checkSecondRender.current = false;
      } else {
        if (sortColumn === sort.sortColumn) {
          if (sort.sortType === "ascending") {
            setSort({
              sortColumn: sortColumn,
              sortType: "descending",
            });
          } else {
            setSort({
              sortColumn: sortColumn,
              sortType: "ascending",
            });
          }
        } else {
          setSort({
            sortColumn: sortColumn,
            sortType: "ascending",
          });
        }
      }
    }
  }, [click]);

  useEffect(() => {
    if (checkFirstRender.current) {
      checkFirstRender.current = false;
    } else {
      if (checkSecondRender.current) {
        checkSecondRender.current = false;
      } else {
        console.log(sort);
      }
    }
  }, [sort]);

  ////////////////////////////////////////////////////////////////////////
  //////////////////////////// HANDLE Search ////////////////////////////
  const [searchValue, setSearchValue] = useState<string>("");
  useEffect(() => {
    if (checkFirstRender.current) {
      checkFirstRender.current = false;
    } else {
      if (checkSecondRender.current) {
        checkSecondRender.current = false;
      } else {
        console.log(searchValue);
      }
    }
  }, [searchValue]);
////////////////////////////////////////////////////////////////////////
  return (
    <TableContainer
      component={Paper}
      sx={{
        overflowX: "visible",
        width: width,
        height: height,
        boxShadow: boxShadow,
        ...sx,
      }}
    >
      <TablesTollbar
        // columnHeader={item.id}
        setFilterdData={setFilterddData}
        data={data}
        setSearchValue={setSearchValue}
      />
      <Table
      //  stickyHeader={stickyHeader} aria-label="sticky table"
      >
        <TableHead>
          <TableRow>
            {renderItem.map((item) => (
              <TableCell
                key={item.id}
                {...item.tableCellProps}
                sx={{ minWidth: item.minWidth }}
              >
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography>
                    {item.component ? item.component : item.label}
                  </Typography>
                  {item.label ? (
                    <ColumnsSort
                      columnHeader={item.id}
                      setSortInfo={setSortColumn}
                      setClick={setClick}
                      click={click}
                      type={sort.sortType}
                      column={sort.sortColumn}
                    />
                  ) : // <FIlterTable
                  //   columnHeader={item.id}
                  //   setFilterdData={setFilterddData}
                  //   data={data}
                  // />
                  null}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filterdData.map((item: any) => (
            <TableRow
              key={(item as any).id}
              onClick={() => onRowClick && onRowClick(item)}
              hover={hover}
            >
              {renderItem.map((headerItem) =>
                headerItem.isIcon ? (
                  <TableCell
                    key={headerItem.id}
                    {...headerItem.tableCellProps}
                    sx={{ minWidth: headerItem.minWidth }}
                  >
                    {(item as any)["icon"]}
                  </TableCell>
                ) : (
                  <TableCell
                    key={headerItem.id}
                    {...headerItem.tableCellProps}
                    sx={{ minWidth: headerItem.minWidth }}
                  >
                    {(item as any)[headerItem.id]}
                  </TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomDataTable;
