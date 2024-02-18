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
  Tooltip,
} from "@mui/material";
import TablesTollbar from "./tables/TablesTollbar";
import ColumnsSort from "./tables/ColumnsSort";

export interface HeaderItem {
  id: string;
  label: string;
  minWidth?: number;
  maxWidth?: number;
  tableCellProps?: TableCellProps;
  format?: (value: number) => string;
  onClick?: () => void;
  isIcon?: boolean;
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
  variantBackground?: boolean;
}

const CustomDataTable = <T,>({
  data,
  renderItem,
  width = "80vw",
  height = "70vh",
  boxShadow = 10,
  stickyHeader = false,
  sx,
  onRowClick,
  hover = true,
  variantBackground = true,
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: width,
        height: height,
        ...sx,
      }}
    >
      <Box
        sx={{
          width: width,
        }}
      >
        <TablesTollbar
          columnHeader={renderItem}
          setFilterdData={setFilterddData}
          setSearchValue={setSearchValue}
        />
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          width: width,
          height: "100%",
          boxShadow: boxShadow,
        }}
      >
        <Table stickyHeader={stickyHeader} aria-label="sticky table">
          <TableHead>
            <TableRow>
              {renderItem.map((item) => (
                <TableCell
                  key={item.id}
                  {...item.tableCellProps}
                  sx={{ minWidth: item.minWidth }}
                >
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                      }}
                    >
                      {item.component ? item.component : item.label}
                    </Typography>
                    {item.sortable ? (
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
            {filterdData.map((item: any, index: number) => (
              <TableRow
                key={(item as any).id}
                onClick={() => onRowClick && onRowClick(item)}
                hover={hover}
                sx={{
                  backgroundColor:
                    variantBackground && index % 2 === 0 ? "white" : "#f5f5f5",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                {renderItem.map((headerItem) =>
                  headerItem.isIcon ? (
                    <TableCell
                      key={headerItem.id}
                      {...headerItem.tableCellProps}
                      sx={{
                        minWidth: headerItem.minWidth,
                        maxWidth: headerItem.maxWidth,
                        height: "1rem",
                      }}
                    >
                      <Box
                        sx={{
                          height: "1rem",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {(item as any)["icon"]}
                      </Box>
                    </TableCell>
                  ) : (
                    <TableCell
                      key={headerItem.id}
                      {...headerItem.tableCellProps}
                      sx={{
                        minWidth: headerItem.minWidth,
                        maxWidth: headerItem.maxWidth,
                        height: "1rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Tooltip
                        enterDelay={1000}
                        title={(item as any)[headerItem.id]}
                      >
                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                            wordWrap: "break-word",
                            height: "1rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {(item as any)[headerItem.id]}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomDataTable;
