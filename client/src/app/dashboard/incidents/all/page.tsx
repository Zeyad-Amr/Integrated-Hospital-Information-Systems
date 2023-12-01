"use client";

import Sidebar from "@/core/layout/sidebar/index";
import IncidentTableComponent from "@/modules/incidents/presentation/pages/uncompleted-incident";

// ----------------------------------------------------------------------

export default function CreateDepartment() {
  return (
    <div>
      <Sidebar>
        <IncidentTableComponent />
      </Sidebar>
    </div>
  );
}
