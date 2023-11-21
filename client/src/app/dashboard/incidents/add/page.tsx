"use client";

import Sidebar from "@/core/layout/sidebar/index";
import AddIncident from "@/modules/incidents/presentation/pages/AddIncident";

export default function CreateDepartment() {
  return (
    <div>
      <Sidebar>
        <AddIncident />
      </Sidebar>
    </div>
  );
}
