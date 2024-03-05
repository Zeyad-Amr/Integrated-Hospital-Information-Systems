import React from "react";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import { Box } from "@mui/system";
import { SortedColumn } from ".";

interface Props {
  columnId: string;
  setSortedColumn: (sortableColumn: SortedColumn) => void;
  sortableColumn: SortedColumn;
}
const CustomColumnSort = ({
  columnId,
  setSortedColumn,
  sortableColumn,
}: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        position: "relative",
        cursor: "pointer",
        marginX: "0.5rem",
        opacity: `${sortableColumn.columnId === columnId ? "1" : "0.2"}`,
        transition: "0.2s",
        transform: `rotate(${
          sortableColumn.isAscending && sortableColumn.columnId === columnId
            ? 0
            : -180
        }deg)`,
        transformOrigin: "50% 50%",
        "&:hover": {
          opacity: `${sortableColumn.columnId === columnId ? "1" : "0.7"}`,
        },
      }}
      onClick={() => {
        setSortedColumn({
          columnId: columnId,
          isAscending:
            sortableColumn.columnId === columnId
              ? !sortableColumn.isAscending
              : true,
        });
      }}
    >
      <ArrowUpwardRoundedIcon />
    </Box>
  );
};

export default CustomColumnSort;
