"use client";

import TestPage from "@/core/shared/components/test";
import Sidebar from "@/core/layout/sidebar/index";

// ----------------------------------------------------------------------

export default function AllDepartments() {
  return (
    <div>
      <Sidebar>
        <TestPage label={"All Departments"} />
      </Sidebar>
    </div>
  );
}
