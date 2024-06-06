"use client";

import TestPage from "@/core/shared/components/test";
import Sidebar from "@/core/layout/sidebar/index";
import ProtectedLayout from "@/core/shared/components/ProtectedLayout";

// ----------------------------------------------------------------------

export default function Examination() {
  return (
    <ProtectedLayout>
        <Sidebar>
          <TestPage label="examination" />
        </Sidebar>
    </ProtectedLayout>
  );
}
