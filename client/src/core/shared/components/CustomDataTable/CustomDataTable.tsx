import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  SxProps,
  Box,
  Typography,
  Tooltip,
  TablePagination,
} from "@mui/material";
import CustomTableTollbar from "./CustomTableTollbar";
import ColumnsSort from "./ColumnsSort";
import { HeaderItem } from "../CustomBasicTable";
import utilsFunctions from "../../utils/functions";

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
  rowHeight?: string;
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
  rowHeight = "1rem",
}: Props<T>) => {
  //* ----------------------- Handle Pagination
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [filterdData, setFilterddData] = useState<any>([
    ...data,
    ...data,
    ...data,
    ...data,
  ]);

  //* ----------------------- Handle Sorting
  const [sortColumn, setSortColumn] = useState<string>("SSN");
  const [click, setClick] = useState<boolean>(true);
  const [sort, setSort] = useState<{ sortColumn: string; sortType: string }>({
    sortColumn: "SSN",
    sortType: "ascending",
  });

  useEffect(() => {
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
  }, [click]);

  useEffect(() => {
    console.log(sort);
  }, [sort]);

  //* ----------------------- Handle Searching
  const [searchValue, setSearchValue] = useState<string>("");
  useEffect(() => {
    console.log(searchValue);
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
        <CustomTableTollbar
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
                    ) : null}
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
                        height: rowHeight,
                      }}
                    >
                      <Box
                        sx={{
                          height: rowHeight,
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
                        height: rowHeight,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <Tooltip
                        enterDelay={1000}
                        title={(item as any)[headerItem.id]}
                      >
                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                            textAlign: "center", // Center the text horizontally
                            lineHeight: rowHeight, // Center the text vertically
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            direction: !utilsFunctions.startsWithArabic(
                              (item as any)[headerItem.id]
                            )
                              ? "rtl"
                              : "ltr",
                            display: "inline-block", // Ensure ellipsis works properly
                            maxWidth: "100%", // Ensure text doesn't overflow TableCell
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
      <Box
        sx={{
          width: width,
        }}
      >
        <TablePagination
          component="div"
          count={filterdData.length}
          page={page}
          showFirstButton
          showLastButton
          labelRowsPerPage={"صفوف في كل صفحة"}
          labelDisplayedRows={({ from, to, count }) => {
            return `${from}-${to} من ${count !== -1 ? count : `أكثر من ${to}`}`;
          }}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 100]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default CustomDataTable;
