import { Box, Typography } from "@mui/material";
import { SidebarContext } from "../context/context";
import React, { useContext } from "react";
// import { ExpandLess, ExpandMore } from "@mui/icons-material";
interface SidebarMenuItemProps {
  icon: React.ReactNode;
  text: string;
  path: string;
  active: boolean;
  children?: React.ReactNode;
}

const SidebarMenuItem = ({
  icon,
  text,
  path,
  active,
  children,
}: SidebarMenuItemProps) => {
  const { collapsed } = useContext(SidebarContext);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",

        flexWrap: "nowrap",

        cursor: "pointer",
        backgroundColor: "common.white",
        borderRadius: "10px",
        marginY: "1vh",
        marginLeft: "1vw",
        padding: "0.1rem",
        "&:hover": {
          backgroundColor: "secondary.main",
        },
      }}
    >
      <Box
        sx={{
          width: "3rem",
          height: "3rem",
          padding: "0.5rem",
          marginX: "0.5rem",
        }}
      >
        {icon}
      </Box>
      <Typography
        variant="h5"
        sx={{
          color: "primary.main",
          display: collapsed ? "none" : "block",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default SidebarMenuItem;
