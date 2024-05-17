"use client";

import TestPage from "@/core/shared/components/test";
import Sidebar from "@/core/layout/sidebar/index";
import ProtectedLayout from "@/core/shared/components/ProtectedLayout";

// ----------------------------------------------------------------------

export default function Users() {
  return (
    <ProtectedLayout>
      <Sidebar>
        <TestPage label={"Users"} />
      </Sidebar>
    </ProtectedLayout>
  );
}
