"use client";

import Sidebar from "@/core/layout/sidebar/index";
import Rooms from "@/modules/subdepartments-crud/presentation/pages/rooms/Rooms";
import ProtectedLayout from "@/core/shared/components/ProtectedLayout";

// ----------------------------------------------------------------------

export default function rooms() {
  return (
    <ProtectedLayout>
      <Sidebar pageTitle={"الغــــرف"}>
        <Rooms />
      </Sidebar>
    </ProtectedLayout>
  );
}
