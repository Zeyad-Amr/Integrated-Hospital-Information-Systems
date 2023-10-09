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
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SidebarHeader height="calc(5vh + 4vw)" />

      <Box
        flex="1"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "stretch",
          width: "100%",
          height: "80vh",
        }}
      >
        <Box
          sx={{
            backgroundColor: "primary.main",
            width: collapsed ? "5rem" : "20rem",
            transition: "width 0.3s ease-in-out",
            overflowX: "hidden",
            overflowY: "scroll",
          }}
        >
          <SidebarComponent />
        </Box>
        {/* <Box
          sx={{
            marginX: "2vw",
            width: "100%",
            height: "100%",
            borderRadius: "20px 20px 0px 0px",
            overflowX: "hidden",
            overflowY: "scroll",
            
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {props.children}
        </Box> */}
      </Box>
    </Box>
  );
};

export default SidebarLayout;
