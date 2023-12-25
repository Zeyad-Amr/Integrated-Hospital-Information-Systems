import React from "react";
import Box from "@mui/material/Box";
import SidebarMenuItem from "./menu/sidebar-menu-item";
import SidebarSubmenuItem from "./menu/sidebar-submenu-item";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ApartmentIcon from "@mui/icons-material/Apartment";

const SidebarComponent = () => {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <SidebarMenuItem
        icon={
          <DashboardIcon sx={{ color: "primary.main", textAlign: "center" }} />
        }
        activeIcon={<DashboardIcon sx={{ color: "white" }} />}
        text="لوحة التحكم"
        path="/dashboard/home"
      />
      <SidebarMenuItem
        icon={
          <PeopleIcon sx={{ color: "primary.main", textAlign: "center" }} />
        }
        activeIcon={<PeopleIcon sx={{ color: "white" }} />}
        text="المستخدمين"
        path="/dashboard/users"
      >
        <SidebarSubmenuItem
          text="إضافة مستخدم"
          path="/dashboard/users/create"
        />
        <SidebarSubmenuItem text="عرض المستخدمين" path="/dashboard/users/all" />
      </SidebarMenuItem>
      <SidebarMenuItem
        icon={
          <ApartmentIcon sx={{ color: "primary.main", textAlign: "center" }} />
        }
        activeIcon={<ApartmentIcon sx={{ color: "white" }} />}
        text="الإصابات الجماعية"
        path="/dashboard/incidents/"
      >
        <SidebarSubmenuItem text="إضافة إصابة جماعية" path="/dashboard/incidents/add" />
        <SidebarSubmenuItem
          text="استكمال الإصابات الجماعية"
          path="/dashboard/incidents/all"
        />
      </SidebarMenuItem>
      <SidebarMenuItem
        icon={
          <PeopleIcon sx={{ color: "primary.main", textAlign: "center" }} />
        }
        activeIcon={<ApartmentIcon sx={{ color: "white" }} />}
        text="الزيارات"
        path="/dashboard/visits/add"
      >
        <SidebarSubmenuItem text="إضافة زيارة" path="/dashboard/visits/add" />
        <SidebarSubmenuItem
          text="الزيارات المجهولة"
          path="/dashboard/visits/anonymous"
        />
      </SidebarMenuItem>
      <SidebarMenuItem
        icon={
          <PeopleIcon sx={{ color: "primary.main", textAlign: "center" }} />
        }
        activeIcon={<ApartmentIcon sx={{ color: "white" }} />}
        text="ER Area"
        path="/dashboard/er-area"
      >

      </SidebarMenuItem>
    </Box>
  );
};

export default SidebarComponent;
