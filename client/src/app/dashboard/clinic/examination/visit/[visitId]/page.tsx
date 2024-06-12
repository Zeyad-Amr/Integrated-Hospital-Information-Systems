"use client";

import Sidebar from "@/core/layout/sidebar/index";
import ProtectedLayout from "@/core/shared/components/ProtectedLayout";
import ExaminationPage from "@/modules/examination/view/pages/examination";

// ----------------------------------------------------------------------

export default function Examination() {
  return (
    <ProtectedLayout>
        <Sidebar pageTitle={"الفحـــــص"}>
          <ExaminationPage />
        </Sidebar>
    </ProtectedLayout>
  );
}
