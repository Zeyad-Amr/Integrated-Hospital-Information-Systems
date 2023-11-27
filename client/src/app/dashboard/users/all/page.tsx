"use client";

import Sidebar from "@/core/layout/sidebar/index";
import TestPage from "@/core/shared/components/test";

// ----------------------------------------------------------------------

export default function AllUsers() {
  return (
    <div>
      <Sidebar>
      <TestPage label={"Users"} />
      </Sidebar>
    </div>
  );
}
