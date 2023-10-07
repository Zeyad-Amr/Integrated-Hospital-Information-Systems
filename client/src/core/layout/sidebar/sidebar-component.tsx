import React, { useContext } from "react";
import Box from "@mui/material/Box";
import SidebarMenuItem from "./menu/sidebar-menu-item";
import SidebarSubmenuItem from "./menu/sidebar-submenu-item";
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
        <SidebarSubmenuItem text="إضافة مستخدم" path="/users/create" />
        <SidebarSubmenuItem text="عرض المستخدمين" path="/users/all" />
        <SidebarSubmenuItem text="إضافة مستخدم" path="/users/create" />
        <SidebarSubmenuItem text="عرض المستخدمين" path="/users/all" />
        <SidebarSubmenuItem text="إضافة مستخدم" path="/users/create" />
        <SidebarSubmenuItem text="عرض المستخدمين" path="/users/all" />
        <SidebarSubmenuItem text="إضافة مستخدم" path="/users/create" />
        <SidebarSubmenuItem text="عرض المستخدمين" path="/users/all" />
      </SidebarMenuItem>

      <SidebarMenuItem
        icon={<LogoIcon primary={"white"} />}
        activeIcon={<LogoIcon />}
        text="الأقسام"
        path="/departments"
      >
        <SidebarSubmenuItem text="إضافة قسم" path="/departments/create" />

        <SidebarSubmenuItem text="عرض الأقسام" path="/departments/all" />
      </SidebarMenuItem>
    </Box>
  );
};

export default SidebarComponent;
