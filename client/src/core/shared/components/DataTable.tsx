import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";

export interface TableColumn {
  id: string;
  label: string;
  icon?: React.ReactNode;
  minWidth?: number;
  align?: "right" | "left" | "center" | "inherit" | "justify" | undefined;
  format?: (value: number) => string;
  onClick?: ({ props }: any) => void;
}

const DataTable = ({
  rows,
  columns,
  onClickRow,
}: {
  rows: any;
  columns: readonly TableColumn[];
  onClickRow?: ({ props }: any) => void;
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ height: "calc(100vh - 200px)" }}>
        <Table stickyHeader aria-label="sticky table">
          <colgroup>
            <col style={{ width: "100%" }} />
          </colgroup>
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                if (column.id === "icon") {
                  return (
                    <TableCell
                      key={column.label}
                      align={column.align}
                    ></TableCell>
                  );
                }

                return (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: typeof rows) => {
                return (
                  <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                    {columns.map((column) => {
                      const value = row[column.id as keyof typeof row];
                      if (column.id === "icon") {
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            <IconButton
                              aria-label={column.label}
                              onClick={() => {
                                column.onClick && column.onClick(row);
                              }}
                              size="small"
                            >
                              {column.icon}
                            </IconButton>
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable;
