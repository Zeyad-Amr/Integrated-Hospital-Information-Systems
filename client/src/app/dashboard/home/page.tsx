"use client";

import TestPage from "@/core/shared/components/test";
import Sidebar from "@/core/layout/sidebar/index";

// ----------------------------------------------------------------------

export default function Dashboard() {
  return (
    <div>
      <Sidebar>
        <TestPage label="Dashboard" />
      </Sidebar>
    </div>
  );
}
