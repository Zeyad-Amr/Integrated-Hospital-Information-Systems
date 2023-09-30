import SidebarLayout from "./sidebar-layout";
import { SidebarContextProvider } from "./context/context";
const Sidebar = (props: any) => {
  return (
    <SidebarContextProvider>
      <SidebarLayout>{props.children}</SidebarLayout>
    </SidebarContextProvider>
  );
};

export default Sidebar;
