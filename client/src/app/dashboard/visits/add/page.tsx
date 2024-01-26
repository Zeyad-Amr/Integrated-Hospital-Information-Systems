"use client";

import Sidebar from "@/core/layout/sidebar/index";
import AddVisit from "@/modules/visits/presentation/pages/AddVisit";

export default function CreateDepartment() {
  return (
    <div>
      <Sidebar pageTitle={'اضـــافة مريض'}>
        <AddVisit />
      </Sidebar>
    </div>
  );
}
