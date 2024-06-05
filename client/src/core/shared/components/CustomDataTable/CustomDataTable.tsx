import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import CustomTableTollbar from "./CustomTableToolbar";
import CustomColumnSort from "./CustomColumnSort";
import utilsFunctions from "../../utils/functions";
import CustomTablePagination from "./CustomTablePagination";
import { TableProvider } from "./context";
import { CustomDataTableProps } from "./types";

/**
 * @param {fetchData} - The function to apply the query to the data.
 * @param {T[]} data - The array of data items to be rendered.
 * @param {number} totalItems - The total number of items in the data array.
 * @param {HeaderItem[]} headerItems - The array of header items to define the table columns.
 * @param {string} [width] - The width of the table (optional).
 * @param {string} [height] - The height of the table (optional).
 * @param {number} [boxShadow] - The level of shadow for the table (optional).
 * @param {boolean} [stickyHeader] - Whether the table header should stick to the top (optional).
 * @param {SxProps} [sx] - The custom styling props for the table (optional).
 * @param {(row: T) => void} [onRowClick] - The callback function triggered when a row is clicked (optional).
 * @param {boolean} [hover] - Whether to enable hover effect on rows (optional).
 * @param {boolean} [variantBackground] - Whether to apply a variant background color to rows (optional).
 * @param {string} [rowHeight] - The height of each row (optional).
 * @param {string} [rowPaddingY] - The padding of each row (optional).
 * @param {SortedColumn} initSortedColumn - The initial sorted column.
 */
/** */

const CustomDataTable = <T,>({
  fetchData,
  data,
  totalItems,
  headerItems,
  width = "100%",
  height = "80vh",
  boxShadow = 5,
  stickyHeader = true,
  sx = { mb: 5 },
  onRowClick,
  hover = true,
  variantBackground = true,
  rowHeight = "1rem",
  rowPaddingY = "0.1rem",
  initSortedColumn = headerItems.filter((item) => item.searchable).length > 0
    ? {
        isAscending: true,
        columnId: headerItems.filter((item) => item.searchable)[0].id,
      }
    : {
        disableSort: true,
        columnId: "",
        isAscending: true,
      },
  resetControls = false,
}: CustomDataTableProps<T>) => {
  const filterdData = [...data];

  ////////////////////////////////////////////////////////////////////////
  return (
    <TableProvider
      data={data}
      fetchData={fetchData}
      columnHeader={headerItems}
      initSortedColumn={initSortedColumn}
      resetControls={resetControls}
    >
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
          <CustomTableTollbar />
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
                {headerItems
                  .filter(
                    (item) =>
                      item.display === undefined || item.display === true
                  )
                  .map((item) => (
                    <TableCell
                      key={item.id}
                      {...item.tableCellProps}
                      sx={{ minWidth: item.minWidth, zIndex: 1 }}
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
                          <CustomColumnSort columnId={item.id} />
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
                      variantBackground && index % 2 === 0
                        ? "white"
                        : "#f5f5f5",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                >
                  {headerItems
                    .filter(
                      (item) =>
                        item.display === undefined || item.display === true
                    )
                    .map((headerItems) =>
                      headerItems.isIcon ? (
                        <TableCell
                          key={headerItems.key}
                          {...headerItems.tableCellProps}
                          sx={{
                            paddingY: rowPaddingY,
                            minWidth: headerItems.minWidth,
                            maxWidth: headerItems.maxWidth,
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
                      ) : headerItems.isComponent ? (
                        <TableCell
                          key={headerItems.key}
                          {...headerItems.tableCellProps}
                          sx={{
                            paddingY: rowPaddingY,
                            minWidth: headerItems.minWidth,
                            maxWidth: headerItems.maxWidth,
                            height: rowHeight,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "0.8rem",
                              textAlign: "center", // Center the text horizontally
                              lineHeight: rowHeight, // Center the text vertically
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: "100%", // Ensure text doesn't overflow TableCell
                            }}
                          >
                            {(item as any)[headerItems.key]}
                          </Typography>
                        </TableCell>
                      ) : (
                        <TableCell
                          key={headerItems.key}
                          {...headerItems.tableCellProps}
                          sx={{
                            minWidth: headerItems.minWidth,
                            maxWidth: headerItems.maxWidth,
                            height: rowHeight,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Tooltip
                            enterDelay={1000}
                            title={
                              typeof (item as any)[headerItems.key] === "object"
                                ? (item as any)[headerItems.key].value
                                : (item as any)[headerItems.key]
                            }
                          >
                            <Typography
                              sx={{
                                fontSize: "0.8rem",
                                textAlign: "center", // Center the text horizontally
                                lineHeight: rowHeight, // Center the text vertically
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                direction: !utilsFunctions.startsWithArabic(
                                  typeof (item as any)[headerItems.key] ===
                                    "object"
                                    ? (item as any)[headerItems.key].value
                                    : (item as any)[headerItems.key]
                                )
                                  ? "rtl"
                                  : "ltr",
                                maxWidth: "100%", // Ensure text doesn't overflow TableCell
                              }}
                            >
                              {typeof (item as any)[headerItems.key] ===
                              "object"
                                ? (item as any)[headerItems.key].value
                                : (item as any)[headerItems.key]}
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
          <CustomTablePagination dataLength={totalItems} />
        </Box>
      </Box>
    </TableProvider>
  );
};

export default CustomDataTable;
