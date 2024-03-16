"use client";

import TestPage from "@/core/shared/components/test";
import Sidebar from "@/core/layout/sidebar/index";

// ----------------------------------------------------------------------

export default function details() {
  return (
    <div>
      <Sidebar >
        <TestPage label={"details"} />
      </Sidebar>
    </div>
  );
}