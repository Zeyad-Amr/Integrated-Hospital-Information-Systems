import Box from "@mui/material/Box";
import { SidebarContext } from "./context/context";
import React, { useContext } from "react";
import SidebarHeader from "./sidebar-header";
import SidebarComponent from "./sidebar-component";
const SidebarLayout = (props: any) => {
  const { collapsed } = useContext(SidebarContext);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        backgroundColor: "primary.main",
      }}
    >
      <SidebarHeader height="calc(5vh + 4vw)" />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            backgroundColor: "primary.main",
            width: collapsed ? "4vw" : "25vw",
            transition: "width 0.3s ease-in-out",
          }}
        >
          <SidebarComponent />
        </Box>
        <Box
          sx={{
            marginX: "2vw",
            width: "100%",
            borderRadius: "20px 20px 0px 0px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarLayout;
