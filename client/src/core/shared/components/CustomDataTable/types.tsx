import { TableCellProps } from "@mui/material";

/**
 * The interface for the header item.
 * @param {string} id - The id of the header item.
 * @param {string} label - The label of the header item.
 * @param {number} [minWidth] - The minimum width of the header item (optional).
 * @param {number} [maxWidth] - The maximum width of the header item (optional).
 * @param {TableCellProps} [tableCellProps] - The custom table cell props for the header item (optional).
 * @param {(value: number) => string} [format] - The custom format function for the header item (optional).
 * @param {() => void} [onClick] - The callback function triggered when the header item is clicked (optional).
 * @param {boolean} [isIcon] - Whether the header item is an icon (optional).
 * @param {React.ReactNode} [component] - The custom component for the header item (optional).
 * @param {boolean} [sortable] - Whether the header item is sortable (optional).
 * @param {boolean} [filterable] - Whether the header item is filterable (optional).
 * @param {boolean} [searchable] - Whether the header item is searchable (optional).
 */
interface HeaderItem {
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

/**
 * The interface for the sortable column.
 * @param {string} id - The id of the sortable column.
 * @param {boolean} isAscending - Whether the column is sorted in ascending order.
 */
interface SortedColumn {
  id: string;
  isAscending: boolean;
}

export type { HeaderItem, SortedColumn };
