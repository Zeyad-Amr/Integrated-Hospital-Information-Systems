import Box from "@mui/material/Box";
import { SidebarContext } from "./context/context";
import React, { useContext } from "react";
import Button from "@mui/material/Button";
const SidebarLayout = (props: any) => {
  const { collapsed, onCollapse } = useContext(SidebarContext);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "10vh",
          backgroundColor: "primary.main",
        }}
      >
        <Button onClick={onCollapse}>Toggle</Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "90vh",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: collapsed ? "5vw" : "20vw",
            height: "90vh",
            backgroundColor: "primary.main",
          }}
        ></Box>
        <Box
          sx={{
            width: collapsed ? "95vw" : "80vw",
            height: "90vh",
          }}
        >
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarLayout;
