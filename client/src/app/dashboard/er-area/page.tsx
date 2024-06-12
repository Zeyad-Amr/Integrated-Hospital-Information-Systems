"use client";

import Sidebar from "@/core/layout/sidebar/index";
import ProtectedLayout from "@/core/shared/components/ProtectedLayout";
import ERVisitsTableComponent from "@/modules/er-area/presentation/pages/er-visits";

// ----------------------------------------------------------------------

export default function AllUsers() {
  return (
    <ProtectedLayout>
      <Sidebar pageTitle={"التقييم الطبي"}>
        <ERVisitsTableComponent />
      </Sidebar>
    </ProtectedLayout>
  );
}
