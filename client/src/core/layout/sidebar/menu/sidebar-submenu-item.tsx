import { Box, Typography } from "@mui/material";
import { SidebarContext } from "../context/context";
import React, { useContext, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";

interface SidebarSubmenuItemProps {
  text: string;
  path: string;
}

const SidebarSubmenuItem = ({ text, path }: SidebarSubmenuItemProps) => {
  const { collapsed } = useContext(SidebarContext);
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname === path;
  console.log(pathname);
  console.log(isActive);

  const handleClick = () => {
    console.log("clicked");

    router.push(path);
  };

  return (
    <Box>
      <Box
        onClick={handleClick}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          flexWrap: "nowrap",
          cursor: "pointer",
          marginY: "1vh",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: isActive ? "secondary.main" : "common.white",
            display: collapsed ? "none" : "block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            marginX: "0.5rem",
            marginBottom: "0.5rem",
            textOverflow: "ellipsis",
            "&:hover": {
              color: isActive ? "common.white" : "grey.500",
            },
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default SidebarSubmenuItem;
