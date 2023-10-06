"use client";

import TestPage from "@/core/shared/components/test";
import Sidebar from "@/core/layout/sidebar/index";

// ----------------------------------------------------------------------

export default function Users() {
  return (
    <div>
      <Sidebar>
        <TestPage label={"Users"} />
      </Sidebar>
    </div>
  );
}
