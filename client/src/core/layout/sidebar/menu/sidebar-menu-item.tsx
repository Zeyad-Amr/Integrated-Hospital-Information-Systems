import { Box, Typography } from "@mui/material";
import { SidebarContext } from "../context/context";
import React, { useContext } from "react";
// import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";

interface SidebarMenuItemProps {
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  text: string;
  path: string;
  children?: React.ReactNode;
}

const SidebarMenuItem = ({
  icon,
  activeIcon,
  text,
  path,
  children,
}: SidebarMenuItemProps) => {
  const { collapsed } = useContext(SidebarContext);
  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname.startsWith(path);
  console.log(pathname);
  console.log(isActive);

  const handleClick = () => {
    console.log("clicked");

    if (children) {
      console.log("has children");
    } else {
      console.log("no children");
      router.push(path);
    }
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "start",
        flexWrap: "nowrap",
        cursor: "pointer",
        backgroundColor: isActive ? "common.white" : "transparent",
        borderRadius: "10px",
        marginY: "1vh",
        marginLeft: "1vw",

        "&:hover": {
          backgroundColor: isActive ? "secondary.main" : "primary.darker",
        },
      }}
    >
      <Box
        sx={{
          width: "3rem",
          height: "3rem",
          padding: "0.5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        {isActive ? activeIcon : icon}
      </Box>
      <Typography
        variant="h6"
        sx={{
          color: isActive ? "primary.main" : "common.white",
          display: collapsed ? "none" : "block",
          whiteSpace: "nowrap",
          overflow: "hidden",
          marginX: "0.5rem",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default SidebarMenuItem;
