"use client";

import Sidebar from "@/core/layout/sidebar/index";
import IncidentTableComponent from "@/modules/registration/presentation/pages/incident/uncompleted-incident";

// ----------------------------------------------------------------------

export default function CreateDepartment() {
  return (
    <div>
      <Sidebar pageTitle={'استكمـــال إصـــابة جمـــاعية'}>
        <IncidentTableComponent />
      </Sidebar>
    </div>
  );
}
