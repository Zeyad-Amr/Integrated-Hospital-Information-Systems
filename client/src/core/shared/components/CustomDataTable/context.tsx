import React, { createContext, useContext, useEffect, useState } from "react";
import { FilterColumn, HeaderItem, SearchQuery, SortedColumn } from ".";

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
  const { applyQuery, initSortedColumn, columnHeader, data } = props;

  const [filterColumns, setFilterColumns] = useState<FilterColumn[]>([]);
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    value: "",
  } as SearchQuery);
  const [sortedColumn, setSortedColumn] =
    useState<SortedColumn>(initSortedColumn);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //* ----------------------- Handle Pagination
  useEffect(() => {
    console.log(page);
    console.log(rowsPerPage);
    applyQuery(`page=${page + 1}&limit=${rowsPerPage}`);
  }, [page, rowsPerPage]);

  //* ----------------------- Handle Sorting
  useEffect(() => {
    console.log(sortedColumn);
    applyQuery(
      `sort=${sortedColumn.columnId}&order=${
        sortedColumn.isAscending ? "asc" : "desc"
      }`
    );
  }, [sortedColumn]);

  //* ----------------------- Handle Searching
  useEffect(() => {
    console.log(searchQuery);
    applyQuery(`search=${searchQuery.value}`);
  }, [searchQuery]);

  //* ----------------------- Handle Filtering
  useEffect(() => {
    console.log(filterColumns);
    const filterQuery = filterColumns
      .map((filter) => {
        return filter.selectedValuesIds
          .map((valueId) => `${filter.columnId}=${valueId}`)
          .join("&");
      })
      .join("&");
    applyQuery(filterQuery);
  }, [filterColumns]);

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
