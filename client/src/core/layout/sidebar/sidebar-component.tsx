import React, { useContext } from "react";
import Box from "@mui/material/Box";
import SidebarMenuItem from "./menu/sidebar-menu-item";
import { LogoIcon } from "@/assets/icons";
const SidebarComponent = (props: any) => {
  return (
    <Box sx={{}}>
      <SidebarMenuItem
        icon={<LogoIcon isLight={false} />}
        text="لوحة التحكم"
        path="/notifications"
        active={true}
      />

      <SidebarMenuItem
        icon={<LogoIcon isLight={false} />}
        text="المستخدمين"
        path="/notifications"
        active={true}
      />
      <SidebarMenuItem
        icon={<LogoIcon isLight={false} />}
        text="الأقسام"
        path="/notifications"
        active={true}
      />
    </Box>
  );
};

export default SidebarComponent;
