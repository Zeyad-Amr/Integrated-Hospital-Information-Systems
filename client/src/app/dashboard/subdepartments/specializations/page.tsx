"use client";

import TestPage from "@/core/shared/components/test";
import Sidebar from "@/core/layout/sidebar/index";

// ----------------------------------------------------------------------

export default function specializations() {
  return (
    <div>
      <Sidebar >
        <TestPage label={"specializations"} />
      </Sidebar>
    </div>
  );
}