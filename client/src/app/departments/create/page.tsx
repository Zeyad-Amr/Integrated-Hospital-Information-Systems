"use client";

import TestPage from "@/core/shared/components/test";
import Sidebar from "@/core/layout/sidebar/index";

// ----------------------------------------------------------------------

export default function CreateDepartment() {
  return (
    <div>
      <Sidebar>
        <TestPage label={"Create New Department"} />
      </Sidebar>
    </div>
  );
}
