import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { FilterColumn, HeaderItem, SearchQuery, SortedColumn } from ".";
import { isEqual } from "lodash";
import { Filter, FilterQuery } from "@/core/api";
import { initialPage, initialRowsPerPage } from "./CustomTablePagination";

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

const TableContext = createContext<TableContextType<any> | undefined>(
  undefined
);

export const useTableContext = <T,>() => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context as TableContextType<T>;
};

export const TableProvider = (props: {
  fetchData: (filters: FilterQuery[]) => void;
  initSortedColumn: SortedColumn;
  columnHeader: HeaderItem[];
  data: any[];
  children: React.ReactNode;
  resetControls?: boolean;
}) => {
  const { fetchData, initSortedColumn, columnHeader, data, resetControls } =
    props;

  const [filterColumns, setFilterColumns] = useState<FilterColumn[]>([]);
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    value: "",
  } as SearchQuery);
  const [sortedColumn, setSortedColumn] =
    useState<SortedColumn>(initSortedColumn);
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [reset, setReset] = useState(false);

  const prevValues = useRef({
    page,
    rowsPerPage,
    sortedColumn,
    searchQuery,
    filterColumns,
  });

  const initialRender = useRef(true);

  const fetchDataHandler = useCallback(
    (resetPage: boolean) => {
      console.log(page);
      console.log(rowsPerPage);
      console.log(sortedColumn);
      console.log(searchQuery);
      console.log(filterColumns);

      let filters: FilterQuery[] = [];

      if (searchQuery.value && searchQuery.columnId) {
        filters.push(Filter.like(searchQuery.columnId, searchQuery.value));
      }

      if (sortedColumn && sortedColumn.disableSort !== true) {
        if (sortedColumn.isAscending) {
          filters.push(Filter.sortAscending(sortedColumn.columnId));
        } else {
          filters.push(Filter.sortDescending(sortedColumn.columnId));
        }
      }

      if (resetPage) {
        filters.push(
          Filter.custom(`page=${initialPage + 1}&size=${initialRowsPerPage}`)
        );
        setPage(initialPage);
        setRowsPerPage(initialRowsPerPage);
      } else if (rowsPerPage) {
        filters.push(Filter.custom(`page=${page + 1}&size=${rowsPerPage}`));
      }

      const allOptionsSelected = filterColumns.every((column) => {
        return column.selectedValuesIds.length === column.values.length;
      });

      if (filterColumns.length > 0 && !allOptionsSelected) {
        filterColumns.forEach((column) => {
          if (column.selectedValuesIds.length > 0) {
            filters.push(
              Filter.anyOf(column.columnId, column.selectedValuesIds)
            );
          }
        });
      }

      fetchData(filters);

      if (initialRender.current) {
        initialRender.current = false;
      }
    },
    [
      page,
      rowsPerPage,
      sortedColumn,
      searchQuery,
      filterColumns,
      columnHeader,
      fetchData,
    ]
  );

  const applyFiltersHandler = useCallback(() => {
    const {
      page: prevPage,
      rowsPerPage: prevRowsPerPage,
      sortedColumn: prevSortedColumn,
      searchQuery: prevSearchQuery,
      filterColumns: prevFilterColumns,
    } = prevValues.current;

    const pageChanged = prevPage !== page;
    const rowsPerPageChanged = prevRowsPerPage !== rowsPerPage;
    const sortedColumnChanged = prevSortedColumn !== sortedColumn;
    const searchQueryChanged = !isEqual(prevSearchQuery, searchQuery);
    const filterColumnsChanged = !isEqual(prevFilterColumns, filterColumns);

    console.log("pageChanged", pageChanged);
    console.log("rowsPerPageChanged", rowsPerPageChanged);
    console.log("sortedColumnChanged", sortedColumnChanged);
    console.log("searchQueryChanged", searchQueryChanged);
    console.log("filterColumnsChanged", filterColumnsChanged);
    console.log("initialRender", initialRender.current);

    if (
      pageChanged ||
      rowsPerPageChanged ||
      sortedColumnChanged ||
      searchQueryChanged ||
      filterColumnsChanged ||
      initialRender.current
    ) {
      fetchDataHandler(
        sortedColumnChanged || searchQueryChanged || filterColumnsChanged
      );
    }

    prevValues.current = {
      page,
      rowsPerPage,
      sortedColumn,
      searchQuery,
      filterColumns,
    };
  }, [
    page,
    rowsPerPage,
    sortedColumn,
    searchQuery,
    filterColumns,
    fetchDataHandler,
  ]);

  useEffect(() => {
    if (!reset) {
      applyFiltersHandler();
    }
  }, [
    page,
    rowsPerPage,
    sortedColumn,
    searchQuery,
    filterColumns,
    reset,
    applyFiltersHandler,
  ]);

  const resetFilters = useCallback(() => {
    initialRender.current = true;
    setFilterColumns([]);
    setSearchQuery({ value: "" });
    setSortedColumn(initSortedColumn);
    setPage(initialPage);
    setRowsPerPage(initialRowsPerPage);
    setReset(true);

    prevValues.current = {
      page: initialPage,
      rowsPerPage: initialRowsPerPage,
      sortedColumn: initSortedColumn,
      searchQuery: { value: "" },
      filterColumns: [],
    };
  }, [initSortedColumn]);

  useEffect(() => {
    if (resetControls) {
      resetFilters();
      fetchDataHandler(true);
    }
  }, [resetControls, resetFilters, fetchDataHandler]);

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
