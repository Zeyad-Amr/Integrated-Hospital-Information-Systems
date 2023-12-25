import React, { useContext } from "react";
import Box from "@mui/material/Box";
import SidebarMenuItem from "./menu/sidebar-menu-item";
import SidebarSubmenuItem from "./menu/sidebar-submenu-item";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Button } from "@mui/material";
import { SidebarContext } from "./context/context";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { MenuIcon, CloseIcon } from "@/assets/icons/index";
const SidebarComponent = () => {
  const { collapsed, onCollapse } = useContext(SidebarContext);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          onClick={onCollapse}
          sx={{
            paddingX: "0.1rem",
            paddingY: "0.7rem",
          }}
        >
          <Box>
            {!collapsed ? (
              <CloseRoundedIcon sx={{ color: "white", fontSize: "1.5rem" }} />
            ) : (
              <MenuRoundedIcon sx={{ color: "white", fontSize: "1.5rem" }} />
            )}
          </Box>
        </Box>
      </Box>
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