"use client";

import TestPage from "@/core/shared/components/test";
import Sidebar from "@/core/layout/sidebar/index";

// ----------------------------------------------------------------------

export default function rooms() {
  return (
    <div>
      <Sidebar >
        <TestPage label={"rooms"} />
      </Sidebar>
    </div>
  );
}