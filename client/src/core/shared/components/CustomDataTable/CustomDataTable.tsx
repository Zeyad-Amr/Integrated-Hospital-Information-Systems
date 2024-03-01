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
import CustomTableTollbar from "./CustomTableToolbar";
import CustomColumnSort from "./CustomColumnSort";
import { HeaderItem, SortedColumn } from "./types";
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
  initSortedColumn?: SortedColumn;
}
/**
 * @param {T[]} data - The array of data items to be rendered.
 * @param {HeaderItem[]} renderItem - The array of header items to define the table columns.
 * @param {string} [width] - The width of the table (optional).
 * @param {string} [height] - The height of the table (optional).
 * @param {number} [boxShadow] - The level of shadow for the table (optional).
 * @param {boolean} [stickyHeader] - Whether the table header should stick to the top (optional).
 * @param {SxProps} [sx] - The custom styling props for the table (optional).
 * @param {(row: T) => void} [onRowClick] - The callback function triggered when a row is clicked (optional).
 * @param {boolean} [hover] - Whether to enable hover effect on rows (optional).
 * @param {boolean} [variantBackground] - Whether to apply a variant background color to rows (optional).
 * @param {string} [rowHeight] - The height of each row (optional).
 * @param {SortedColumn} initSortedColumn - The initial sorted column.
 */
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
  initSortedColumn = { id: renderItem[0].id, isAscending: true },
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
  const [sortedColumn, setSortedColumn] =
    useState<SortedColumn>(initSortedColumn);

  useEffect(() => {
    console.log(sortedColumn);
  }, [sortedColumn]);

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
                  sx={{ minWidth: item.minWidth, zIndex: 0 }}
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
                      <CustomColumnSort
                        columnId={item.id}
                        setSortedColumn={setSortedColumn}
                        sortableColumn={sortedColumn}
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
