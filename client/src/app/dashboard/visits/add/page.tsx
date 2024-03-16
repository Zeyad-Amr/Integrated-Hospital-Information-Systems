"use client";

import Sidebar from "@/core/layout/sidebar/index";
import AddVisit from "@/modules/registration/presentation/pages/visit/AddVisit";

export default function CreateDepartment() {
  return (
    <div>
      <Sidebar pageTitle={'اضـــافة مريض'}>
        <AddVisit />
      </Sidebar>
    </div>
  );
}
