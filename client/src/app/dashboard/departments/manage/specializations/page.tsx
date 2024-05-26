"use client";

import Sidebar from "@/core/layout/sidebar/index";
import Specializations from "@/modules/management/presentation/pages/specializations/Specializations";
import ProtectedLayout from "@/core/shared/components/ProtectedLayout";

// ----------------------------------------------------------------------

export default function specializations() {
  return (
    <ProtectedLayout>
      <Sidebar pageTitle={"التخصصـات"}>
        <Specializations />
      </Sidebar>
    </ProtectedLayout>
  );
}
