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
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SidebarHeader height="13vh" />

      <Box
        flex="1"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "stretch",
          width: "100%",
          height: "88vh",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            width: collapsed ? "5rem" : "16rem",
            transition: "width 0.3s ease-in-out",

            overflowX: "hidden",
            overflowY: "hidden",
          }}
        >
          <SidebarComponent />
        </Box>
        <Box
          flex="1"
          sx={{
            overflowX: "hidden",
            overflowY: "scroll",
            marginRight: "2vw",
            width: "100%",
            borderRadius: "10px 10px 0px 0px",
            backgroundColor: "primary.contrastText",
            // filter: "box-shadow(0px 0px 6px #0000002f);",
            boxShadow: 'inset 0px 0px 6px #0000003f',
          }}
        >
          <Box>{props.children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarLayout;
