"use client";

import Sidebar from "@/core/layout/sidebar/index";
import ProtectedLayout from "@/core/shared/components/ProtectedLayout";
import ClinicVisitsPage from "@/modules/examination/view/pages";

// ----------------------------------------------------------------------

export default function Visits() {
  return (
    <ProtectedLayout>
      <Sidebar pageTitle={"الزيارات"}>
        <ClinicVisitsPage />
      </Sidebar>
    </ProtectedLayout>
  );
}
