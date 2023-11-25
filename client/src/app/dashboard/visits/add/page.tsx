"use client";

import Sidebar from "@/core/layout/sidebar/index";
import AddVisit from "@/modules/visit/presentation/pages/AddVisit";

export default function CreateDepartment() {
  return (
    <div>
      <Sidebar>
        <AddVisit />
      </Sidebar>
    </div>
  );
}
