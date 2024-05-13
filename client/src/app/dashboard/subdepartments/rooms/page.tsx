"use client";

import TestPage from "@/core/shared/components/test";
import Sidebar from "@/core/layout/sidebar/index";
import Rooms from "@/modules/subdepartments-crud/presentation/pages/rooms/Rooms";

// ----------------------------------------------------------------------

export default function rooms() {
  return (
    <div>
      <Sidebar pageTitle={'الغــــرف'}>
        <Rooms />
      </Sidebar>
    </div>
  );
}