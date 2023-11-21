import React, { useContext } from "react";
import Box from "@mui/material/Box";
import SidebarMenuItem from "./menu/sidebar-menu-item";
import SidebarSubmenuItem from "./menu/sidebar-submenu-item";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ApartmentIcon from '@mui/icons-material/Apartment';

const SidebarComponent = (props: any) => {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <SidebarMenuItem
        icon={<DashboardIcon sx={{color:'primary.main', textAlign: 'center'}}/>}
        activeIcon={<DashboardIcon sx={{color:'white'}}/>}
        text="لوحة التحكم"
        path="/dashboard"
      />

      <SidebarMenuItem
        icon={<PeopleIcon sx={{color:'primary.main', textAlign: 'center'}}/>}
        activeIcon={<PeopleIcon sx={{color:'white'}}/>}
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
        icon={<ApartmentIcon sx={{color:'primary.main', textAlign: 'center'}}/>}
        activeIcon={<ApartmentIcon sx={{color:'white'}}/>}
        text="الأقسام"
        path="/departments"
      >
        <SidebarSubmenuItem text="إضافة قسم" path="/departments/create" />
        <SidebarSubmenuItem text="عرض الأقسام" path="/departments/all" />
      </SidebarMenuItem>
      <SidebarMenuItem
        icon={<ApartmentIcon sx={{color:'primary.main', textAlign: 'center'}}/>}
        activeIcon={<ApartmentIcon sx={{color:'white'}}/>}
        text="الحوادث"
        path="/incident"
      >
        <SidebarSubmenuItem text="إضافة حادث" path="/incident/add" />
        <SidebarSubmenuItem text="استكمال الحوادث" path="/incident/complete" />
      </SidebarMenuItem>
    </Box>
  );
};

export default SidebarComponent;
