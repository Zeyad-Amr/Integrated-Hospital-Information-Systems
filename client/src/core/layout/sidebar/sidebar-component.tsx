import React, { useContext } from "react";
import Box from "@mui/material/Box";
import SidebarMenuItem from "./menu/sidebar-menu-item";
import { LogoIcon } from "@/assets/icons";
const SidebarComponent = (props: any) => {
  return (
    <Box sx={{}}>
      <SidebarMenuItem
        icon={<LogoIcon primary={"white"} />}
        activeIcon={<LogoIcon />}
        text="لوحة التحكم"
        path="/dashboard"
      />

      <SidebarMenuItem
        icon={<LogoIcon primary={"white"} />}
        activeIcon={<LogoIcon />}
        text="المستخدمين"
        path="/users"
      />
      <SidebarMenuItem
        icon={<LogoIcon primary={"white"} />}
        activeIcon={<LogoIcon />}
        text="الأقسام"
        path="/departments"
      />
    </Box>
  );
};

export default SidebarComponent;
