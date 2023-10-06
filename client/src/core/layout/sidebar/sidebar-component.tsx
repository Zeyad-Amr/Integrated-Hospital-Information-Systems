import React, { useContext } from "react";
import Box from "@mui/material/Box";
import SidebarMenuItem from "./menu/sidebar-menu-item";
import SidebarMenuSubItem from "./menu/sidebar-menu-subitem";
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
      >
        <SidebarMenuSubItem text="إضافة مستخدم" path="/users/create" />

        <SidebarMenuSubItem text="عرض المستخدمين" path="/users/all" />
      </SidebarMenuItem>

      <SidebarMenuItem
        icon={<LogoIcon primary={"white"} />}
        activeIcon={<LogoIcon />}
        text="الأقسام"
        path="/departments"
      >
        <SidebarMenuSubItem text="إضافة قسم" path="/departments/create" />

        <SidebarMenuSubItem text="عرض الأقسام" path="/departments/all" />
      </SidebarMenuItem>
    </Box>
  );
};

export default SidebarComponent;
