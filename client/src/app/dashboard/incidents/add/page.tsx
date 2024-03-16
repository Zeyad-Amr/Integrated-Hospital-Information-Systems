"use client";

import Sidebar from "@/core/layout/sidebar/index";
import AddIncident from "@/modules/registration/presentation/pages/incident/AddIncident";

export default function CreateDepartment() {
  return (
    <div>
      <Sidebar pageTitle={'اضـــافة إصـــابة جمـــاعية'}>
        <AddIncident />
      </Sidebar>
    </div>
  );
}
