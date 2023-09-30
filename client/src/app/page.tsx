"use client";

import TestPage from "@/core/shared/components/test";
import Sidebar from "@/core/layout/sidebar/index";

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <div>
      <Sidebar>
        <TestPage />
      </Sidebar>
    </div>
  );
}
