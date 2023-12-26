"use client";

import Sidebar from "@/core/layout/sidebar/index";
import EmployeesTableComponent from "@/modules/employees/presentation/pages/all-employees";

// ----------------------------------------------------------------------

export default function AllUsers() {
  return (
    <div>
      <Sidebar pageTitle={'الموظفـــون'}>
        <EmployeesTableComponent />
      </Sidebar>
    </div>
  );
}
