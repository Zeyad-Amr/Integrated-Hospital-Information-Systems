"use client";

import Sidebar from "@/core/layout/sidebar/index";
import ProtectedLayout from "@/core/shared/components/ProtectedLayout";
import ReceptionTableComponent from "@/modules/registration/presentation/pages/reception";

// ----------------------------------------------------------------------

export default function AllUsers() {
  return (
    <ProtectedLayout>
      <Sidebar pageTitle={"الاستقبال"}>
        <ReceptionTableComponent />
      </Sidebar>
    </ProtectedLayout>
  );
}
