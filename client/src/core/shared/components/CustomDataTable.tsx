import React from "react";
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
} from "@mui/material";

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
  stickyHeader = false,
  sx,
  onRowClick,
  hover = true,
}: Props<T>) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: width,
        height: height,
        boxShadow: boxShadow,
        ...sx,
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
                {item.component ? item.component : item.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
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
