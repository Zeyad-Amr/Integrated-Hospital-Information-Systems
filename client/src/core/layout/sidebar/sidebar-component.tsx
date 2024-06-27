import React, { useContext } from "react";
import Box from "@mui/material/Box";
import SidebarMenuItem from "./menu/sidebar-menu-item";
import SidebarSubmenuItem from "./menu/sidebar-submenu-item";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BusinessIcon from "@mui/icons-material/Business";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { SidebarContext } from "./context/context";
import { useAppSelector } from "@/core/state/store";
import { AuthState } from "@/modules/auth/presentation/controllers/types";
import { AccountEntity } from "@/modules/auth/domain/entities/account-entity";

export interface PermissionedMenuItemProps {
  permission: string;
  icon: JSX.Element;
  activeIcon: JSX.Element;
  text: string;
  path: string;
  children?: any[];
}

const PermissionedMenuItem = ({
  permission,
  icon,
  activeIcon,
  text,
  path,
  children,
}: PermissionedMenuItemProps) => {
  const authState: AuthState = useAppSelector((state: any) => state.auth);

  return AccountEntity.hasPermission(
    authState.currentPermission,
    permission
  ) ? (
    <SidebarMenuItem
      icon={icon}
      activeIcon={activeIcon}
      text={text}
      path={path}
    >
      {children}
    </SidebarMenuItem>
  ) : null;
};

const SidebarComponent = () => {
  const { collapsed, onCollapse } = useContext(SidebarContext);

  const renderMenuItems = () => {
    return menuItems.map((item, index) => (
      <PermissionedMenuItem
        key={index}
        permission={item.permission}
        icon={item.icon}
        activeIcon={item.activeIcon}
        text={item.text}
        path={item.path}
      >
        {item.children &&
          item.children.map((subItem, subIndex) => (
            <SidebarSubmenuItem
              key={subIndex}
              text={subItem.text}
              path={subItem.path}
            />
          ))}
      </PermissionedMenuItem>
    ));
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "start",
          justifyContent: collapsed ? "center" : "space-between",
          cursor: "pointer",
          marginX: "1vw",
          marginBottom: "2rem",
        }}
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
              onClick={onCollapse}
            />
            <Box
              component="img"
              src="https://i.postimg.cc/J4VLnwfN/loading.png"
              sx={{ width: "3rem" }}
            />
          </>
        ) : (
          <MenuRoundedIcon
            sx={{ color: "white", fontSize: "1.5rem" }}
            onClick={onCollapse}
          />
        )}
      </Box>
      {renderMenuItems()}
    </Box>
  );
};

export default SidebarComponent;

export const menuItems: PermissionedMenuItemProps[] = [
  {
    permission: "manage/users",
    icon: <PeopleIcon sx={{ color: "primary.main", textAlign: "center" }} />,
    activeIcon: <PeopleIcon sx={{ color: "white" }} />,
    text: "الموظفين",
    path: "/dashboard/users",
    children: [
      { text: "إضافة موظف", path: "/dashboard/users/create" },
      { text: "عرض الموظفين", path: "/dashboard/users/all" },
    ],
  },
  {
    permission: "group-visits",
    icon: <PeopleAltIcon sx={{ color: "primary.main", textAlign: "center" }} />,
    activeIcon: <PeopleAltIcon sx={{ color: "white" }} />,
    text: "الإصابات الجماعية",
    path: "/dashboard/incidents",
    children: [
      { text: "إضافة إصابة جماعية", path: "/dashboard/incidents/add" },
      { text: "استكمال الإصابات الجماعية", path: "/dashboard/incidents/all" },
    ],
  },
  {
    permission: "single-visits",
    icon: (
      <AssignmentIndIcon sx={{ color: "primary.main", textAlign: "center" }} />
    ),
    activeIcon: <WorkIcon sx={{ color: "white" }} />,
    text: "المرضى",
    path: "/dashboard/visits",
    children: [
      { text: "إضافة مريض", path: "/dashboard/visits/add" },
      { text: "المرضى المجهولة", path: "/dashboard/visits/anonymous" },
    ],
  },
  {
    permission: "booking",
    icon: (
      <CalendarTodayIcon sx={{ color: "primary.main", textAlign: "center" }} />
    ),
    activeIcon: <WorkIcon sx={{ color: "white" }} />,
    text: "الحجوزات",
    path: "/dashboard/visits",
    children: [{ text: "إضافة مريض", path: "/dashboard/visits/add" }],
  },
  {
    permission: "medical-assessment",
    icon: (
      <AssessmentOutlinedIcon
        sx={{ color: "primary.main", textAlign: "center" }}
      />
    ),
    activeIcon: <AssessmentIcon sx={{ color: "white" }} />,
    text: "التقييم الطبي",
    path: "/dashboard/er-area",
  },
  {
    permission: "manage/departments",
    icon: <BusinessIcon sx={{ color: "primary.main", textAlign: "center" }} />,
    activeIcon: <BusinessIcon sx={{ color: "white" }} />,
    text: "إدارة الأقسام",
    path: "/dashboard/departments/manage",
    children: [
      { text: "الغرف", path: "/dashboard/departments/manage/rooms" },
      {
        text: "التخصصات",
        path: "/dashboard/departments/manage/specializations",
      },
      {
        text: "الأقسام الفرعية",
        path: "/dashboard/departments/manage/subdepartments",
      },
    ],
  },
  {
    permission: "examinations",
    icon: (
      <AssessmentIcon sx={{ color: "primary.main", textAlign: "center" }} />
    ),
    activeIcon: <AssessmentIcon sx={{ color: "white" }} />,
    text: "الفحص الطبي",
    path: "/dashboard/clinic/visits",
  },
  {
    permission: "reception",
    icon: <HomeIcon sx={{ color: "primary.main", textAlign: "center" }} />,
    activeIcon: <HomeIcon sx={{ color: "white" }} />,
    text: "الاستقبال",
    path: "/dashboard/reception",
  },
];
