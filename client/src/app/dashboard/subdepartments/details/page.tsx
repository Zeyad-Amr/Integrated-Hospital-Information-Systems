"use client";

import Sidebar from "@/core/layout/sidebar/index";
import ProtectedLayout from "@/core/shared/components/ProtectedLayout";
import SubDepartments from "@/modules/subdepartments-crud/presentation/pages/subdepartments/SubDepartments";

// ----------------------------------------------------------------------

export default function details() {
  return (
    <ProtectedLayout>
      <Sidebar>
        <SubDepartments />
      </Sidebar>
    </ProtectedLayout>
  );
}
