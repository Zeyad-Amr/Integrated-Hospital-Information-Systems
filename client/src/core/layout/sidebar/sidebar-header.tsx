import Box from "@mui/material/Box";
import { SidebarContext } from "./context/context";
import React, { useContext } from "react";
import Button from "@mui/material/Button";
import {
  LogoIcon,
  MenuIcon,
  CloseIcon,
  NotificationIcon,
} from "@/assets/icons/index";

interface SidebarHeaderProps {
  height?: string;
}
const SidebarHeader = (props: SidebarHeaderProps) => {
  const { collapsed, onCollapse } = useContext(SidebarContext);
  return (
    <Box
      sx={{
        width: "100%",
        height: props.height || "5vh",
        backgroundColor: "primary.main",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingX: "1rem",
        paddingY: "clamp(0.5rem, 1vw, 1rem)",
      }}
    >
      <Button
        onClick={onCollapse}
        sx={{
          paddingX: "0.1rem",
          paddingY: "0.7rem",
        }}
      >
        <Box
          sx={{
            width: "1.2rem",
            height: "1.2rem",
          }}
        >
          {!collapsed ? (
            <CloseIcon primary="white" />
          ) : (
            <MenuIcon primary="white" />
          )}
        </Box>
      </Button>
      <Box
        sx={{
          width: "3rem",
          height: "3rem",
        }}
      >
        <LogoIcon primary="white" />
      </Box>
      <Button
        onClick={() => console.log("Notification")}
        sx={{
          paddingX: "0.1rem",
          paddingY: "0.7rem",
        }}
      >
        <Box
          sx={{
            width: "1.3rem",
            height: "1.3rem",
          }}
        >
          <NotificationIcon primary="white" />
        </Box>
      </Button>
    </Box>
  );
};

export default SidebarHeader;
