import React from "react";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import { Box } from "@mui/system";

const ColumnsSort = ({
  columnHeader,
  setSortInfo,
  setClick,
  click,
  type,
  column,
}: any) => {
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
        opacity: `${column === columnHeader ? "1" : "0.2"}`,
        transition: "0.2s",
        transform: `rotate(${
          type === "ascending" && column === columnHeader ? 0 : -180
        }deg)`,
        transformOrigin: "50% 50%",
        "&:hover": {
          opacity: `${column === columnHeader ? "1" : "0.7"}`,
        },
      }}
      onClick={() => (setClick(!click), setSortInfo(columnHeader))}
    >
      <ArrowUpwardRoundedIcon />
    </Box>
  );
};

export default ColumnsSort;
