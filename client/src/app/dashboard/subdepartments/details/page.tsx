"use client";

import Sidebar from "@/core/layout/sidebar/index";
import SubDepartments from "@/modules/subdepartments-crud/presentation/pages/subdepartments/SubDepartments";

// ----------------------------------------------------------------------

export default function details() {
  return (
    <div>
      <Sidebar >
        <SubDepartments />
      </Sidebar>
    </div>
  );
}