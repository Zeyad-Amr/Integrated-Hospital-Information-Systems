import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { FilterColumn, HeaderItem, SearchQuery, SortedColumn } from ".";
import { isEqual } from "lodash";

// Define the type for TableContext
interface TableContextType<T> {
  filterColumns: FilterColumn[];
  setFilterColumns: React.Dispatch<React.SetStateAction<FilterColumn[]>>;
  columnHeader: HeaderItem[];
  data: T[];
  searchQuery?: SearchQuery;
  setSearchQuery: React.Dispatch<React.SetStateAction<SearchQuery>>;
  sortedColumn?: SortedColumn;
  setSortedColumn: React.Dispatch<React.SetStateAction<SortedColumn>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

// Create the TableContext
const TableContext = createContext<TableContextType<any> | undefined>(
  undefined
);

// Custom hook to use the TableContext
export const useTableContext = <T,>() => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context as TableContextType<T>;
};

// TableProvider component to wrap your application and provide the context
export const TableProvider = (props: any) => {
  const { applyFilters, initSortedColumn, columnHeader, data } = props;

  const [filterColumns, setFilterColumns] = useState<FilterColumn[]>([]);
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    value: "",
  } as SearchQuery);
  const [sortedColumn, setSortedColumn] =
    useState<SortedColumn>(initSortedColumn);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const prevPage = useRef(page);
  const prevRowsPerPage = useRef(rowsPerPage);
  const prevSortedColumn = useRef(sortedColumn);
  const prevSearchQuery = useRef(searchQuery);
  const prevFilterColumns = useRef(filterColumns);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      // Skip the initial render
      initialRender.current = false;
      return;
    }

    // Check if any of the values have changed
    const pageChanged = prevPage.current !== page;
    const rowsPerPageChanged = prevRowsPerPage.current !== rowsPerPage;
    const sortedColumnChanged = prevSortedColumn.current !== sortedColumn;
    const searchQueryChanged = !isEqual(prevSearchQuery.current, searchQuery);
    const filterColumnsChanged = !isEqual(
      prevFilterColumns.current,
      filterColumns
    );

    console.log("pageChanged", pageChanged);
    console.log("rowsPerPageChanged", rowsPerPageChanged);
    console.log("sortedColumnChanged", sortedColumnChanged);
    console.log("searchQueryChanged", searchQueryChanged);
    console.log("filterColumnsChanged", filterColumnsChanged);

    // Update the previous values
    prevPage.current = page;
    prevRowsPerPage.current = rowsPerPage;
    prevSortedColumn.current = sortedColumn;
    prevSearchQuery.current = searchQuery;
    prevFilterColumns.current = filterColumns;

    // If any value has changed, apply filters
    if (
      pageChanged ||
      rowsPerPageChanged ||
      sortedColumnChanged ||
      searchQueryChanged ||
      filterColumnsChanged
    ) {
      // Logic for handling Pagination
      console.log(page);
      console.log(rowsPerPage);

      // Logic for handling Sorting
      console.log(sortedColumn);

      // Logic for handling Searching
      console.log(searchQuery);

      // Logic for handling Filtering
      console.log(filterColumns);

      // Apply filters
      applyFilters([]);
    }
  }, [page, rowsPerPage, sortedColumn, searchQuery, filterColumns]);

  return (
    <TableContext.Provider
      value={{
        filterColumns,
        setFilterColumns,
        searchQuery,
        setSearchQuery,
        sortedColumn,
        setSortedColumn,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        columnHeader,
        data,
      }}
    >
      {props.children}
    </TableContext.Provider>
  );
};
