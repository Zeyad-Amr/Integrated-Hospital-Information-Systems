"use client";

import Sidebar from "@/core/layout/sidebar/index";
import Specializations from "@/modules/subdepartments-crud/presentation/pages/specializations/Specializations";
import ProtectedLayout from "@/core/shared/components/ProtectedLayout";

// ----------------------------------------------------------------------

export default function specializations() {
  return (
    <ProtectedLayout>
      <Sidebar>
        <Specializations />
      </Sidebar>
    </ProtectedLayout>
  );
}
