"use client";

import Sidebar from "@/core/layout/sidebar/index";
import ProtectedLayout from "@/core/shared/components/ProtectedLayout";
import VisitTableComponent from "@/modules/registration/presentation/pages/visit/anomynous-visit";

// ----------------------------------------------------------------------

export default function AllUsers() {
  return (
    <ProtectedLayout>
      <Sidebar pageTitle={"الزيـــارات"}>
        <VisitTableComponent />
      </Sidebar>
    </ProtectedLayout>
  );
}
