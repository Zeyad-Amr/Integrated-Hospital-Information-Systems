import Box from "@mui/material/Box";
import { SidebarContext } from "./context/context";
import React, { useContext } from "react";
import SidebarHeader from "./sidebar-header";
import SidebarComponent from "./sidebar-component";
import { Button, Typography } from "@mui/material";
import { NotificationIcon } from "@/assets/icons/index";
import ProfileIcon from "@/core/shared/components/profile/ProfileIcon";

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
      {/* <SidebarHeader height="13vh" /> */}

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
            backgroundColor: "#061540",
            width: collapsed ? "5rem" : "18rem",
            transition: "width 0.3s ease-in-out",
            overflowX: "hidden",
            overflowY: "auto",
            color: "white",
            padding: "2rem 0",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <SidebarComponent />
        </Box>
        <Box
          flex="1"
          sx={{
            overflowX: "hidden",
            overflowY: "scroll",
            width: "100%",
            backgroundColor: "primary.light",
          }}
        >
          <Box
            sx={{
              width: "85%",
              margin: "1.5rem auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "primary.darker",
                }}
              >
                اضافـــــــة مستخدم
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
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
                  <NotificationIcon primary="#0f70f2" />
                </Box>
              </Button>
              <ProfileIcon name="عبدالرحمن ياسر" pos="موظف استقبال" />
            </Box>
          </Box>
          <Box>{props.children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarLayout;
