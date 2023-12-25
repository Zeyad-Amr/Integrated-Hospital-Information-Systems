import React from "react";
import Box from "@mui/material/Box";
import SidebarMenuItem from "./menu/sidebar-menu-item";
import SidebarSubmenuItem from "./menu/sidebar-submenu-item";
<<<<<<< Updated upstream
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ApartmentIcon from '@mui/icons-material/Apartment';

const SidebarComponent = (props: any) => {
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
<<<<<<< Updated upstream
        icon={<DashboardIcon sx={{color:'primary.main', textAlign: 'center'}}/>}
        activeIcon={<DashboardIcon sx={{color:'white'}}/>}
=======
        icon={<DashboardIcon sx={{ color: "white", textAlign: "center" }} />}
        activeIcon={<DashboardIcon sx={{ color: "white" }} />}
>>>>>>> Stashed changes
        text="لوحة التحكم"
        path="/dashboard/home"
      />
      <SidebarMenuItem
<<<<<<< Updated upstream
        icon={<PeopleIcon sx={{color:'primary.main', textAlign: 'center'}}/>}
        activeIcon={<PeopleIcon sx={{color:'white'}}/>}
=======
        icon={<PeopleIcon sx={{ color: "white", textAlign: "center" }} />}
        activeIcon={<PeopleIcon sx={{ color: "white" }} />}
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        icon={<ApartmentIcon sx={{color:'primary.main', textAlign: 'center'}}/>}
        activeIcon={<ApartmentIcon sx={{color:'white'}}/>}
        text="الأقسام"
        path="/departments"
      >
        <SidebarSubmenuItem text="إضافة قسم" path="/departments/create" />

        <SidebarSubmenuItem text="عرض الأقسام" path="/departments/all" />
=======
        icon={<ApartmentIcon sx={{ color: "white", textAlign: "center" }} />}
        activeIcon={<ApartmentIcon sx={{ color: "white" }} />}
        text="الإصابات الجماعية"
        path="/dashboard/incidents/"
      >
        <SidebarSubmenuItem
          text="إضافة إصابة جماعية"
          path="/dashboard/incidents/add"
        />
        <SidebarSubmenuItem
          text="استكمال الإصابات الجماعية"
          path="/dashboard/incidents/all"
        />
      </SidebarMenuItem>
      <SidebarMenuItem
        icon={<PeopleIcon sx={{ color: "white", textAlign: "center" }} />}
        activeIcon={<ApartmentIcon sx={{ color: "white" }} />}
        text="الزيارات"
        path="/dashboard/visits"
      >
        <SidebarSubmenuItem text="إضافة زيارة" path="/dashboard/visits/add" />
        <SidebarSubmenuItem
          text="الزيارات المجهولة"
          path="/dashboard/visits/anonymous"
        />
>>>>>>> Stashed changes
      </SidebarMenuItem>
    </Box>
  );
};

export default SidebarComponent;
