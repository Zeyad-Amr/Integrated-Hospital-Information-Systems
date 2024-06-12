import React, { useContext } from "react";
import Box from "@mui/material/Box";
import SidebarMenuItem from "./menu/sidebar-menu-item";
import SidebarSubmenuItem from "./menu/sidebar-submenu-item";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { SidebarContext } from "./context/context";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useAppSelector } from "@/core/state/store";
import { AuthState } from "@/modules/auth/presentation/controllers/types";
import { AccountEntity } from "@/modules/auth/domain/entities/account-entity";
const SidebarComponent = () => {
  const { collapsed, onCollapse } = useContext(SidebarContext);
  const authState: AuthState = useAppSelector((state: any) => state.auth);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "Space-between",
          cursor: "pointer",
          // marginY: "1vh",
          marginX: "1vw",
        }}
        onClick={onCollapse}
      >
        {!collapsed ? (
          <>
            <CloseRoundedIcon
              sx={{
                color: "white",
                fontSize: "1.5rem",
                marginY: "1vh",
                marginX: "1vw",
              }}
            />
            <Box
              component="img"
              src="https://i.postimg.cc/J4VLnwfN/loading.png"
              sx={{ width: "3rem" }}
            />
          </>
        ) : (
          <MenuRoundedIcon sx={{ color: "white", fontSize: "1.5rem" }} />
        )}
      </Box>
      <SidebarMenuItem
        icon={
          <DashboardIcon sx={{ color: "primary.main", textAlign: "center" }} />
        }
        activeIcon={<DashboardIcon sx={{ color: "white" }} />}
        text="لوحة التحكم"
        path="/dashboard/home"
      />
      {AccountEntity.hasPermission(
        authState.currentPermission,
        "manage/users"
      ) && (
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
          <SidebarSubmenuItem
            text="عرض المستخدمين"
            path="/dashboard/users/all"
          />
        </SidebarMenuItem>
      )}
      {AccountEntity.hasPermission(
        authState.currentPermission,
        "group-visits"
      ) && (
        <SidebarMenuItem
          icon={
            <ApartmentIcon
              sx={{ color: "primary.main", textAlign: "center" }}
            />
          }
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
      )}
      {AccountEntity.hasPermission(
        authState.currentPermission,
        "single-visits"
      ) && (
        <SidebarMenuItem
          icon={
            <PeopleIcon sx={{ color: "primary.main", textAlign: "center" }} />
          }
          activeIcon={<ApartmentIcon sx={{ color: "white" }} />}
          text="المرضى"
          path="/dashboard/visits"
        >
          <SidebarSubmenuItem text="إضافة مريض" path="/dashboard/visits/add" />
          <SidebarSubmenuItem
            text="المرضى المجهولة"
            path="/dashboard/visits/anonymous"
          />
        </SidebarMenuItem>
      )}
      {AccountEntity.hasPermission(authState.currentPermission, "booking") && (
        <SidebarMenuItem
          icon={
            <PeopleIcon sx={{ color: "primary.main", textAlign: "center" }} />
          }
          activeIcon={<ApartmentIcon sx={{ color: "white" }} />}
          text="الحجوزات"
          path="/dashboard/visits"
        >
          <SidebarSubmenuItem text="إضافة مريض" path="/dashboard/visits/add" />
          {/* <SidebarSubmenuItem
          text="المرضى المجهولة"
          path="/dashboard/visits/all"
        /> */}
        </SidebarMenuItem>
      )}
      {AccountEntity.hasPermission(
        authState.currentPermission,
        "medical-assessment"
      ) && (
        <SidebarMenuItem
          icon={
            <PeopleIcon sx={{ color: "primary.main", textAlign: "center" }} />
          }
          activeIcon={<ApartmentIcon sx={{ color: "white" }} />}
          text="التقييم الطبي"
          path="/dashboard/er-area"
        />
      )}
      {/*  */}
      {AccountEntity.hasPermission(
        authState.currentPermission,
        "manage/departments"
      ) && (
        <SidebarMenuItem
          icon={
            <ApartmentIcon
              sx={{ color: "primary.main", textAlign: "center" }}
            />
          }
          activeIcon={<ApartmentIcon sx={{ color: "white" }} />}
          text="إدارة الأقسام"
          path="/dashboard/departments/manage"
        >
          <SidebarSubmenuItem
            text="الغرف"
            path="/dashboard/departments/manage/rooms"
          />
          <SidebarSubmenuItem
            text="التخصصات"
            path="/dashboard/departments/manage/specializations"
          />
          <SidebarSubmenuItem
            text="الأقسام الفرعية"
            path="/dashboard/departments/manage/subdepartments"
          />
        </SidebarMenuItem>
      )}

      {AccountEntity.hasPermission(
        authState.currentPermission,
        "examinations"
      ) && (
        <SidebarMenuItem
          icon={
            <ApartmentIcon
              sx={{ color: "primary.main", textAlign: "center" }}
            />
          }
          activeIcon={<ApartmentIcon sx={{ color: "white" }} />}
          text="الفحص الطبي"
          path="/dashboard/clinic/visits"
        />
      )}
      {AccountEntity.hasPermission(
        authState.currentPermission,
        "reception"
      ) && (
        <SidebarMenuItem
          icon={
            <ApartmentIcon
              sx={{ color: "primary.main", textAlign: "center" }}
            />
          }
          activeIcon={<ApartmentIcon sx={{ color: "white" }} />}
          text="الاستقبال"
          path="/dashboard/reception"
        />
      )}
    </Box>
  );
};

export default SidebarComponent;
