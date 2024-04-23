"use client";

import TestPage from "@/core/shared/components/test";
import Sidebar from "@/core/layout/sidebar/index";
import Specializations from "@/modules/subdepartments-crud/presentation/pages/specializations/Specializations";

// ----------------------------------------------------------------------

export default function specializations() {
  return (
    <div>
      <Sidebar >
        <Specializations/>
      </Sidebar>
    </div>
  );
}