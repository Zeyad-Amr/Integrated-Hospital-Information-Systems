"use client";

import Sidebar from "@/core/layout/sidebar/index";
import ProtectedLayout from "@/core/shared/components/ProtectedLayout";
import AddIncident from "@/modules/registration/presentation/pages/incident/AddIncident";

export default function CreateDepartment() {
  return (
    <ProtectedLayout>
      <Sidebar pageTitle={"اضـــافة إصـــابة جمـــاعية"}>
        <AddIncident />
      </Sidebar>
    </ProtectedLayout>
  );
}
