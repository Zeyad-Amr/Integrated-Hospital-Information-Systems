"use client";

import Sidebar from "@/core/layout/sidebar/index";
import VisitTableComponent from "@/modules/registration/presentation/pages/visit/anomynous-visit";

// ----------------------------------------------------------------------

export default function AllUsers() {
  return (
    <div>
      <Sidebar pageTitle={'الزيـــارات'}>
        <VisitTableComponent />
      </Sidebar>
    </div>
  );
}
