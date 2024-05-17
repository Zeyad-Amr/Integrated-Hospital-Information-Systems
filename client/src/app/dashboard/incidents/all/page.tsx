"use client";

import Sidebar from "@/core/layout/sidebar/index";
import ProtectedLayout from "@/core/shared/components/ProtectedLayout";
import IncidentTableComponent from "@/modules/registration/presentation/pages/incident/uncompleted-incident";

// ----------------------------------------------------------------------

export default function CreateDepartment() {
  return (
    <ProtectedLayout>
      <Sidebar pageTitle={"استكمـــال إصـــابة جمـــاعية"}>
        <IncidentTableComponent />
      </Sidebar>
    </ProtectedLayout>
  );
}
