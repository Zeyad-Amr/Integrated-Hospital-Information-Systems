"use client";

import Sidebar from "@/core/layout/sidebar/index";
import ProtectedLayout from "@/core/shared/components/ProtectedLayout";
import EmployeesTableComponent from "@/modules/employees/presentation/pages/all-employees";

// ----------------------------------------------------------------------

export default function AllUsers() {
  return (
    <ProtectedLayout>
      <Sidebar pageTitle={"الموظفـــون"}>
        <EmployeesTableComponent />
      </Sidebar>
    </ProtectedLayout>
  );
}
