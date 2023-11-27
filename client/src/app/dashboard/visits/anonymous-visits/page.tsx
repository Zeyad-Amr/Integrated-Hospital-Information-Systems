"use client";

import Sidebar from "@/core/layout/sidebar/index";
import VisitsTableComponent from "@/modules/visits/presentation/pages/anomynous-visit";

// ----------------------------------------------------------------------

export default function AllUsers() {
  return (
    <div>
      <Sidebar>
        <VisitsTableComponent />
      </Sidebar>
    </div>
  );
}
